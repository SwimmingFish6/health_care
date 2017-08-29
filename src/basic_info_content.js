/**
 * Created by luxuhui on 2017/8/25.
 */
import React, {Component} from 'react';
import './App.css';
import {Layout, Avatar, Row, Col, Input, Upload, Button, Icon, message, Radio, DatePicker, Cascader, Modal} from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';
const InputGroup = Input.Group;
const RadioGroup = Radio.Group, RadioButton = Radio.Button;
const {Content} = Layout;


function error() {
    Modal.error({
        title: 'data access fail',
        content: 'fail to get user basic info',
    });
}

const props = {
    name: 'head_image',
    listType: 'picture',
    action: '',
    headers: {
        authorization: 'authorzation-text',
    },

    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed`);
        }
    }
};

const options = [{
    value: 'california',
    label: 'California',
    children: [
        {
            value: 'San Jose',
            label: 'San Jose',
        },
        {
            value: 'San Francisco',
            label: 'San Francisco'
        },
        {
            value: 'Los Angeles',
            label: 'Los Angeles'
        },
        {
            value: 'Sacramento',
            babel: 'Sacramento'
        }],
}, {
    value: 'Texas',
    label: 'Texas',
    children: [
        {
            value: 'Houston',
            label: 'Houston'
        },
        {
            value: 'Dallas',
            label: 'Dallas'
        }
    ],
}];

class BasicInfoContent extends Component {

    state = {
        visible: false
    };


    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = (e) => {
        this.setState({
            visible: false
        });
    };


    handleCancel = (e) => {
        this.setState({
            visible: false
        });
    };

    componentDidMount() {

        console.log(321312);
        this.getUserInfo();
    }

    getUserInfo = () => {

        console.log("**********************");

        fetch('http://localhost:5000/api/userinfo',{method: 'GET',
            mode: "cors",
            headers: {
                Authorization: 'Basic ' + window.btoa(this.props.token + ':unused')
            }
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                this.setState({
                    userinfo: response.userinfo,
                });

                console.log("******************");

                console.log(response.userinfo);

                if (response.state !== "success") {
                    error();
                }
            }).catch((error) => {
            console.log("******************");
            console.log(error);
        });
    };


    render() {


        return (
            <Content className="info-content">
                <Row id="basic-head-image" className="basic-item">
                    <Col span={6}/>
                    <Col span={3}>
                        head image
                    </Col>
                    <Col span={2}>
                        <Avatar src="img/fella.png" size="large" shape="square"></Avatar>
                    </Col>
                    <Col span={4}>
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload"/>
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <br/>
                <Row id="basic-name" className="basic-item">
                    <Col span={6}/>
                    <Col span={3}>
                        <span>name</span>
                    </Col>
                    <Col span={6}>
                        <Input value="test"></Input>
                    </Col>
                </Row>
                <br/>
                <Row id="basic-sex" className="basic-item">
                    <Col span={6}/>
                    <Col span={3}>
                        <span>sex</span>
                    </Col>
                    <Col span={10}>
                        <RadioGroup>
                            <RadioButton value="male">male</RadioButton>
                            <RadioButton value="female">female</RadioButton>
                        </RadioGroup>
                    </Col>
                </Row>
                <br/>
                <Row id="basic-date" className="basic-item">
                    <Col span={6}/>
                    <Col span={3}>
                        <span>birthday</span>
                    </Col>
                    <Col span={8}>
                        <DatePicker defaultValue={moment("2015/09/14", dateFormat)} format={dateFormat}/>
                    </Col>
                </Row>
                <br/>
                <Row id="basic-phone" className="basic-item">
                    <Col span={6}/>
                    <Col span={3}>
                        <span>phone</span>
                    </Col>
                    <Col span={8}>
                        <InputGroup size="large">
                            <Col span={5}>
                                <Input defaultValue="86"/>
                            </Col>
                            <Col span={10}>
                                <Input defaultValue="15715837336"/>
                            </Col>
                        </InputGroup>
                    </Col>
                </Row>
                <br/>
                <Row id="basic-email " className="basic-item">
                    <Col span={6}/>
                    <Col span={3}>
                        <span>e-mail</span>
                    </Col>
                    <Col span={6}>
                        <Input value="test"></Input>
                    </Col>
                </Row>
                <br/>
                <Row id="basic-city" className="basic-item">
                    <Col span={6}/>
                    <Col span={3}>
                        <span>city</span>
                    </Col>
                    <Col span={8}>
                        <Cascader options={options}/>
                    </Col>
                </Row>
                <br/>
                <Row id="basic-address" className="basic-item">
                    <Col span={6}/>
                    <Col span={3}>
                        <span>address</span>
                    </Col>
                    <Col span={6}>
                        <Input value="2131"></Input>
                    </Col>
                </Row>
                <br/>
                <Row id="basic-bankaccount" className="basic-item">
                    <Col span={6}/>
                    <Col span={3}>
                        <span>bank account</span>
                    </Col>
                    <Col span={6}>
                        <Input disabled={true}></Input>
                    </Col>
                    <Col span={1}/>
                    <Col span={2}>
                        <Button onClick={this.showModal}>modify</Button>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col span={8}/>
                    <Col span={8}>
                        <Button size="large"  type="primary" style={{width: '100%'}}>save</Button>
                    </Col>
                </Row>
                <Modal
                    title="Modify your bank account"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Row className="basic-item">
                        <Col span={2}/>
                        <Col span={4}>
                            <span>account</span>
                        </Col>
                        <Col span={10}>
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                   placeholder="account number"></Input>
                        </Col>
                    </Row>
                    <br/>
                    <Row className="basic-item">
                        <Col span={2}/>
                        <Col span={4}>
                            <span>expired time</span>
                        </Col>
                        <Col span={10}>
                            <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={2}/>
                        <Col span={4}>
                            <span>passoword</span>
                        </Col>
                        <Col span={10}>
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} placeholder="passoword"></Input>
                        </Col>
                    </Row>
                </Modal>
            </Content>
        );
    }
}

export default BasicInfoContent;