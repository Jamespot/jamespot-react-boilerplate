import lang from './lang.json';
import JRCore from 'jamespot-react-core';

export default function loadResource() {
    JRCore.translation.addResources(lang);
}
