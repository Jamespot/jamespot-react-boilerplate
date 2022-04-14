import { JRCTemplateTwoColumnsProps } from 'jamespot-react-components';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { DemoRootState, fetchSearchDemoUsers } from '../redux/demoUser.slice';
import { DemoForm } from './Demo.form';
import { Results } from './Results.component';

const TemplateTwoColumns =
    JRCore.registry.getLazyComponent<JRCTemplateTwoColumnsProps<null>>(
        'TemplateTwoColumns'
    );

export const Demo: React.FC<any> = () => {
    const { entities, loading } = useSelector(
        (state: DemoRootState) => state.demoUser
    );
    const intl = useIntl();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchSearchDemoUsers());
    }, []);

    return (
        <TemplateTwoColumns
            isLoading={loading === 'pending'}
            leftColumn={{
                icon: 'icon-edit',
                color: '#EA80CA',
                title: intl.formatMessage({
                    id: 'DEMO_APP_TITLE',
                }),
                description: intl.formatMessage({
                    id: 'DEMO_APP_DESC',
                }),
            }}
        >
            <DemoForm />
            <Results results={entities} />
        </TemplateTwoColumns>
    );
};
