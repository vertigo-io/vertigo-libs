/**
 * vertigo - simple java starter
 *
 * Copyright (C) 2013-2018, KleeGroup, direction.technique@kleegroup.com (http://www.kleegroup.com)
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
package io.vertigo.struts2.ui.util;

/**
 * Message terminal (ex :JSP, PDF, report...).
 * Il a pour responsabilit� de traiter le message. 
 * 
 * La consommation des messages s'effectue par le onMessage.
 * 
 * Si une erreur intervient, c'est au consommateur de r�gler le probl�me.
 *
 * @author  npiedeloup
 * @version $Id: TerminalMessage.java,v 1.1 2013/07/18 17:36:33 npiedeloup Exp $
 */
public interface TerminalMessage {
	/**
	 * Traitement du message invoqu� automatiquement lors de la r�ception du message.
	 * @return Code de retour JSF
	 */
	String doMessage();
}
