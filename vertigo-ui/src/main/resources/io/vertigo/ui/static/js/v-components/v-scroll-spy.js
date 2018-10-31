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
 */
Vue.directive('scroll-spy', {
        bind: function(elNav, args) {
        	const offset = args.value.offset?args.value.offset:0;
        	const elAs = elNav.querySelectorAll('a')
        	const scrollContainer = Quasar.utils.scroll.getScrollTarget(document.querySelector(elAs[0].hash))
    		
        	Vue.scrollSpyHandler = function(scroll) {
        		//We compute breakpoints
        		var scrollPosition = Quasar.utils.scroll.getScrollPosition(scrollContainer)
        		var scrollBreakpoints = Vue.computeBreakPoints(scrollPosition);
        		//We looks between which breakpoints we are
        		for(var i = 0 ; i < elAs.length; i++) {
        			if(scrollBreakpoints[i] <= scrollPosition && (i >= elAs.length-1 || scrollPosition < scrollBreakpoints[i+1])) {
				      elAs[i].classList.add("active")
				  } else {
					  elAs[i].classList.remove("active");
				  }
			    }
        	};
        	
        	Vue.scrollTo = function(event){
        		event.preventDefault();
        		const elScrollId = event.target.hash;
        		const elScroll = document.querySelector(elScrollId)
                var toScroll = Quasar.utils.scroll.getScrollPosition(scrollContainer)+elScroll.getBoundingClientRect().top-offset
                
        		var scrollPosition = Quasar.utils.scroll.getScrollPosition(scrollContainer)
        		var scrollBreakpoints = Vue.computeBreakPoints(scrollPosition);
        		for(var i = 0 ; i < elAs.length; i++) {
        			if(elAs[i].hash == elScrollId) {
        				toScroll = scrollBreakpoints[i];
        				break;
        			}
			    }
                var duration = 200
                Quasar.utils.scroll.setScrollPosition(scrollContainer,toScroll, duration)
            };
        	
        	Vue.computeBreakPoints = function(scrollPosition){
        		var scrollBreakpoints = []
        		scrollBreakpoints.push(0)
        		for(var i = 1 ; i < elAs.length; i++) {
        			const elScrollId = elAs[i].hash;
				    const elScroll = document.querySelector(elScrollId)
				    if(elScroll) {
				    	scrollBreakpoints.push(scrollPosition+elScroll.getBoundingClientRect().top-offset);      
					} else {
						console.warn('ScrollSpy element '+elScrollId+' not found')
					}
			    }
        		
        		const windowHeight = (window.innerHeight || document.documentElement.clientHeight); /** visible height */
        		const scrollHeight = Quasar.utils.scroll.getScrollHeight(scrollContainer) /** height of scrollable element */ 
        		const scrollMax = scrollHeight - windowHeight /** Maximum possible scroll */  
        		const lastHeight = Quasar.utils.scroll.getScrollHeight(scrollContainer) - scrollBreakpoints[scrollBreakpoints.length-1]; /** Last element height */
        		const scrollStart = scrollMax - lastHeight + offset /** Start linear move at this scroll position */
        		
        		for(var i = 1 ; i < elAs.length; i++) {
        			var prev = scrollBreakpoints[i];
        			if(scrollBreakpoints[i] > scrollStart) {
        				scrollBreakpoints[i] = scrollStart + ((scrollBreakpoints[i] - scrollStart)/lastHeight) * (scrollMax-scrollStart-offset)
        			}	
        			scrollBreakpoints[i] = Math.round(scrollBreakpoints[i])
        			//console.log(i+'  from: '+prev+ '  to:'+scrollBreakpoints[i] )
        		}
        		return scrollBreakpoints;
            };
            
            for(var i = 0 ; i < elAs.length; i++) {
    			elAs[i].addEventListener('click', Vue.scrollTo);
    		}		    
        	window.addEventListener('scroll', Vue.scrollSpyHandler)
        },
        unbind: function(el) {
        	window.removeEventListener('scroll')
        	const elAs = elNav.querySelectorAll('a')
    		for(var i = 0 ; i < elAs.length; i++) {
    			elAs.removeEventListener('click')		    
    		}
        },
    });
