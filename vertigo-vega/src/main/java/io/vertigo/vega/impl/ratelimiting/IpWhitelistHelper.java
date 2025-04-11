/*
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2024, Vertigo.io, team@vertigo.io
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
package io.vertigo.vega.impl.ratelimiting;

import java.math.BigInteger;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashSet;
import java.util.Set;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.WrappedException;

/**
 * Helper to manage whitelist IPs, parameterized by patterns.
 * Supported formats:
 *
 * Full IP:
 * - 192.168.1.0
 * - 2001:0db8:85a3:0000:0000:8a2e:0370:7334
 *
 * IP Range: on last byte only
 * - 192.168.1.0-192.168.1.134 (must have the same prefix)
 * - 192.168.1.0-134
 * - 2001:0db8:85a3:0000:0000:8a2e:0370:7334-7440
 *
 * CIDR: for IPv4 only
 * - 192.168.1.0/25
 *
 * Whitelist is limited in size (hard limit 1,000,000)
 *
 * @author npiedeloup
 */
class IpWhitelistHelper {

	private final Set<String> whitelistPatterns;
	private final Set<String> whitelist;
	private final int maxWhitelistSize;

	/**
	 * Constructor for IpWhitelistHelper.
	 *
	 * @param whitelistPatterns Set of IP patterns to be whitelisted
	 * @param maxWhitelistSize Maximum number of IPs allowed in the whitelist (must be between 1 and 1,000,000)
	 */
	public IpWhitelistHelper(final Set<String> whitelistPatterns, final int maxWhitelistSize) {
		Assertion.check()
				.isNotNull(whitelistPatterns)
				.isTrue(maxWhitelistSize > 0 && maxWhitelistSize <= 1_000_000, "maxWhitelistSize must be in range 0-1_000_000");
		//---
		this.maxWhitelistSize = maxWhitelistSize;
		this.whitelistPatterns = Set.copyOf(whitelistPatterns);
		whitelist = new HashSet<>();
		addWhitelist(whitelistPatterns);
	}

	/**
	 * Checks if an IP address is in the whitelist.
	 *
	 * @param ip IP address to check
	 * @return true if the IP address is in the whitelist, false otherwise
	 */
	public boolean isIpInWhitelist(final String ip) {
		return whitelist.contains(normalizeAddress(ip));
	}

	/**
	 * Normalizes an IP address by removing brackets for IPv6 and handling leading zeros.
	 *
	 * @param ip IP address to normalize
	 * @return Normalized IP address
	 */
	private String normalizeAddress(final String ip) {
		var normalized = removeBracketsIpv6Address(ip);
		// If IP contains leading zeros, normalize it using InetAddress
		if (normalized.startsWith("0") || normalized.contains(".0") || normalized.contains(":0")) {
			try {
				normalized = InetAddress.getByName(normalized).getHostAddress();
			} catch (final UnknownHostException e) {
				throw WrappedException.wrap(e, "Invalid whitelist IP " + normalized);
			}
		}
		return normalized;
	}

	/**
	 * Estimates the number of IP addresses in the whitelist.
	 *
	 * @return Number of IPs in the whitelist
	 */
	public int estimateIpCount() {
		return whitelist.size();
	}

	/**
	 * Returns the whitelist patterns as a string.
	 *
	 * @return String representation of the whitelist patterns
	 */
	public String printWhitelist() {
		return String.join(", ", whitelistPatterns);
	}

	/**
	 * Initializes the whitelist by calculating all possible IP addresses
	 * Accepts range syntax in each given subnet.
	 *
	 * @param whitelistPatterns Collection of subnets in format "address" or "address/prefix" (e.g., "192.168.1.0/25")
	 */
	public void addWhitelist(final Set<String> whitelistPatterns) {
		Assertion.check().isNotNull(whitelistPatterns);
		//---
		for (String subnet : whitelistPatterns) {
			try {
				subnet = removeBracketsIpv6Address(subnet);
				if (subnet.indexOf('-') > 0) {
					// Handle IP range format (e.g., 192.168.1.0-192.168.1.134)
					whitelist.addAll(initIpRange(subnet));
				} else if (subnet.indexOf('/') > 0) {
					// Handle CIDR format (e.g., 192.168.1.0/25)
					whitelist.addAll(initCIDR(subnet));
				} else {
					// Handle single IP address
					whitelist.add(InetAddress.getByName(subnet).getHostAddress());//normalize
				}
			} catch (final UnknownHostException e) {
				throw WrappedException.wrap(e, "Invalid whitelist IP " + subnet);
			}
			Assertion.check()
					.isTrue(whitelist.size() <= maxWhitelistSize, "Too many IPs in whitelist, max size is {0}", maxWhitelistSize);
		}
	}

