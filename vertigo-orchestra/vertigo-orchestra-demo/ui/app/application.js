import history from 'focus-core/history';
import {registerRoutes} from './router';

export default function startApp() {
    //Start the application.
    console.log('Loading all the routes...');
    registerRoutes();
    console.log('All the routes are loaded...');

    //Start the router.
    history.start();
}
