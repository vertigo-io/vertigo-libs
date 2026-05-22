package io.vertigo.datastore;

import java.io.File;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;

import io.vertigo.arch.ArchChecker;

@AnalyzeClasses(packages = "io.vertigo.datastore", importOptions = { ImportOption.DoNotIncludeTests.class })
class DatastoreArchitectureTest {
	private static final File YAML = new File("src/test/java/io/vertigo/datastore/datastore-modules.yaml");

	@ArchTest
	void module_dependency_rules(final JavaClasses classes) {
		ArchChecker.check(classes, YAML);
	}
}
