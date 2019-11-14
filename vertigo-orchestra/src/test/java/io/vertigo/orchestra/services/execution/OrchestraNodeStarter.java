/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2019, vertigo-io, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.orchestra.services.execution;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.node.AutoCloseableApp;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.core.util.ClassUtil;
import io.vertigo.orchestra.services.execution.engine.TestJob2;

/**
 * @author npiedeloup
 */
public class OrchestraNodeStarter {
	private static final Logger LOG = LogManager.getLogger(OrchestraNodeStarter.class);

	/**
	 * Lance l'environnement et attend la durée en paramètre.
	 * @param args "Usage: java vertigo.kernel.Starter managers.xml <maxLifeTime>"
	 * @throws Exception exception
	 */
	public static void main(final String[] args) throws Exception {
		//
		Assertion.checkArgument(args.length >= 1 && args.length <= 2, "Usage WorkerNodeStarter <NodeConfigClass> <maxLifeTime>");
		//-----
		final long timeToWait = args.length == 2 ? Long.parseLong(args[1]) * 1000L : 5 * 60 * 1000L;
		final Class<?> nodeConfigClass = ClassUtil.classForName(args[0]);

		final NodeConfig nodeConfig = (NodeConfig) nodeConfigClass.getMethod("config").invoke(nodeConfigClass);

		LOG.info("Node starting");
		run(nodeConfig, timeToWait);
		LOG.info("Node stop");
	}

	private static void run(final NodeConfig nodeConfig, final long timeToWait) {
		try (AutoCloseableApp app = new AutoCloseableApp(nodeConfig)) {
			System.out.println("Node started (timout in " + timeToWait / 1000 + "s)");
			if (timeToWait > 0) {
				final long startTime = System.currentTimeMillis();
				while (!Thread.currentThread().isInterrupted()
						&& System.currentTimeMillis() - startTime < timeToWait) {
					LOG.info("node TestJob2.count : " + TestJob2.getCount());
					Thread.sleep(1000);
				}
			} else {
				//infinite
				while (!Thread.currentThread().isInterrupted()) {
					LOG.info("node TestJob2.count : " + TestJob2.getCount());
					Thread.sleep(1000);
				}
			}
			System.out.println("Node stopping by timeout");
		} catch (final InterruptedException e) {
			//rien arret normal
			System.out.println("Node stopping by interrupted");
		} catch (final Exception e) {
			System.err.println("Application error, exit " + e.getMessage());
			e.printStackTrace(System.err);
		}
	}

}
