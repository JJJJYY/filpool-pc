import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { Dropdown, Menu, Icon } from 'antd';
import './index.less';
import inputUtil from './inputUtil';
import codeList from '../../data/country';
import Country from './Country';

const menuStyle = {
    height: '2rem',
    overflow: 'auto',
};

export default class InputPhone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(v) {
        const value = inputUtil.numberFilter(v.target.value);

        this.props.onError && this.props.onError(inputUtil.phoneCheck(value) ? '' : intl.get('AUTH_RIGHT_PHONE'));
        this.props.onChange(value);
    }

    render() {
        const {
            label, value, placeholder, maxLength, error, areaCode, setArea, h5,
        } = this.props;
        const pre = h5 ? 'input-h5' : 'input';

        const menu = (
            <Menu style={menuStyle}>
                {codeList.sort((a, b) => a.en > b.en).map((item, index) => (
                    <Menu.Item key={index} onClick={() => { setArea(item.code); }}>
                        <span>
                            {item.zh}
(
                            {item.code}
)
                        </span>
                    </Menu.Item>
                ))}
            </Menu>
        );

        return (
            <section className={pre}>
                <div className={`${pre}-label`}>
                    {label}
                </div>

                <div className={`${pre}-box`}>
                    {
                        h5 ? (
                            <div className="phone" onClick={() => this.setState({ visible: true })}>
                                +
                                {areaCode}
                                <Icon type="down" className="icon" />
                            </div>
                        ) : (
                            <Dropdown
                                overlay={menu}
                                trigger={['click']}
                            >
                                <div className="phone">
                                    +
                                    {areaCode}
                                    <Icon type="down" className="icon" />
                                </div>
                            </Dropdown>
                        )
                    }
                    <input
                        value={value}
                        type="text"
                        onChange={this.onChange}
                        placeholder={placeholder}
                        maxLength={maxLength}
                    />
                </div>

                <div className={`${pre}-error`}>
                    {error}
                </div>

                {this.state.visible && (
                    <Country
                        areaCode={areaCode}
                        setArea={(v) => {
                            setArea(v);
                            this.setState({ visible: false });
                        }}
                    />
                )}
            </section>
        );
    }
}
