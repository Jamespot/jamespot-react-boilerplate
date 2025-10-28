import { jCore } from '../../../libraries';
import lang from './lang.json';

export default function loadResource() {
  jCore.translation?.addResources(lang);
}
