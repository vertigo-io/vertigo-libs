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
package io.vertigo.database.sql.data;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

import io.vertigo.core.lang.DataStream;

/**
 * Movie.
 */
public final class Movie {
	private Long movId;
	private String title;
	private Mail mail;
	@Deprecated
	private Date releaseDate;
	private LocalDate releaseLocalDate;
	private Double fps;
	private BigDecimal income;
	private Boolean color;
	private DataStream icon;

	private Instant releaseInstant;
	//	private Mail mail;

	public final Long getMovId() {
		return movId;
	}

	public final void setMovId(final Long movId) {
		this.movId = movId;
	}

	public DataStream getIcon() {
		return icon;
	}

	public void setIcon(final DataStream icon) {
		this.icon = icon;
	}

	public final String getTitle() {
		return title;
	}

	public final void setTitle(final String title) {
		this.title = title;
	}

	@Deprecated
	public Date getReleaseDate() {
		return releaseDate;
	}

	@Deprecated
	public void setReleaseDate(final Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	public void setReleaseLocalDate(final LocalDate releaseLocalDate) {
		this.releaseLocalDate = releaseLocalDate;
	}

	public LocalDate getReleaseLocalDate() {
		return releaseLocalDate;
	}

	public Double getFps() {
		return fps;
	}

	public void setFps(final Double fps) {
		this.fps = fps;
	}

	public BigDecimal getIncome() {
		return income;
	}

	public void setIncome(final BigDecimal budget) {
		income = budget;
	}

	public Boolean getColor() {
		return color;
	}

	public void setColor(final Boolean color) {
		this.color = color;
	}

	public Instant getReleaseInstant() {
		return releaseInstant;
	}

	public void setReleaseInstant(final Instant releaseInstant) {
		this.releaseInstant = releaseInstant;
	}

	/*
	 * Tests extended mapping
	 */

	public void setMail(final Mail mail) {
		this.mail = mail;
	}

	public Mail getMail() {
		return mail;
	}

}
