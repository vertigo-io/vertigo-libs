import Vue from "vue"
import Quasar from "quasar"

export default {
    inserted: function (elNav, args) {
        const debugMode = args.value.debug ? args.value.debug : false;

        const startingOffset = args.value.startingOffset ? args.value.startingOffset : 24;
        const fixedPos = args.value.fixedPos ? args.value.fixedPos : 24;
        const fixeTrigger = startingOffset - fixedPos;
        const scanner = args.value.scanner ? args.value.scanner : fixedPos + 30; //scanner is 30px bottom of fixedPos, must be smaller than the smallest first element
        const elAs = elNav.querySelectorAll('a')
        elAs[0].classList.add("active") //first active
        const scrollContainer = Quasar.utils.scroll.getScrollTarget(document.querySelector(elAs[0].hash))

        let scannerLines = []
        let startLinearLine
        let lastScrollLine
        if (debugMode) {
            //scannerLine1 = Vue.createDebugLine('nearesBlock','absolute',scanner,'red' );
            // scannerLine1b = Vue.createDebugLine('scannerStart', 'fixed', scanner, 'orange');
            // startingTopLine = Vue.createDebugLine('startingTop', 'fixed', startingOffset, 'green');//position where the element is at start
            // scannerLine3 = Vue.createDebugLine('fixedPos', 'fixed', fixedPos, 'blue'); //position where the nav is fixed   
            startLinearLine = Vue.createDebugLine('startLinear', 'absolute', 0, 'red');
            lastScrollLine = Vue.createDebugLine('last', 'absolute', 0, 'red');
        }


        Vue.scrollSpyHandler = function () {
            if (debugMode) {
                var el = elNav;
                var _x = 0;
                var _y = 0;
                while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                    _x += el.offsetLeft - el.scrollLeft;
                    _y += el.offsetTop - el.scrollTop;
                    el = el.offsetParent;
                }
                console.log("x: " + _x);
                console.log("y: " + _y + " (startingOffset)");
                //return { top: _y, left: _x };
            }
            // Add the fixed class to the header when you reach its scroll position. Remove "fixed" when you leave the scroll position
            if (window.pageYOffset > fixeTrigger) {
                if (!elNav.style.top) {
                    elNav.style.top = fixedPos + "px";
                    //when fixed, we must set a valid width
                    if (!elNav.style.width) {
                        elNav.style.width = elNav.getBoundingClientRect().width + "px";
                    }
                    elNav.classList.add("fixed");
                }
            } else {
                if (elNav.style.top) {
                    elNav.classList.remove("fixed");
                    elNav.style.top = null;
                    elNav.style.width = elNav.getBoundingClientRect().width + "px"; //we keep the element size, when it's not fixed and keep it after
                }
            }

            //We compute breakpoints
            var scrollPosition = Quasar.utils.scroll.getScrollPosition(scrollContainer)
            var scrollBreakpoints = Vue.computeBreakPoints(scrollPosition);
            //We looks between which breakpoints we are
            for (var i = 0; i < elAs.length; i++) {
                if (scrollBreakpoints[i] <= scrollPosition && (i >= elAs.length - 1 || scrollPosition < scrollBreakpoints[i + 1])) {
                    elAs[i].classList.add("active")
                } else {
                    elAs[i].classList.remove("active");
                }
            }
        };

        Vue.computeBlockTop = function (scrollPosition) {
            var blockTop = []
            for (let i = 0; i < elAs.length; i++) {
                const elScrollId = elAs[i].hash;
                const elScroll = document.querySelector(elScrollId)
                if (elScroll) {
                    blockTop.push(scrollPosition + elScroll.getBoundingClientRect().top);
                } else {
                    //console.warn('ScrollSpy element '+elScrollId+' not found')
                }
            }
            return blockTop;
        }

        Vue.scrollTo = function (event) {
            event.preventDefault();
            const elScrollId = event.target.hash;
            const elScroll = document.querySelector(elScrollId)
            var toScroll = Quasar.utils.scroll.getScrollPosition(scrollContainer) + elScroll.getBoundingClientRect().top - scanner


            var scrollPosition = Quasar.utils.scroll.getScrollPosition(scrollContainer)
            var blockTop = Vue.computeBlockTop(scrollPosition);
            var scrollBreakpoints = Vue.computeBreakPoints(scrollPosition);
            for (var i = 0; i < elAs.length; i++) {
                if (elAs[i].hash == elScrollId) {
                    //console.log('scrollTo', blockTop[i]-scanner, scrollBreakpoints[i+1])
                    if (blockTop[i] - scanner < scrollBreakpoints[i + 1] || !scrollBreakpoints[i + 1]) {
                        toScroll = blockTop[i] - scanner;
                    } else {
                        toScroll = scrollBreakpoints[i + 1] - 1;
                    }
                    break;
                }
            }
            var duration = 200
            Quasar.utils.scroll.setScrollPosition(scrollContainer, toScroll, duration)
        };



        Vue.computeBreakPoints = function (scrollPosition) {
            var blockTop = Vue.computeBlockTop(scrollPosition);

            const windowHeight = (window.innerHeight || document.documentElement.clientHeight); /** visible height */
            const scrollHeight = Quasar.utils.scroll.getScrollHeight(scrollContainer) /** height of scrollable element */
            const scrollMax = scrollHeight - windowHeight /** Maximum possible scroll */
            const scrollEnd = scrollMax; //blockTop[blockTop.length-1]; /** Finish linear move at this scroll position */
            let scrollStart = scrollEnd - windowHeight + scanner; /** Start linear move at this scroll position : start a block start */
            for (let i = 1; i < elAs.length; i++) {
                if (blockTop[i] - scanner > scrollStart) {
                    scrollStart = blockTop[i] - scanner;
                    break;
                }
            }

            const scrollDelta = scrollEnd - scrollStart //scroll linear regression "to" length
            //console.log('SP',scrollPosition, ' WH', windowHeight, ' SH',scrollHeight, ' SM', scrollMax, ' SS', scrollStart,  ' SD', scrollDelta, " scanner",scanner    );
            var scrollBreakpoints = []
            scrollBreakpoints.push(0)

            for (let i = 1; i < elAs.length; i++) {
                if (blockTop[i] - scanner > scrollStart) {
                    scrollBreakpoints[i] = scrollStart + scrollDelta * (blockTop[i] - scrollStart) / (scrollHeight - scrollStart);
                    //console.log(i+' scrollBreakpoints top: ',blockTop[i])
                } else {
                    scrollBreakpoints[i] = blockTop[i] - scanner;
                }
                scrollBreakpoints[i] = Math.round(scrollBreakpoints[i])

            }
            if (debugMode) {
                for (let i = 1; i < elAs.length; i++) {
                    var scannerLine;
                    if (scannerLines.length < i) {
                        scannerLine = Vue.createDebugLine('navId#' + i, 'absolute', 0, 'red');
                        scannerLines.push(scannerLine);
                    } else {
                        scannerLine = scannerLines[i - 1];
                    }
                    scannerLine.style.top = (scrollBreakpoints[i] + scanner) + 'px';
                }
                startLinearLine.style.top = (scrollStart + scanner) + 'px';
                lastScrollLine.style.top = (scrollEnd + scanner) + 'px';
            }
            return scrollBreakpoints;
        };

        Vue.createDebugLine = function (name, position, top, color) {
            let scannerLine1 = document.createElement("div");
            scannerLine1.style.position = position;
            scannerLine1.style.top = top + 'px';
            scannerLine1.style.border = 'none';
            scannerLine1.style.borderTop = color + ' solid 1px';
            scannerLine1.style.width = '100%';
            scannerLine1.style.zIndex = '10000';
            scannerLine1.style.padding = '0px';
            scannerLine1.style.lineHeight = '0px';
            scannerLine1.style.fontSize = '12px';
            scannerLine1.style.color = color;
            scannerLine1.innerHTML = name
            document.querySelector('body').appendChild(scannerLine1);
            return scannerLine1;
        };

        elNav.classList.add("scroll-spy-nav");
        for (var i = 0; i < elAs.length; i++) {
            elAs[i].addEventListener('click', Vue.scrollTo);
        }
        window.addEventListener('scroll', Vue.scrollSpyHandler)
        window.addEventListener('resize', Quasar.utils.throttle(Vue.scrollSpyHandler, 50))
    },
    unbind: function (elNav) {
        elNav.classList.remove("scroll-spy-nav");
        window.removeEventListener('scroll')
        window.removeEventListener('resize')
        const elAs = elNav.querySelectorAll('a')
        for (var i = 0; i < elAs.length; i++) {
            elAs.removeEventListener('click')
        }
    },
}