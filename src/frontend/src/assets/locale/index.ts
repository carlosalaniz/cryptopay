import esmx from './es-mx.json'

export type LocaleContent = {
    [key: string]: LocaleContent | string
}
export const defaultLocale = 'es-mx';
export const availableLocales = ['es-mx'];


const locales = new Map<string, LocaleContent>(
    [
        ['es-mx', esmx as LocaleContent]
    ]
)

export default locales;