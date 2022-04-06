import {
    JRCAppContainerProps,
    JRCAppLeftColumnProps,
    JRCTypographyProps,
} from 'jamespot-react-components';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { DemoRootState } from '../redux/demoUser.slice';
import { DemoForm } from './Demo.form';
import { Results } from './Results.component';

const JRCAppLeftColumn =
    J.react.registry.getLazyComponent<JRCAppLeftColumnProps<any>>(
        'AppLeftColumn'
    );
const JRCAppContainer =
    J.react.registry.getLazyComponent<JRCAppContainerProps>('AppContainer');

const JRCTypography =
    J.react.registry.getLazyComponent<JRCTypographyProps>('Typography');

export const Demo: React.FC<any> = () => {
    const { entities, loading } = useSelector(
        (state: DemoRootState) => state.demoUser
    );
    const intl = useIntl();

    return (
        <JRCAppContainer>
            <JRCAppLeftColumn
                icon="icon-edit"
                color={'#EA80CA'}
                title={intl.formatMessage({
                    id: 'DEMO_APP_TITLE',
                })}
                description={intl.formatMessage({
                    id: 'DEMO_APP_DESC',
                })}
            />
            <div>
                <JRCTypography variant="h1" size="xl" weight="medium">
                    <FormattedMessage id="DEMO_APP_TITLE" />
                </JRCTypography>
                <DemoForm />
                <div>
                    {loading === 'pending' ? (
                        <span>Loading</span>
                    ) : (
                        <Results results={entities} />
                    )}
                </div>
            </div>
        </JRCAppContainer>
    );
};
