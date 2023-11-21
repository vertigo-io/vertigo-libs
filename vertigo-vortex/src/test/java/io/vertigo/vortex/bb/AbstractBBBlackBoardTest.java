/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2023, Vertigo.io, team@vertigo.io
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
package io.vertigo.vortex.bb;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.NodeConfig;

public abstract class AbstractBBBlackBoardTest {
	@Inject
	private BlackBoardManager blackBoardManager;

	private AutoCloseableNode node;

	@BeforeEach
	public final void setUp() throws Exception {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
		//---
		clean();
	}

	protected abstract NodeConfig buildNodeConfig();

	@AfterEach
	public final void tearDown() throws Exception {
		clean();
		if (node != null) {
			node.close();
		}
	}

	private void clean() {
		final var blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		blackBoard.delete(BBKeyPattern.of("/*"));
	}

	@Test
	public void testKeyRegex() {
		//--only some characters are accepted ; blanks are not permitted
		Assertions.assertThrows(Exception.class, () -> BBKey.of("sample key"));
		Assertions.assertThrows(Exception.class, () -> BBKey.of("samplekey"));
		Assertions.assertEquals("/sample", BBKey.of("/sample").key());
	}

	@Test
	public void testKeyOperations() {

		final var rootKey = BBKey.of("/root");
		final var subKey = rootKey.add(BBKey.of("/sub"));

		Assertions.assertEquals(rootKey, rootKey.head());
		Assertions.assertEquals(rootKey, subKey.head());
		Assertions.assertEquals("/sub", subKey.tail().key());
		Assertions.assertEquals("/root", rootKey.tail().key());
	}

