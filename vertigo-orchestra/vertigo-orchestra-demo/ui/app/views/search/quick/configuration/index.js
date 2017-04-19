// seearch services
import service from '../../../../services/search';

//search configurations
import groupComponent from '../components/group';
import lineMapper from '../../lines/mapper';
import onLineClick from '../../lines/line-click';
import {scopesConfig} from '../../../../config/scopes';

export const configuration = {
    scrollParentSelector:'[data-demo="quick-search-area"] [data-focus="popin-window"]', // selector for infinite scroll
    onLineClick,
    service,
    renderSingleGroupDecoration: false,
    lineComponentMapper: lineMapper,
    groupComponent,
    groupMaxRows: 5, // ne fonctionne pas, n'est pas renvoyé dans la config du service search.
    scopesConfig: scopesConfig
};
