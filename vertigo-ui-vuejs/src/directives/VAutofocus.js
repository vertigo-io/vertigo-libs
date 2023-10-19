export default {
    beforeMount: function(el, binding, vnode) {
        var doFocus = binding.value;
        if(doFocus && !window.autofocus) {
             window.autofocus = true;
             vnode.context.$nextTick(() => el.focus());
        }
     }
}