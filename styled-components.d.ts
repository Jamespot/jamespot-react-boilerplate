import 'styled-components';
import { ThemeType } from 'jamespot-react-components';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}
