// TODO rewrite : remove jquery
import $ from 'jquery';
import history from 'focus-core/history';

export default () => {
    console.info('|--- GLOBAL LINKS');

    $(document).on('click', 'a:not([data-bypass])', function touchHandler(evt) {
        const href = { prop: $(this).prop('href'), attr: $(this).attr('href') };
        const root = location.protocol + '//' + location.host + '/';

        if (href.prop && href.prop.slice(0, root.length) === root) {
            evt.preventDefault();
            history.navigate(href.attr, true);
        }
    });
}
