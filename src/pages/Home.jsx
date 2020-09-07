import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import intl from 'react-intl-universal';
import connect from '../store/connect';
import Home from './home/H5';
import Rate from './rate/H5/Rate';
import Mine from './user-h5/user';
import HelpH5 from './help/h5';


const tabs = {
    tab1: require('../images/tabs/home.png'),
    tab1s: require('../images/tabs/home-s.png'),
    tab2: require('../images/tabs/could.png'),
    tab2s: require('../images/tabs/could-s.png'),
    tab3: require('../images/tabs/help.png'),
    tab3s: require('../images/tabs/help-s.png'),
    tab4: require('../images/tabs/mine.png'),
    tab4s: require('../images/tabs/mine-s.png'),
};

const iconStyle = { width: '6vw', height: '6vw' };
const pageStyle = {
    position: 'fixed', height: '100%', width: '100%', top: 0,
};

const tabKey = {
    tab1: 'home',
    tab2: 'could',
    tab3: 'help',
    tab4: 'mine',
};

function renderIcon(source) {
    return (
        <img src={source} style={iconStyle} alt="" />
    );
}

class Tab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            language: localStorage.getItem('lang'),
        };
    }

    render() {
        const { tab, login } = this.props.redux;

        return (
            <div style={pageStyle}>
                <TabBar
                    unselectedTintColor="#DEDBDA"
                    tintColor="#1629B9"
                    barTintColor="#FFFFFF"
                    prerenderingSiblingsNumber={0}
                >
                    <TabBar.Item
                        title={intl.get('RATE_74')}
                        key={tabKey.tab1}
                        selected={tab === tabKey.tab1}
                        onPress={() => this.props.setTab(tabKey.tab1)}
                        icon={renderIcon(tabs.tab1)}
                        selectedIcon={renderIcon(tabs.tab1s)}
                    >
                        <Home history={this.props.history} />
                    </TabBar.Item>
                    <TabBar.Item
                        title={intl.get('RATE_75')}
                        key={tabKey.tab2}
                        selected={tab === tabKey.tab2}
                        onPress={() => this.props.setTab(tabKey.tab2)}
                        icon={renderIcon(tabs.tab2)}
                        selectedIcon={renderIcon(tabs.tab2s)}
                    >
                        <Rate history={this.props.history} />
                    </TabBar.Item>
                    <TabBar.Item
                        title={intl.get('RATE_76')}
                        key={tabKey.tab3}
                        selected={tab === tabKey.tab3}
                        onPress={() => this.props.setTab(tabKey.tab3)}
                        icon={renderIcon(tabs.tab3)}
                        selectedIcon={renderIcon(tabs.tab3s)}
                    >
                        <HelpH5 history={this.props.history} />
                    </TabBar.Item>
                    <TabBar.Item
                        title={intl.get('RATE_77')}
                        key={tabKey.tab4}
                        selected={tab === tabKey.tab4}
                        onPress={() => this.props.setTab(tabKey.tab4)}
                        icon={renderIcon(tabs.tab4)}
                        selectedIcon={renderIcon(tabs.tab4s)}
                    >
                        <Mine history={this.props.history} />
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default connect(Tab);
