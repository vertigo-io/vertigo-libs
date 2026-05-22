package io.vertigo.ui;

import java.io.File;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;

import io.vertigo.arch.ArchChecker;

@AnalyzeClasses(packages = "io.vertigo.ui", importOptions = { ImportOption.DoNotIncludeTests.class })
class UiArchitectureTest {
	private static final File YAML = new File("src/test/java/io/vertigo/ui/ui-modules.yaml");

	@ArchTest
	void module_dependency_rules(final JavaClasses classes) {
		ArchChecker.check(classes, YAML);
	}
}
