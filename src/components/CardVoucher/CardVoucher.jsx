import { Button } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

import './CardVoucher.scss';

const CardVoucher = props => {
  const {
    title,
    subTitle,
    buttonContent,
    buttonOnClick,
    background,
    btnBgColor,
    ...prop
  } = props;
  return (
    <div className="card-voucher" {...prop}>
      <div className="card-voucher__content">
        <div className="card-voucher__content__typho">
          <h2>{title}</h2>
          <p>{subTitle}</p>
        </div>
        <Button
          className="card-voucher__content__button"
          type="primary"
          style={{ backgroundColor: btnBgColor }}
          onClick={buttonOnClick}
        >
          {buttonContent}
          <BsArrowRight className="icon" />
        </Button>
      </div>

      <img src={background} alt={title} />
    </div>
  );
};

CardVoucher.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  buttonContent: PropTypes.string,
  buttonOnClick: PropTypes.func,
  background: PropTypes.string,
  btnBgColor: PropTypes.string,
};

export default CardVoucher;
