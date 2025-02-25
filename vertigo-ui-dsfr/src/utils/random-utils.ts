import {useId} from "vue";

const alphanumBase = 'abcdefghijklmnopqrstuvwyz0123456789'
// We need to duplicate the base string to have a longer string
// to avoid Math.random to return the same value twice
export const alphanum = alphanumBase.repeat(10)

export const getRandomAlphaNum = () => {
    const randomIndex = Math.floor(Math.random() * alphanum.length)
    return alphanum[randomIndex]
}

export const getRandomString = (length: number) => {
    return Array.from({ length })
        .map(getRandomAlphaNum)
        .join('')
}

export const useRandomId = (prefix = '', suffix = '') => {
    return (prefix ? `${prefix}-` : '') + useId() + (suffix ? `-${suffix}` : '')
}

export default {
    useRandomId
}