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
package io.vertigo.ui.data.controllers;

import java.util.Collections;
import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import io.vertigo.account.security.UserSession;
import io.vertigo.core.lang.VUserException;
import io.vertigo.datastore.filestore.model.FileInfo;
import io.vertigo.datastore.filestore.model.FileInfoURI;
import io.vertigo.datastore.filestore.model.VFile;
import io.vertigo.ui.core.UiFileInfo;
import io.vertigo.ui.core.UiFileInfoList;
import io.vertigo.ui.data.services.support.SupportServices;
import io.vertigo.ui.impl.springmvc.util.UiRequestUtil;
import io.vertigo.vega.webservice.stereotype.QueryParam;
import io.vertigo.vega.webservice.validation.UiMessageStack;
import io.vertigo.vega.webservice.validation.UiMessageStack.Level;
import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/commons/")
public class FileUploadController {
	private static final String FILE_INFOS_SESSION_KEY = "uiFileInfos";
	private static final String FILE_INFOS_LAST_ACCESS_SESSION_KEY = "uiFileInfosLastAccess";
	private static final long PURGE_DELAY_SECOND = 300; //5 min after last acces we flush session

	@Inject
	private SupportServices supportServices;

	public static void publishFileInfo(final FileInfo fileInfo, final UserSession session) {
		final UiFileInfoList<FileInfo> uiFileInfoList = obtainUiFileInfoListSession(session);
		uiFileInfoList.add(fileInfo);
	}

	@GetMapping("/upload")
	public UiFileInfo loadUiFileInfo(@QueryParam("file") final FileInfoURI fileInfoUri, final UserSession session) {
		final UiFileInfoList<FileInfo> uiFileInfoList = obtainUiFileInfoListSession(session);
		UiFileInfo uiFileInfo = uiFileInfoList.get(fileInfoUri);
		if (uiFileInfo == null) {
			uiFileInfo = new UiFileInfo<>(supportServices.getFile(fileInfoUri));
			uiFileInfoList.add(uiFileInfo);
		}
		return uiFileInfo;
	}

	@GetMapping("/upload/fileInfos")
	public List<UiFileInfo> loadUiFileInfos(@QueryParam("file") final List<FileInfoURI> fileInfoUris, final UserSession session) {
		final UiFileInfoList<FileInfo> uiFileInfoList = obtainUiFileInfoListSession(session);
		return fileInfoUris
				.stream()
				.map(fileInfoUri -> {
					UiFileInfo uiFileInfo = uiFileInfoList.get(fileInfoUri);
					if (uiFileInfo == null) {
						uiFileInfo = new UiFileInfo<>(supportServices.getFile(fileInfoUri));
						uiFileInfoList.add(uiFileInfo);
					}
					return uiFileInfo;
				})
				.toList();
	}

	@PostMapping("/upload")
	public FileInfoURI uploadFile(@QueryParam("file") final VFile vFile, final UiMessageStack uiMessageStack, final UserSession session) {
		if (vFile.getFileName().toLowerCase().contains("virus")) {
			throw new VUserException("Il y a un virus dans votre PJ " + vFile.getFileName());
		}
		final FileInfo storeFile = supportServices.saveFile(vFile);
		obtainUiFileInfoListSession(session).add(storeFile);
		return storeFile.getURI();
	}

	@DeleteMapping("/upload")
	public FileInfoURI removeFile(@QueryParam("file") final FileInfoURI fileInfoUri) {
		//supportServices.removeFile(fileInfoUri);
		//Don't remove file now : it may be needed it user go back before saving
		//obtainUiFileInfoListSession().remove(fileInfoUri);
		return fileInfoUri; //if no return, you must get the response. Prefer to return old uri.
	}

	@GetMapping("/upload/download/{fileUri}")
	public VFile loadFile(@PathVariable("fileUri") final FileInfoURI fileInfoUri) {
		return supportServices.getFile(fileInfoUri).getVFile();
	}

	private static UiFileInfoList<FileInfo> obtainUiFileInfoListSession(final UserSession session) {
		synchronized (session) {
			UiFileInfoList<FileInfo> uiFileInfoList = session.getAttribute(FILE_INFOS_SESSION_KEY);
			final Long lastAccess = session.getAttribute(FILE_INFOS_LAST_ACCESS_SESSION_KEY);
			final boolean triggerPurge = lastAccess != null && lastAccess < System.currentTimeMillis() - PURGE_DELAY_SECOND * 1000L;
			if (uiFileInfoList == null || triggerPurge) {
				uiFileInfoList = new UiFileInfoList<>(Collections.emptyList());
				session.putAttribute(FILE_INFOS_SESSION_KEY, uiFileInfoList);
			}
			session.putAttribute(FILE_INFOS_LAST_ACCESS_SESSION_KEY, System.currentTimeMillis());
			return uiFileInfoList;
		}
	}

	@ResponseBody
	@ExceptionHandler(VUserException.class)
	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	public static Object handleVUserException(final VUserException ex, final HttpServletRequest request) {
		final UiMessageStack uiMessageStack = UiRequestUtil.obtainCurrentUiMessageStack();
		uiMessageStack.addGlobalMessage(Level.ERROR, ex.getMessage());
		//---
		return uiMessageStack;
	}
}
