package io.vertigo.vega.impl.ratelimiting;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;

public class IpWhitelistHelperTest {

	private static final int DEFAULT_MAX_WHITELIST_SIZE = 1000;

	// ===== Basic IPv4 Tests =====

	@Test
	void testSingleIPv4() {
		// Given
		final Set<String> subnets = Set.of("192.168.0.1");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(1, helper.estimateIpCount());
		assertTrue(helper.isIpInWhitelist("192.168.0.1"));
		assertFalse(helper.isIpInWhitelist("192.168.0.2"));
	}

	// ===== IPv4 Range Tests =====

	@ParameterizedTest(name = "Format {0} should produce {1} IPs")
	@MethodSource("ipRangeTestCases")
	void testIPv4Ranges(final String subnet, final int expectedCount, final String[] validIps) {
		// Given
		final Set<String> subnets = Set.of(subnet);

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(expectedCount, helper.estimateIpCount());
		for (final String ip : validIps) {
			assertTrue(helper.isIpInWhitelist(ip), "IP " + ip + " should be in the whitelist");
		}
	}

	static Stream<Arguments> ipRangeTestCases() {
		return Stream.of(
				// Standard range format
				Arguments.of(
						"192.168.0.1-192.168.0.5",
						5,
						new String[] { "192.168.0.1", "192.168.0.2", "192.168.0.3", "192.168.0.4", "192.168.0.5" }),
				// Abbreviated range format
				Arguments.of(
						"192.168.0.1-5",
						5,
						new String[] { "192.168.0.1", "192.168.0.2", "192.168.0.3", "192.168.0.4", "192.168.0.5" }));
	}

	// ===== IPv4 CIDR Tests =====

	@ParameterizedTest(name = "CIDR {0} should produce {1} IPs")
	@CsvSource({
			"192.168.0.0/30, 2",
			"192.168.0.1/32, 1",
			"192.168.0.0/32, 1",
			"192.168.0.0/29, 6"
	})
	void testCIDRSize(final String cidr, final int expectedCount) {
		// Given
		final Set<String> subnets = Set.of(cidr);

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(expectedCount, helper.estimateIpCount());
	}

	@Test
	void testCIDR30Content() {
		// Given
		final Set<String> subnets = Set.of("192.168.0.0/30");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertTrue(helper.isIpInWhitelist("192.168.0.1"));
		assertTrue(helper.isIpInWhitelist("192.168.0.2"));
		assertFalse(helper.isIpInWhitelist("192.168.0.3"));
	}

	@Test
	void testCIDR29Content() {
		// Given
		final Set<String> subnets = Set.of("192.168.0.0/29");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		for (int i = 1; i <= 6; i++) {
			assertTrue(helper.isIpInWhitelist("192.168.0." + i));
		}
		assertFalse(helper.isIpInWhitelist("192.168.0.7"));
	}

	// ===== Multiple Subnet Tests =====

	@Test
	void testMultipleSubnets() {
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

		// Verify different formats
		assertTrue(helper.isIpInWhitelist("192.168.0.1")); // Single IP

		// Standard range
		assertTrue(helper.isIpInWhitelist("10.0.0.1"));
		assertTrue(helper.isIpInWhitelist("10.0.0.2"));
		assertTrue(helper.isIpInWhitelist("10.0.0.3"));

		// Abbreviated range
		assertTrue(helper.isIpInWhitelist("10.0.1.1"));
		assertTrue(helper.isIpInWhitelist("10.0.1.2"));
		assertTrue(helper.isIpInWhitelist("10.0.1.3"));

		// CIDR
		assertTrue(helper.isIpInWhitelist("172.16.0.0"));
		assertFalse(helper.isIpInWhitelist("172.16.0.1"));
	}

	// ===== IPv6 Tests =====

	@Test
	void testSingleIPv6() {
		// Given
		final Set<String> subnets = Set.of("[2001:0db8:85a3:0000:0000:8a2e:0370:7334]");

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
		final Set<String> subnets = Set.of("[2001:0db8:85a3:0000:0000:8a2e:0370:7334-7337]");

		// When
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(4, helper.estimateIpCount());
		for (int i = 0x7334; i <= 0x7337; i++) {
			final String ip = String.format("2001:0db8:85a3:0000:0000:8a2e:0370:%04x", i);
			assertTrue(helper.isIpInWhitelist(ip));
		}
	}

	// ===== Invalid Input Tests =====

	@ParameterizedTest(name = "Invalid format {0}")
	@ValueSource(strings = {
			"invalid.ip.address",
			"192.168.0.1/33", // Invalid CIDR
			"192.168.0.5-192.168.0.1", // Reversed range
			"192.168.0.1-192.169.0.5", // Different prefix
			"[2001:0db8:85a3:0000:0000:8a2e:0370:7334/64]" // Unsupported IPv6 CIDR
	})
	void testInvalidInputs(final String invalidSubnet) {
		// Given
		final Set<String> subnets = Set.of(invalidSubnet);

		// When / Then
		final IpWhitelistHelper helper = new IpWhitelistHelper(Set.of(), DEFAULT_MAX_WHITELIST_SIZE);

		// All invalid formats should throw an exception, regardless of which one
		assertThrows(Exception.class, () -> helper.addWhitelist(subnets));
	}

