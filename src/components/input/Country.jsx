import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import Header from '../header';
import Input from './index';
import country from '../../data/country';

export default class Country extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            filter: '',
        };
    }

    render() {
        const { setArea, areaCode } = this.props;
        const ct = country.filter(item => JSON.stringify(item).includes(this.state.filter));

        return (
            <div className="input-country">
                <Header title={intl.get('AUTH_CHOOSE_COUNTRY')} left={() => setArea(areaCode)} />

                <div className="input-country-search">
                    <Input.Search
                        placeholder={intl.get('AUTH_SEARCH_COUNTRY')}
                        value={this.state.filter}
                        onChange={v => this.setState({ filter: v })}
                        h5
                    />
                </div>

                <div>
                    {ct.map(item => (
                        <div
                            className={item.code === areaCode ? 'input-country-select' : 'input-country-item'}
                            key={item.en}
                            onClick={() => setArea(item.code)}
                        >
                            <div>{item[localStorage.getItem('lang') || 'zh']}</div>
                            <div>
                                        +
                                {item.code}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
