/**
 * Created by luxuhui on 2017/8/25.
 */
import React, {Component} from 'react';
import './App.css';
import {Layout, Menu, Icon, Calendar} from 'antd';

const {Header, Sider, Content} = Layout;

class TimeschduleContent extends Component {


    getListData = (value) => {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    {type: 'warning', content: 'This is warning event.'},
                    {type: 'normal', content: 'This is usual event.'},
                ];
                break;
            case 10:
                listData = [
                    {type: 'warning', content: 'This is warning event.'},
                    {type: 'normal', content: 'This is usual event.'},
                    {type: 'error', content: 'This is error event.'},
                ];
                break;
            case 15:
                listData = [
                    {type: 'warning', content: 'This is warning event'},
                    {type: 'normal', content: 'This is very long usual event。。....'},
                    {type: 'error', content: 'This is error event 1.'},
                    {type: 'error', content: 'This is error event 2.'},
                    {type: 'error', content: 'This is error event 3.'},
                    {type: 'error', content: 'This is error event 4.'},
                ];
                break;
            default:
        }
        return listData || [];
    }


    dateCellRender = (value) => {
        const listData = this.getListData(value);
        return (
            <ul className="events">
                {
                    listData.map(item => (
                        <li key={item.content}>
                            <span className={`event-${item.type}`}>●</span>
                            {item.content}
                        </li>
                    ))
                }
            </ul>
        );
    }

    getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    }

    monthCellRender = (value) => {
        const num = this.getMonthData(value);
        return num ? <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div> : null;
    }

    render() {
        return (
            <Content className="info-content">
                <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender}/>
            </Content>
        );
    }
}

export default TimeschduleContent;