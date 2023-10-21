import { nextTick } from 'vue'

export default {
     updated: function (el, binding, vnode) {
          nextTick(() => {
               if (!window.watcherUpdates || !window.watcherUpdates.updates_detected) {
                    el.classList.add('hidden')
               } else {
                    el.classList.remove('hidden')
               }
          })
     }
}