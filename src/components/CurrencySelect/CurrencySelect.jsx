import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

const CurrencySelect = () => {
  const currencyOptions = [
    { style: 'currency', currency: 'USD' },
    { style: 'currency', currency: 'VND' },
  ];

  const changCurrency = current => {
    console.log(current.toLowerCase());
    localStorage.setItem('currencyItem', current);
    if (current === 'USD') {
      localStorage.setItem('currencyString', 'en-US');
    } else if (current === 'VND') {
      localStorage.setItem('currencyString', 'vi-VI');
    } else return 'USD';
  };

  return (
    <div>
      <Select
        style={{ width: '80px' }}
        defaultValue={localStorage.getItem('currencyItem')}
        onChange={changCurrency}
      >
        {currencyOptions.map((item, index) => (
          <Option key={index} value={item.currency}>
            {item.currency}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CurrencySelect;
