/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2017, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
 * KleeGroup, Centre d'affaire la Boursidiere - BP 159 - 92357 Le Plessis Robinson Cedex - France
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
package io.vertigo.stella.work.distributed.rest;

import java.io.IOException;
import java.net.URI;

import javax.inject.Inject;
import javax.ws.rs.core.UriBuilder;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;

import io.vertigo.stella.master.MasterManager;
import io.vertigo.stella.work.AbstractWorkManagerTest;
import io.vertigo.stella.work.MyWorkResultHanlder;
import io.vertigo.stella.work.mock.SlowWork;
import io.vertigo.stella.work.mock.SlowWorkEngine;
import spark.Spark;

/**
 * @author npiedeloup
 */
public final class RestWorkManagerTest extends AbstractWorkManagerTest {
	private static final Logger LOG = Logger.getLogger(RestWorkManagerTest.class);
	@Inject
	private MasterManager masterManager;
	private ClientNode clientNode1;

	private static URI getBaseURI() {
		return UriBuilder.fromUri("http://127.0.0.1/").port(10998).build();
	}

	public static final URI BASE_URI = getBaseURI();

	protected static ClientNode startClientNode(final int numClient) throws IOException {
		LOG.info("Starting ClientNode " + numClient + "...");
		final ClientNode clientNode = new ClientNode(numClient, 30);//duree de vie 30s max
		clientNode.start();
		return clientNode;
	}

	/**
	 * Initialisation du test pour implé spécifique.
	 * @throws Exception Erreur
	 */
	@Override
	protected void doSetUp() throws Exception {
		//pour éviter le mécanisme d'attente du client lorsque le serveur est absend, on démarre le serveur puis le client
		Thread.sleep(1000);
		clientNode1 = startClientNode(1);
		LOG.info(String.format("Jersey app started with WADL available at " + "%sapplication.wadl", BASE_URI));
	}

	/**
	 * Finalisation du test pour implé spécifique.
	 * @throws Exception Erreur
	 */
	@Override
	protected void doTearDown() throws Exception {
		if (clientNode1 != null) {
			LOG.info("Stopping ClientNode...");
			clientNode1.stop();
			clientNode1 = null;
		}
		Spark.stop();
		Thread.sleep(5_000);

		LOG.info("All was stopped, quit now");
	}

	/**
	 * Teste l'exécution asynchrone d'une tache avec une durée de timeOut trop courte.
	 */
	@Test
	public void testDeadNode() throws InterruptedException, IOException {
		final MyWorkResultHanlder<Boolean> workResultHanlder = new MyWorkResultHanlder<>(1);
		final SlowWork slowWork = new SlowWork(1000);
		for (int i = 0; i < 20; i++) {
			masterManager.schedule(slowWork, SlowWorkEngine.class, workResultHanlder);
		}
		final boolean firstsFinished = workResultHanlder.waitFinish(5, 5 * 1000);
		Assert.assertTrue("First 5 works should finished before 5s, to test deadnode failover", firstsFinished);
		//On stop le client1 avec des jobs en cours. Ils doivent être redispatchés après détection des noeuds morts
		clientNode1.stop();
		LOG.info("Stop ClientNode 1 : " + workResultHanlder.toString());
		Thread.sleep(2000);
		LOG.info("Start ClientNode 2 : " + workResultHanlder.toString());
		final ClientNode clientNode2 = startClientNode(2);
		try {
			final boolean finished = workResultHanlder.waitFinish(20, 35 * 1000); //Le timeout des nodes est configuré à 20s
			LOG.info(workResultHanlder);
			Assert.assertEquals(null, workResultHanlder.getLastThrowable());
			Assert.assertTrue(finished);
		} finally {
			clientNode2.stop();
		}
	}

}
