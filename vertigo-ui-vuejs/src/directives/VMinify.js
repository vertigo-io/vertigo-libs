import * as Vue from "vue"
import throttle from "quasar/src/utils/throttle/throttle.js"

export default {
    created: function(elMaxi, binding) {
            const topOffset = binding.value?binding.value.topOffset:null;
            const topOffsetElSelector = binding.value?binding.value.topOffsetEl:null;
            const leftOffset = binding.value?binding.value.leftOffset:null;
            const leftOffsetElSelector = binding.value?binding.value.leftOffsetEl:null;
            const scrollContainerSelector = binding.value?binding.value.scrollContainerEl:'.q-page-container';
            const elMini = elMaxi.querySelector('.mini')
            for(var i=0 ; i<elMaxi.childNodes.length; i++) {
                var elChild = elMaxi.childNodes[i];
                if(elChild.classList && !elChild.classList.contains('mini')) {
                    elChild.classList.add("not-mini")
                }
            }
            
            Vue.minifyHandler = function() {
                var scrollContainer = elMaxi.closest(scrollContainerSelector); 
                var currentYScroll = scrollContainer?-scrollContainer.getBoundingClientRect().y:window.pageYOffset;
                var currentXScroll = scrollContainer?-scrollContainer.getBoundingClientRect().x:window.pageXOffset;
                var currentTopOffset = elMaxi.getBoundingClientRect().y+currentYScroll;
                var currentLeftOffset = elMaxi.getBoundingClientRect().x+currentXScroll;
                if(topOffset || topOffsetElSelector) {
                    currentTopOffset = Vue.minifyComputeOffset(topOffset, topOffsetElSelector, 0, 'TOP');
                }
                if(leftOffset || leftOffsetElSelector) {
                    currentLeftOffset = Vue.minifyComputeOffset(leftOffset, leftOffsetElSelector, 0, 'LEFT');
                }
                var elMiniHeight = elMini.getBoundingClientRect().height;
                var elMaxiHeight = elMaxi.getBoundingClientRect().height;
                //We check if nav should be fixed
                // Add the fixed class to the header when you reach its scroll position. Remove "fixed" when you leave the scroll position
                if (currentYScroll > elMaxiHeight-elMiniHeight) {
                    elMini.classList.add("visible");
                    elMini.style.top=currentTopOffset+"px";//top
                    elMini.style.left=currentLeftOffset+"px";//left  			
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
                    var offsetRect = offsetElement.getBoundingClientRect();
                    if(direction === 'LEFT') {
                        currentOffset = offsetRect.width+offsetRect.x;
                    } else if(direction === 'TOP') {
                        currentOffset = offsetRect.height+offsetRect.y;
                    }
                }
                return currentOffset;
            }
            window.addEventListener('scroll', Vue.minifyHandler)
            window.addEventListener('resize', throttle(Vue.minifyHandler,50))
        },
        updated : function() {
            const interval = 50;
            const maxDelay = 1000;
            //for(var delay = interval ; delay < maxDelay ; delay += delay) {
                setTimeout(Vue.minifyHandler,50);
            //}
        },
        unmounted: function(elMaxi) {
            window.removeEventListener('scroll');
            window.removeEventListener('resize');
            
            for(var i=0 ; i<elMaxi.childNodes.length; i++) {
                var elChild = elMaxi.childNodes[i];
                if(elChild.classList) {
                    elChild.classList.remove("not-mini")
                }
            }
        },
    }