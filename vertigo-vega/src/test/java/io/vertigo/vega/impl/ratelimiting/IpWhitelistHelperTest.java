package io.vertigo.vega.impl.ratelimiting;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;

import io.vertigo.core.lang.WrappedException;

public class IpWhitelistHelperTest {

	private static final int DEFAULT_MAX_WHITELIST_SIZE = 1000;

	@Test
	void testaddWhitelistWithSingleIP() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.1");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(1, helper.estimateIpCount());
		assertTrue(helper.isIpInWhitelist("192.168.0.1"));
	}

	@Test
	void testaddWhitelistWithIPRange() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.1-192.168.0.5");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(5, helper.estimateIpCount());
		assertTrue(helper.isIpInWhitelist("192.168.0.1"));
		assertTrue(helper.isIpInWhitelist("192.168.0.2"));
		assertTrue(helper.isIpInWhitelist("192.168.0.3"));
		assertTrue(helper.isIpInWhitelist("192.168.0.4"));
		assertTrue(helper.isIpInWhitelist("192.168.0.5"));
	}

	@Test
	void testaddWhitelistWithShorthandIPRange() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.1-5");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(5, helper.estimateIpCount());
		assertTrue(helper.isIpInWhitelist("192.168.0.1"));
		assertTrue(helper.isIpInWhitelist("192.168.0.2"));
		assertTrue(helper.isIpInWhitelist("192.168.0.3"));
		assertTrue(helper.isIpInWhitelist("192.168.0.4"));
		assertTrue(helper.isIpInWhitelist("192.168.0.5"));
	}

	@Test
	void testaddWhitelistWithCIDR() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.0/30");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(2, helper.estimateIpCount());
		assertTrue(helper.isIpInWhitelist("192.168.0.1"));
		assertTrue(helper.isIpInWhitelist("192.168.0.2"));
	}

	@Test
	void testaddWhitelistWithCIDR_32() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.1/32");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(1, helper.estimateIpCount());
		assertTrue(helper.isIpInWhitelist("192.168.0.1"));
	}

	@Test
	void testaddWhitelistWithCIDR_31() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.0/32");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(1, helper.estimateIpCount());
		assertTrue(helper.isIpInWhitelist("192.168.0.0"));
	}

	@Test
	void testaddWhitelistWithCIDR_29() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.0/29");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(6, helper.estimateIpCount());
		assertTrue(helper.isIpInWhitelist("192.168.0.1"));
		assertTrue(helper.isIpInWhitelist("192.168.0.2"));
		assertTrue(helper.isIpInWhitelist("192.168.0.3"));
		assertTrue(helper.isIpInWhitelist("192.168.0.4"));
		assertTrue(helper.isIpInWhitelist("192.168.0.5"));
		assertTrue(helper.isIpInWhitelist("192.168.0.6"));
	}

	@Test
	void testaddWhitelistWithMultipleSubnets() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.1");
		subnets.add("10.0.0.1-10.0.0.3");
		subnets.add("10.0.1.1-3");
		subnets.add("172.16.0.0/31");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(9, helper.estimateIpCount());
		assertTrue(helper.isIpInWhitelist("192.168.0.1"));
		assertTrue(helper.isIpInWhitelist("10.0.0.1"));
		assertTrue(helper.isIpInWhitelist("10.0.0.2"));
		assertTrue(helper.isIpInWhitelist("10.0.0.3"));
		assertTrue(helper.isIpInWhitelist("10.0.1.1"));
		assertTrue(helper.isIpInWhitelist("10.0.1.2"));
		assertTrue(helper.isIpInWhitelist("10.0.1.3"));
		assertTrue(helper.isIpInWhitelist("172.16.0.0"));
		assertFalse(helper.isIpInWhitelist("172.16.0.1"));
	}

	@Test
	void testInvalidIP() {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("invalid.ip.address");

		// When / Then
		final IpWhitelistHelper helper = new IpWhitelistHelper(Set.of(), DEFAULT_MAX_WHITELIST_SIZE);
		assertThrows(WrappedException.class, () -> helper.addWhitelist(subnets));
	}

	@Test
	void testsingleIPv6() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("[2001:0db8:85a3:0000:0000:8a2e:0370:7334]");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(1, helper.estimateIpCount());
		assertTrue(helper.isIpInWhitelist("2001:0db8:85a3:0000:0000:8a2e:0370:7334"));
		assertTrue(helper.isIpInWhitelist("[2001:0db8:85a3:0000:0000:8a2e:0370:7334]"));
	}

	@Test
	void testIPv6Range() {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("[2001:0db8:85a3:0000:0000:8a2e:0370:7334-7337]");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(4, helper.estimateIpCount());
		assertTrue(helper.isIpInWhitelist("2001:0db8:85a3:0000:0000:8a2e:0370:7334"));
		assertTrue(helper.isIpInWhitelist("2001:0db8:85a3:0000:0000:8a2e:0370:7335"));
		assertTrue(helper.isIpInWhitelist("2001:0db8:85a3:0000:0000:8a2e:0370:7336"));
		assertTrue(helper.isIpInWhitelist("2001:0db8:85a3:0000:0000:8a2e:0370:7337"));
	}

	@Test
	void testIPv6CIDRNotSupported() {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("[2001:0db8:85a3:0000:0000:8a2e:0370:7334/64]");

		// When / Then
		final IpWhitelistHelper helper = new IpWhitelistHelper(Set.of(), DEFAULT_MAX_WHITELIST_SIZE);
		assertThrows(IllegalStateException.class, () -> helper.addWhitelist(subnets));
	}

	@Test
	void testInvalidCIDR() {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.1/33");

		// When / Then
		final IpWhitelistHelper helper = new IpWhitelistHelper(Set.of(), DEFAULT_MAX_WHITELIST_SIZE);
		assertThrows(IllegalStateException.class, () -> helper.addWhitelist(subnets));
	}

	@Test
	void testInvalidIPRange() {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.5-192.168.0.1"); // End IP less than start IP

		// When / Then
		final IpWhitelistHelper helper = new IpWhitelistHelper(Set.of(), DEFAULT_MAX_WHITELIST_SIZE);
		assertThrows(IllegalStateException.class, () -> helper.addWhitelist(subnets));
	}

	@Test
	void testInvalidIPRangeFormat() {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.1-192.169.0.5"); // Different prefix

		// When / Then
		final IpWhitelistHelper helper = new IpWhitelistHelper(Set.of(), DEFAULT_MAX_WHITELIST_SIZE);
		assertThrows(IllegalArgumentException.class, () -> helper.addWhitelist(subnets));
	}

	@Test
	void testMaxWhitelistSizeExceeded() {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.0/24"); // 254 IPs

		// When / Then
		final IpWhitelistHelper helper = new IpWhitelistHelper(Set.of(), 100); // Max size 100
		assertThrows(IllegalStateException.class, () -> helper.addWhitelist(subnets));
	}

	@Test
	void testValidInput_SingleIP() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.1");

		// When / Then
		final IpWhitelistHelper helper = new IpWhitelistHelper(Set.of(), DEFAULT_MAX_WHITELIST_SIZE);
		assertDoesNotThrow(() -> helper.addWhitelist(subnets));
	}

	@Test
	void testValidInput_IPWithCIDR() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("10.0.0.1/32");

		// When / Then
		final IpWhitelistHelper helper = new IpWhitelistHelper(Set.of(), DEFAULT_MAX_WHITELIST_SIZE);
		assertDoesNotThrow(() -> helper.addWhitelist(subnets));
	}

	@Test
	void testValidInput_IPRange() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("172.16.0.1-172.16.0.5");

		// When / Then
		final IpWhitelistHelper helper = new IpWhitelistHelper(Set.of(), DEFAULT_MAX_WHITELIST_SIZE);
		assertDoesNotThrow(() -> helper.addWhitelist(subnets));
	}

	@Test
	void testWhitelistSize_SingleIP() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.1");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(1, helper.estimateIpCount());
	}

	@Test
	void testWhitelistSize_IPRange() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.1-192.168.0.10");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(10, helper.estimateIpCount());
	}

	@Test
	void testWhitelistSize_CIDR29() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.0/29");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(6, helper.estimateIpCount());
	}

	@Test
	void testWhitelistSize_CIDR30() throws Exception {
		// Given
		final Set<String> subnets = new HashSet<>();
		subnets.add("192.168.0.0/30");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(2, helper.estimateIpCount());
	}
}
