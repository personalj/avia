import { TranslateResult } from 'vue-i18n';

interface FilterInterface {
    id: number;
    value: string,
    text: string|TranslateResult;
  }

export default FilterInterface;