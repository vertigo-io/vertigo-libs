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
 * Helper to manager whiteList ip, parameterize by pattern.
 * Full ip :
 * - 192.168.1.0
 * - 2001:0db8:85a3:0000:0000:8a2e:0370:7334
 *
 * Range ip : on last byte only
 * - 192.168.1.0-192.168.1.134 (must have the same prefix)
 * - 192.168.1.0-134
 * - 2001:0db8:85a3:0000:0000:8a2e:0370:7334-7440
 * 
 * CIDR : on ipv4 only
 * - 192.168.1.0/25
 *
 * Whitelist is limited on size (hard limit 1_000_000)
 *
 * @author npiedeloup
 */
class IpWhitelistHelper {

	private final Set<String> whitelistPatterns;
	private final Set<String> whitelist;
	private final int maxWhitelistSize;

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
	 * Vérifie si une adresse IP est dans la whitelist.
	 *
	 * @param ip Adresse IP à vérifier.
	 * @return true si l'adresse IP est dans la whitelist, false sinon.
	 */
	public boolean isIpInWhitelist(final String ip) {
		return whitelist.contains(normalizeAddress(ip));
	}

	private String normalizeAddress(final String ip) {
		var normalized = removeBracketsIpv6Address(ip);
		if (normalized.startsWith("0") || normalized.contains(".0") || normalized.contains(":0")) {
			try {
				normalized = InetAddress.getByName(normalized).getHostAddress();
			} catch (final UnknownHostException e) {
				throw WrappedException.wrap(e, "Invalid whitelist IP " + normalized);
			}
		}
		return normalized;
	}

	public int estimateIpCount() {
		return whitelist.size();
	}

	public String printWhitelist() {
		return String.join(", ", whitelistPatterns);
	}

	/**
	 * Initialise la whitelist en calculant toutes les adresses IP possibles
	 * Accepte une syntaxe range dans chaque sous-réseau donné.
	 *
	 * @param whitelistPatterns Collection de sous-réseaux au format "adresse" ou "adresse/préfixe" (ex. "192.168.1.0/25").
	 */
	public void addWhitelist(final Set<String> whitelistPatterns) {
		Assertion.check().isNotNull(whitelistPatterns);
		//---
		for (String subnet : whitelistPatterns) {
			try {
				subnet = removeBracketsIpv6Address(subnet);
				if (subnet.indexOf('-') > 0) {
					whitelist.addAll(initIpRange(subnet));
				} else if (subnet.indexOf('/') > 0) {
					whitelist.addAll(initCIDR(subnet));
				} else {
					whitelist.add(InetAddress.getByName(subnet).getHostAddress());//normalize
				}
			} catch (final UnknownHostException e) {
				throw WrappedException.wrap(e, "Invalid whitelist IP " + subnet);
			}
			Assertion.check()
					.isTrue(whitelist.size() <= maxWhitelistSize, "Too many IPs in whitelist, max size is {0}", maxWhitelistSize);
		}
	}

	private Set<String> initIpRange(final String ipRange) throws UnknownHostException {
		final String[] parts = ipRange.split("-");
		Assertion.check()
				.isTrue(parts.length == 2, "Invalid IP range " + ipRange);
		//---
		final String startIp = parts[0].trim();
		final String endIp = parts[1].trim();
		final char prefixSep = startIp.indexOf(':') > 0 ? ':' : '.';
		final String prefix = startIp.substring(0, startIp.lastIndexOf(prefixSep));
		final InetAddress startAdr = InetAddress.getByName(startIp);
		final InetAddress endAdr;
		if (endIp.indexOf(prefixSep) > 0) {
			if (!endIp.startsWith(prefix)) {
				throw new IllegalArgumentException("Invalid IP range " + ipRange + ", endIp must start with first part of startIp");
			}
			endAdr = InetAddress.getByName(endIp);
		} else {
			endAdr = InetAddress.getByName(prefix + prefixSep + endIp);
		}
		final BigInteger hmin = new BigInteger(startAdr.getAddress());
		final BigInteger hmax = new BigInteger(endAdr.getAddress());
		Assertion.check()
				.isTrue(hmin.compareTo(hmax) <= 0, "Invalid IP range " + ipRange + ", startIp must be less than endIp");

		final var ipRangeSet = new HashSet<String>();
		for (BigInteger ip = hmin; ip.compareTo(hmax) <= 0; ip = ip.add(BigInteger.ONE)) {
			final InetAddress ipAddress = InetAddress.getByAddress(ip.toByteArray());
			ipRangeSet.add(ipAddress.getHostAddress());
		}
		return ipRangeSet;
	}

	private Set<String> initCIDR(final String subnet) throws UnknownHostException {
		final String[] parts = subnet.contains("/") ? subnet.split("/") : new String[] { subnet, "32" };
		final String baseIp = parts[0];
		final InetAddress baseAddr = InetAddress.getByName(baseIp);
		final int prefixLength = Integer.parseInt(parts[1]);
		if (prefixLength < 0 || prefixLength > 32) {
			throw new IllegalStateException("Invalid mask in subnet " + subnet);
		}
		final BigInteger address = new BigInteger(baseAddr.getAddress());
		BigInteger hmin, hmax;
		if (prefixLength == 31) {
			hmin = address.subtract(BigInteger.ONE);
			hmax = address;
		} else if (prefixLength == 32) {
			hmin = address;
			hmax = address;
		} else {
			BigInteger mask = BigInteger.ONE.shiftLeft(prefixLength).subtract(BigInteger.ONE).shiftLeft(32 - prefixLength);
			final byte[] maskBytes = mask.toByteArray();
			if (maskBytes.length == 5 && maskBytes[0] == 0) {
				mask = new BigInteger(mask.toByteArray(), 1, 4);
			}
			final BigInteger network = address.and(mask);
			hmin = network.add(BigInteger.ONE);
			hmax = network.add(BigInteger.ONE.shiftLeft(32 - prefixLength).subtract(BigInteger.TWO));
		}
		final var ipRangeSet = new HashSet<String>();
		for (BigInteger ip = hmin; ip.compareTo(hmax) <= 0; ip = ip.add(BigInteger.ONE)) {
			final InetAddress ipAddress = InetAddress.getByAddress(ip.toByteArray());
			ipRangeSet.add(ipAddress.getHostAddress());
		}
		return ipRangeSet;
	}

	/**
	 * Remove brackets if present.
	 * @param ipWithBrackets
	 * @return ip without brackets
	 */
	private static String removeBracketsIpv6Address(final String ipWithBrackets) {
		if (ipWithBrackets != null && ipWithBrackets.startsWith("[") && ipWithBrackets.endsWith("]")) {
			return ipWithBrackets.substring(1, ipWithBrackets.length() - 1);
		}
		return ipWithBrackets;
	}
}
