/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2026, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.stella.plugins.work.rest.workers;

import java.io.Serializable;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.glassfish.jersey.client.ClientProperties;
import org.glassfish.jersey.message.GZipEncoder;

import com.google.gson.Gson;

import io.vertigo.commons.codec.CodecManager;
import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.VSystemException;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.stella.impl.workers.WorkersManagerImpl;
import io.vertigo.stella.impl.work.WorkItem;
import jakarta.ws.rs.ProcessingException;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.client.WebTarget;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status.Family;
import jakarta.ws.rs.core.Response.StatusType;

/**
 * api de distributedWorkQueueManager en REST avec jersey.
 * Pour la partie appel webService voir http://ghads.wordpress.com/2008/09/24/calling-a-rest-webservice-from-java-without-libs/
 *
 * @author npiedeloup
 */
final class RestQueueClient {
	private static final int CONNECT_TIMEOUT = 10 * 1000; // 10s
	private static final int SERVER_PULL_TIMEOUT_SECONDS = 5; //server side long poll : the http timeout must be longer
	private static final Logger LOG = LogManager.getLogger(RestQueueClient.class);
	private final CodecManager codecManager;
	private final String serverUrl;
	private final int nodeTimeoutSeconds;
	private final Client locatorClient;
	private final ConcurrentMap<String, Object> lockByWorkType = new ConcurrentHashMap<>();

	/**
	 * Constructeur.
	 * @param serverUrl Url of the server
	 * @param nodeTimeoutSeconds Timeout (seconds) without sign of life before the server sees this node dead (sent with the heartBeat)
	 * @param httpTimeoutSeconds Read timeout (seconds) of the calls to the server
	 * @param codecManager Manager d'encodage/decodage
	 */
	RestQueueClient(final String serverUrl, final int nodeTimeoutSeconds, final int httpTimeoutSeconds, final CodecManager codecManager) {
		Assertion.check()
				.isNotBlank(serverUrl)
				.isTrue(nodeTimeoutSeconds > WorkersManagerImpl.HEART_BEAT_PERIOD_SECONDS && nodeTimeoutSeconds <= 60 * 60,
						"timeoutSeconds is the time without sign of life before the master sees the node dead : "
								+ "it must be greater than the heartBeat period ({0}s) and at most 3600s : {1}s (the http timeout is httpTimeoutSeconds)",
						WorkersManagerImpl.HEART_BEAT_PERIOD_SECONDS, nodeTimeoutSeconds)
				.isTrue(httpTimeoutSeconds > SERVER_PULL_TIMEOUT_SECONDS, "httpTimeoutSeconds must be greater than the server long poll ({0}s) : {1}s", SERVER_PULL_TIMEOUT_SECONDS, httpTimeoutSeconds)
				.isNotNull(codecManager);
		//-----
		this.serverUrl = serverUrl;
		this.nodeTimeoutSeconds = nodeTimeoutSeconds;
		this.codecManager = codecManager;
		locatorClient = ClientBuilder.newClient();
		locatorClient.property(ClientProperties.CONNECT_TIMEOUT, CONNECT_TIMEOUT);
		locatorClient.property(ClientProperties.READ_TIMEOUT, httpTimeoutSeconds * 1000);
	}

