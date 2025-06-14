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
package io.vertigo.database.sql;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.OptionalInt;

import javax.inject.Inject;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.vertigo.core.lang.BasicType;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.lang.DataStream;
import io.vertigo.core.lang.Tuple;
import io.vertigo.core.node.AutoCloseableNode;
import io.vertigo.core.node.component.di.DIInjector;
import io.vertigo.core.node.config.NodeConfig;
import io.vertigo.database.sql.connection.SqlConnection;
import io.vertigo.database.sql.connection.SqlConnectionProvider;
import io.vertigo.database.sql.data.Mail;
import io.vertigo.database.sql.data.Movie;
import io.vertigo.database.sql.data.MovieInfo;
import io.vertigo.database.sql.data.Movies;
import io.vertigo.database.sql.statement.SqlParameter;
import io.vertigo.database.sql.statement.SqlStatement;
import io.vertigo.database.sql.statement.SqlStatementBuilder;
import io.vertigo.database.sql.vendor.SqlDialect;
import io.vertigo.database.sql.vendor.SqlDialect.GenerationMode;

/**
 *
 * @author pchretien
 */
public abstract class AbstractSqlManagerTest {
	private static final String DROP_TABLE_MOVIE = "DROP TABLE movie";
	private static final String DROP_SEQUENCE_MOVIE = "DROP SEQUENCE seq_movie";

	private static final String INSERT_INTO_MOVIE_VALUES = "insert into movie values (#movie.movId#, #movie.title#, #movie.mail#, #movie.fps#, #movie.income#, #movie.color#, #movie.releaseDate#, #movie.releaseLocalDate#, #movie.releaseInstant#, #movie.icon#)";
	private static final String CREATE_TABLE_MOVIE = "create table movie ("
			+ "mov_id bigint , "
			+ "title varchar(255) , "
			+ "mail varchar(255) , "
			+ "fps double precision ,"
			+ "income decimal(6,3) , "
			+ "color boolean , "
			+ "release_date timestamp , "
			+ "release_local_date date , "
			+ "release_instant timestamp , "
			+ "icon blob );";

	private static final Map<Class, BasicTypeAdapter> MAIL_ADAPTER = new HashMap<>() {
		private static final long serialVersionUID = 1L;

		{
			put(Mail.class, new BasicTypeAdapter<Mail, String>() {
				@Override
				public Mail toJava(final String sqlValue, final Class<Mail> javaClass) {
					return sqlValue == null ? null : new Mail(sqlValue);
				}

				@Override
				public String toBasic(final Mail mail) {
					return mail != null ? mail.toString() : null;
				}

				@Override
				public BasicType getBasicType() {
					return BasicType.String;
				}
			});
		}
	};
	@Inject
	protected SqlManager dataBaseManager;

	private AutoCloseableNode node;

	@BeforeEach
	public final void setUp() throws Exception {
		node = new AutoCloseableNode(buildNodeConfig());
		DIInjector.injectMembers(this, node.getComponentSpace());
		//---
		try (final SqlConnection connection = obtainMainConnection()) {
			execpreparedStatement(connection, createTableMovie());
			execpreparedStatement(connection, createSequenceMovie());
			if (commitRequiredOnSchemaModification()) {
				connection.commit();
			}
		}
	}

	@AfterEach
	public final void tearDown() throws Exception {
		if (node != null) {
			try (final SqlConnection connection = obtainMainConnection()) {
				// we use a shared database so we need to drop the table
				execpreparedStatement(connection, DROP_SEQUENCE_MOVIE);
				execpreparedStatement(connection, DROP_TABLE_MOVIE);
				if (commitRequiredOnSchemaModification()) {
					connection.commit();
				}
			} finally {
				node.close();
			}
		}
	}

	protected abstract NodeConfig buildNodeConfig();

	protected SqlConnection obtainMainConnection() {
		return dataBaseManager
				.getConnectionProvider(SqlManager.MAIN_CONNECTION_PROVIDER_NAME)
				.obtainConnection();
	}

	protected abstract String createTableMovie();

	protected abstract String createSequenceMovie();

	protected abstract boolean commitRequiredOnSchemaModification();

	@Test
	public void testConnection() throws Exception {
		try (SqlConnection connection = obtainMainConnection()) {
			Assertions.assertNotNull(connection);
			connection.commit();
		}
	}

