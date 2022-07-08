import { Button, Rate } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import {
  AiOutlineCalendar,
  AiOutlineComment,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

import './CardTour.scss';

const CardTour = props => {
  const { tour, tag } = props;
  const currencyString = localStorage.getItem('currencyString') || 'en-US';
  const currencyItem = localStorage.getItem('currencyItem') || 'USD';
  const navigate = useNavigate();
  console.log(tour.image);
  return (
    <div className="card-tour">
      {tag && <div className="card-tour__tag">{tag}</div>}
      <div className="card-tour__image-wrapper">
        <div className="card-tour__image-wrapper__overlay" />
        <img
          src={tour.image}
          alt={tour.name}
          className="card-tour__image-wrapper__image"
        />
      </div>
      <div className="card-tour__meta">
        <div className="card-tour__meta__item-wrapper">
          <div className="card-tour__meta__item">
            <AiOutlineCalendar className="card-tour__meta__item__icon" />
            <p>{tour.duration} days</p>
          </div>
          <div className="card-tour__meta__item">
            <AiOutlineUser className="card-tour__meta__item__icon" />

            <p>{tour.maxPeople}</p>
          </div>
        </div>
        <div className="card-tour__meta__review">
          <Rate
            disabled
            defaultValue={tour?.rating}
            allowHalf
            className="card-tour__meta__review__rate"
          />
          <div className="card-tour__meta__review__counter">
            <AiOutlineComment />
            <p>10</p>
          </div>
        </div>
      </div>
      <div className="card-tour__content">
        <h2 className="card-tour__title">{tour.name}</h2>
        <p className="card-tour__destination">
          <GoLocation /> {tour.tourDestination}
        </p>
      </div>
      <div className="card-tour__footer">
        <div>
          <p>From USD</p>
          <b>
            {tour?.minPrice?.toLocaleString(`${currencyString}`, {
              style: 'currency',
              currency: `${currencyItem}`,
            })}{' '}
            -{' '}
            {tour?.maxPrice?.toLocaleString(`${currencyString}`, {
              style: 'currency',
              currency: `${currencyItem}`,
            })}
          </b>
        </div>

        <Button
          onClick={() => navigate(`/detail/${tour.id}`)}
          type="link"
          className="card-tour__footer__button"
        >
          Explore
          <BsArrowRight />
        </Button>
      </div>
    </div>
  );
};

CardTour.propTypes = {
  tour: PropTypes.object,
  tag: PropTypes.string,
};

export default CardTour;
