/**
 * Created by luxuhui on 2017/8/25.
 */
import React, {Component} from 'react';
import './App.css';
import {Layout, Menu, Icon, Switch, Table} from 'antd';

const {Header, Sider, Content} = Layout;

const columns = [{
    title: "Date",
    dataIndex: "date"
},
    {
        title: "Clinic Name",
        dataIndex: "clinicname",
        key: "clinicname"
    },
    {
        title: "Doctor Name",
        dataIndex: "doctorname",
        key: "doctorname"
    },
    {
        title: "Department",
        dataIndex: "department",
        key: "department"
    },
    {
        title: "State",
        dataIndex: "state",
        key: "state"
    },
    {
        title: "Sold or not",
        dataIndex: "isSold",
        key: "isSold"
    }];

const data = [
    { key: 1, date: "2017/06/18", clinicname: "zhe1", doctorname: 'XUHUI LU', department: "Skin", state:   <Switch defaultChecked={false} />, isSold: "Yes", patientsyptom: 'My name is John Brown', diagnosis: 'I am 32 years old', treatment: 'living in New York No. 1 Lake Park.' },
    { key: 2, date: "2017/07/18", clinicname: "zhe2", doctorname: 'XUHUI LU', department: "organ", state:   <Switch defaultChecked={false} />, isSold: "No", patientsyptom: 'My name is John Brown', diagnosis: 'I am 32 years old', treatment: 'living in New York No. 1 Lake Park.' },
    { key: 3, date: "2017/08/18", clinicname: "zhe3", doctorname: 'XUHUI LU', department: "female", state:   <Switch defaultChecked={false} />, isSold: "Yes", patientsyptom: 'My name is John Brown', diagnosis: 'I am 32 years old', treatment: 'rliving in New York No. 1 Lake Park.' }
];
class HistoryRecordContent extends Component {

    render() {
        return (
            <Content className="info-content">
                <Table columns={columns}
                       pagination={{ pageSize: 20 }}
                       expandedRowRender={record => <p>
                           Patient symptom: {record.patientsyptom}<br/>
                           Diagnosis: {record.diagnosis}<br/>
                           Treatment: {record.treatment}
                       </p>}
                       dataSource={data}/>
            </Content>
        );
    }
}

export default HistoryRecordContent;