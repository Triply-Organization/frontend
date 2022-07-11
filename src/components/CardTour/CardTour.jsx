import { Button, Rate, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import {
  AiOutlineCalendar,
  AiOutlineComment,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';

import './CardTour.scss';

const CardTour = props => {
  const { tour, tag, ...prop } = props;
  const navigate = useNavigate();
  return (
    <div className="card-tour" {...prop}>
      {tag && <div className="card-tour__tag">{tag}</div>}
      <Link
        to={`/detail/${tour.id}/${tour.name.split(' ').join('+')}`}
        className="card-tour__image-wrapper"
      >
        <div className="card-tour__image-wrapper__overlay" />
        <img
          src={tour.image}
          alt={tour.name}
          draggable={false}
          className="card-tour__image-wrapper__image"
        />
      </Link>
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
            <p>{tour?.totalReviews || 0}</p>
          </div>
        </div>
      </div>
      <div className="card-tour__content">
        <Tooltip title={tour.name} placement="bottom">
          <h2 className="card-tour__title">{tour.name}</h2>
        </Tooltip>
        <p className="card-tour__destination">
          <GoLocation /> {tour.tourDestination}
        </p>
      </div>
      <div className="card-tour__footer">
        <div>
          <p>From USD</p>
          <b>
            {tour?.minPrice?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}{' '}
            -{' '}
            {tour?.maxPrice?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </b>
        </div>

        <Button
          onClick={() =>
            navigate(`/detail/${tour.id}/${tour.name.split(' ').join('+')}`)
          }
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
