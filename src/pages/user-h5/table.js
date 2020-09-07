import React, { PureComponent } from 'react';

export default class Index extends PureComponent {

    render() {
        const { data, columns } = this.props;
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
        )
    }

}
