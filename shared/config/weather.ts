import { API_URL, Language } from './index';
import { SelectOption } from '@shared/types/common';

export const WEATHER_API_URL = API_URL + '/weather';

export const languages: SelectOption[] = [
  { name: 'English', value: Language.English },
  { name: 'German', value: Language.German },
  { name: 'Slovenian', value: Language.Slovenian },
]
