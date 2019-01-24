/**
 * Directive minify
 * @param offset int : Offset from top screen, used for static header
 * @param offsetElSelector String
 * @param leftOffset int : Offset from left screen, used for static menu
 * @param leftOffsetElSelector String
 * 
 * Usage : 
 * 
 * Example :  
 * 
 */
Vue.directive('minify', {
        bind: function(elMaxi, args) {
        	const offset = args.value.offset;
        	const offsetElSelector = args.value.offsetEl;
        	const leftOffset = args.value.leftOffset;
        	const leftOffsetElSelector = args.value.leftOffsetEl;
        	const elMini = elMaxi.querySelector('.mini')
        	elMaxi.classList.add("not-mini")
        	
        	Vue.scrollMinifyerHandler = function() {
        		var currentOffset = offset?offset:(offsetElSelector?(document.querySelector(offsetElSelector).getBoundingClientRect().height+document.querySelector(offsetElSelector).getBoundingClientRect().y):0);
        		var currentLeftOffset = 0;
        		if(leftOffset) {
        			currentLeftOffset = leftOffset;
        		} else if(leftOffsetElSelector) {
        			var leftOffsetElement = document.querySelector(leftOffsetElSelector);
        				currentLeftOffset = leftOffsetElement.getBoundingClientRect().width+leftOffsetElement.getBoundingClientRect().x;
        		}
        		
        		var elMiniHeight = elMini.getBoundingClientRect().height-currentOffset;
        		var elMaxiHeight = elMaxi.getBoundingClientRect().height;
        		//We check if nav should be fixed
        		// Add the fixed class to the header when you reach its scroll position. Remove "fixed" when you leave the scroll position
            	if (window.pageYOffset > elMaxiHeight-elMiniHeight) {
                	elMini.classList.add("visible");
            		elMini.style.top=0;//top
            		elMini.style.paddingTop = currentOffset+"px";  
            		elMini.style.paddingLeft = currentLeftOffset+"px";    			
        		} else {
                	elMini.classList.remove("visible");
        			elMini.style.top = (-elMiniHeight-currentOffset)+"px";
        		}        		
        	};
        	
        	window.addEventListener('scroll', Vue.scrollMinifyerHandler)
        	window.addEventListener('resize', Quasar.utils.throttle(Vue.scrollMinifyerHandler,50))
        },
        componentUpdated : function(el) {
        	const interval = 50;
        	const maxDelay = 1000;
        	for(var delay = interval ; delay < maxDelay ; delay += delay) {
        		setTimeout(Vue.scrollMinifyerHandler,delay);
        	}
        },
        unbind: function(el) {
        	window.removeEventListener('scroll');
        	window.removeEventListener('resize');
        },
    });
