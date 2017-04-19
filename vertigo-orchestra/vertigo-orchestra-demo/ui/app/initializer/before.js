////////////////////////////////////////////////////////
/// SCRIPT EXECUTED BEFORE DOM CONTENT LOADED
////////////////////////////////////////////////////////
import referenceListInitializer from './scripts/reference-list-initializer';
import domainInitializer from './scripts/domain-initializer';
import definitionInitializer from './scripts/definition-initializer';
import translationInitializer from './scripts/translation-initializer';
import numeralInitializer from './scripts/numeral-initializer';

/**
 * Launch initializers that can to be executed before DOM content is loaded (asap)
 */
export const initialize = () => {
    console.info('[INITIALIZER - BEFORE CONTENT LOADED]');
    translationInitializer();
    definitionInitializer();
    domainInitializer();
    referenceListInitializer();
    numeralInitializer();
};
