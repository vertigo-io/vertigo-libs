package io.vertigo.ui.impl.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import io.vertigo.ui.core.AbstractVSpringMvcController;

public class SpringMvcVActionContextInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) throws Exception {
		if (handler instanceof HandlerMethod) {
			final HandlerMethod handlerMethod = (HandlerMethod) handler;
			if (AbstractVSpringMvcController.class.isAssignableFrom(handlerMethod.getBeanType())) {
				((AbstractVSpringMvcController) handlerMethod.getBean()).prepareContext(request);
			}
		}
		return true;
	}

	@Override
	public void postHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler, final ModelAndView modelAndView) throws Exception {
		if (handler instanceof HandlerMethod) {
			final HandlerMethod handlerMethod = (HandlerMethod) handler;
			if (AbstractVSpringMvcController.class.isAssignableFrom(handlerMethod.getBeanType())) {
				final AbstractVSpringMvcController controller = (AbstractVSpringMvcController) handlerMethod.getBean();
				if (!controller.isViewContextDirty()) {
					controller.storeContext();
				}
				//modelAndView.getModel().put("vContext", controller.getModel());
			}
		}
	}
}
