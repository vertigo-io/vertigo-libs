package io.vertigo.ui;

import org.springframework.context.annotation.ComponentScan;

import io.vertigo.ui.impl.springmvc.config.VSpringWebConfig;

@ComponentScan("io.vertigo.ui.controller")
public class TestVSpringWebConfig extends VSpringWebConfig {
	// nothing basic config is enough
}
