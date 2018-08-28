package io.vertigo.ui.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;

@Configuration
@EnableWebMvc
@ComponentScan("io.vertigo.ui.controller")
public class MvcWebConfig implements WebMvcConfigurer {

   @Autowired
   private ApplicationContext applicationContext;

   /*
    * STEP 1 - Create SpringResourceTemplateResolver
    * */
   @Bean
   public SpringResourceTemplateResolver templateResolver() {
      SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
      templateResolver.setApplicationContext(applicationContext);
      templateResolver.setPrefix("/WEB-INF/views/");
      templateResolver.setSuffix(".html");
      return templateResolver;
   }

   /*
    * STEP 2 - Create SpringTemplateEngine
    * */
   @Bean
   public SpringTemplateEngine templateEngine() {
      SpringTemplateEngine templateEngine = new SpringTemplateEngine();
      templateEngine.setTemplateResolver(templateResolver());
      templateEngine.setEnableSpringELCompiler(true);
      return templateEngine;
   }

   /*
    * STEP 3 - Register ThymeleafViewResolver
    * */
   @Override
   public void configureViewResolvers(ViewResolverRegistry registry) {
      ThymeleafViewResolver resolver = new ThymeleafViewResolver();
      resolver.setTemplateEngine(templateEngine());
      registry.viewResolver(resolver);
   }

}
