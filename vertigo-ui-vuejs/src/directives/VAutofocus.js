export default {
    mounted: function(el, binding, vnode) {
        var doFocus = binding.value;
        if(doFocus && !window.autofocus) {
             window.autofocus = true;
             el.focus();
        }
     }
}