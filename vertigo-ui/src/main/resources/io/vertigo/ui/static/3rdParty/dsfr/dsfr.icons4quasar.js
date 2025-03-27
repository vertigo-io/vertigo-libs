window.addEventListener('vui-before-plugins', function(event) {
	
	Quasar.iconSet.set( {
	    name: 'dsfr-icons',
	    type: {
	        positive: 'fr-icon-check-line',
	        negative: 'fr-icon-alert-line',
	        info: 'fr-icon-information-line',
	        warning: 'fr-icon-error-warning-line'
	    },
	    arrow: {
	        up: 'fr-icon-arrow-up-s-line',
	        right: 'fr-icon-arrow-right-s-line',
	        down: 'fr-icon-arrow-down-s-line',
	        left: 'fr-icon-arrow-left-s-line',
	        dropdown: 'fr-icon-arrow-drop-down-line'
	    },
	    chevron: {
	        left: 'fr-icon-arrow-drop-left-line',
	        right: 'fr-icon-arrow-drop-right-line'
	    },
	    colorPicker: {
	        spectrum: 'fr-icon-eye-line',
	        tune: 'fr-icon-equalizer-line',
	        palette: 'fr-icon-palette-line'
	    },
	    pullToRefresh: {
	        icon: 'fr-icon-refresh-line'
	    },
	    carousel: {
	        left: 'fr-icon-arrow-left-s-line',
	        right: 'fr-icon-arrow-right-s-line',
	        up: 'fr-icon-arrow-up-s-line',
	        down: 'fr-icon-arrow-down-s-line',
	        navigationIcon: 'fr-icon-checkbox-blank-circle-fill'
	    },
	    chip: {
	        remove: 'fr-icon-close-line',
	        selected: 'fr-icon-check-line'
	    },
	    datetime: {
	        arrowLeft: 'fr-icon-arrow-drop-left-line',
	        arrowRight: 'fr-icon-arrow-drop-right-line',
	        now: 'fr-icon-time-line',
	        today: 'fr-icon-map-pin-time'
	    },
	    editor: {
	        bold: 'fr-icon-bold',
	        italic: 'fr-icon-italic',
	        strikethrough: 'fr-icon-strikethrough',
	        underline: 'fr-icon-underline',
	        unorderedList: 'fr-icon-list-unordered',
	        orderedList: 'fr-icon-list-ordered',
	        subscript: 'fr-icon-subscript',
	        superscript: 'fr-icon-superscript-2',
	        hyperlink: 'fr-icon-link',
	        toggleFullscreen: 'fr-icon-fullscreen',
	        quote: 'fr-icon-double-quotes-r',
	        left: 'fr-icon-align-left',
	        center: 'fr-icon-align-center',
	        right: 'fr-icon-align-right',
	        justify: 'fr-icon-align-justify',
	        print: 'fr-icon-printer-line',
	        outdent: 'fr-icon-indent-decrease',
	        indent: 'fr-icon-indent-increase',
	        removeFormat: 'fr-icon-eraser',
	        formatting: 'fr-icon-h-1',
	        fontSize: 'fr-icon-font-size',
	        align: 'fr-icon-align-left',
	        hr: 'fr-icon-checkbox-indeterminate-line',
	        undo: 'fr-icon-arrow-go-back-line',
	        redo: 'fr-icon-arrow-go-forward-line',
	        heading: 'fr-icon-h-1',
	        code: 'fr-icon-code-view',
	        size: 'fr-icon-text-size',
	        font: 'fr-icon-text',
	        viewSource: 'fr-icon-code-view'
	    },
	    expansionItem: {
	        icon: 'fr-icon-arrow-drop-down-line',
	        denseIcon: 'fr-icon-arrow-drop-down-fill'
	    },
	    fab: {
	        icon: 'fr-icon-add-line',
	        activeIcon: 'fr-icon-close-line'
	    },
	    field: {
	        clear: 'fr-icon-close-circle-line',
	        error: 'fr-icon-error-warning-line'
	    },
	    pagination: {
	        first: 'fr-icon-skip-back-line',
	        prev: 'fr-icon-arrow-left-s-line',
	        next: 'fr-icon-arrow-right-s-line',
	        last: 'fr-icon-skip-forward-line'
	    },
	    rating: {
	        icon: 'fr-icon-star-line'
	    },
	    stepper: {
	        done: 'fr-icon-check-double-line',
	        active: 'fr-icon-pencil-line',
	        error: 'fr-icon-error-warning-line'
	    },
	    tabs: {
	        left: 'fr-icon-arrow-left-s-line',
	        right: 'fr-icon-arrow-right-s-line',
	        up: 'fr-icon-arrow-up-s-line',
	        down: 'fr-icon-arrow-down-s-line'
	    },
	    table: {
	        arrowUp: 'fr-icon-arrow-up-line',
	        warning: 'fr-icon-error-warning-line',
	        firstPage: 'fr-icon-skip-back-line',
	        prevPage: 'fr-icon-arrow-left-s-line',
	        nextPage: 'fr-icon-arrow-right-s-line',
	        lastPage: 'fr-icon-skip-forward-line',
			filterFull: 'fr-icon-filter-fill'
	    },
	    tree: {
	        icon: 'fr-icon-play-line'
	    },
	    uploader: {
	        done: 'fr-icon-delete-bin-2-fill',
	        clear: 'fr-icon-close-line',
	        add: 'fr-icon-add-box-line',
	        upload: 'fr-icon-upload-2-line',
	        removeQueue: 'fr-icon-clear-line',
	        removeUploaded: 'fr-icon-eraser-line'
	    }
	});
	
	Quasar.iconSet.iconMapFn = function(iconName) {
	    if (iconName.startsWith('fr-icon-') === true) {
	        return {
	            cls: iconName,
	            content : ' '
	        }
	    }
	};

});
