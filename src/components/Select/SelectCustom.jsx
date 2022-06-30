import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const { Option } = Select;

const SelectCustom = props => {
  const { defaultValue, style, options, onChange, suffixIcon } = props;
  console.log(props);
  return (
    <>
      <Select
        suffixIcon={suffixIcon || <DownOutlined />}
        defaultValue={defaultValue}
        style={style}
        onChange={onChange}
      >
        {options?.map(option => (
          <Option key={option.key}>
            <img
              style={{
                marginBottom: '2px',
                marginRight: '4px',
              }}
              src={option.icon}
              alt=""
            />
            {option.value}
          </Option>
        ))}
      </Select>
    </>
  );
};

SelectCustom.propTypes = {
  defaultValue: PropTypes.array,
  options: PropTypes.any,
  suffixIcon: PropTypes.any,
  onChange: PropTypes.func,
  style: PropTypes.any,
};

export default SelectCustom;
