import { Button, Form, Select } from 'antd';
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

const { Option } = Select;

const Search = props => {
  const { form, onFinish } = props;
  return (
    <Form form={form} name="search" className="search-form" onFinish={onFinish}>
      <Form.Item
        name="destinations"
        className="search-form__item search-form__destinations "
      >
        <div className="search-form__item__select">
          <AiOutlineCompass className="search-form__item__select__icon" />
          <div>
            <b>Destinations</b>
            <Select bordered={false} placeholder={'Where are you going?'}>
              <Option value="lucy">Canada</Option>
            </Select>
          </div>
        </div>
      </Form.Item>

      <Form.Item
        name="activity"
        className="search-form__item search-form__activity"
      >
        <div className="search-form__item__select">
          <AiOutlineDribbble className="search-form__item__select__icon" />
          <div>
            <b>Activity</b>
            <Select bordered={false} placeholder={'All Activity'}>
              <Option value="lucy">Canada</Option>
            </Select>
          </div>
        </div>
      </Form.Item>

      <Form.Item name="when" className="search-form__item search-form__when">
        <div className="search-form__item__select">
          <AiOutlineCalendar className="search-form__item__select__icon" />
          <div>
            <b>When</b>
            <Select bordered={false} placeholder={'Date from'}>
              <Option value="lucy">Canada</Option>
            </Select>
          </div>
        </div>
      </Form.Item>

      <Form.Item name="guest" className="search-form__item search-form__guests">
        <div className="search-form__item__select">
          <AiOutlineUser className="search-form__item__select__icon" />
          <div>
            <b>Guests</b>
            <Select bordered={false} placeholder={'0'} showArrow={true}>
              <Option value="lucy">Canada</Option>
            </Select>
          </div>
        </div>
      </Form.Item>

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
  form: PropTypes.any,
  onFinish: PropTypes.func,
};

export default Search;