	@Test
	public void testExists() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		final BBKey sampleKey = BBKey.of("/samplekey");
		//---
		Assertions.assertFalse(blackBoard.exists(sampleKey));
		blackBoard.incr(sampleKey);
		Assertions.assertTrue(blackBoard.exists(sampleKey));
	}

	@Test
	public void testKeys() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final var testKey = BBKey.of("/test");
		Assertions.assertEquals(0, blackBoard.keys(BBKeyPattern.of("/test")).size());
		Assertions.assertEquals(0, blackBoard.keys(BBKeyPattern.ofRoot(testKey)).size());
		Assertions.assertEquals(0, blackBoard.keys(BBKeyPattern.of("/*")).size());
		//---
		blackBoard.incr(testKey);
		Assertions.assertEquals(1, blackBoard.keys(BBKeyPattern.of("/test")).size());
		Assertions.assertEquals(0, blackBoard.keys(BBKeyPattern.ofRoot(testKey)).size());
		Assertions.assertEquals(1, blackBoard.keys(BBKeyPattern.of("/*")).size());
		//---
		blackBoard.delete(BBKeyPattern.of("/*"));
		blackBoard.incr(testKey);
		blackBoard.incr(BBKey.of(testKey, "/1"));
		blackBoard.incr(BBKey.of(testKey, "/2"));
		Assertions.assertEquals(1, blackBoard.keys(BBKeyPattern.of("/test")).size());
		Assertions.assertEquals(2, blackBoard.keys(BBKeyPattern.ofRoot(testKey)).size());
		Assertions.assertEquals(3, blackBoard.keys(BBKeyPattern.of("/*")).size());
		//--check the key pattern
		blackBoard.delete(BBKeyPattern.of("/*"));
		Assertions.assertEquals("/samplekey", BBKeyPattern.of("/samplekey").keyPattern());
		Assertions.assertThrows(Exception.class,
				() -> blackBoard.keys(BBKeyPattern.of(" sample")));
		Assertions.assertThrows(Exception.class,
				() -> blackBoard.keys(BBKeyPattern.of("sample**")));
		Assertions.assertThrows(Exception.class,
				() -> blackBoard.keys(BBKeyPattern.of("sample key")));
		Assertions.assertThrows(Exception.class,
				() -> blackBoard.keys(BBKeyPattern.of("samplekey/*/test")).isEmpty());
		//--- keys and keys("/*")
		blackBoard.delete(BBKeyPattern.of("/*"));
		blackBoard.incr(testKey);
		blackBoard.incr(BBKey.of(testKey, "/1"));
		blackBoard.incr(BBKey.of(testKey, "/3"));
		blackBoard.incr(BBKey.of(testKey, "/4"));
		Assertions.assertEquals(4, blackBoard.keys(BBKeyPattern.of("/*")).size());
		Assertions.assertEquals(4, blackBoard.keys(BBKeyPattern.of("/*")).size());
	}

	@Test
	public void testGetPut() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey sampleKey = BBKey.of("/sample/key");
		Assertions.assertEquals(null, blackBoard.getString(sampleKey));
		blackBoard.putString(sampleKey, "test");
		Assertions.assertEquals("test", blackBoard.getString(sampleKey));
		blackBoard.putString(sampleKey, "test2");
		Assertions.assertEquals("test2", blackBoard.getString(sampleKey));
	}

	@Test
	public void testFormat() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		Assertions.assertEquals("", blackBoard.format(""));
		Assertions.assertEquals("hello", blackBoard.format("hello"));
		blackBoard.putString(BBKey.of("/sample/key"), "test");
		Assertions.assertEquals("hello test", blackBoard.format("hello {{/sample/key}}"));
	}

	@Test
	public void testEvalKeyTemplate() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		blackBoard.putString(BBKey.of("/sample/key"), "test");
		Assertions.assertEquals("/u/test", blackBoard.format("/u/{{/sample/key}}"));
	}

	@Test
	public void testInc() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey key = BBKey.of("/key");
		Assertions.assertEquals(null, blackBoard.getInteger(key));
		blackBoard.incr(key);
		Assertions.assertEquals(1, blackBoard.getInteger(key));
		blackBoard.incr(key);
		Assertions.assertEquals(2, blackBoard.getInteger(key));
		blackBoard.incrBy(key, 10);
		Assertions.assertEquals(12, blackBoard.getInteger(key));
	}

	@Test
	public void testDec() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey key = BBKey.of("/key");
		Assertions.assertEquals(null, blackBoard.getInteger(key));
		blackBoard.incrBy(key, 10);
		Assertions.assertEquals(10, blackBoard.getInteger(key));
		blackBoard.decr(key);
		Assertions.assertEquals(9, blackBoard.getInteger(key));
		blackBoard.decr(key);
		Assertions.assertEquals(8, blackBoard.getInteger(key));
		blackBoard.incrBy(key, -5);
		Assertions.assertEquals(3, blackBoard.getInteger(key));

	}

	@Test
	public void testRemove() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey sampleKey = BBKey.of("/sample");
		Assertions.assertEquals(0, blackBoard.keys(BBKeyPattern.of("/*")).size());
		blackBoard.incr(BBKey.of(sampleKey, "/1"));
		blackBoard.incr(BBKey.of(sampleKey, "/2"));
		blackBoard.incr(BBKey.of(sampleKey, "/3"));
		blackBoard.incr(BBKey.of(sampleKey, "/4"));
		Assertions.assertEquals(4, blackBoard.keys(BBKeyPattern.of("/*")).size());
		blackBoard.delete(BBKeyPattern.of("/sample/1"));
		Assertions.assertEquals(3, blackBoard.keys(BBKeyPattern.of("/*")).size());
		blackBoard.delete(BBKeyPattern.of("/*"));
		Assertions.assertEquals(0, blackBoard.keys(BBKeyPattern.of("/*")).size());
		blackBoard.incr(BBKey.of("/sample/1"));
		blackBoard.incr(BBKey.of("/sample/2"));
		blackBoard.incr(BBKey.of("/sample/3"));
		blackBoard.incr(BBKey.of("/sample/4"));
		blackBoard.delete(BBKeyPattern.of("/*"));
		Assertions.assertEquals(0, blackBoard.keys(BBKeyPattern.of("/*")).size());
	}

	@Test
	public void testInteger() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey sampleKey = BBKey.of("/sample");
		Assertions.assertEquals(null, blackBoard.getInteger(sampleKey));
		blackBoard.incr(sampleKey);
		Assertions.assertEquals(1, blackBoard.getInteger(sampleKey));
		blackBoard.incr(sampleKey);
		Assertions.assertEquals(2, blackBoard.getInteger(sampleKey));
		blackBoard.putInteger(sampleKey, 56);
		Assertions.assertEquals(56, blackBoard.getInteger(sampleKey));
		Assertions.assertEquals(false, blackBoard.lt(sampleKey, 50));
		Assertions.assertEquals(true, blackBoard.gt(sampleKey, 50));
		Assertions.assertEquals(false, blackBoard.eq(sampleKey, 50));
		Assertions.assertEquals(true, blackBoard.eq(sampleKey, 56));
		blackBoard.putInteger(sampleKey, -55);
		Assertions.assertEquals(-55, blackBoard.getInteger(sampleKey));
		blackBoard.incrBy(sampleKey, 100);
		Assertions.assertEquals(45, blackBoard.getInteger(sampleKey));
	}

	@Test
	public void testBoolean() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey sampleKey = BBKey.of("/sample");
		Assertions.assertEquals(null, blackBoard.getBoolean(sampleKey));
		blackBoard.putBoolean(sampleKey, true);
		Assertions.assertTrue(blackBoard.getBoolean(sampleKey));
		blackBoard.putBoolean(sampleKey, false);
		Assertions.assertTrue(blackBoard.eq(sampleKey, false));
		blackBoard.putBoolean(sampleKey, true);
		Assertions.assertTrue(blackBoard.eq(sampleKey, true));
	}

	@Test
	public void testString() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey sampleKey = BBKey.of("/sample");
		Assertions.assertEquals(null, blackBoard.getString(sampleKey));
		blackBoard.putString(sampleKey, "test");
		Assertions.assertEquals("test", blackBoard.getString(sampleKey));
		blackBoard.delete(BBKeyPattern.of("/*"));
		blackBoard.append(sampleKey, "hello");
		blackBoard.append(sampleKey, " ");
		blackBoard.append(sampleKey, "world");
		Assertions.assertEquals("hello world", blackBoard.getString(sampleKey));
	}

	@Test
	public void testList() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey sampleKey = BBKey.of("/sample");
		Assertions.assertEquals(0, blackBoard.listSize(sampleKey));
		blackBoard.listPush(sampleKey, "a");
		blackBoard.listPush(sampleKey, "b");
		blackBoard.listPush(sampleKey, "c");
		Assertions.assertEquals(3, blackBoard.listSize(sampleKey));
		Assertions.assertEquals("c", blackBoard.listPop(sampleKey));
		Assertions.assertEquals(2, blackBoard.listSize(sampleKey));
		Assertions.assertEquals("b", blackBoard.listPeek(sampleKey));
		Assertions.assertEquals(2, blackBoard.listSize(sampleKey));
		blackBoard.listPush(sampleKey, "c");
		Assertions.assertEquals(3, blackBoard.listSize(sampleKey));
		Assertions.assertEquals("a", blackBoard.listGet(sampleKey, 0));
		Assertions.assertEquals("b", blackBoard.listGet(sampleKey, 1));
		Assertions.assertEquals("c", blackBoard.listGet(sampleKey, 2));
		Assertions.assertEquals("c", blackBoard.listGet(sampleKey, -1));
		Assertions.assertEquals("b", blackBoard.listGet(sampleKey, -2));
		Assertions.assertEquals("a", blackBoard.listGet(sampleKey, -3));
		blackBoard.listPop(sampleKey);
		blackBoard.listPop(sampleKey);
		blackBoard.listPop(sampleKey);
		blackBoard.listPop(sampleKey);
		Assertions.assertEquals(0, blackBoard.listSize(sampleKey));
	}

}
