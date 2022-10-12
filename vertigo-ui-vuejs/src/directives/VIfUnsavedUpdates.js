export default {
     update: function (el, binding, vnode) {
          vnode.context.$nextTick(() => {
               if (!window.watcherUpdates || !window.watcherUpdates.updates_detected) {
                    el.classList.add('hidden')
               } else {
                    el.classList.remove('hidden')
               }
          })
     }
}