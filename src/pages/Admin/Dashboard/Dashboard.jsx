import {
  DollarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Area } from '@ant-design/plots';
import { Column } from '@ant-design/plots';
import { Breadcrumb, Col, DatePicker, Row, Space, Spin, Statistic } from 'antd';
import { Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import {
  getOverall,
  getTotalBooking,
  getTotalCommission,
} from '../../../app/AdminSlice';
import './Dashboard.scss';

const { Title } = Typography;

export function Dashboard() {
  const dispatch = useDispatch();
  // DATA FOR BOOKING CHART
  const columnData = useSelector(state => state.admin.totalBookingData);
  // DATA FOR COMMISSION CHART
  const lineData = useSelector(state => state.admin.totalCommissionData);
  const isLoading = useSelector(state => state.admin.loading);
  const overall = useSelector(state => state.admin.overall);
  const loadingContext = useLoadingContext();

  // FLAG TO PREVENT FIRST RENDER OF USE EFFECT
  const [flag, setFlag] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams({});
  const [year, setYear] = useState(
    searchParams.get('year') || moment().format('YYYY'),
  );

  const loading = async () => {
    //loading some data
    if (
      searchParams.get('year') &&
      searchParams.get('year') <= moment().format('YYYY')
    ) {
      // CALL DATA
      dispatch(getTotalBooking(year));
      dispatch(getTotalCommission(year));
    } else {
      setSearchParams({ year });
      // CALL DATA
      dispatch(getTotalBooking(year));
      dispatch(getTotalCommission(year));
    }

    dispatch(getOverall());

    //call method to indicate that loading is done
    loadingContext.done();
  };

  useEffect(() => {
    if (flag !== 0) {
      dispatch(getTotalCommission(year));
      dispatch(getTotalBooking(year));
    }
    setSearchParams({ year });
  }, [year]);

  useEffect(() => {
    loading();

    // PREVENT RECALL DISPATCH FROM PREVIOUS USE EFFECT
    setFlag(state => state + 1);
  }, []);

  const disabledDate = current => {
    return current > moment().endOf('year');
  };

  const lineConfig = {
    data: lineData,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    xAxis: {
      label: {
        formatter: v => `${v}/${year}`,
      },
      range: [0, 1],
    },
    yAxis: {
      label: {
        formatter: v => `$${v}`,
      },
    },
  };

  const columnConfig = {
    data: columnData,
    xField: 'month',
    yField: 'booking',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        formatter: v => `${v}/${year}`,
      },
    },
    yAxis: {
      label: {
        formatter: v => `${v}`,
      },
    },
  };
  return (
    <Spin
      tip="loading..."
      spinning={isLoading}
      style={{
        marginTop: '100px',
      }}
    >
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
                prefix={<UserOutlined />}
                value={overall.totalUsers}
                formatter={v => <CountUp end={v} duration={0.8} />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                className="admin__dashboard-statistic"
                title="Total booking"
                value={overall.totalUsers}
                formatter={v => <CountUp end={v} duration={0.8} />}
                prefix={<DollarOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                className="admin__dashboard-statistic"
                title="Total tours"
                value={overall.totalTours}
                formatter={v => <CountUp end={v} duration={0.8} />}
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
                  setYear(e.format('YYYY'));
                }}
                defaultValue={moment(year)}
                disabledDate={disabledDate}
                picker="year"
                allowClear={false}
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
    </Spin>
  );
}
