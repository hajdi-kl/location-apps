import { API_URL, Language } from './index';
import { SelectOption } from '@shared/types/common';

export const WEATHER_API_URL = API_URL + '/weather';

export const languages: SelectOption[] = [
  { name: 'Slovenščina', value: Language.Slovenian },
  { name: 'English', value: Language.English },
  { name: 'Deutsch', value: Language.German },
];

export const appDefaultLanguage = languages[0].value as Language;

export const translation = {
  [Language.English]: {
    dateFormat: "dd.MM.yyyy 'at' HH:mm",
    selectLocation: 'Select location',
    selectLocationDescription:
      'Select location to display weather information.',
    loadingData: 'Loading data...',
  },

  [Language.Slovenian]: {
    dateFormat: "dd.MM.yyyy 'ob' HH:mm",
    selectLocation: 'Izberi lokacijo',
    selectLocationDescription: 'Izberi lokacijo za prikaz vremenskega stanja',
    loadingData: 'Nalaganje podatkov...',
  },
  [Language.German]: {
    dateFormat: "dd.MM.yyyy 'um' HH:mm",
    selectLocation: 'Select location',
    selectLocationDescription:
      'Select location to display weather information.',
    loadingData: 'Loading data...',
  },
};
export const translationDefault = translation[appDefaultLanguage];
