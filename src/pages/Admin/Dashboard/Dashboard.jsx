import {
  DollarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Area } from '@ant-design/plots';
import { Column } from '@ant-design/plots';
import { Breadcrumb, Col, DatePicker, Row, Space, Statistic } from 'antd';
import { Typography } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useLoadingContext } from 'react-router-loading';

import './Dashboard.scss';

const { Title } = Typography;

export function Dashboard() {
  const loadingContext = useLoadingContext();

  const disabledDate = current => {
    return current > moment().endOf('uea');
  };

  const loading = async () => {
    //loading some data

    //call method to indicate that loading is done
    loadingContext.done();
  };

  useEffect(() => {
    loading();
  }, []);
  const lineData = [
    {
      month: '1',
      commission: 10,
    },
    {
      month: '2',
      commission: 12,
    },
    {
      month: '3',
      commission: 2.08,
    },
    {
      month: '4',
      commission: 2.2,
    },
    {
      month: '5',
      commission: 2.38,
    },
    {
      month: '6',
      commission: 2.59,
    },
    {
      month: '7',
      commission: 2.63,
    },
    {
      month: '8',
      commission: 2.67,
    },
    {
      month: '9',
      commission: 2.64,
    },
    {
      month: '10',
      commission: 2.5,
    },
    {
      month: '11',
      commission: 2.31,
    },
    {
      month: '12',
      commission: 2.04,
    },
  ];
  const lineConfig = {
    data: lineData,
    xField: 'month',
    yField: 'commission',
    xAxis: {
      range: [0, 1],
    },
  };

  const columnData = [
    {
      month: '1',
      bookingNumber: 38,
    },
    {
      month: '2',
      bookingNumber: 52,
    },
    {
      month: '3',
      bookingNumber: 61,
    },
    {
      month: '4',
      bookingNumber: 145,
    },
    {
      month: '5',
      bookingNumber: 48,
    },
    {
      month: '6',
      bookingNumber: 38,
    },
    {
      month: '7',
      bookingNumber: 38,
    },
    {
      month: '8',
      bookingNumber: 38,
    },
    {
      month: '9',
      bookingNumber: 38,
    },
    {
      month: '10',
      bookingNumber: 38,
    },
    {
      month: '11',
      bookingNumber: 38,
    },
    {
      month: '12',
      bookingNumber: 900,
    },
  ];
  const columnConfig = {
    data: columnData,
    xField: 'month',
    yField: 'bookingNumber',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: 'month',
      },
      bookingNumber: {
        alias: 'bookingNumber',
      },
    },
  };
  return (
    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>
          <Title level={3}>Dashboard</Title>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        <Space
          direction="vertical"
          size="large"
          style={{
            display: 'flex',
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Statistic
                className="admin__dashboard-statistic"
                title="Total users"
                value={1128}
                prefix={<UserOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                className="admin__dashboard-statistic"
                title="Total booking"
                value={1128}
                prefix={<DollarOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                className="admin__dashboard-statistic"
                title="Total tours"
                value={1128}
                prefix={<EnvironmentOutlined />}
              />
            </Col>
          </Row>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Col>
              <DatePicker
                onChange={e => {
                  console.log(e);
                }}
                defaultValue={moment()}
                disabledDate={disabledDate}
                picker="month"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} className="admin__dashboard-line-chart">
              <Title className="admin__dashboard-heading" level={5}>
                total commission per month
              </Title>
              <Area {...lineConfig} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} className="admin__dashboard-line-chart">
              <Title className="admin__dashboard-heading" level={5}>
                total booking per month
              </Title>
              <Column {...columnConfig} />
            </Col>
          </Row>
        </Space>
      </div>
    </>
  );
}
