/* eslint-disable no-unused-vars */
import { UserOutlined } from '@ant-design/icons';
import { CameraOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Carousel,
  Empty,
  Form,
  InputNumber,
  Rate,
  Spin,
  Typography,
  notification,
} from 'antd';
import { Collapse } from 'antd';
import { DatePicker } from 'antd';
import { Space } from 'antd';
import { message } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AiOutlineCheckCircle,
  AiOutlineFire,
  AiOutlineFlag,
  AiOutlinePicture,
} from 'react-icons/ai';
import { AiOutlineDollar } from 'react-icons/ai';
import { BiSpa, BiTimeFive } from 'react-icons/bi';
import { BiCommentDetail } from 'react-icons/bi';
import { BsBicycle, BsBinoculars } from 'react-icons/bs';
import { GiMountainCave } from 'react-icons/gi';
import { GoLocation } from 'react-icons/go';
import {
  MdOutlineDirectionsBoat,
  MdOutlineDirectionsBus,
  MdOutlineFastfood,
  MdOutlineFestival,
} from 'react-icons/md';
import { RiErrorWarningLine } from 'react-icons/ri';
import { RiGroupLine } from 'react-icons/ri';
import { TbSailboat } from 'react-icons/tb';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { getDetailTour } from '../../app/toursSlice';
import CardTour from '../../components/CardTour/CardTour';
import { booking } from './../../app/orderSlice';
import './DetailTour.scss';

const { Panel } = Collapse;
const { Text } = Typography;

