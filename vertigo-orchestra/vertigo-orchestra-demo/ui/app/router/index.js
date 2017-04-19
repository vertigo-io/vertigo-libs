import HomeRouter from './home-router';

import DefinitionRouter from './definition-router';

export const registerRoutes = () => {
    new HomeRouter();

    new DefinitionRouter();
};
