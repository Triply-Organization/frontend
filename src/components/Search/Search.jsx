import { Button, DatePicker, Form, Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import {
  AiOutlineCalendar,
  AiOutlineCompass,
  AiOutlineDribbble,
  AiOutlineSearch,
  AiOutlineUser,
} from 'react-icons/ai';

import './Search.scss';

const { Option, OptGroup } = Select;

const Search = props => {
  const { onFinish, destinations, services, form } = props;
  return (
    <Form name="search" className="search-form" onFinish={onFinish} form={form}>
      <div className="search-form__item__select">
        <AiOutlineCompass className="search-form__item__select__icon" />
        <div>
          <b>Destination</b>
          <Form.Item
            name="destinations"
            className="search-form__item search-form__destinations "
          >
            <Select
              className="search-form__item__field"
              allowClear
              bordered={false}
              style={{ border: 'none' }}
              placeholder={'Where are you going?'}
              showArrow
            >
              <OptGroup label="All destinations">
                {destinations &&
                  destinations.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </OptGroup>
            </Select>
          </Form.Item>
        </div>
      </div>

      <div className="search-form__item__select">
        <AiOutlineDribbble className="search-form__item__select__icon" />
        <div>
          <b>Service</b>
          <Form.Item
            name="services"
            className="search-form__item search-form__activity"
          >
            <Select
              className="search-form__item__field"
              allowClear
              bordered={false}
              placeholder={'All Activity'}
              style={{ border: 'none' }}
            >
              <OptGroup label="All Activity">
                {services &&
                  services.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </OptGroup>
            </Select>
          </Form.Item>
        </div>
      </div>

      <div className="search-form__item__select">
        <AiOutlineCalendar className="search-form__item__select__icon" />
        <div>
          <b>When</b>
          <Form.Item
            name="when"
            className="search-form__item search-form__when"
          >
            <DatePicker
              className="search-form__item__field"
              bordered={false}
              style={{ paddingLeft: 0, border: 'none' }}
              allowClear
            />
          </Form.Item>
        </div>
      </div>

      <div className="search-form__item__select">
        <AiOutlineUser className="search-form__item__select__icon" />
        <div>
          <b>Guests</b>
          <Form.Item
            name="guests[]"
            className="search-form__item search-form__guests"
          >
            <Select
              className="select-guest-mul search-form__item__field"
              mode="multiple"
              showArrow
              bordered={false}
              style={{ padding: 0, border: 'none' }}
              placeholder="Whose ticket?"
            >
              <Option value="1">Adult</Option>
              <Option value="2">Young</Option>
              <Option value="3">Children</Option>
            </Select>
          </Form.Item>
        </div>
      </div>

      <Form.Item className="search-form__item--submit">
        <Button
          type="primary"
          htmlType="submit"
          className="search-form__item__button"
          icon={<AiOutlineSearch style={{ fontSize: '20px' }} />}
        >
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

Search.propTypes = {
  onFinish: PropTypes.func,
  destinations: PropTypes.array,
  services: PropTypes.array,
  form: PropTypes.any,
};

export default Search;
