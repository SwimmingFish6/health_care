/**
 * Created by luxuhui on 2017/8/28.
 */
import React from 'react'
import 'isomorphic-fetch'
import {Form, Input, Tooltip, Icon, Select, Checkbox, Button, Modal, Radio, Cascader} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

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


function success() {
    const modal = Modal.success({
        title: 'congratulation for registering successfully',
        content: 'begin to manage your healthy information',
    });
    setTimeout(() => modal.destroy(), 1000);
}

function error(message) {
    Modal.error({
        title: 'fail to register',
        content: message,
    });
}

export default class RegisterForm extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        iconLoading: false
    };

    handleSubmit = (e) => {
        this.setState({
            iconLoading: true
        });
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch('http://localhost:5000/api/users', {
                    method: 'POST', mode: "cors",
                    body: JSON.stringify(values)
                })
                    .then((response) => response.json())
                    .then((response) => {
                    console.log(response);
                    this.setState({
                        iconLoading: false
                    });
                    if (response.state === "success") {
                        success();
                        this.props.handleLogin();
                    }
                    else {
                        error(response.message);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };


    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector">
                <Option value="86">+86</Option>
            </Select>
        );


        return (
            <Form onSubmit={this.handleSubmit} className="register-form">
                <FormItem
                    {...formItemLayout}
                    label="username"
                    hasFeedback
                >
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!', whitespace: true}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="realname"
                    hasFeedback
                >
                    {getFieldDecorator('realname', {
                        rules: [{required: true, message: 'Please input your realname!', whitespace: true}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="sex"
                    {...formItemLayout}
                >
                    {getFieldDecorator('sex', {
                    rules: [{required: true, message: 'Please tell your sex!', whitespace: true}],
                })(
                    <Radio.Group>
                        <Radio.Button value="male">male</Radio.Button>
                        <Radio.Button value="female">female</Radio.Button>
                    </Radio.Group>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>password&nbsp;
                            <Tooltip title="suggestion for password including three of number, uppercase letter,
                            lowercase letter and special character">
                <Icon type="question-circle-o"/>
                                                    </Tooltip></span>)}
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'input password',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="confirm password"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password again',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="city"
                >
                    {getFieldDecorator('city', {
                        initialValue: ['California', 'San Jose'],
                        rules: [{type: 'array', required: true, message: 'Please select your habitual residence!'}],
                    })(
                        <Cascader options={options}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="address"
                    hasFeedback
                >
                    {getFieldDecorator('address', {
                        rules: [{required: true, message: 'Please input your address!', whitespace: true}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'wrong e-mail pattern',
                        }, {
                            required: true, message: 'please input your e-mail',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="phone number"
                >
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: 'Please input your phone number'}],
                    })(
                        <Input addonBefore={prefixSelector}/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout} style={{marginBottom: 8}}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I agree with the websites pact</Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">register</Button>
                </FormItem>
            </Form>
        );
    }
}
