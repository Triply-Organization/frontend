import { Column, Line } from '@ant-design/plots';
import { Breadcrumb } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import './CMSDashBoard.scss';

const CMSDashBoard = () => {
  const loadingContext = useLoadingContext();
  loadingContext.done();

  let data = [];
  let dataCol = [];

  const config = {
    data,
    xField: 'date',
    yField: 'gdp',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: v =>
          v.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  const configCol = {
    data: dataCol,
    isStack: true,
    xField: 'date',
    yField: 'booking',
    seriesField: 'name',
    label: {
      position: 'middle',

      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  for (let i = 1; i <= 6; i++) {
    dataCol.push(
      {
        date: moment('2022-07-07').add(i, 'days').format('YYYY-MM-DD'),
        booking: i === 1 ? 0 : Math.floor(Math.random() * 10 + 1),
        name: 'Can Tho',
      },
      {
        date: moment('2022-07-07').add(i, 'days').format('YYYY-MM-DD'),
        booking: i === 1 ? 0 : Math.floor(Math.random() * 10 + 1),
        name: 'Ha Noi',
      },
      {
        date: moment('2022-07-07').add(i, 'days').format('YYYY-MM-DD'),
        booking: i === 1 ? 0 : Math.floor(Math.random() * 10 + 1),
        name: 'Phu Quoc',
      },
    );
  }

  for (let i = 1; i <= 6; i++) {
    data.push(
      {
        date: moment('2022-07-07').add(i, 'days').format('YYYY-MM-DD'),
        gdp: i === 1 ? 0 : Math.floor(Math.random() * 2000 + 1000),
        name: 'Can Tho',
      },
      {
        date: moment('2022-07-07').add(i, 'days').format('YYYY-MM-DD'),
        gdp: i === 1 ? 0 : Math.floor(Math.random() * 2000 + 1000),
        name: 'Ha Noi',
      },
      {
        date: moment('2022-07-07').add(i, 'days').format('YYYY-MM-DD'),
        gdp: i === 1 ? 0 : Math.floor(Math.random() * 2000 + 1500),
        name: 'Phu Quoc',
      },
    );
  }

  return (
    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>
          <Link to="/home">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Dashboard</h2>
      <div className="customer-dashboard">
        <div className="customer-dashboard__section">
          <h3 style={{ marginBottom: '2rem' }}>Total revenue per day</h3>
          <Line {...config} style={{ width: '1541px' }} />
        </div>
        <div className="customer-dashboard__section">
          <h3 style={{ marginBottom: '2rem' }}>Total booking per day</h3>
          <Column {...configCol} style={{ width: '1541px' }} />
        </div>
      </div>
    </>
  );
};

export default CMSDashBoard;