	protected void execpreparedStatement(final SqlConnection connection, final String sql) throws SQLException {
		dataBaseManager
				.executeUpdate(SqlStatement.builder(sql).build(), MAIL_ADAPTER, connection);
	}

	private void insert(
			final SqlConnection connection,
			final Movie movie) throws SQLException {
		//-----
		dataBaseManager
				.executeUpdate(
						SqlStatement.builder(INSERT_INTO_MOVIE_VALUES)
								.bind("movie", Movie.class, movie)
								.build(),
						MAIL_ADAPTER,
						connection);
	}

	private void createDatas() throws Exception {
		try (final SqlConnection connection = obtainMainConnection()) {
			insert(connection, Movies.createMovie(
					1,
					Movies.TITLE_MOVIE_1,
					null, //mail
					null,
					null,
					null,
					new Date(1941 - 1900, 5 - 1, 1, 16, 30),
					LocalDate.of(1941, 5, 1),
					LocalDateTime.of(1941, 5, 1, 16, 30).toInstant(ZoneOffset.UTC)));
			//-----
			insert(connection, Movies.createMovie(
					2,
					Movies.TITLE_MOVIE_2,
					null, //mail
					null,
					null,
					null,
					new Date(1958 - 1900, 5 - 1, 9, 16, 30),
					LocalDate.of(1958, 5, 9),
					LocalDateTime.of(1958, 5, 9, 16, 30).toInstant(ZoneOffset.UTC)));
			//-----
			//On passe par une requête bindée
			insert(connection, Movies.createMovie(
					3,
					Movies.TITLE_MOVIE_3,
					null, //Mail
					null,
					null,
					null,
					null,
					null,
					null));
			connection.commit();
		}
	}

	@Test
	public void testPreparedStatement() throws Exception {
		createDatas();
	}

	@Test
	public void testSelectEntities() throws Exception {
		createDatas();
		//----
		final List<Movie> movies = executeQuery(Movie.class, "select * from movie", null);

		Assertions.assertEquals(3, movies.size());
		movies.forEach(Movies::checkMovie);
	}

	@Test
	public void testSelectSimpleObjects() throws Exception {
		createDatas();
		//----
		final List<MovieInfo> movieInfos = executeQuery(MovieInfo.class, "select title from movie", null);
		Assertions.assertEquals(3, movieInfos.size());
	}

	@Test
	public void testSelectObject() throws Exception {
		createDatas();
		//----
		final List<Movie> movies = executeQuery(Movie.class, "select * from movie where mov_id=1", null);
		Assertions.assertEquals(1, movies.size());
		final Movie movie = movies.get(0);
		Assertions.assertEquals("citizen kane", movie.getTitle());
	}

	protected final <O> List<O> executeQuery(final Class<O> dataType, final String sql, final Integer limit) throws SQLException, Exception {
		final SqlConnectionProvider sqlConnectionProvider = dataBaseManager.getConnectionProvider(SqlManager.MAIN_CONNECTION_PROVIDER_NAME);
		return executeQuery(dataType, sql, sqlConnectionProvider, limit);
	}

	private <O> List<O> executeQuery(
			final Class<O> dataType,
			final String sql,
			final SqlConnectionProvider sqlConnectionProvider,
			final Integer limit) throws SQLException, Exception {
		try (final SqlConnection connection = sqlConnectionProvider.obtainConnection()) {
			return dataBaseManager
					.executeQuery(
							SqlStatement.builder(sql).build(),
							dataType,
							MAIL_ADAPTER,
							limit,
							connection);
		}
	}

	//On teste un preparestatement mappé sur un type statique (Class famille)
	@Test
	public void testSelectPrimitive() throws Exception {
		createDatas();
		//----
		final List<Integer> result = executeQuery(Integer.class, "select count(*) from movie", 1);
		Assertions.assertEquals(1, result.size());
		Assertions.assertEquals(3, result.get(0).intValue());
	}

	@Test
	public void testSelectPrimitive2() throws Exception {
		createDatas();
		//----
		final List<String> result = executeQuery(String.class, "select title from movie where mov_id=1", 1);
		Assertions.assertEquals(1, result.size());
		Assertions.assertEquals(Movies.TITLE_MOVIE_1, result.get(0));
	}

