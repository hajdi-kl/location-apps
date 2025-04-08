import { WeatherTranslationData } from '@shared/types/weather';
import { API_URL, Language } from './index';
import { SelectOption } from '@shared/types/common';

export const WEATHER_API_URL = API_URL + '/weather';

export const languages: SelectOption[] = [
  { name: 'Slovenščina', value: Language.Slovenian },
  { name: 'English', value: Language.English },
  { name: 'Deutsch', value: Language.German },
];

export const appDefaultLanguage = languages[0].value as Language;

export const translation: {
  [key in Language]: WeatherTranslationData;
} = {
  [Language.English]: {
    dateFormat: "dd.MM.yyyy 'at' HH:mm",
    selectLocation: 'Select location',
    selectLocationDescription:
      'Select location to display weather information.',
    loadingData: 'Loading data...',
    errorMessage: 'An error occured. Please select a different location.',
  },

  [Language.Slovenian]: {
    dateFormat: "dd.MM.yyyy 'ob' HH:mm",
    selectLocation: 'Izberi lokacijo',
    selectLocationDescription: 'Izberi lokacijo za prikaz vremenskega stanja',
    loadingData: 'Nalaganje podatkov...',
    errorMessage: 'Prišlo je do napake. Prosimo izberite drugo lokacijo.',
  },
  [Language.German]: {
    dateFormat: "dd.MM.yyyy 'um' HH:mm",
    selectLocation: 'Standort auswählen',
    selectLocationDescription:
      'Wählen Sie einen Ort aus, um Wetterinformationen anzuzeigen.',
    loadingData: 'Daten werden geladen...',
    errorMessage:
      'Ein Fehler ist aufgetreten. Bitte wählen Sie einen anderen Standort.',
  },
};
export const translationDefault = translation[appDefaultLanguage];
