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
package io.vertigo.social;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import io.vertigo.social.account.webservices.AccountWebServicesTest;
import io.vertigo.social.comment.services.CommentManagerTest;
import io.vertigo.social.comment.webservices.CommentWebServicesTest;
import io.vertigo.social.notification.services.NotificationServicesTest;
import io.vertigo.social.notification.webservices.NotificationWebServicesTest;

/**
 * Test de l'implementation standard.
 *
 * @author npiedeloup
 */
@RunWith(Suite.class)
@SuiteClasses({
		//--account
		AccountWebServicesTest.class,
		//--comment
		CommentManagerTest.class,
		CommentWebServicesTest.class,
		//--notifications
		NotificationServicesTest.class,
		NotificationWebServicesTest.class })
public final class SocialTestSuite {
	//
}
