/**
 * Directive scroll-spy
 * @param offset int : Offset from top screen, used for static header
 * 
 * Usage : Just put this directive on your nav container.
 * This directive looks for all 'A' tags, extract their href and link them to page's container with same id
 * 
 * Example :  
 * <nav v-scroll-spy="{offset:50}">
 *   <q-item tag="a" href="#first">First section label</q-item>			        
 *   <q-item tag="a" href="#second">Second section label</q-item>
 * </nav>
 * 
 * <div id="first">
 *	  <h1>First</h1>
 *	  <!-- content -->
 * </div>
 * <div id="second">
 *	  <h1>Second</h1>
 *	  <!-- content -->
 * </div>
 * 
 */
Vue.directive('scroll-spy', {
        bind: function(el, args) {
        	const offset = args.value.offset?args.value.offset:0;
        	Vue.scrollSpyHandler = function(scroll) {
        		const els = el.querySelectorAll('a')
        		var scrollBreakpoints = []
        		scrollBreakpoints.push(0)
        		
        		//We compute breakpoints
        		for(var i = 1 ; i < els.length; i++) {
        			const elId = els[i].href.substring(els[i].href.lastIndexOf('#'));
				    const elSpyed = document.querySelector(elId)
				    if(elSpyed) {
						const elTop = elSpyed.getBoundingClientRect().top
				        scrollBreakpoints.push(elTop)						
					} else {
						console.warn('ScrollSpy element '+elId+' not found')
					}
			    } 
        		//We looks between which breakpoints we are
        		for(var i = 0 ; i < els.length; i++) {
			      if(scrollBreakpoints[i] <= offset && (i>=els.length-1 || offset < scrollBreakpoints[i+1])) {
			    	  els[i].classList.add("active")
				  } else {
					  els[i].classList.remove("active");
				  }
			    }
        	};
        	window.addEventListener('scroll', Vue.scrollSpyHandler)
        },
        unbind: function(el) {
        	window.removeEventListener('scroll')
        },
    });