	@Test
	public void testSelectPrimitive3() throws Exception {
		//On crée les données
		createDatas();
		//----
		final List<String> result = executeQuery(String.class, "select title from movie", null);
		Assertions.assertEquals(3, result.size());
	}

	@Test
	public void testSelectListInput() throws Exception {
		//On crée les données
		createDatas();
		//----
		final List<Movie> movies;
		final List<Movie> moviesParams = new ArrayList<>();
		moviesParams.add(Movies.createMovie(1, Movies.TITLE_MOVIE_1, null, null, null, null, null, null, null));
		moviesParams.add(Movies.createMovie(2, Movies.TITLE_MOVIE_2, null, null, null, null, null, null, null));
		try (final SqlConnection connection = obtainMainConnection()) {
			movies = dataBaseManager.executeQuery(SqlStatement
					.builder("select * from movie where movie.title in (#movies.0.title#, #movies.1.title#) ")
					.bind("movies", List.class, moviesParams)
					.build(),
					Movie.class,
					MAIL_ADAPTER,
					2,
					connection);

		}
		Assertions.assertEquals(2, movies.size());
	}

	@Test
	public void testPrimitiveParam() throws Exception {
		//On crée les données
		createDatas();
		//----
		final List<Movie> movies;
		try (final SqlConnection connection = obtainMainConnection()) {
			movies = dataBaseManager.executeQuery(SqlStatement
					.builder("select * from movie where movie.title = #title# ")
					.bind("title", String.class, Movies.TITLE_MOVIE_1)
					.build(),
					Movie.class,
					MAIL_ADAPTER,
					1,
					connection);
		}
		Assertions.assertEquals(1, movies.size());
		Assertions.assertEquals(Movies.TITLE_MOVIE_1, movies.get(0).getTitle());
	}

	@Test
	public void testQuotedParam() throws Exception {
		Assertions.assertThrows(IllegalStateException.class, () -> {
			//On crée les données
			createDatas();
			//----
			final List<Movie> movies;
			try (SqlConnection connection = obtainMainConnection()) {
				movies = dataBaseManager.executeQuery(SqlStatement
						.builder("select * from movie where movie.title = '#title#' ")
						.bind("title", String.class, Movies.TITLE_MOVIE_1)
						.build(),
						Movie.class,
						MAIL_ADAPTER,
						1,
						connection);

			}
			Assertions.assertEquals(1, movies.size());
			Assertions.assertEquals(Movies.TITLE_MOVIE_1, movies.get(0).getTitle());
		});
	}

	@Test
	public void testBatchInsertsWithGeneratedKeys() throws Exception {
		final SqlConnectionProvider sqlConnectionProvider = dataBaseManager.getConnectionProvider(SqlManager.MAIN_CONNECTION_PROVIDER_NAME);
		final String sql = INSERT_INTO_MOVIE_VALUES;

		final List<Movie> movies = Movies.bondMovies();

		//--prepare data
		final List<List<SqlParameter>> batch = new ArrayList<>();
		for (final Movie movie : movies) {
			final List<SqlParameter> sqlParameters = List.of(
					SqlParameter.of(Long.class, movie.getMovId()),
					SqlParameter.of(String.class, movie.getTitle()),
					SqlParameter.of(Double.class, movie.getFps()),
					SqlParameter.of(BigDecimal.class, movie.getIncome()),
					SqlParameter.of(Boolean.class, movie.getColor()),
					SqlParameter.of(Date.class, movie.getReleaseDate()),
					SqlParameter.of(LocalDate.class, movie.getReleaseLocalDate()),
					SqlParameter.of(Instant.class, movie.getReleaseInstant()),
					SqlParameter.of(DataStream.class, movie.getIcon()));
			batch.add(sqlParameters);
		}

		final Tuple<Integer, List<Long>> result;
		try (final SqlConnection connection = sqlConnectionProvider.obtainConnection()) {
			final SqlStatementBuilder sqlStatementBuilder = SqlStatement.builder(sql);

			for (final Movie movie : movies) {
				sqlStatementBuilder
						.bind("movie", Movie.class, movie)
						.nextLine();
			}
			result = dataBaseManager.executeBatchWithGeneratedKeys(sqlStatementBuilder.build(), connection.getDataBase().getSqlDialect().getGenerationMode(), "mov_id", Long.class, MAIL_ADAPTER, connection);
			connection.commit();
		}
		//---
		Assertions.assertEquals(movies.size(), result.val1());
		final List<Integer> countMovie = executeQuery(Integer.class, "select count(*) from movie", 1);
		Assertions.assertEquals(movies.size(), countMovie.get(0).intValue());
		Assertions.assertEquals(movies.size(), result.val2().size());
	}

