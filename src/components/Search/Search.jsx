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
            <Select
              bordered={false}
              placeholder={'Where are you going?'}
              showArrow
            >
              <OptGroup label="All destinations">
                <Option value="jack">Vietnam</Option>
                <Option value="lucy">USA</Option>
              </OptGroup>
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
              <OptGroup label="All Activity">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </OptGroup>
            </Select>
          </div>
        </div>
      </Form.Item>

      <Form.Item name="when" className="search-form__item search-form__when">
        <div className="search-form__item__select">
          <AiOutlineCalendar className="search-form__item__select__icon" />
          <div>
            <b>When</b>
            <DatePicker bordered={false} style={{ paddingLeft: 0 }} />
          </div>
        </div>
      </Form.Item>

      <Form.Item name="guest" className="search-form__item search-form__guests">
        <div className="search-form__item__select">
          <AiOutlineUser className="search-form__item__select__icon" />
          <div>
            <b>Guests</b>
            <Select
              className="select-guest-mul"
              mode="multiple"
              showArrow
              bordered={false}
              style={{ padding: 0 }}
              placeholder="Whose ticket?"
            >
              <Option value="children">Children</Option>
              <Option value="young">Young</Option>
              <Option value="adult">Adult</Option>
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
