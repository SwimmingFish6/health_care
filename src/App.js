import React, {Component} from 'react';
import './App.css';
import {Layout, Menu, Modal, Avatar, Row, Col, Form} from 'antd';
import BasicInfoContent from "./basic_info_content";
import HistoryRecordContent from "./history_record_content";
import TimeschduleContent from "./timeschdule_content";
import LoginForm from "./login_form";
import RegisterForm from "./register_form"
const {Header, Sider, Content} = Layout;

const SubMenu = Menu;

class App extends Component {

    state = {
        infoType: 'b',
        collapsed: false,
        login: false,
        contentType: true
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleCheckLogin = (loginState, token) => {
        console.log(token);

        if (loginState) {
            this.setState({
                login: true,
                token: token
            });
        }
    };

    handleRegister = () => {
        this.setState({
            contentType: false
        });
    };

    handleLogin = () => {
        this.setState({
            contentType: true
    });
    };

    checkBasicInfo = () => {
        this.setState({
            infoType: 'b'
        });
    };


    checkHistoryRecord = () => {
        console.log("231");
        this.setState({
            infoType: 'h'
        });
    };


    checkTimeschdule = () => {
        this.setState({
            infoType: 't'
        });
    };


    render() {
        const {token, login, contentType, infoType} = this.state;

        let content;
        if(!login) {
            if (contentType) {
                content = (
                    <div style={{textAlign: 'center'}}>
                        <WrappedLoginForm handleCheckLogin={this.handleCheckLogin}></WrappedLoginForm>
                        <a onClick={this.handleRegister}>register now！</a>
                    </div>
                );
            }
            else {
                content = (
                    <div style={{textAlign: 'center'}}>
                        <WrappedRegisterForm handleLogin={this.handleLogin}></WrappedRegisterForm>
                        <a onClick={this.handleLogin}>return to login！</a>
                    </div>
                );
            }
        }
        else{
            switch (infoType){
                case 'b':
                    content = <BasicInfoContent token={token}/>;
                    break;
                case 't':
                    content = <TimeschduleContent/>;
                    break;
                case 'h':
                    content = <HistoryRecordContent/>;
                    break;
            }
        }

        if (login) {
            return (
                <Layout style={{height: '100%'}}>
                    <Header className="header" style={{padding: '0px 20px'}}>
                        <Row>
                            <Col span={2}>
                                <a id="fw-logo" href="https://www.cisco.com">
                                    <img className="logo" style={{height: '45px', verticalAlign: 'middle'}}
                                         src="img/logo.png"/>
                                </a>
                            </Col>
                            <Col span={10}>
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    defaultSelectedKeys={['2']}
                                    style={{lineHeight: '64px'}}
                                >
                                    <Menu.Item key="1">Flask</Menu.Item>
                                    <Menu.Item key="2">Django</Menu.Item>
                                    <Menu.Item key="3">Go</Menu.Item>
                                </Menu>
                            </Col>
                            <Col span={9}/>
                            <Col span={3}>
                                <a onClick={this.showModal}>
                                    <Avatar src="img/fella.png" size="large" shape="square"
                                            style={{verticalAlign: 'middle'}}></Avatar>
                                </a>
                            </Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{background: '#fff'}}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%', borderRight: 0}}
                            >
                                <Menu.Item key="1"><a onClick={this.checkBasicInfo}>basic info</a></Menu.Item>
                                <Menu.Item key="2"><a onClick={this.checkHistoryRecord}>history record</a></Menu.Item>
                                <Menu.Item key="3"><a onClick={this.checkTimeschdule}>timeschdule</a></Menu.Item>
                                <Menu.Item key="4"><a>request</a></Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout style={{padding: '0 24px 24px', margin: '24px 100px 20px 20px'}}>
                            {content}
                        </Layout>
                    </Layout>
                </Layout>
            );
        }
        else {
            return (
                <Layout style={{height: '100%'}}>
                    <Header className="header" style={{padding: '0px 20px'}}>
                        <Row>
                            <Col span={2}>
                                <a id="fw-logo" href="https://www.cisco.com">
                                    <img className="logo" style={{height: '45px', verticalAlign: 'middle'}}
                                         src="img/logo.png"/>
                                </a>
                            </Col>
                            <Col span={10}>
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    defaultSelectedKeys={['2']}
                                    style={{lineHeight: '64px'}}
                                >
                                    <Menu.Item key="1">Flask</Menu.Item>
                                    <Menu.Item key="2">Django</Menu.Item>
                                    <Menu.Item key="3">Go</Menu.Item>
                                </Menu>
                            </Col>
                            <Col span={9}/>
                            <Col span={3}>
                                <a onClick={this.showModal}>
                                    <Avatar src="img/fella.png" size="large" shape="square"
                                            style={{verticalAlign: 'middle'}}></Avatar>
                                </a>
                            </Col>
                        </Row>
                    </Header>
                    <Layout style={{display: 'inline-block'}}>
                        <Layout style={{margin: '70px 150px', backgroundColor: '#fff'}}>
                            <Content className="login-content">
                                {content}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            );
        }
    }
}

export default App;
const WrappedLoginForm = Form.create()(LoginForm);
const WrappedRegisterForm = Form.create()(RegisterForm);