	@Test
	public void testBatchInserts() throws Exception {
		final SqlConnectionProvider sqlConnectionProvider = dataBaseManager.getConnectionProvider(SqlManager.MAIN_CONNECTION_PROVIDER_NAME);
		final String sql = INSERT_INTO_MOVIE_VALUES;

		final List<Movie> movies = Movies.bondMovies();

		//--prepare data
		final List<List<SqlParameter>> batch = new ArrayList<>();
		for (final Movie movie : movies) {
			final List<SqlParameter> sqlParameters = List.of(
					SqlParameter.of(Long.class, movie.getMovId()),
					SqlParameter.of(String.class, movie.getTitle()),
					SqlParameter.of(Double.class, movie.getFps()),
					SqlParameter.of(BigDecimal.class, movie.getIncome()),
					SqlParameter.of(Boolean.class, movie.getColor()),
					SqlParameter.of(Date.class, movie.getReleaseDate()),
					SqlParameter.of(LocalDate.class, movie.getReleaseLocalDate()),
					SqlParameter.of(Instant.class, movie.getReleaseInstant()),
					SqlParameter.of(DataStream.class, movie.getIcon()));
			batch.add(sqlParameters);
		}

		final OptionalInt result;
		try (final SqlConnection connection = sqlConnectionProvider.obtainConnection()) {
			final SqlStatementBuilder sqlStatementBuilder = SqlStatement.builder(sql);

			for (final Movie movie : movies) {
				sqlStatementBuilder
						.bind("movie", Movie.class, movie)
						.nextLine();
			}
			result = dataBaseManager.executeBatch(sqlStatementBuilder.build(), MAIL_ADAPTER, connection);
			connection.commit();
		}
		//---
		if (result.isPresent()) {
			Assertions.assertEquals(movies.size(), result.getAsInt());
		}
		final List<Integer> countMovie = executeQuery(Integer.class, "select count(*) from movie", 1);
		Assertions.assertEquals(movies.size(), countMovie.get(0).intValue());
	}

	//On teste un preparestatement mappé sur un type statique (Class famille)
	@Test
	public void testTwoDataSource() throws Exception {
		createDatas();
		setupSecondary();

		//on crée des données dans 'secondary'
		try (final SqlConnection connection = dataBaseManager.getConnectionProvider("secondary")
				.obtainConnection()) {
			execpreparedStatement(connection, "insert into movie values (1, 'Star wars', null, null, null, null, null, null, null, null)");
			execpreparedStatement(connection, "insert into movie values (2, 'Will Hunting', null, null, null, null, null, null, null, null)");
			execpreparedStatement(connection, "insert into movie values (3, 'Usual Suspects', null, null, null, null, null, null, null, null)");
			//-----
			//On passe par une requête bindée
			insert(connection, Movies.createMovie(
					3,
					Movies.TITLE_MOVIE_3,
					null, //mail
					null,
					null,
					null,
					null,
					null,
					null));
			connection.commit();
		}
		//----
		final List<Integer> result2 = executeQuery(Integer.class, "select count(*) from movie", dataBaseManager.getConnectionProvider("secondary"), 1);
		Assertions.assertEquals(1, result2.size());
		Assertions.assertEquals(4, result2.get(0).intValue());
		final List<Movie> resultMovie1 = executeQuery(Movie.class, "select * from movie where mov_id=1", dataBaseManager.getConnectionProvider("secondary"), 1);
		Assertions.assertEquals(1, resultMovie1.size());
		Assertions.assertEquals("Star wars", resultMovie1.get(0).getTitle());

		final List<Integer> result1 = executeQuery(Integer.class, "select count(*) from movie", dataBaseManager.getConnectionProvider(SqlManager.MAIN_CONNECTION_PROVIDER_NAME), 1);
		Assertions.assertEquals(1, result1.size());
		Assertions.assertEquals(3, result1.get(0).intValue());
	}

