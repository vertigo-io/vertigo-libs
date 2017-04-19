import application from 'focus-core/application';
import router from 'focus-core/router';
import ProcessDetailView from '../views/definition/detail';

export default router.extend({
    log: true,
    beforeRoute() {
        application.changeRoute('definitions');
    },
    routes: {
        'definitions(/:name)': 'definitions'
    },
    definitions(name) {
        this._pageContent(ProcessDetailView, {props: {id : name}});
    }
});
