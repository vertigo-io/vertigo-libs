export default {
    inserted: function (el, binding, vnode) {
        var watchKeys = binding.expression;
        if (!window.watcherUpdates) {
            //Some init must be only once
            window.watcherUpdates = {
                originalDocumentTitle: document.title,
                updates_detected: false,
                acceptedUpdates: function () {
                    window.watcherUpdates.updates_detected = false;
                    document.title = window.watcherUpdates.originalDocumentTitle;
                },
                beforeWindowUnload: function (e) {
                    //les navigateurs n'affichent pas le message proposé pour éviter le scam, il suffit de retourner une chaine non vide
                    if (window.watcherUpdates.updates_detected) {
                        // Cancel the event
                        e.preventDefault()
                        // Chrome requires returnValue to be set
                        e.returnValue = 'Voulez-vous quitter cette page ? \n Les modifications que vous avez apportées ne seront peut-être pas enregistrées'
                    }
                },
            };
            window.addEventListener('beforeunload', window.watcherUpdates.beforeWindowUnload);

            if (vnode.context.$root.uiMessageStack) {
                var uiMessageStack = vnode.context.$root.uiMessageStack;
                var hasError = uiMessageStack.globalErrors.length > 0;
                for (let watchKey of watchKeys.split(",")) {
                    hasError = hasError || uiMessageStack.objectFieldErrors[watchKey];
                    if (hasError) {
                        break;
                    }
                }
                if (hasError) {
                    window.watcherUpdates.updates_detected = true;//if there is other errors => mark as dirty
                }
            }
        }
        //each button eventListener click
        el.addEventListener('click', window.watcherUpdates.acceptedUpdates);

        //each button watch data (watchKey may differ)
        for (let watchKey of watchKeys.split(",")) {
            vnode.context.$root.$watch('vueData.' + watchKey, function () {
                window.watcherUpdates.updates_detected = true;
                document.title = '*' + window.watcherUpdates.originalDocumentTitle;
            }, { deep: true });
        }
    },
    unbind: function () {
        window.removeEventListener('beforeunload', window.watcherUpdates.beforeWindowUnload)
    }
}