export default function DetailTour() {
  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('user'));
  const detailTour = useSelector(state => state.tours.tour);
  const loadingState = useSelector(state => state.tours.loading);
  const availableDate = useSelector(state => state.tours.tour.availableDate);
  const priceDate = useSelector(state => state.tours.tour.priceFollowDate);
  const relatedTours = useSelector(state => state.tours.tour.relatedTour);
  const dataCheckout = useSelector(state => state.order.checkout);
  const bookingStatus = useSelector(state => state.order.status);
  const [bookingDate, setBookingDate] = useState('');
  const [adultNumber, setAdultNumber] = useState({
    value: 0,
    price: 0,
  });
  const [youthNumber, setYouthNumber] = useState({
    value: 0,
    price: 0,
  });
  const [childrenNumber, setChildrenNumber] = useState({
    value: 0,
    price: 0,
  });
  const [children, setChildren] = useState({});
  const [adult, setAdult] = useState({});
  const [youth, setYouth] = useState({});
  const [total, setTotal] = useState(0);
  const [priceFollowDate, setPriceFollowDate] = useState([]);
  const { t } = useTranslation();
  const currencyString = localStorage.getItem('currencyString') || 'en-US';
  const currencyItem = localStorage.getItem('currencyItem') || 'USD';
  const loadingContext = useLoadingContext();
  const [visibleGallery, setVisibleGallery] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const loading = useSelector(state => state.tours.loading);

  useEffect(() => {
    if (!_.isEmpty(detailTour)) {
      setGallery(detailTour?.tourImages?.map(item => item.path));
      document.title = detailTour.title.toString();
    }
  }, [detailTour]);

  const [formTicket] = Form.useForm();

  useEffect(() => {
    if (dataCheckout.id) {
      navigate(`/checkout/${dataCheckout.id}`);
    }
  }, [dataCheckout]);

  useEffect(() => {
    setTotal(
      adultNumber.value * adultNumber.price +
        youthNumber.value * youthNumber.price +
        childrenNumber.value * childrenNumber.price,
    );
  }, [adultNumber, youthNumber, childrenNumber]);

  const handleChangePrice = (value, unique) => {
    switch (unique.type) {
      case 'adult':
        setAdult({ priceListId: unique.id, amount: value });
        setAdultNumber({ value, price: unique.price });
        break;
      case 'youth':
        setYouth({ priceListId: unique.id, amount: value });
        setYouthNumber({ value, price: unique.price });
        break;
      case 'children':
        setChildren({ priceListId: unique.id, amount: value });
        setChildrenNumber({ value, price: unique.price });
    }
  };

  const userReviews = detailTour.reviews?.map(item => {
    return {
      name: item.name,
      avatar: item.avatar,
      date: item.createdAt,
      rating: [
        {
          title: 'location',
          point: item.rating.location,
        },
        {
          title: 'services',
          point: item.rating.services,
        },
        {
          title: 'price',
          point: item.rating.price,
        },
        {
          title: 'rooms',
          point: item.rating.rooms,
        },
        {
          title: 'amenities',
          point: item.rating.amenities,
        },
      ],
      comment: item.comment,
    };
  });

  const disabledDate = current => {
    return !availableDate.find(date => {
      if (current && current.valueOf() > Date.now())
        return date === moment(current).format('YYYY-MM-DD');
    });
  };

  const handleDatePickerChange = (date, dateString) => {
    if (dateString) {
      const result = priceDate.filter(item =>
        item.startDate.includes(dateString),
      );
      setPriceFollowDate(result);
      setTotal(0);
      setBookingDate(dateString);
    } else {
      setTotal(0);
      setPriceFollowDate([]);
      setBookingDate('');
      setTotal(0);
    }
    formTicket.setFieldsValue({ adult: 0, youth: 0, children: 0 });
  };

  const detailTourItem = useMemo(() => {
    return [
      {
        icon: <AiOutlineDollar />,
        title: 'Price',
        detail: `${detailTour.minPrice?.toLocaleString(`${currencyString}`, {
          style: 'currency',
          currency: `${currencyItem}`,
        })} - ${detailTour.maxPrice?.toLocaleString(`${currencyString}`, {
          style: 'currency',
          currency: `${currencyItem}`,
        })}`,
      },
      {
        icon: <BiTimeFive />,
        title: `${t('detail_tour.duration.title')}`,
        detail: detailTour.duration + ' days',
      },
      {
        icon: <RiGroupLine />,
        title: `${t('detail_tour.max_people.title')}`,
        detail:
          detailTour.maxPeople + ` ${t('detail_tour.max_people.content')}`,
      },
      {
        icon: <RiErrorWarningLine />,
        title: `${t('detail_tour.min_age')}`,
        detail: `${detailTour.minAge}+`,
      },
      {
        icon: <BiCommentDetail />,
        title: `${t('detail_tour.review.title')}`,
        detail: (
          <Space>
            <Rate
              allowHalf
              disabled
              value={detailTour.rating?.avg || 0}
              style={{ fontSize: '1rem', color: '#2DD75D' }}
            />
            {`${userReviews?.length} ${t('detail_tour.review.content')}`}
          </Space>
        ),
      },
    ];
  }, [detailTour]);
  useEffect(() => {
    dispatch(getDetailTour(id));

    setTimeout(() => {
      loadingContext.done();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 600);
  }, []);

  // validate booking
  const handleSubmit = values => {
    const request = {
      children: children,
      adult: adult,
      youth: youth,
    };

    if (!bookingDate) {
      message.error({
        content: 'Please choose the day!',
        key: 'booking',
      });
    } else if (
      adultNumber.value === 0 &&
      youthNumber.value === 0 &&
      childrenNumber.value === 0
    ) {
      message.error({
        content: 'Please choose your ticket!',
        key: 'booking',
      });
    } else {
      if (!localStorage.getItem('token')) {
        message.error({
          content: 'You should login before book tour!',
          key: 'booking',
        });
      } else if (
        values.adult + values.youth + values.children >
        detailTour.maxPeople
      ) {
        message.error({
          content: 'You have overbooked for this tour!',
          key: 'booking',
        });
      } else {
        dispatch(booking(request));
      }
    }
  };

  const renderIconServies = key => {
    switch (key.toLowerCase()) {
      case 'sailing':
        return <TbSailboat />;

      case 'overland truck':
        return <MdOutlineDirectionsBus />;

      case 'river cruise':
        return <MdOutlineDirectionsBoat />;

      case 'health & wellness':
        return <BiSpa />;

      case 'explorer':
        return <BsBinoculars />;

      case 'in-depth cultural':
        return <AiOutlinePicture />;

      case 'food & culinary':
        return <MdOutlineFastfood />;

      case 'bicycle':
        return <BsBicycle />;

      case 'hiking & trekking':
        return <GiMountainCave />;

      case 'festival & events':
        return <MdOutlineFestival />;

      case 'active':
        return <AiOutlineFlag />;

      default:
        return <AiOutlineFire />;
    }
  };

  return (
    <Spin spinning={loading}>
      <section className="detailTour">
        {visibleGallery && !_.isEmpty(gallery) && (
          <Lightbox
            reactModalStyle={{ width: '100px' }}
            mainSrc={gallery[photoIndex]}
            nextSrc={gallery[(photoIndex + 1) % gallery.length]}
            prevSrc={
              gallery[(photoIndex + gallery.length - 1) % gallery.length]
            }
            onCloseRequest={() => setVisibleGallery(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + gallery.length - 1) % gallery.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % gallery.length)
            }
          />
        )}
        <div className="detailTour__intro-wrapper">
          <div className="detailTour__intro-content">
            <div className="detailTour__carousel-wrapper">
              <Button
                shape="round"
                size="large"
                onClick={() => {
                  setVisibleGallery(true);
                }}
                icon={<CameraOutlined />}
                className={'detailTour__carousel-wrapper__btn'}
              >
                Gallery
              </Button>
              <div className="detailTour__carousel-wrapper__content">
                <h1 className="detailTour__intro-heading">
                  {detailTour.title ? detailTour.title : 'Tour title'}
                </h1>
                <div className="detailTour__location">
                  <span className="detailTour__icon">
                    <GoLocation style={{ fontSize: '1rem' }} />
                  </span>
                  <span className="detailTour__words">
                    {detailTour.tourPlans && detailTour.tourPlans.length > 0
                      ? detailTour.tourPlans[0].destination
                      : 'Location'}
                  </span>
                </div>
              </div>

              <Carousel
                autoplay
                arrows
                prevArrow={<LeftOutlined />}
                nextArrow={<RightOutlined />}
                effect="fade"
                className="detailTour__carousel"
                draggable={true}
                slidesToShow={1}
              >
                {detailTour.tourImages && detailTour.tourImages.length > 0
                  ? detailTour.tourImages.map(item => {
                      return (
                        <div key={item.id} className="detailTour__img-wrapper">
                          <img
                            src={item.path}
                            alt="photo"
                            className="detailTour__img"
                          />
                        </div>
                      );
                    })
                  : null}
              </Carousel>
            </div>
            <div className="detailTour__information">
              {detailTourItem.map((item, index) => {
                return (
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
                );
              })}
            </div>
          </div>
        </div>
        <div className="detailTour__information-section">
          <div className="detailTour__content-wrapper">
            <div className="detailTour__content">
              <div className="detailTour__overview">
                <h2 className="detailTour__content-heading">
                  {t('detail_tour.overview')}
                </h2>
                <p className="detailTour__overview-description">
                  {detailTour.overView ? detailTour.overView : null}
                </p>
              </div>
              <div className="detailTour__services">
                <h2 className="detailTour__content-heading">
                  {t('detail_tour.service')}
                </h2>
                <ul className="detailTour__services-list">
                  {detailTour.services && detailTour.services.length > 0
                    ? detailTour.services.map(item => {
                        return (
                          <li
                            className="detailTour__services-item"
                            key={item.id}
                          >
                            {renderIconServies(item.name)}
                            <p>{item.name}</p>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </div>
              <div className="detailTour__plan">
                <h2 className="detailTour__content-heading detailTour__content-heading--primary">
                  {t('detail_tour.tour_plan')}
                </h2>
                <Collapse className="detailTour__plan" expandIconPosition="end">
                  {detailTour.tourPlans && detailTour.tourPlans?.length > 0
                    ? detailTour.tourPlans.map(item => {
                        return (
                          <Panel
                            className="detailTour__plan-item"
                            header={
                              <span className="detailTour__plan-heading">
                                <GoLocation className="detailTour__plan-icon" />
                                <span className="detailTour__plan-heading-word">
                                  Day {item.day}
                                  <span className="detailTour__place-words">
                                    {item.title}
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
              <div className="detailTour__review-wrapper">
                <div className="detailTour__review-detail-wrapper">
                  {userReviews?.map((item, index) => {
                    return (
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
                            {item.comment}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="detailTour__booking-wrapper">
              <div className="detailTour__booking">
                <h3 className="detailTour__booking-heading">
                  {t('detail_tour.booking_form.title')}
                </h3>
                <Form
                  form={formTicket}
                  layout="horizontal"
                  onFinish={handleSubmit}
                  autoComplete="off"
                  initialValues={{ adult: 0, youth: 0, children: 0 }}
                  className="detailTour__booking-form"
                >
                  <p className="detailTour__booking-label">
                    {t('detail_tour.booking_form.from')}
                  </p>
                  <Form.Item className="detailTour__booking-date" name="date">
                    <DatePicker
                      disabledDate={disabledDate}
                      onChange={handleDatePickerChange}
                      format="YYYY-MM-DD"
                      className="detailTour__booking-date-input"
                    />
                  </Form.Item>
                  <div className="detailTour__booking-tickets">
                    <p
                      className="detailTour__booking-label"
                      style={{ marginBottom: '1rem' }}
                    >
                      {t('detail_tour.booking_form.ticket.title')}
                    </p>

                    {priceFollowDate && priceFollowDate.length > 0
                      ? priceFollowDate.map(item =>
                          item.ticket.map((e, index) => {
                            return (
                              <>
                                <div
                                  className="booking-ticket__item"
                                  key={index}
                                >
                                  <Space
                                    direction="vertical"
                                    size={'small'}
                                    style={{ gap: 0 }}
                                  >
                                    <Text level={5}>
                                      {e.type === 'adult'
                                        ? 'Adult (18+ years)'
                                        : e.type === 'youth'
                                        ? 'Youth (13-17 years)'
                                        : 'Children (0-12 years)'}
                                    </Text>

                                    <Text strong>
                                      {e.price?.toLocaleString(
                                        `${currencyString}`,
                                        {
                                          style: 'currency',
                                          currency: `${currencyItem}`,
                                        },
                                      )}{' '}
                                      :
                                    </Text>
                                  </Space>
                                  <Form.Item
                                    key={e.id}
                                    className="detailTour__booking-tickets-section"
                                    name={e.type}
                                  >
                                    <InputNumber
                                      min={0}
                                      max={detailTour.maxPeople}
                                      onChange={values =>
                                        handleChangePrice(values, e)
                                      }
                                    />
                                  </Form.Item>
                                </div>
                              </>
                            );
                          }),
                        )
                      : t('detail_tour.booking_form.ticket.notify')}
                  </div>
                  <div className="detailTour__booking-footer">
                    <div className="detailTour__booking-count">
                      <span className="detailTour__booking-count-words">
                        {t('detail_tour.booking_form.total')}
                      </span>
                      <span className="detailTour__booking-total">
                        {total?.toLocaleString(`${currencyString}`, {
                          style: 'currency',
                          currency: `${currencyItem}`,
                        })}
                      </span>
                    </div>
                    <Form.Item>
                      {_.isEmpty(localStorage.getItem('token')) ? (
                        <Button
                          className="detailTour__booking-btn"
                          type="primary"
                          onClick={() => {
                            localStorage.setItem(
                              'last_path',
                              location.pathname,
                            );
                            console.log(location.pathname);

                            setTimeout(() => navigate('/login'), 600);
                          }}
                          size="large"
                        >
                          Sign in to book
                        </Button>
                      ) : (
                        <Button
                          htmlType="submit"
                          className="detailTour__booking-btn"
                          type="primary"
                          disabled={localStorage
                            .getItem('user')
                            .includes(['ROLE_CUSTOMER'])}
                          size="large"
                        >
                          book now
                        </Button>
                      )}
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        {relatedTours?.length > 0 && (
          <div className="detailTour__relatedTour">
            <h2 className="detailTour__content-heading">
              {t('detail_tour.you_may_like')}
            </h2>
            <Carousel
              infinite={false}
              variableWidth={true}
              className="detailTour__relatedTour-carousel"
              draggable={true}
              slidesToShow={3}
            >
              {relatedTours && relatedTours.length > 0 ? (
                relatedTours?.map(item => {
                  return (
                    <CardTour
                      tour={item}
                      key={item.id}
                      style={{ width: '405px', marginRight: '1rem' }}
                    />
                  );
                })
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </Carousel>
          </div>
        )}
      </section>
    </Spin>
  );
}
