import * as React from 'react';
import jamespot, { JLandLog } from 'jamespot-user-api';
import JRCore from 'jamespot-react-core';
import { JRCButtonProps, JRCDateProps, JRCInputFieldProps, JRCListProps } from 'jamespot-react-components';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useIntl, FormattedMessage } from 'react-intl';
import { Utils } from 'jamespot-react-components';

const List = JRCore.registry.getLazyComponent<JRCListProps<JLandLog>>('List');
const DateDisplay = JRCore.registry.getLazyComponent<JRCDateProps>('Date');
const InputDate = J.react.registry.getLazyComponent<JRCInputFieldProps<DateEnd>>('InputDate');
const Button = J.react.registry.getLazyComponent<JRCButtonProps>('Button');

type DateEnd = {
    dateEnd: string;
};

const _columns = [
    {
        Header: 'APP_JLand_Logs_TableCol_Id',
        id: 'idLog',
        accessor: 'idLog',
    },
    {
        Header: 'APP_JLand_Logs_TableCol_Date',
        id: 'dateCreation',
        accessor: (log) => <DateDisplay date={log.dateCreation} format="date-time-sec" />,
    },
    {
        Header: 'APP_JLand_Logs_TableCol_Map',
        id: 'map',
        accessor: 'map',
    },
    {
        Header: 'APP_JLand_Logs_TableCol_Mail',
        id: 'mail',
        accessor: 'mail',
    },
];

export const InlineForm = styled.form`
    display: flex;
    align-items: end;
    gap: 8px;
    margin-bottom: 32px;

    fieldset,
    input,
    button {
        margin-bottom: 0 !important;
    }

    fieldset {
        flex-grow: 1;
    }
`;

export default function JLandLog() {
    const intl = useIntl();

    const [logs, setLogs] = React.useState<Array<JLandLog>>([]);
    const [filters, setFilters] = React.useState<{ idLogMax?: number; dateEnd?: string; reload: boolean }>({
        reload: true,
    });

    const columns = _columns.map((column) => ({
        ...column,
        Header: intl.formatMessage({ id: column.Header }),
    })) as JRCListProps<JLandLog>['columns'];

    React.useEffect(() => {
        jamespot.jland.getLogs({ idLogMax: filters.idLogMax, dateEnd: filters.dateEnd || undefined }).then((result) => {
            if (result?.result) {
                if (filters.reload) {
                    setLogs(result?.result || []);
                    setFilters((f) => ({ ...f, reload: false }));
                } else {
                    setLogs((logs) => [...logs, ...(result?.result || [])]);
                }
            }
        });
    }, [filters.idLogMax, filters.dateEnd]);

    const config = {
        pagination: {
            type: 'loadMore' as const,
            end: false,
        },
    };

    const eventHandlers = {
        onPage: () =>
            setFilters((f) => ({
                ...f,
                idLogMax: Math.min(...(logs.map((log) => log.idLog) || [])),
            })),
    };

    const { handleSubmit, control } = useForm({
        defaultValues: {
            dateEnd: Utils.date.toISODate(),
        },
    });

    function onSubmit({ dateEnd }: DateEnd) {
        setFilters((f) => ({ ...f, dateEnd, reload: true }));
    }

    return (
        <>
            <h2>
                <FormattedMessage id="APP_JLand_Logs_Title" />
            </h2>
            <InlineForm onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', alignItems: 'flex-end' }}>
                <InputDate label="APP_JLand_Logs_DateEnd" name="dateEnd" control={control} />
                <Button type="submit">
                    <FormattedMessage id="GLOBAL_Filter" />
                </Button>
            </InlineForm>
            <List columns={columns} data={logs} config={config} eventHandlers={eventHandlers} />
        </>
    );
}
