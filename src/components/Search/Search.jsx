import { Button, DatePicker, Form, Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <Form name="search" className="search-form" onFinish={onFinish} form={form}>
      <div className="search-form__item__select">
        <AiOutlineCompass className="search-form__item__select__icon" />
        <div>
          <b>{t('search.destination.title')}</b>
          <Form.Item
            name="destinations"
            className="search-form__item search-form__destinations "
          >
            <Select
              className="search-form__item__field"
              allowClear
              bordered={false}
              style={{ border: 'none' }}
              placeholder={t('search.destination.place_holder')}
              showArrow
            >
              <OptGroup label="All destinations">
                {destinations &&
                  destinations.map((item, index) => (
                    <Option
                      key={index}
                      value={item.id}
                      data-testid="option-search-destination"
                    >
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
          <b>{t('search.service.title')}</b>
          <Form.Item
            name="services"
            className="search-form__item search-form__activity"
          >
            <Select
              className="search-form__item__field"
              allowClear
              bordered={false}
              placeholder={t('search.service.place_holder')}
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
          <b>{t('search.when.title')}</b>
          <Form.Item
            name="when"
            className="search-form__item search-form__when"
          >
            <DatePicker
              className="search-form__item__field"
              bordered={false}
              style={{ paddingLeft: 0, border: 'none' }}
              allowClear
              placeholder={t('search.when.place_holder')}
            />
          </Form.Item>
        </div>
      </div>

      <div className="search-form__item__select">
        <AiOutlineUser className="search-form__item__select__icon" />
        <div>
          <b>{t('search.guest.title')}</b>
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
              placeholder={t('search.guest.place_holder')}
            >
              <Option value="1">{t('search.guest.item.adult')}</Option>
              <Option value="2">{t('search.guest.item.young')}</Option>
              <Option value="3">{t('search.guest.item.children')}</Option>
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
          {t('cta.search')}
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
