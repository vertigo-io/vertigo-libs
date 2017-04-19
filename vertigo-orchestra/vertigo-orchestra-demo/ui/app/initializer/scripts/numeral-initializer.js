import {language} from 'focus-core/definition/formatter/number';
import frLanguage from 'numeral/languages/fr';


export default () => {
    console.info('|--- NUMERAL');

    // load fr language
    language('fr', frLanguage);
    console.info('   |--- Add language french');

    //define the language
    language('fr');
    console.info('   |--- Numeral correctly initialized. Current language:' + language());
}
