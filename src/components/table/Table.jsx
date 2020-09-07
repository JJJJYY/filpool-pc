import React, { PureComponent } from 'react';

export default class Table extends PureComponent {
    render() {
        const { data, columns, h5 } = this.props;

        if (h5) {
            return (
                <div>
                    {data.length > 0 ? data.map((obj, i) => (
                        <ul key={String(i)} className="list-h5" style={{ padding: '2vw 4vw 0' }}>
                            {columns.map((item, i1) => (item.th || (!item.th && String(obj.status) === '0')) && (
                                <li key={String(i1)}>
                                    <span>{item.th}</span>
                                    <span>{item.render ? item.render(obj[item.td], obj) : obj[item.td]}</span>
                                </li>
                            ))}
                        </ul>
                    )) : (
                        <p style={{
                            color: '#C0C9D2', fontSize: '4vw', textAlign: 'center', padding: '1vw 0 10vw',
                        }}
                        >
                        暂无数据
                        </p>
                    )}
                </div>
            );
        }

        return (
            <table className="common-table">
                <thead>
                    <tr>
                        {columns.map((item, i) => (
                            <th key={item.th} style={{ textAlign: i === columns.length - 1 ? 'right' : 'left' }}>{item.th}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map((obj, index) => (
                        <tr key={String(index)}>
                            {columns.map((item, i) => (
                                <td key={item.th} style={{ textAlign: i === columns.length - 1 ? 'right' : 'left' }}>{item.render ? item.render(obj[item.td], obj) : obj[item.td]}</td>
                            ))}
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: 'center' }}>暂无数据</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}