	private void setupSecondary() throws Exception {
		//A chaque test on recrée la table famille

		try (final SqlConnection connection = dataBaseManager.getConnectionProvider("secondary").obtainConnection()) {
			execpreparedStatement(connection, CREATE_TABLE_MOVIE);
		}

	}

	protected abstract GenerationMode getExpectedGenerationMode();

	@Test
	public final void testInsert() throws Exception {
		final String insertWithgeneratedKey = obtainMainConnection().getDataBase().getSqlDialect()
				.createInsertQuery(
						"movId",
						Arrays.asList("title"),
						"seq_",
						"movie",
						"dto");

		final GenerationMode generationMode = obtainMainConnection().getDataBase().getSqlDialect().getGenerationMode();
		//We check that we have the right expected mode
		Assertions.assertEquals(getExpectedGenerationMode(), generationMode);
		//---
		long generatedKey;
		try (final SqlConnection connection = obtainMainConnection()) {
			final Movie movie = new Movie();
			movie.setTitle("frankenstein");
			generatedKey = dataBaseManager
					.executeUpdateWithGeneratedKey(
							SqlStatement.builder(insertWithgeneratedKey).bind("dto", Movie.class, movie).build(),
							generationMode,
							"mov_id",
							Long.class,
							MAIL_ADAPTER,
							connection)
					.val2();
			connection.commit();
		}
		final List<Integer> result = executeQuery(Integer.class, "select count(*) from movie", null);
		Assertions.assertEquals(1, result.size());
		Assertions.assertEquals(1, result.get(0).intValue());

		final List<Integer> keys = executeQuery(Integer.class, "select mov_id from movie", null);
		Assertions.assertEquals(1, keys.size());
		Assertions.assertEquals(generatedKey, keys.get(0).intValue());
	}

	protected abstract SqlDialect getDialect();

	@Test
	public void testSelectDtListState() throws Exception {
		//On crée les données
		createDatas();
		//----
		StringBuilder stringBuilder = new StringBuilder("select * from MOVIE");
		getDialect().appendListState(stringBuilder, null, 0, "title", false);
		final String querySortAsc = stringBuilder.toString();
		final List<Movie> resultSortAsc = executeQuery(Movie.class, querySortAsc, null);
		Assertions.assertEquals(3, resultSortAsc.size());
		Assertions.assertEquals("citizen kane", resultSortAsc.get(0).getTitle());

		stringBuilder = new StringBuilder("select * from MOVIE");
		getDialect().appendListState(stringBuilder, null, 0, "title", true);
		final String querySortDesc = stringBuilder.toString();
		final List<Movie> resultSortDesc = executeQuery(Movie.class, querySortDesc, null);
		Assertions.assertEquals(3, resultSortDesc.size());
		Assertions.assertEquals("vertigo", resultSortDesc.get(0).getTitle());

		stringBuilder = new StringBuilder("select * from MOVIE");
		getDialect().appendListState(stringBuilder, 2, 0, null, false);
		final String queryMaxRows = stringBuilder.toString();

		final List<Movie> resultMaxRows = executeQuery(Movie.class, queryMaxRows, null);
		Assertions.assertEquals(2, resultMaxRows.size());

		stringBuilder = new StringBuilder("select * from MOVIE where 1=1");
		getDialect().appendListState(stringBuilder, 2, 0, null, false);
		final String queryMaxRows2 = stringBuilder.toString();

		final List<Movie> resultMaxRows2 = executeQuery(Movie.class, queryMaxRows2, null);
		Assertions.assertEquals(2, resultMaxRows2.size());

		stringBuilder = new StringBuilder("select * from MOVIE");
		getDialect().appendListState(stringBuilder, null, 1, null, false);
		final String querySkipRows = stringBuilder.toString();
		final List<Movie> resultSkipRows = executeQuery(Movie.class, querySkipRows, null);
		Assertions.assertEquals(2, resultSkipRows.size());
		Assertions.assertEquals(resultMaxRows.get(1).getMovId(), resultSkipRows.get(0).getMovId());

	}
}
