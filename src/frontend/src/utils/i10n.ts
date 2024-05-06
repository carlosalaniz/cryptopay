import locales, { defaultLocale, type LocaleContent } from "@/assets/locale";
type LocaleConfiguration = { language: string, country: string, name: string }


class l10n {
    private localStorageKey = 'locale'
    private locale: LocaleConfiguration;
    private static instance: l10n;

    public static getInstance() {
        if (!l10n.instance) {
            l10n.instance = new l10n()
        }
        return l10n.instance
    }

    private constructor() {
        const locale = localStorage.getItem(this.localStorageKey)
        if (locale) {
            this.locale = JSON.parse(locale)
        } else {
            this.locale = this.availableLocales[0]
        }
    }

    private get localeContent() {
        const localeKey = `/locale/${this.locale}.json`
        let locale = locales.get(localeKey)
        if (!locale) {
            locale = locales.get(defaultLocale)
        }
        return locale as LocaleContent;
    }

    private availableLocales = [
        { language: 'es', country: "mx", name: 'Español' },
        // { locale: 'en', country: "us", name: 'English' },
    ]

    get l10n() {
        return `${this.locale.language}-${this.locale.country}`
    }

    get language() {
        return this.locale.language
    }

    get country() {
        return this.locale.country
    }

    public setLocaleConfiguration(newLocaleConfiguration: LocaleConfiguration) {
        this.locale = newLocaleConfiguration
        localStorage.setItem(this.localStorageKey, JSON.stringify(newLocaleConfiguration))
    }

    /**
     * Retrieves the localized string for the given path.
     * 
     * @param path - The path to the desired localized string.
     * @returns The localized string if found, otherwise the original path.
     */
    public get(path: string, params?: { [key: string]: string | number }) {
        const keys = path.split('.');
        let localizedString = path;
        let translation = this.localeContent;

        // Traverse the keys in the path to find the corresponding localized string
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (
                translation &&
                translation[key] &&
                typeof translation[key] === 'object'
            ) {
                translation = translation[key] as LocaleContent;
            } else if (i === keys.length - 1 && typeof translation[key] === 'string') {
                localizedString = translation[key] as string;
            } else {
                break;
            }
        }

        if (params) {
            // interpolate the params into the localized string
            for (const key in params) {
                localizedString = localizedString.replace(`{${key}}`, `${params[key]}`);
            }
            // remove all unused params
            localizedString = localizedString.replace(/{[^}]*}/g, this.get('undefined'));
        }
        return localizedString;
    }
}

export default l10n.getInstance();