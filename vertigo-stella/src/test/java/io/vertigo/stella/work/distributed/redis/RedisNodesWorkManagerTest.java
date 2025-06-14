/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2025, Vertigo.io, team@vertigo.io
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
package io.vertigo.stella.work.distributed.redis;

import java.io.IOException;

import javax.inject.Inject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.stella.master.MasterManager;
import io.vertigo.stella.work.AbstractWorkManagerTest;
import io.vertigo.stella.work.MyWorkResultHanlder;
import io.vertigo.stella.work.distributed.ClientNode;
import io.vertigo.stella.work.mock.SlowWork;
import io.vertigo.stella.work.mock.SlowWorkEngine;

/**
 * @author npiedeloup
 */
public final class RedisNodesWorkManagerTest extends AbstractWorkManagerTest {
	private static final Logger LOG = LogManager.getLogger(RedisNodesWorkManagerTest.class);
	@Inject
	private MasterManager masterManager;
	private ClientNode clientNode1;

	protected static ClientNode startClientNode(final int numClient) throws IOException {
		LOG.info("Starting ClientNode " + numClient + "...");
		final ClientNode clientNode = new ClientNode("io.vertigo.stella.work.distributed.redis.StellaNodeConfigClientNode" + numClient, 45);//duree de vie 45s max
		clientNode.start();
		return clientNode;
	}

	@Override
	protected NodeConfig buildNodeConfig() {
		return MyNodeConfig.config(true, false, "node#master");
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
		final boolean firstsFinished = workResultHanlder.waitFinish(5, 6 * 1000);
		Assertions.assertTrue(firstsFinished, "First 5 works should finished before 6s, to test deadnode failover (" + workResultHanlder.toString() + ")");
		//On stop le client1 avec des jobs en cours. Ils doivent être redispatchés après détection des noeuds morts
		clientNode1.stop();
		LOG.info("Stop ClientNode 1 : " + workResultHanlder.toString());
		Thread.sleep(2000);
		LOG.info("Start ClientNode 2 : " + workResultHanlder.toString());
		final ClientNode clientNode2 = startClientNode(2);
		try {
			final boolean finished = workResultHanlder.waitFinish(20, 65 * 1000); //Le timeout des nodes est configuré à 20s
			LOG.info(workResultHanlder);
			Assertions.assertEquals(null, workResultHanlder.getLastThrowable());
			Assertions.assertTrue(finished);
		} finally {
			clientNode2.stop();
		}
	}

}
