import { Breadcrumb, Calendar, Form, InputNumber } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { clearIdTourJustCreate } from '../../app/toursSlice';
import FormModal from '../../components/FormModal/FormModal';
import './CMSTourSchedule.scss';

const CMSTourSchedule = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tour = [
    {
      title: 'Vung tau',
      availableDay: [
        {
          date: '2022-07-02',
          ticket: {
            children: 0,
            youth: 20,
            adult: 20,
          },
        },
      ],
    },
  ];

  const { availableDay } = tour[0];

  useEffect(() => {
    dispatch(clearIdTourJustCreate());
  }, []);

  const [formSetAvailableDay] = Form.useForm();
  const [isVisibleFormSetAvailableDay, setVisibleFormSetAvailableDay] =
    useState(false);
  const [valueCalendar, setValueCalendar] = useState(
    moment(new Date(), 'YYYY-MM-DD'),
  );
  const [selectedDay, setSelectedDay] = useState(
    moment(new Date(), 'YYYY-MM-DD'),
  );
  const onSetAvailableDay = newValue => {
    let infor = availableDay?.filter(
      item => item.date === newValue.format('YYYY-MM-DD'),
    );
    if (infor && infor.length > 0)
      formSetAvailableDay.setFieldsValue(infor[0].ticket);
    else formSetAvailableDay.resetFields();
    setValueCalendar(newValue);
    setSelectedDay(newValue);
    setVisibleFormSetAvailableDay(true);
  };

  const onFinish = value => {
    console.log({ ...value, date: valueCalendar.format(`YYYY-MM-DD`), id: id });
    formSetAvailableDay.resetFields();
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  }

  return (
    <>
      <FormModal
        form={formSetAvailableDay}
        cancelText={'Cancel'}
        nameForm={'set_available_day'}
        okText={'Set ticket'}
        title={`Set price of tickets for ${selectedDay.format('YYYY-MM-DD')}`}
        visible={isVisibleFormSetAvailableDay}
        onCreate={onFinish}
        onCancel={() => setVisibleFormSetAvailableDay(false)}
      >
        <Form.Item
          name={'children'}
          label="Children (0 - 12 years)"
          rules={[
            {
              required: true,
              message: 'Please input price of children ticket!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name={'youth'}
          label="Youth (13 - 17 years)"
          rules={[
            {
              required: true,
              message: 'Please input price of youth ticket!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name={'adult'}
          label="Adult (18+ years)"
          rules={[
            {
              required: true,
              message: 'Please input price of adult ticket!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </FormModal>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>
          <Link to="/home">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/cms/tours">Tours</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Set Schedule</Breadcrumb.Item>
      </Breadcrumb>
      <h2 style={{ marginBottom: '1rem' }}>Schedule</h2>
      <div className="wrapper-date-picker">
        <Calendar
          disabledDate={disabledDate}
          onSelect={onSetAvailableDay}
          value={valueCalendar}
          dateCellRender={value => {
            return tour.map(item => {
              return item.availableDay.map(date => {
                if (date.date === value.format('YYYY-MM-DD')) {
                  return (
                    <>
                      <p>
                        Ticket Children:{' '}
                        <b>
                          {date.ticket.children.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </b>
                      </p>
                      <p>
                        Ticket Youth:{' '}
                        <b>
                          {date.ticket.youth.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </b>
                      </p>
                      <p>
                        Ticket Adult:{' '}
                        <b>
                          {date.ticket.adult.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </b>
                      </p>
                    </>
                  );
                }
              });
            });
          }}
        />
      </div>
    </>
  );
};

export default CMSTourSchedule;
