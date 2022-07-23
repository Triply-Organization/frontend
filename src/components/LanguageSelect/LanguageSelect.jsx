import { Select, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import englishIcon from '../../assets/images/united-kingdom.webp';
import vietnameIcon from '../../assets/images/vietnam.webp';

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const { Option } = Select;

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  return (
    <Select
      style={{ width: 'fit-content' }}
      onChange={changeLanguage}
      value={i18n.language === 'en-US' || i18n.language === 'en' ? 'en' : 'vi'}
    >
      <Option value={'en'}>
        <Space>
          <img src={englishIcon} alt="triply english" />
          <p>English</p>
        </Space>
      </Option>
      <Option value={'vi'}>
        <Space>
          <img src={vietnameIcon} alt="triply vietnamese" />
          <p>Vietnamese</p>
        </Space>
      </Option>
    </Select>
  );
};

export default LanguageSelect;
