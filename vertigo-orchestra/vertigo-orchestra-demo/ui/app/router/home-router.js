import application from 'focus-core/application';
import router from 'focus-core/router';
import HomeView from '../views/home';

export default router.extend({
    log: true,
    beforeRoute() {
        application.changeRoute('home');
    },
    routes: {
        '': 'home',
        home: 'home'
    },
    home() {
        this._pageContent(HomeView);
    }
});