	// ===== Size Limit Tests =====

	@Test
	void testMaxWhitelistSizeExceeded() {
		// Given
		final Set<String> subnets = Set.of("192.168.0.0/24"); // 254 IPs

		// When / Then
		final IpWhitelistHelper helper = new IpWhitelistHelper(Set.of(), 100); // Max size 100
		assertThrows(IllegalStateException.class, () -> helper.addWhitelist(subnets));
	}

	// ===== Valid Input Tests (verification of no exceptions) =====

	@ParameterizedTest(name = "Valid format {0}")
	@ValueSource(strings = {
			"192.168.0.1", // Simple IP
			"10.0.0.1/32", // IP with CIDR
			"172.16.0.1-172.16.0.5" // IP range
	})
	void testValidInputs(final String validSubnet) {
		// Given
		final Set<String> subnets = Set.of(validSubnet);

		// When / Then
		final IpWhitelistHelper helper = new IpWhitelistHelper(Set.of(), DEFAULT_MAX_WHITELIST_SIZE);
		assertDoesNotThrow(() -> helper.addWhitelist(subnets));
	}

	@Test
	void testIpNormalization() {
		// Given
		final Set<String> subnets = Set.of("192.168.0.1");
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then - verify that IPs with leading zeros are normalized correctly
		assertTrue(helper.isIpInWhitelist("192.168.000.001"));
		assertTrue(helper.isIpInWhitelist("192.168.0.01"));
	}

	@Test
	void testCompressedIPv6Format() {
		// Given
		final Set<String> subnets = Set.of("2001:db8::1");
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then - verify that expanded IPv6 is matched correctly
		assertTrue(helper.isIpInWhitelist("2001:0db8:0000:0000:0000:0000:0000:0001"));
	}

	@Test
	void testEmptyWhitelist() {
		// Given
		final Set<String> subnets = Set.of();
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		assertEquals(0, helper.estimateIpCount());
		assertFalse(helper.isIpInWhitelist("192.168.0.1"));
	}

	@Test
	void testPrintWhitelist() {
		// Given
		final Set<String> subnets = Set.of("192.168.0.1", "10.0.0.1/32");
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, DEFAULT_MAX_WHITELIST_SIZE);

		// Then
		final String whitelistStr = helper.printWhitelist();
		assertTrue(whitelistStr.contains("192.168.0.1"));
		assertTrue(whitelistStr.contains("10.0.0.1/32"));
	}

	@Test
	void testExactMaxWhitelistSize() {
		// Given
		final Set<String> subnets = Set.of("192.168.0.1-192.168.0.5");
		final int exactSize = 5;

		// When/Then - Should not throw exception when size equals maxWhitelistSize
		assertDoesNotThrow(() -> new IpWhitelistHelper(subnets, exactSize));
	}

	@Test
	void testPerformanceOfIsIpInWhitelist() {
		// Given
		final Set<String> subnets = Set.of("192.168.0.0/24", "192.168.1.0/24", "10.0.0.0/24", "172.16.0.0/24");
		final IpWhitelistHelper helper = new IpWhitelistHelper(subnets, 1000000);

		// Verify size first
		assertEquals(1016, helper.estimateIpCount()); // Four /24 networks should have ~1016 usable IPs

		// When - Measure performance of 1000 lookups
		final String existingIp = "192.168.0.100";
		final String nonExistingIp = "172.16.1.1";

		// Warm up JVM
		for (int i = 0; i < 100; i++) {
			helper.isIpInWhitelist(existingIp);
			helper.isIpInWhitelist(nonExistingIp);
		}

		// Measure time
		final long startTime = System.nanoTime();
		final int testLookup = 10_000;
		final int maxTimeMs = (int) (testLookup * 0.05); // 0.05ms per lookup;
		for (int i = 0; i < testLookup; i++) {
			assertTrue(helper.isIpInWhitelist(existingIp));
			assertFalse(helper.isIpInWhitelist(nonExistingIp));
		}

		final long endTime = System.nanoTime();
		final long durationMs = (endTime - startTime) / 1_000_000;

		// Then - Check that lookup is reasonably fast
		System.out.println("Time for " + testLookup + " IP lookups: " + durationMs + "ms (" + durationMs * 1000 / testLookup / 1000d + "ms per lookup)");

		// Assert that each lookup takes less than 0.05ms on average (very generous threshold)
		assertTrue(durationMs < maxTimeMs, "IP lookup should be faster than 0.05ms (" + maxTimeMs + "ms for " + testLookup + " lookups)");
	}
}
