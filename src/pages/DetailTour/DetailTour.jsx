/* eslint-disable no-unused-vars */
import { UserOutlined } from '@ant-design/icons';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Carousel,
  Form,
  InputNumber,
  Progress,
  Rate,
  Spin,
  notification,
} from 'antd';
import { Collapse } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineDollar } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { BiCommentDetail } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { RiErrorWarningLine } from 'react-icons/ri';
import { RiGroupLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { bookTour, getDetailTour } from '../../app/toursSlice';
import CardTour from '../../components/CardTour/CardTour';
import './DetailTour.scss';

const { Panel } = Collapse;

const relatedTour = [
  {
    image: 'https://stylecaster.com/wp-content/uploads/2016/09/travel.jpg',
    name: 'Discover Island asdasdasd',
    duration: 5,
    maxPeople: 50,
    destination: 'Long Xuyen, USA',
    price: 69,
  },
  {
    image: 'https://stylecaster.com/wp-content/uploads/2016/09/travel.jpg',
    name: 'Discover Island asdasdasd',
    duration: 5,
    maxPeople: 50,
    destination: 'Long Xuyen, USA',
    price: 69,
  },
  {
    image: 'https://stylecaster.com/wp-content/uploads/2016/09/travel.jpg',
    name: 'Discover Island asdasdasd',
    duration: 5,
    maxPeople: 50,
    destination: 'Long Xuyen, USA',
    price: 69,
  },
  {
    image: 'https://stylecaster.com/wp-content/uploads/2016/09/travel.jpg',
    name: 'Discover Island asdasdasd',
    duration: 5,
    maxPeople: 50,
    destination: 'Long Xuyen, USA',
    price: 69,
  },
];

const reviews = [
  {
    title: 'location',
    point: 4.38,
  },
  {
    title: 'services',
    point: 4.5,
  },
  {
    title: 'price',
    point: 4.24,
  },
  {
    title: 'rooms',
    point: 4.3,
  },
];

const userReviews = [
  {
    name: 'elicia',
    avatar:
      'https://th.bing.com/th/id/OIP.RUFnG2jQpshf7k4OQH0FEAHaFm?pid=ImgDet&rs=1',
    date: '11/11/2022',
    rating: [
      {
        title: 'location',
        point: 3,
      },
      {
        title: 'services',
        point: 2,
      },
      {
        title: 'price',
        point: 4,
      },
      {
        title: 'room',
        point: 5,
      },
    ],
    comment:
      'This is exactly what i was looking for, thank you so much for these tutorials',
  },
  {
    name: 'elicia',
    avatar:
      'https://th.bing.com/th/id/OIP.RUFnG2jQpshf7k4OQH0FEAHaFm?pid=ImgDet&rs=1',
    date: '11/11/2022',
    rating: [
      {
        title: 'location',
        point: 3,
      },
      {
        title: 'services',
        point: 2,
      },
      {
        title: 'price',
        point: 4,
      },
      {
        title: 'room',
        point: 5,
      },
    ],
    comment:
      'This is exactly what i was looking for, thank you so much for these tutorials',
  },
  {
    name: 'elicia',
    avatar:
      'https://th.bing.com/th/id/OIP.RUFnG2jQpshf7k4OQH0FEAHaFm?pid=ImgDet&rs=1',
    date: '11/11/2022',
    rating: [
      {
        title: 'location',
        point: 3,
      },
      {
        title: 'services',
        point: 2,
      },
      {
        title: 'price',
        point: 4,
      },
      {
        title: 'room',
        point: 5,
      },
    ],
    comment:
      'This is exactly what i was looking for, thank you so much for these tutorials',
  },
];

const disabledDate = current => {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
};

export default function DetailTour() {
  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailTour = useSelector(state => state.tours.tour);
  const loadingState = useSelector(state => state.tours.loading);
  const [bookingDate, setBookingDate] = useState('');
  const [adultNumber, setAdultNumber] = useState(0);
  const [youthNumber, setYouthNumber] = useState(0);
  const [childrenNumber, setChildrenNumber] = useState(0);
  const [total, setTotal] = useState(0);

  console.log(detailTour);

  const detailTourItem = useMemo(() => {
    return [
      {
        icon: <AiOutlineDollar />,
        title: 'price',
        detail: detailTour.price,
      },
      {
        icon: <BiTimeFive />,
        title: 'duration',
        detail: detailTour.duration + ' days',
      },
      {
        icon: <RiGroupLine />,
        title: 'max people',
        detail: detailTour.maxPeople + ' people',
      },
      {
        icon: <RiErrorWarningLine />,
        title: 'min age',
        detail: detailTour.minAge,
      },
      {
        icon: <BiCommentDetail />,
        title: 'reviews',
        detail: '8 reviews',
      },
    ];
  }, [detailTour]);

  useEffect(() => {
    dispatch(getDetailTour(id));
  }, []);

  // validate booking
  const handleSubmit = () => {
    if (!bookingDate) {
      notification.error({
        message: 'Book failed!',
        description: 'Please choose the day!',
      });
    } else if (adultNumber === 0 && youthNumber === 0 && childrenNumber === 0) {
      notification.error({
        message: 'Book failed!',
        description: 'Please choose your ticket!',
      });
    } else {
      if (!localStorage.getItem('token')) {
        notification.error({
          message: 'Book failed!',
          description: 'You should login before book tour!',
        });
      } else {
        notification.success({
          message: 'Book successfully!',
          description: 'Please choose your ticket!',
        });

        const bookingTour = {
          title: detailTour.title,
          duration: detailTour.duration,
          maxPeople: detailTour.maxPeople,
          date: bookingDate,
          images: detailTour.tourImages,
          tickets: {
            adult: {
              quantity: adultNumber,
              price: adultNumber * detailTour.tickets[2].adult,
            },
            youth: {
              quantity: youthNumber,
              price: youthNumber * detailTour.tickets[1].youth,
            },
            children: {
              quantity: childrenNumber,
              price: childrenNumber * detailTour.tickets[0].children,
            },
          },
          total,
        };

        // dispatch(bookTour(bookingTour));
        // console.log(bookingTour);

        // Save local for temp
        localStorage.setItem('bookingTour', JSON.stringify(bookingTour));

        setTimeout(() => {
          navigate(`/checkout/${id}`);
          scrollTo(0, 0);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (detailTour.tourPlans) {
      setTotal(
        adultNumber * detailTour.tickets[2].adult +
          youthNumber * detailTour.tickets[1].youth +
          childrenNumber * detailTour.tickets[0].children,
      );
    }
  }, [adultNumber, youthNumber, childrenNumber]);

  return (
    <section className="detailTour">
      <Spin
        spinning={loadingState}
        size="large"
        className={loadingState ? 'detailTour__loading' : null}
      />
      <div className="detailTour__intro-wrapper">
        <div className="detailTour__intro-content">
          <h1 className="detailTour__intro-heading">
            {detailTour.title ? detailTour.title : 'Tour title'}
          </h1>
          <div className="detailTour__location">
            <span className="detailTour__icon">
              <GoLocation></GoLocation>
            </span>
            <span className="detailTour__words">
              {detailTour.tourPlans && detailTour.tourPlans.length > 0
                ? detailTour.tourPlans[0].destination
                : 'Location'}
            </span>
          </div>
          <div className="detailTour__carousel-wrapper">
            <Carousel
              arrows
              prevArrow={<LeftOutlined />}
              nextArrow={<RightOutlined />}
              autoplay
              className="detailTour__carousel"
              draggable={true}
              slidesToShow={2}
            >
              {detailTour.tourImages && detailTour.tourImages.length > 0
                ? detailTour.tourImages.map(item => {
                    return (
                      <>
                        <div key={item.id} className="detailTour__img-wrapper">
                          <img
                            src={item.path}
                            alt="photo"
                            className="detailTour__img"
                          />
                        </div>
                      </>
                    );
                  })
                : null}
            </Carousel>
          </div>
          <div className="detailTour__information">
            {detailTourItem.map((item, index) => {
              return (
                <>
                  <div className="detailTour__information-item" key={index}>
                    <span className="detailTour__information-icon">
                      {item.icon}
                    </span>
                    <span className="detailTour__information-words">
                      <p className="detailTour__information-heading-words">
                        {item.title}
                      </p>
                      <p className="detailTour__information-detail">
                        {item.detail}
                      </p>
                    </span>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="detailTour__information-section">
        <div className="detailTour__content-wrapper">
          <div className="detailTour__content">
            <div className="detailTour__overview">
              <h2 className="detailTour__content-heading">overview</h2>
              <p className="detailTour__overview-description">
                {detailTour.overView ? detailTour.overView : null}
              </p>
            </div>
            <div className="detailTour__services">
              <h2 className="detailTour__content-heading">services</h2>
              <ul className="detailTour__services-list">
                {detailTour.services && detailTour.services.length > 0
                  ? detailTour.services.map(item => {
                      return (
                        <li className="detailTour__services-item" key={item.id}>
                          <AiOutlineCheckCircle className="detailTour__services-item-icon"></AiOutlineCheckCircle>
                          {item.name}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
            <div className="detailTour__plan">
              <h2 className="detailTour__content-heading detailTour__content-heading--primary">
                tour plan
              </h2>
              <Collapse
                accordion
                className="detailTour__plan"
                expandIconPosition="end"
              >
                {detailTour.tourPlans && detailTour.tourPlans.length > 0
                  ? detailTour.tourPlans.map(item => {
                      return (
                        <Panel
                          className="detailTour__plan-item"
                          header={
                            <span className="detailTour__plan-heading">
                              <GoLocation className="detailTour__plan-icon" />
                              <span className="detailTour__plan-heading-word">
                                Day {item.day}{' '}
                                <span className="detailTour__place-words">
                                  {item.destination}
                                </span>
                              </span>
                            </span>
                          }
                          key={item.id}
                        >
                          <p className="detail__plan-description">
                            {item.description}
                          </p>
                        </Panel>
                      );
                    })
                  : null}
              </Collapse>
            </div>
            <div className="detailTour__relatedTour">
              <h2 className="detailTour__content-heading">you may like</h2>
              <Carousel
                autoplay
                className="detailTour__relatedTour-carousel"
                draggable={true}
                slidesToShow={2}
              >
                {relatedTour.map((item, index) => {
                  return (
                    <>
                      <div className="detailTour__relatedTour-item">
                        <CardTour tour={item} key={index} />
                      </div>
                    </>
                  );
                })}
              </Carousel>
            </div>
            <div className="detailTour__review-wrapper">
              <div className="detailTour__review-overall-wrapper">
                <h2 className="detailTour__content-heading">reviews</h2>
                <div className="detailTour__review-overall">
                  <div className="detailTour__review-overall-words">
                    <div className="detailTour__review-overall-point">
                      <span className="detailTour__review-overall-average">
                        4.28
                      </span>
                      <span className="detailTour__review-overall-pattern">
                        /5
                      </span>
                    </div>
                    <p className="detailTour__review-overall-adj">wonderful</p>
                    <p className="detailTour__review-overall-total">
                      8 verified reviews
                    </p>
                  </div>
                  <div className="detailTour__review-chart-wrapper">
                    {reviews.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="detailTour__review-chart-item"
                          >
                            <p className="detailTour__review-chart-heading">
                              <span className="detailTour__review-chart-title">
                                {item.title}
                              </span>
                              <span className="detailTour__review-chart-point">
                                {item.point}/5
                              </span>
                            </p>
                            <Progress
                              className="detailTour__review-chart-progress"
                              percent={(item.point / 5) * 100}
                              showInfo={false}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="detailTour__review-detail-wrapper">
                {userReviews.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="detailTour__review-detail-item"
                      >
                        <div className="detailTour__review-item-avatar">
                          <Avatar
                            src={item.avatar}
                            size="large"
                            icon={<UserOutlined />}
                          />
                        </div>
                        <div className="detailTour__review-item-section">
                          <p className="detailTour__review-item-name">
                            {item.name}
                          </p>
                          <p className="detailTour__review-item-date">
                            {item.date}
                          </p>
                          <div className="detailTour__review-item-rating-wrapper">
                            {item.rating.map((rItem, rIndex) => {
                              return (
                                <>
                                  <div
                                    className="detailTour__review-item-rating"
                                    key={rIndex}
                                  >
                                    <p className="detailTour__review-item-title">
                                      {rItem.title}
                                    </p>
                                    <Rate
                                      disabled
                                      defaultValue={rItem.point}
                                      className="detailTour__review-item-point"
                                    />
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          <p className="detailTour__review-item-comment">
                            This is exactly what i was looking for, thank you so
                            much for these tutorials
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="detailTour__booking-wrapper">
            <div className="detailTour__booking">
              <h3 className="detailTour__booking-heading">Book This Tour</h3>
              <Form
                initialValues={{ ticket: 0 }}
                autoComplete="off"
                className="detailTour__booking-form"
              >
                <Form.Item className="detailTour__booking-date">
                  <p className="detailTour__booking-label">From:</p>
                  <DatePicker
                    disabledDate={disabledDate}
                    onChange={(date, dateString) => {
                      setBookingDate(dateString);
                    }}
                    format="DD/MM/YYYY"
                    className="detailTour__booking-date-input"
                  />
                </Form.Item>
                <div className="detailTour__booking-tickets">
                  <p className="detailTour__booking-label">Tickets:</p>
                  <Form.Item
                    className="detailTour__booking-tickets-section"
                    name="ticket"
                  >
                    <label
                      htmlFor="tickets-section1"
                      className="detailTour__booking-tickets-description"
                    >
                      Adult (18+ years){' '}
                      <span className="detailTour__booking-tickets-price">
                        $
                        {detailTour.tickets && detailTour.tickets.length > 0
                          ? detailTour.tickets[2].adult
                          : 0}
                        .00
                      </span>
                    </label>
                    <InputNumber
                      id="tickets-section1"
                      onChange={e => setAdultNumber(e)}
                      value={adultNumber}
                      min={0}
                      max={10}
                    />
                  </Form.Item>
                  <Form.Item
                    className="detailTour__booking-tickets-section"
                    name="ticket"
                  >
                    <label
                      htmlFor="tickets-section2"
                      className="detailTour__booking-tickets-description"
                    >
                      Youth (13-17 years)
                      <span className="detailTour__booking-tickets-price">
                        $
                        {detailTour.tickets && detailTour.tickets.length > 0
                          ? detailTour.tickets[1].youth
                          : 0}
                        .00
                      </span>
                    </label>
                    <InputNumber
                      value={youthNumber}
                      onChange={e => setYouthNumber(e)}
                      id="tickets-section2"
                      min={0}
                      max={10}
                    />
                  </Form.Item>
                  <Form.Item
                    className="detailTour__booking-tickets-section"
                    name="ticket"
                  >
                    <label
                      htmlFor="tickets-section3"
                      className="detailTour__booking-tickets-description"
                    >
                      Children (0-12 years){' '}
                      <span className="detailTour__booking-tickets-price">
                        $
                        {detailTour.tickets && detailTour.tickets.length > 0
                          ? detailTour.tickets[0].children
                          : 0}
                        .00
                      </span>
                    </label>
                    <InputNumber
                      value={childrenNumber}
                      onChange={e => setChildrenNumber(e)}
                      id="tickets-section3"
                      min={0}
                      max={10}
                    />
                  </Form.Item>
                </div>
                <div className="detailTour__booking-footer">
                  <div className="detailTour__booking-count">
                    <span className="detailTour__booking-count-words">
                      Total:
                    </span>
                    <span className="detailTour__booking-total">
                      ${total}.00
                    </span>
                  </div>
                  <Form.Item htmlType="submit">
                    <Button
                      onClick={handleSubmit}
                      className="detailTour__booking-btn"
                      type="primary"
                      size="large"
                    >
                      book now
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
