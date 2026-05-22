package io.vertigo.account;

import java.io.File;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;

import io.vertigo.arch.ArchChecker;

@AnalyzeClasses(packages = "io.vertigo.account", importOptions = { ImportOption.DoNotIncludeTests.class })
class AccountArchitectureTest {
	private static final File YAML = new File("src/test/java/io/vertigo/account/account-modules.yaml");

	@ArchTest
	void module_dependency_rules(final JavaClasses classes) {
		ArchChecker.check(classes, YAML);
	}
}
