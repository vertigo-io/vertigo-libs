/**
 * Directive minify
 * @param topOffset int : Offset from top screen, used for static header
 * @param topOffsetElSelector String : Selector of top fixed element used to stick mini element (used for height variable header)
 * @param leftOffset int : Offset from left screen, used for static menu
 * @param leftOffsetElSelector String : Selector of left fixed element used to stick mini element (used for width variable left drawer like menu)
 * 
 * Usage : Just put this directive on a container with the two header version : maxi and mini.
 * This directive looks for a '.mini' class on an element, it will be use as mini version.
 * It will put a '.not-mini' class on all other first level child.
 * 
 * It simpler to juste use a mini version as a duplicate of the maxi version and use special css classes:
 * .ne-mini : for not in mini
 * .eq-mini : for only in mini
 * 
 * Example :  
 * <section v-minify="{topOffset:66, leftOffset:100}">
 *		<div th:ref="maxiHeader" class="bg-secondary (...)" >
 *				<div class="row"> <!-- content in both --> </div>
 *				<div class="row ne-mini"><!-- content only in maxi --></div>
 *		</div>
 *		<!-- mini could be an embedded of the maxi one. Keep a same background color, mini take all the screen and this make resize less obvious -->
 *		<div class="bg-secondary mini" th:insert="~{:: maxiHeader}"/>
 *	</section>
 */
Vue.directive('minify', {
	bind: function(elMaxi, args) {
        	const topOffset = args.value.topOffset;
        	const topOffsetElSelector = args.value.topOffsetEl;
        	const leftOffset = args.value.leftOffset;
        	const leftOffsetElSelector = args.value.leftOffsetEl;
        	const elMini = elMaxi.querySelector('.mini')
        	for(var i=0 ; i<elMaxi.childNodes.length; i++) {
        		var elChild = elMaxi.childNodes[i];
        		if(elChild.classList && !elChild.classList.contains('mini')) {
        			elChild.classList.add("not-mini")
        		}
        	}
        	
        	Vue.minifyHandler = function() {
        		var currentTopOffset = Vue.minifyComputeOffset(topOffset, topOffsetElSelector, 0, 'TOP');
        		var currentLeftOffset = Vue.minifyComputeOffset(leftOffset, leftOffsetElSelector, 0, 'LEFT');
        		
        		var elMiniHeight = elMini.getBoundingClientRect().height-currentTopOffset;
        		var elMaxiHeight = elMaxi.getBoundingClientRect().height;
        		//We check if nav should be fixed
        		// Add the fixed class to the header when you reach its scroll position. Remove "fixed" when you leave the scroll position
            	if (window.pageYOffset > elMaxiHeight-elMiniHeight) {
                	elMini.classList.add("visible");
            		elMini.style.top=0;//top
            		elMini.style.paddingTop = currentTopOffset+"px";  
            		elMini.style.paddingLeft = currentLeftOffset+"px";    			
        		} else {
                	elMini.classList.remove("visible");
        			elMini.style.top = (-elMiniHeight-currentTopOffset)+"px";
        		}        		
        	};
        	
        	Vue.minifyComputeOffset = function(offset, offsetElSelector, defaultOffset, direction) {
        		var currentOffset = defaultOffset;
        		if(offset) {
        			currentOffset = offset;
        		} else if(offsetElSelector) {
        			var offsetElement = document.querySelector(offsetElSelector);
        			if(direction === 'LEFT') {
        				currentOffset = offsetElement.getBoundingClientRect().width+offsetElement.getBoundingClientRect().x;
        			} else if(direction === 'TOP') {
        				currentOffset = offsetElement.getBoundingClientRect().height+offsetElement.getBoundingClientRect().y;
        			}
        		}
        		return currentOffset;
        	}
        	window.addEventListener('scroll', Vue.minifyHandler)
        	window.addEventListener('resize', Quasar.utils.throttle(Vue.minifyHandler,50))
        },
        componentUpdated : function(el) {
        	const interval = 50;
        	const maxDelay = 1000;
        	for(var delay = interval ; delay < maxDelay ; delay += delay) {
        		setTimeout(Vue.minifyHandler,delay);
        	}
        },
        unbind: function(elMaxi) {
        	window.removeEventListener('scroll');
        	window.removeEventListener('resize');
        	
        	for(var i=0 ; i<elMaxi.childNodes.length; i++) {
        		var elChild = elMaxi.childNodes[i];
        		if(elChild.classList) {
        			elChild.classList.remove("not-mini")
        		}
        	}
        },
    });
