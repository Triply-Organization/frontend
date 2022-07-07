/* eslint-disable no-unused-vars */
import { Column, Line } from '@ant-design/plots';
import { Breadcrumb } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import './CMSDashBoard.scss';

const CMSDashBoard = () => {
  const loadingContext = useLoadingContext();
  loadingContext.done();

  // LINE
  const [data, setData] = useState([
    {
      date: '2021-12-01',
      gdp: 0,
      name: 'Vung Tau - Viet Nam',
    },
    {
      date: '2022-12-01',
      gdp: 6700,
      name: 'Vung Tau - Viet Nam',
    },
    {
      date: '2023-01-01',
      gdp: 1000,
      name: 'Vung Tau - Viet Nam',
    },
    {
      date: '2021-12-01',
      gdp: 0,
      name: 'Can Tho - Viet Nam',
    },
    {
      date: '2023-01-01',
      gdp: 0,
      name: 'Can Tho - Viet Nam',
    },
    {
      date: '2023-02-01',
      gdp: 1000,
      name: 'Can Tho - Viet Nam',
    },
  ]);

  const config = {
    data,
    xField: 'date',
    yField: 'gdp',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: v => `$${v}`,
      },
    },
    legend: {
      position: 'bottom',
    },
    smooth: true,
  };

  // COLOUM
  const dataCol = [
    {
      date: '2023-01-01',
      booking: 38,
    },
    {
      date: '2023-02-01',
      booking: 52,
    },
    {
      date: '2023-03-01',
      booking: 61,
    },
    {
      date: '2023-04-01',
      booking: 145,
    },
    {
      date: '2023-05-01',
      booking: 48,
    },
    {
      date: '2023-06-01',
      booking: 38,
    },
    {
      date: '2023-07-01',
      booking: 38,
    },
    {
      date: '2023-08-01',
      booking: 38,
    },
  ];
  const configCol = {
    data: dataCol,
    xField: 'date',
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
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
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
          <Link to="/home">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Dashboard</h2>
      <div className="customer-dashboard">
        <div className="customer-dashboard__section">
          <h3 style={{ marginBottom: '2rem' }}>Total monthly revenue</h3>
          <Line {...config} />
        </div>
        <div className="customer-dashboard__section">
          <h3 style={{ marginBottom: '2rem' }}>
            Total number of tours booked by month
          </h3>
          <Column {...configCol} />
        </div>
      </div>
    </>
  );
};

export default CMSDashBoard;
