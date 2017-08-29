/**
 * Created by luxuhui on 2017/8/25.
 */
import React from 'react';
import 'isomorphic-fetch'
import {Form, Icon, Input, Button, Checkbox, Modal} from 'antd';
const FormItem = Form.Item;

function success() {
    const modal = Modal.success({
        title: 'login success',
        content: 'welcome to your healthy care center',
    });
    setTimeout(() => modal.destroy(), 1000);
}
function error(errormsg) {
    Modal.error({
        title: errormsg + '，login fail',
        content: 'Please try it in a moment',
    });
}

export default class LoginForm extends React.Component {

    state = ({
        loginState: false,
        iconLoading: false
    });

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            iconLoading: true
        });

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch('http://localhost:5000/api/token', {
                    method: 'GET', mode: "cors",
                    headers: {
                        Authorization: 'Basic ' + window.btoa(values.username + ':' + values.password)
                    }
                })
                    .then((response) => response.json())
                    .then((response) => {
                        this.setState({
                            loginState: true,
                            iconLoading: false,
                            token: response.token
                        });
                        if (this.state.loginState) {
                            success();
                        }
                        else {
                            error(response.errormsg);
                        }
                    }).catch((error) => {
                    this.setState({
                        iconLoading: false
                    });
                    console.log(error)
                });
            }
        });
    };

    componentDidUpdate(){
        if (this.state.loginState) {
            this.props.handleCheckLogin(true, this.state.token);
        }
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <p className="login-form-tip">daily tip: Don't forget to drink more every day</p>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox className="login-form-remember">remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">forget passoword？</a>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                            loading={this.state.iconLoading}>
                        login
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
