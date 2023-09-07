import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	lng: 'en',
	fallbackLng: 'en',
	resources: {
		en: en,
		fr: fr,
		ar: ar,
	},
	interpolation: {
		escapeValue: false // react already safes from xss
	}
});

export default i18n;
