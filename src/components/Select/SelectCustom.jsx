import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

// const { Option } = Select;

const SelectCustom = props => {
  // eslint-disable-next-line react/prop-types
  const { defaultValue, style, onChange, suffixIcon } = props;

  return (
    <>
      <Select
        suffixIcon={suffixIcon || <DownOutlined />}
        defaultValue={defaultValue}
        style={style}
        onChange={onChange}
      >
        {/* {options.map(option => (
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
        ))} */}
      </Select>
    </>
  );
};

SelectCustom.PropTypes = {
  defaultValue: PropTypes.any,
  options: PropTypes.array,
  suffixIcon: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.any,
};

export default SelectCustom;
