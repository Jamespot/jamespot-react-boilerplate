import * as React from 'react';
import jamespot, { JLandStat } from 'jamespot-user-api';
import JRCore from 'jamespot-react-core';
import { JRCButtonProps, JRCInputFieldProps, JRCListProps } from 'jamespot-react-components';
import { useForm } from 'react-hook-form';
import { InlineForm } from './JLandLog';
import { useIntl, FormattedMessage } from 'react-intl';
import { Utils } from 'jamespot-react-components';

const List = JRCore.registry.getLazyComponent<JRCListProps<JLandStat>>('List');
const InputDate = J.react.registry.getLazyComponent<JRCInputFieldProps<DateForm>>('InputDate');
const Button = J.react.registry.getLazyComponent<JRCButtonProps>('Button');

type DateForm = {
    dateStart: string;
    dateEnd: string;
};

const _columns = [
    {
        Header: 'APP_JLand_Stats_TableCol_Mail',
        id: 'mail',
        accessor: 'mail',
    },
    {
        Header: 'APP_JLand_Stats_TableCol_Cnt',
        id: 'cnt',
        accessor: 'cnt',
    },
];

export default function JLandStat() {
    const intl = useIntl();

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const [stats, setStats] = React.useState<Array<JLandStat>>([]);
    const [filters, setFilters] = React.useState<Partial<DateForm>>({
        dateStart: Utils.date.toISODate(lastWeek),
        dateEnd: Utils.date.toISODate(),
    });

    React.useEffect(() => {
        jamespot.jland.getStats({ map: 'jpro/office', ...filters }).then((result) => {
            if (result?.result) {
                setStats(result?.result);
            }
        });
    }, [filters]);

    const columns = _columns.map((column) => ({
        ...column,
        Header: intl.formatMessage({ id: column.Header }),
    })) as JRCListProps<JLandStat>['columns'];

    const { handleSubmit, control } = useForm({
        defaultValues: {
            dateStart: Utils.date.toISODate(lastWeek),
            dateEnd: Utils.date.toISODate(),
        },
    });

    function onSubmit(date: DateForm) {
        setFilters(date);
    }

    return (
        <>
            <h2>
                <FormattedMessage id="APP_JLand_Stats_Title" />
            </h2>
            <InlineForm onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', alignItems: 'flex-end' }}>
                <InputDate label="APP_JLand_Stats_DateStart" name="dateStart" control={control} />
                <InputDate label="APP_JLand_Stats_DateEnd" name="dateEnd" control={control} />
                <Button type="submit">
                    <FormattedMessage id="GLOBAL_Filter" />
                </Button>
            </InlineForm>
            <List columns={columns} data={stats} />
        </>
    );
}
