import { Settings } from '../../../ts/interfaces';

export default class SettingsDto implements Settings {
  language: string;
  weightStep: number;
}
