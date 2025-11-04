/**
 * @member route extension url will be /ng/rr/boilerplate/sample-route
 * @member reducerName If we use reduce, we can specify the reducer name
 */
export const SampleRouteExtensionConst = {
  route: 'boilerplate/sample-route',
  reducerName: 'sampleRouteUser',
};

/**
 * Details of the extension routes configured in index.tsx
 */
export const ROUTES = {
  EXAMPLE: {
    path: '',
    key: 'SAMPLE',
    icon: 'fs-reporting',
    label: 'APP_Tab_Sample',
  },
  ANOTHER_SCREEN: {
    path: 'another-screen',
    key: 'ANOTHER_SCREEN',
    icon: 'fs-table-group',
    label: 'APP_Tab_Another_Screen',
  },
};
