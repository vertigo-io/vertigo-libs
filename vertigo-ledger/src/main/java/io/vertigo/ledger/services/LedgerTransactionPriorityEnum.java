package io.vertigo.ledger.services;

public enum LedgerTransactionPriorityEnum {

	VERYSLOW(5), //
	SLOW(50), //ETH: ~0.15 GWEI (~$0.000728), ~12H00-35H00 
	MEDIUM(500), //ETH: ~1.5-4.5 GWEI (~$0.00728), ~10 minutes
	FAST(650), // ETH: ~3-5 GWEI (~$0.02), ~3 minutes 
	VERYFAST(1000); // ETH: ~20 GWEI (~$0.10), ~10 secondes

	private final int perMille;

	/**
	 * 
	 * @param percentage
	 */
	private LedgerTransactionPriorityEnum(final int perMille) {
		this.perMille = perMille;
	}

	/**
	 * @return the percentage
	 */
	public int getPermille() {
		return perMille;
	}

}
