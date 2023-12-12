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
		blackBoard.keys().deleteAll(BBKeyPattern.of("/*"));
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
		Assertions.assertFalse(blackBoard.keys().exists(sampleKey));
		blackBoard.integer().incr(sampleKey);
		Assertions.assertTrue(blackBoard.keys().exists(sampleKey));
	}

	@Test
	public void testKeys() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final var testKey = BBKey.of("/test");
		Assertions.assertEquals(0, blackBoard.keys().findAll(BBKeyPattern.of("/test")).size());
		Assertions.assertEquals(0, blackBoard.keys().findAll(BBKeyPattern.ofRoot(testKey)).size());
		Assertions.assertEquals(0, blackBoard.keys().findAll(BBKeyPattern.of("/*")).size());
		//---
		blackBoard.integer().incr(testKey);
		Assertions.assertEquals(1, blackBoard.keys().findAll(BBKeyPattern.of("/test")).size());
		Assertions.assertEquals(0, blackBoard.keys().findAll(BBKeyPattern.ofRoot(testKey)).size());
		Assertions.assertEquals(1, blackBoard.keys().findAll(BBKeyPattern.of("/*")).size());
		//---
		blackBoard.keys().deleteAll(BBKeyPattern.of("/*"));
		blackBoard.integer().incr(testKey);
		blackBoard.integer().incr(BBKey.of(testKey, "/1"));
		blackBoard.integer().incr(BBKey.of(testKey, "/2"));
		Assertions.assertEquals(1, blackBoard.keys().findAll(BBKeyPattern.of("/test")).size());
		Assertions.assertEquals(2, blackBoard.keys().findAll(BBKeyPattern.ofRoot(testKey)).size());
		Assertions.assertEquals(3, blackBoard.keys().findAll(BBKeyPattern.of("/*")).size());
		//--check the key pattern
		blackBoard.keys().deleteAll(BBKeyPattern.of("/*"));
		Assertions.assertEquals("/samplekey", BBKeyPattern.of("/samplekey").keyPattern());
		Assertions.assertThrows(Exception.class,
				() -> blackBoard.keys().findAll(BBKeyPattern.of(" sample")));
		Assertions.assertThrows(Exception.class,
				() -> blackBoard.keys().findAll(BBKeyPattern.of("sample**")));
		Assertions.assertThrows(Exception.class,
				() -> blackBoard.keys().findAll(BBKeyPattern.of("sample key")));
		Assertions.assertThrows(Exception.class,
				() -> blackBoard.keys().findAll(BBKeyPattern.of("samplekey/*/test")).isEmpty());
		//--- keys and keys("/*")
		blackBoard.keys().deleteAll(BBKeyPattern.of("/*"));
		blackBoard.integer().incr(testKey);
		blackBoard.integer().incr(BBKey.of(testKey, "/1"));
		blackBoard.integer().incr(BBKey.of(testKey, "/3"));
		blackBoard.integer().incr(BBKey.of(testKey, "/4"));
		Assertions.assertEquals(4, blackBoard.keys().findAll(BBKeyPattern.of("/*")).size());
		Assertions.assertEquals(4, blackBoard.keys().findAll(BBKeyPattern.of("/*")).size());
	}

	@Test
	public void testGetPut() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey sampleKey = BBKey.of("/sample/key");
		Assertions.assertEquals(null, blackBoard.string().get(sampleKey));
		blackBoard.string().put(sampleKey, "test");
		Assertions.assertEquals("test", blackBoard.string().get(sampleKey));
		blackBoard.string().put(sampleKey, "test2");
		Assertions.assertEquals("test2", blackBoard.string().get(sampleKey));
	}

	@Test
	public void testFormat() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		Assertions.assertEquals("", blackBoard.format(""));
		Assertions.assertEquals("hello", blackBoard.format("hello"));
		blackBoard.string().put(BBKey.of("/sample/key"), "test");
		Assertions.assertEquals("hello test", blackBoard.format("hello {{/sample/key}}"));
	}

	@Test
	public void testEvalKeyTemplate() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		blackBoard.string().put(BBKey.of("/sample/key"), "test");
		Assertions.assertEquals("/u/test", blackBoard.format("/u/{{/sample/key}}"));
	}

	@Test
	public void testInc() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey key = BBKey.of("/key");
		Assertions.assertEquals(null, blackBoard.integer().get(key));
		blackBoard.integer().incr(key);
		Assertions.assertEquals(1, blackBoard.integer().get(key));
		blackBoard.integer().incr(key);
		Assertions.assertEquals(2, blackBoard.integer().get(key));
		blackBoard.integer().incrBy(key, 10);
		Assertions.assertEquals(12, blackBoard.integer().get(key));
	}

	@Test
	public void testDec() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey key = BBKey.of("/key");
		Assertions.assertEquals(null, blackBoard.integer().get(key));
		blackBoard.integer().incrBy(key, 10);
		Assertions.assertEquals(10, blackBoard.integer().get(key));
		blackBoard.integer().decr(key);
		Assertions.assertEquals(9, blackBoard.integer().get(key));
		blackBoard.integer().decr(key);
		Assertions.assertEquals(8, blackBoard.integer().get(key));
		blackBoard.integer().incrBy(key, -5);
		Assertions.assertEquals(3, blackBoard.integer().get(key));

	}

	@Test
	public void testRemove() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey sampleKey = BBKey.of("/sample");
		Assertions.assertEquals(0, blackBoard.keys().findAll(BBKeyPattern.of("/*")).size());
		blackBoard.integer().incr(BBKey.of(sampleKey, "/1"));
		blackBoard.integer().incr(BBKey.of(sampleKey, "/2"));
		blackBoard.integer().incr(BBKey.of(sampleKey, "/3"));
		blackBoard.integer().incr(BBKey.of(sampleKey, "/4"));
		Assertions.assertEquals(4, blackBoard.keys().findAll(BBKeyPattern.of("/*")).size());
		blackBoard.keys().deleteAll(BBKeyPattern.of("/sample/1"));
		Assertions.assertEquals(3, blackBoard.keys().findAll(BBKeyPattern.of("/*")).size());
		blackBoard.keys().deleteAll(BBKeyPattern.of("/*"));
		Assertions.assertEquals(0, blackBoard.keys().findAll(BBKeyPattern.of("/*")).size());
		blackBoard.integer().incr(BBKey.of("/sample/1"));
		blackBoard.integer().incr(BBKey.of("/sample/2"));
		blackBoard.integer().incr(BBKey.of("/sample/3"));
		blackBoard.integer().incr(BBKey.of("/sample/4"));
		blackBoard.keys().deleteAll(BBKeyPattern.of("/*"));
		Assertions.assertEquals(0, blackBoard.keys().findAll(BBKeyPattern.of("/*")).size());
	}

	@Test
	public void testInteger() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey sampleKey = BBKey.of("/sample");
		Assertions.assertEquals(null, blackBoard.integer().get(sampleKey));
		blackBoard.integer().incr(sampleKey);
		Assertions.assertEquals(1, blackBoard.integer().get(sampleKey));
		blackBoard.integer().incr(sampleKey);
		Assertions.assertEquals(2, blackBoard.integer().get(sampleKey));
		blackBoard.integer().put(sampleKey, 56);
		Assertions.assertEquals(56, blackBoard.integer().get(sampleKey));
		Assertions.assertEquals(false, blackBoard.integer().lt(sampleKey, 50));
		Assertions.assertEquals(true, blackBoard.integer().gt(sampleKey, 50));
		Assertions.assertEquals(false, blackBoard.integer().eq(sampleKey, 50));
		Assertions.assertEquals(true, blackBoard.integer().eq(sampleKey, 56));
		blackBoard.integer().put(sampleKey, -55);
		Assertions.assertEquals(-55, blackBoard.integer().get(sampleKey));
		blackBoard.integer().incrBy(sampleKey, 100);
		Assertions.assertEquals(45, blackBoard.integer().get(sampleKey));
	}

	@Test
	public void testBoolean() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey sampleKey = BBKey.of("/sample");
		Assertions.assertEquals(null, blackBoard.bool().get(sampleKey));
		blackBoard.bool().put(sampleKey, true);
		Assertions.assertTrue(blackBoard.bool().get(sampleKey));
		blackBoard.bool().put(sampleKey, false);
		Assertions.assertTrue(blackBoard.bool().eq(sampleKey, false));
		blackBoard.bool().put(sampleKey, true);
		Assertions.assertTrue(blackBoard.bool().eq(sampleKey, true));
	}

	@Test
	public void testString() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey sampleKey = BBKey.of("/sample");
		Assertions.assertEquals(null, blackBoard.string().get(sampleKey));
		blackBoard.string().put(sampleKey, "test");
		Assertions.assertEquals("test", blackBoard.string().get(sampleKey));
		blackBoard.keys().deleteAll(BBKeyPattern.of("/*"));
		blackBoard.string().append(sampleKey, "hello");
		blackBoard.string().append(sampleKey, " ");
		blackBoard.string().append(sampleKey, "world");
		Assertions.assertEquals("hello world", blackBoard.string().get(sampleKey));
	}

	@Test
	public void testList() {
		final BlackBoard blackBoard = blackBoardManager.connect(BBKey.of("/test"));
		//---
		final BBKey sampleKey = BBKey.of("/sample");
		Assertions.assertEquals(0, blackBoard.list().size(sampleKey));
		blackBoard.list().push(sampleKey, "a");
		blackBoard.list().push(sampleKey, "b");
		blackBoard.list().push(sampleKey, "c");
		Assertions.assertEquals(3, blackBoard.list().size(sampleKey));
		Assertions.assertEquals("c", blackBoard.list().pop(sampleKey));
		Assertions.assertEquals(2, blackBoard.list().size(sampleKey));
		Assertions.assertEquals("b", blackBoard.list().peek(sampleKey));
		Assertions.assertEquals(2, blackBoard.list().size(sampleKey));
		blackBoard.list().push(sampleKey, "c");
		Assertions.assertEquals(3, blackBoard.list().size(sampleKey));
		Assertions.assertEquals("a", blackBoard.list().get(sampleKey, 0));
		Assertions.assertEquals("b", blackBoard.list().get(sampleKey, 1));
		Assertions.assertEquals("c", blackBoard.list().get(sampleKey, 2));
		Assertions.assertEquals("c", blackBoard.list().get(sampleKey, -1));
		Assertions.assertEquals("b", blackBoard.list().get(sampleKey, -2));
		Assertions.assertEquals("a", blackBoard.list().get(sampleKey, -3));
		blackBoard.list().pop(sampleKey);
		blackBoard.list().pop(sampleKey);
		blackBoard.list().pop(sampleKey);
		blackBoard.list().pop(sampleKey);
		Assertions.assertEquals(0, blackBoard.list().size(sampleKey));
	}

}
