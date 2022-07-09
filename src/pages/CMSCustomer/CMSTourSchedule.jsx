import { Breadcrumb, Calendar, Form, InputNumber, message } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { tourAPI } from '../../api/tourAPI';
import { clearIdTourJustCreate } from '../../app/toursSlice';
import FormModal from '../../components/FormModal/FormModal';
import './CMSTourSchedule.scss';

const CMSTourSchedule = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [availableDay, setAvailableDay] = useState();
  const [formSetAvailableDay] = Form.useForm();
  const [isVisibleFormSetAvailableDay, setVisibleFormSetAvailableDay] =
    useState(false);
  const [valueCalendar, setValueCalendar] = useState(
    moment(new Date(), 'YYYY-MM-DD'),
  );
  const [selectedDay, setSelectedDay] = useState(
    moment(new Date(), 'YYYY-MM-DD'),
  );
  const loadingContext = useLoadingContext();
  useEffect(() => {
    const loading = async () => {
      dispatch(clearIdTourJustCreate());
      try {
        const response = await tourAPI.getScheduleOfTour(id);
        const listSchedule = Object.values(response.data.data).filter(item =>
          _.isObject(item),
        );
        setAvailableDay(listSchedule);
      } catch (error) {
        console.log(error);
      }
    };
    loading();
    loadingContext.done();
  }, []);

  const onSetAvailableDay = newValue => {
    let infor = availableDay?.filter(
      item => item.dateStart === newValue.format('YYYY-MM-DD'),
    );

    if (infor && infor.length > 0) {
      let listTicket = Object.assign({}, infor[0]?.ticket);
      formSetAvailableDay.setFieldsValue({
        children: listTicket[0].price,
        youth: listTicket[1].price,
        adult: listTicket[2].price,
        remain: infor[0].remain,
      });
    } else formSetAvailableDay.resetFields();
    setValueCalendar(newValue);
    setSelectedDay(newValue);
    setVisibleFormSetAvailableDay(true);
  };

  const onFinish = async value => {
    if (
      typeof value.children === 'undefined' &&
      typeof value.youth === 'undefined' &&
      typeof value.adult == 'undefined'
    ) {
      message.error({
        content: 'Please input at least 1 ticket for this day',
        key: 'add-schedule',
      });
    } else {
      // change value obj undefined to null
      const request = _.mapValues(value, v => (_.isUndefined(v) ? null : v));
      await tourAPI
        .addSchedule(
          {
            ...request,
            dateStart: valueCalendar.format(`YYYY-MM-DD`),
          },
          id,
        )
        .then(async () => {
          try {
            const response = await tourAPI.getScheduleOfTour(id);
            const listSchedule = Object.values(response.data.data).filter(
              item => _.isObject(item),
            );
            setAvailableDay(listSchedule);
          } catch (error) {
            console.log(error);
          }

          message.success({
            content: 'Add ticket for this day successful',
            key: 'add-schedule',
          });
        })
        .catch(() => {
          message.error({
            content: 'We cannot add it now. Please try later!',
            key: 'add-schedule',
          });
        });
      setVisibleFormSetAvailableDay(false);
    }
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
        <Form.Item name={'children'} label="Children (0 - 12 years)">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={'youth'} label="Youth (13 - 17 years)">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name={'adult'} label="Adult (18+ years)">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name={'remain'}
          label="Remain"
          rules={[
            {
              required: true,
              message: 'Please input remain of ticket!',
            },
          ]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </FormModal>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
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
            if (availableDay && availableDay.length)
              return availableDay.map(date => {
                if (date.dateStart === value.format('YYYY-MM-DD')) {
                  return (
                    <>
                      <p>
                        Ticket Children:{' '}
                        <b>
                          {date.ticket[0].price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </b>
                      </p>
                      <p>
                        Ticket Youth:{' '}
                        <b>
                          {date.ticket[1].price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </b>
                      </p>
                      <p>
                        Ticket Adult:{' '}
                        <b>
                          {date.ticket[2].price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </b>
                      </p>
                    </>
                  );
                }
              });
          }}
        />
      </div>
    </>
  );
};

export default CMSTourSchedule;