	<R, W> WorkItem<R, W> pollWorkItem(final String nodeId, final String workType) {
		//call methode distante, passe le workItem à started
		try {
			try {
				final String jsonResult;
				final Object lockWork = lockByWorkType.computeIfAbsent(workType, key -> new Object());
				//Cette tache est synchronized sur le workType, pour éviter de surcharger le serveur en demandes multiple
				synchronized (lockWork) {
					checkInterrupted(); //must be check because Thread.interrupt() doesn't freed the synchronized lock

					final WebTarget remoteWebResource = prepareTarget(serverUrl + "/pollWork/" + workType + "?nodeUID=" + nodeId);
					final Response response = remoteWebResource.request(MediaType.TEXT_PLAIN).get();
					checkResponseStatus(response);
					jsonResult = response.readEntity(String.class);
				}

				if (!jsonResult.isEmpty() && !"[]".equals(jsonResult)) { //le json est vide s'il n'y a pas de tache en attente
					final String[] result = new Gson().fromJson(jsonResult, String[].class);
					final String uuid = result[0];
					final byte[] serializedResult = codecManager.getBase64Codec().decode(result[1]);
					final Object work = codecManager.getCompressedSerializationCodec().decode(serializedResult);
					LOG.info("pollWork({}) : 1 Work", workType);
					return new WorkItem(serverUrl, uuid, work, ClassUtil.classForName(workType));
				}
				LOG.info("pollWork({}) : no Work", workType);
				//pas de travaux : inutil d'attendre le poll attend déjà 1s coté serveur
			} catch (final ProcessingException c) {
				LOG.warn("[pollWork] Erreur de connexion au serveur " + serverUrl + "/pollWork/" + workType + " (" + c.getMessage() + ")", c);
				//En cas d'erreur on attend quelques secondes, pour attendre que le serveur revienne
				final Object lockWork = lockByWorkType.computeIfAbsent(serverUrl, key -> new Object());
				//En cas d'absence du serveur,
				//ce synchronized permet d'étaler les appels au serveur de chaque worker : le premier attendra 2s, le second 2+2s, le troisième : 4+2s, etc..
				//dés le retour du serveur, on récupère un worker toute les 2s
				synchronized (lockWork) {
					checkInterrupted();//must be check because Thread.interrupt() doesn't freed the synchronized lock
					Thread.sleep(2000); //on veut bien un sleep
				}
			} catch (final InterruptedException e) {
				Thread.currentThread().interrupt(); // Preserve interrupt status
				//nothing, in case of interrupt just return null, like no message
			} catch (final Exception c) {
				LOG.warn("[pollWork] Erreur de traitement de l'accès au serveur " + serverUrl + "/pollWork/" + workType + " (" + c.getMessage() + ")", c);
			}
		} catch (final InterruptedException e) {
			Thread.currentThread().interrupt(); // Preserve interrupt status
			//nothing, in case of interrupt just return null, like no message
		}
		return null;
	}

	private WebTarget prepareTarget(final String targetUrl) {
		final WebTarget remoteWebResource = locatorClient.target(targetUrl);
		return remoteWebResource
				.register(GZipEncoder.class);
	}

	void putStart(final String workId) {
		//call methode distante
		final WebTarget remoteWebResource = locatorClient.target(serverUrl + "/event/start/" + workId);
		try {
			final Response response = remoteWebResource.request(MediaType.TEXT_PLAIN).post(Entity.text(""));
			checkResponseStatus(response);
		} catch (final Exception c) {
			LOG.warn("[onStart] Erreur de connexion au serveur {} ({})", remoteWebResource.getUri(), c.getMessage());
		}
	}

	<R> void putResult(final String workId, final R result, final Throwable error) {
		Assertion.check()
				.isNotBlank(workId)
				.isTrue(result == null ^ error == null, "result xor error is null");
		//-----
		final String address;
		final Object value;
		if (error == null) {
			address = serverUrl + "/event/success/";
			value = result;
		} else {
			address = serverUrl + "/event/failure/";
			value = error;
		}
		//call methode distante
		sendValue(workId, address, value);
	}

	void heartBeat(final String nodeId, final Set<String> workTypes) {
		//call methode distante : keeps the node alive on the master while all its workers are busy
		final WebTarget remoteWebResource = locatorClient.target(serverUrl + "/heartBeat")
				.queryParam("nodeUID", nodeId)
				.queryParam("timeoutSeconds", nodeTimeoutSeconds);
		try {
			final Response response = remoteWebResource.request(MediaType.TEXT_PLAIN).post(Entity.text(String.join(";", workTypes)));
			checkResponseStatus(response);
		} catch (final Exception c) {
			LOG.warn("[heartBeat] Erreur de connexion au serveur {} ({})", remoteWebResource.getUri(), c.getMessage());
		}
	}

	private void sendValue(final String uuid, final String address, final Object value) {
		final WebTarget remoteWebResource = locatorClient.target(address + uuid);
		try {
			final byte[] serializedResult = codecManager.getCompressedSerializationCodec().encode((Serializable) value);
			final String jsonResult = codecManager.getBase64Codec().encode(serializedResult);
			final Response response = remoteWebResource.request().post(Entity.text(jsonResult));
			checkResponseStatus(response);
		} catch (final Exception c) {
			LOG.warn("[{}] Erreur de connexion au serveur {} ({})", address, remoteWebResource.getUri(), c.getMessage());
		}
	}

	private static void checkResponseStatus(final Response response) {
		final StatusType status = response.getStatusInfo();
		if (status.getFamily() != Family.SUCCESSFUL) {
			throw new VSystemException("An error occured : {0} {1}\n{2}", status.getStatusCode(), status.getReasonPhrase(), response.readEntity(String.class));
		}
	}

	private static void checkInterrupted() throws InterruptedException {
		if (Thread.currentThread().isInterrupted()) {
			throw new InterruptedException("Thread interruption required");
		}
	}
}
