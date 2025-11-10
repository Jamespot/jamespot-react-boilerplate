import { jCore } from '../../libraries';
import { SampleWidgetExtensionConst } from './SampleWidget.const';

jCore.extensionAdd(SampleWidgetExtensionConst.name, () => import('./SampleWidget.app'));
