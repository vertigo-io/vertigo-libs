/**
 * Mapping DSFR -> Quasar pour les icônes fonctionnelles
 *
 * Version DSFR : 1.14.4 (@gouvfr/dsfr npm package)
 *
 * Changements depuis DSFR 1.13.1 :
 * - Les icônes RemixIcon (arrow-drop-*, skip-*, checkbox-blank-circle-*, etc.)
 *   ont été remplacées par les icônes SVG natives du DSFR.
 * - Préfixe `fr--` pour les icônes custom DSFR (ex: fr--bold, fr--quote-line).
 *
 * Choix des alternatives :
 * - Flèches : homogénéisation en arrow-*-s-line (small, sans cercle)
 *   sauf first/last qui utilisent les icônes DSFR custom avec sémantique explicite.
 * - expansionItem : dense -> sans cercle pour cohérence visuelle.
 * - play-circle-line : seul équivalent disponible pour l'expand/collapse tree.
 */

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
	        dropdown: 'fr-icon-arrow-down-s-line'
	    },
	    chevron: {
	        left: 'fr-icon-arrow-left-s-line',
	        right: 'fr-icon-arrow-right-s-line'
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
	        navigationIcon: 'fr-icon-checkbox-circle-fill'
	    },
	    chip: {
	        remove: 'fr-icon-close-line',
	        selected: 'fr-icon-check-line'
	    },
	    datetime: {
	        arrowLeft: 'fr-icon-arrow-left-s-line',
	        arrowRight: 'fr-icon-arrow-right-s-line',
	        now: 'fr-icon-time-line',
	        today: 'fr-icon-map-pin-2-line'
	    },
	    editor: {
	        bold: 'fr-icon-fr--bold',
	        italic: 'fr-icon-italic',
	        strikethrough: 'fr-icon-strikethrough',
	        underline: 'fr-icon-underline',
	        unorderedList: 'fr-icon-list-unordered',
	        orderedList: 'fr-icon-list-ordered',
	        subscript: 'fr-icon-subscript',
	        superscript: 'fr-icon-superscript',
	        hyperlink: 'fr-icon-link',
	        toggleFullscreen: 'fr-icon-fullscreen-line',
	        quote: 'fr-icon-fr--quote-line',
	        left: 'fr-icon-align-left',
	        center: 'fr-icon-align-center',
	        right: 'fr-icon-align-right',
	        justify: 'fr-icon-align-justify',
	        print: 'fr-icon-printer-line',
	        outdent: 'fr-icon-indent-decrease',
	        indent: 'fr-icon-indent-increase',
	        removeFormat: 'fr-icon-eraser-line',
	        formatting: 'fr-icon-h-1',
	        fontSize: 'fr-icon-font-size',
	        align: 'fr-icon-align-left',
	        hr: 'fr-icon-checkbox-line',
	        undo: 'fr-icon-arrow-go-back-line',
	        redo: 'fr-icon-arrow-go-forward-line',
	        heading: 'fr-icon-h-1',
	        code: 'fr-icon-code-view',
	        size: 'fr-icon-font-size',
	        font: 'fr-icon-file-text-line',
	        viewSource: 'fr-icon-code-view'
	    },
	    expansionItem: {
	        icon: 'fr-icon-arrow-down-s-line',
	        denseIcon: 'fr-icon-arrow-down-s-fill'
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
	        first: 'fr-icon-fr--arrow-left-s-first-line',
	        prev: 'fr-icon-arrow-left-s-line',
	        next: 'fr-icon-arrow-right-s-line',
	        last: 'fr-icon-fr--arrow-right-s-last-line'
	    },
	    rating: {
	        icon: 'fr-icon-star-line'
	    },
	    stepper: {
	        done: 'fr-icon-check-line',
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
	        firstPage: 'fr-icon-fr--arrow-left-s-first-line',
	        prevPage: 'fr-icon-arrow-left-s-line',
	        nextPage: 'fr-icon-arrow-right-s-line',
	        lastPage: 'fr-icon-fr--arrow-right-s-last-line',
			filterFull: 'fr-icon-filter-fill'
	    },
	    tree: {
	        icon: 'fr-icon-play-circle-line'
	    },
	    uploader: {
	        done: 'fr-icon-delete-bin-fill',
	        clear: 'fr-icon-close-line',
	        add: 'fr-icon-add-line',
	        upload: 'fr-icon-upload-2-line',
	        removeQueue: 'fr-icon-format-clear',
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