	/**
	 * Initializes a range of IP addresses from a pattern like "192.168.1.1-192.168.1.10" or "192.168.1.1-10".
	 *
	 * @param ipRange The IP range pattern
	 * @return Set of IP addresses in the range
	 * @throws UnknownHostException If an IP address in the range is invalid
	 */
	private Set<String> initIpRange(final String ipRange) throws UnknownHostException {
		final String[] parts = ipRange.split("-");
		Assertion.check()
				.isTrue(parts.length == 2, "Invalid IP range " + ipRange);
		//---
		final String startIp = parts[0].trim();
		final String endIp = parts[1].trim();
		// Determine if we're dealing with IPv4 or IPv6
		final char prefixSep = startIp.indexOf(':') > 0 ? ':' : '.';
		final String prefix = startIp.substring(0, startIp.lastIndexOf(prefixSep));

		final InetAddress startAdr = InetAddress.getByName(startIp);
		final InetAddress endAdr;

		// Handle two different formats: full IP in end range or just the last part
		if (endIp.indexOf(prefixSep) > 0) {
			if (!endIp.startsWith(prefix)) {
				throw new IllegalArgumentException("Invalid IP range " + ipRange + ", endIp must start with first part of startIp");
			}
			endAdr = InetAddress.getByName(endIp);
		} else {
			// Handle shorthand notation: prefix + end value
			endAdr = InetAddress.getByName(prefix + prefixSep + endIp);
		}

		// Convert IP addresses to numeric representation for iteration
		final BigInteger hmin = new BigInteger(startAdr.getAddress());
		final BigInteger hmax = new BigInteger(endAdr.getAddress());
		Assertion.check()
				.isTrue(hmin.compareTo(hmax) <= 0, "Invalid IP range " + ipRange + ", startIp must be less than endIp");

		// Generate all IP addresses in the range
		final var ipRangeSet = new HashSet<String>();
		for (BigInteger ip = hmin; ip.compareTo(hmax) <= 0; ip = ip.add(BigInteger.ONE)) {
			final InetAddress ipAddress = InetAddress.getByAddress(ip.toByteArray());
			ipRangeSet.add(ipAddress.getHostAddress());
		}
		return ipRangeSet;
	}

	/**
	 * Initializes a set of IP addresses from a CIDR notation (IPv4 only).
	 *
	 * @param subnet The subnet in CIDR notation (e.g., "192.168.1.0/24")
	 * @return Set of IP addresses in the CIDR range
	 * @throws UnknownHostException If the base IP is invalid
	 */
	private Set<String> initCIDR(final String subnet) throws UnknownHostException {
		final String[] parts = subnet.contains("/") ? subnet.split("/") : new String[] { subnet, "32" };
		final String baseIp = parts[0];
		final InetAddress baseAddr = InetAddress.getByName(baseIp);
		final int prefixLength = Integer.parseInt(parts[1]);

		// Validate prefix length
		if (prefixLength < 0 || prefixLength > 32) {
			throw new IllegalStateException("Invalid mask in subnet " + subnet);
		}

		// Calculate IP range based on CIDR prefix
		final BigInteger address = new BigInteger(baseAddr.getAddress());
		BigInteger hmin, hmax;

		// Special cases for /31 and /32 prefixes
		if (prefixLength == 31) {
			hmin = address.subtract(BigInteger.ONE);
			hmax = address;
		} else if (prefixLength == 32) {
			hmin = address;
			hmax = address;
		} else {
			// Calculate network address and broadcast address for the subnet
			BigInteger mask = BigInteger.ONE.shiftLeft(prefixLength).subtract(BigInteger.ONE).shiftLeft(32 - prefixLength);
			final byte[] maskBytes = mask.toByteArray();

			// Handle leading zero byte that might be added by BigInteger.toByteArray()
			if (maskBytes.length == 5 && maskBytes[0] == 0) {
				mask = new BigInteger(mask.toByteArray(), 1, 4);
			}

			// Calculate usable IP range (excluding network and broadcast addresses)
			final BigInteger network = address.and(mask);
			hmin = network.add(BigInteger.ONE); // First usable address (network address + 1)
			hmax = network.add(BigInteger.ONE.shiftLeft(32 - prefixLength).subtract(BigInteger.TWO)); // Last usable address
		}

		// Generate all IP addresses in the range
		final var ipRangeSet = new HashSet<String>();
		for (BigInteger ip = hmin; ip.compareTo(hmax) <= 0; ip = ip.add(BigInteger.ONE)) {
			final InetAddress ipAddress = InetAddress.getByAddress(ip.toByteArray());
			ipRangeSet.add(ipAddress.getHostAddress());
		}
		return ipRangeSet;
	}

	/**
	 * Removes brackets from IPv6 addresses if present.
	 *
	 * @param ipWithBrackets IP address potentially with brackets
	 * @return IP address without brackets
	 */
	private static String removeBracketsIpv6Address(final String ipWithBrackets) {
		if (ipWithBrackets != null && ipWithBrackets.startsWith("[") && ipWithBrackets.endsWith("]")) {
			return ipWithBrackets.substring(1, ipWithBrackets.length() - 1);
		}
		return ipWithBrackets;
	}
}
