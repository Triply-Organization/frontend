import { Button, Carousel } from 'antd';
import { Collapse } from 'antd';
import { DatePicker } from 'antd';
import { Radio } from 'antd';
import { Select } from 'antd';
import React, { useState } from 'react';
import { AiOutlineDollar } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { BiCommentDetail } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { RiErrorWarningLine } from 'react-icons/ri';
import { RiGroupLine } from 'react-icons/ri';

import img1 from '../../assets/images/detail_images/5c486e7270c16e87069fbb70_cano-cristales-fluss-in-Kolumbien-720x450.jpg';
import img2 from '../../assets/images/detail_images/5c486e8171e5c96425eb2164_cc5-720x450.jpg';
import img3 from '../../assets/images/detail_images/5c486fb7ffe01243a830dee3_DSC04942-copy-720x450 (1).jpg';
import img4 from '../../assets/images/detail_images/5c486fb7ffe01243a830dee3_DSC04942-copy-720x450.jpg';
import img5 from '../../assets/images/detail_images/5c486fde39c52198d2783174_DSC04989-copy-720x450.jpg';
import img6 from '../../assets/images/detail_images/5c48704a079e2abe81530715_DSC04935-copy-720x450.jpg';
import img7 from '../../assets/images/detail_images/5c48753a6643ac423cba22d2_cano_cristales_la_macarena-720x450.jpg';
import img9 from '../../assets/images/detail_images/5c4875597c042e6e499061e8_cc4-720x450.jpg';
import img8 from '../../assets/images/detail_images/5c48735739c52149617831f9_DSC04931-copy-720x450 (1).jpg';
import img10 from '../../assets/images/detail_images/5c48735739c52149617831f9_DSC04931-copy-720x450 (1).jpg';
import img11 from '../../assets/images/detail_images/5c48735739c52149617831f9_DSC04931-copy-720x450.jpg';
import './DetailTour.scss';

const { Option } = Select;

const { Panel } = Collapse;

const tourPlanItems = [
  {
    header: (
      <span className="detailTour__plan-heading">
        <GoLocation className="detailTour__plan-icon" />
        <span className="detailTour__plan-heading-word">
          Day 1{' '}
          <span className="detailTour__place-words">
            Caño Cristiletos (smaller Caño Cristales River)
          </span>
        </span>
      </span>
    ),
    text: (
      <p className="detail__plan-description">
        You will start your adventure in Bogota. Arriving at the airport on your
        own, you will board your flight from Bogota to La Macarena (1 hour
        flight). Presentation time can be as early as 5:00am*. Once you arrive
        at the La Macarena airport you will be greeted by a FlashpackerConnect
        guide/representative. From here, you will attend an information session
        with National Park Sierra de la Macarena (video and talk with park
        representative) and be transported to your hotel for check in.
      </p>
    ),
  },
  {
    header: (
      <span className="detailTour__plan-heading">
        <GoLocation className="detailTour__plan-icon" />
        <span className="detailTour__plan-heading-word">
          Day 2{' '}
          <span className="detailTour__place-words">
            Caño Cristales Full Day Tour
          </span>
        </span>
      </span>
    ),
    text: (
      <p className="detail__plan-description">
        Before your adventure starts you will have breakfast at a local
        restaurant. Afterwards, you will launch from La Macarena’s boat ramp for
        a 30 minute boat ride. During this ride you will have the opportunity to
        see monkeys, and exotic bird species such as the prehistoric Hoatzan.
        You will then be transported in 4x4s from the La Cachivera district to
        Caño Cajuche. Once we arrive in Caño Cajuche we will start our walk to
        Caño Cristales.* Our route will end at Los Ochos also known as The 8s
        which is considered the most picturesque location throughout the park
        (around 6 hours total).
      </p>
    ),
  },
  {
    header: (
      <span className="detailTour__plan-heading">
        <GoLocation className="detailTour__plan-icon" />
        <span className="detailTour__plan-heading-word">
          Day 3{' '}
          <span className="detailTour__place-words">
            Redal Jungle Full Day Hike
          </span>
        </span>
      </span>
    ),
    text: (
      <p className="detail__plan-description">
        As you venture down river, you will notice the transition from a middle
        climate of where the Andes and Amazon meet to a complete Amazon
        environment. Fresh water dolphins, anacondas, crocodiles, and many other
        species can be seen on the way down
      </p>
    ),
  },
  {
    header: (
      <span className="detailTour__plan-heading">
        <GoLocation className="detailTour__plan-icon" />
        <span className="detailTour__plan-heading-word">
          Day 4{' '}
          <span className="detailTour__place-words">
            Morning Boat Ride - Departure
          </span>
        </span>
      </span>
    ),
    text: (
      <p className="detail__plan-description">
        On the morning of your last day you will wake up early for a sunrise
        wildlife boat ride (around 6:00am depending on time of year) after
        enjoying this you will be taken to breakfast at a local farm. After
        breakfast, you will go back to your hotel to pack (around 9:00 am).
        Flights back to Bogota vary in time and are typically between
        10:00am-2:00pm depending on availability and flight schedule that day.
        (Lunch included if you have an afternoon flight.)
      </p>
    ),
  },
]; // submenu keys of first level

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
];

const detailTourItem = [
  {
    icon: <AiOutlineDollar />,
    title: 'price',
    detail: '$138.00',
  },
  {
    icon: <BiTimeFive />,
    title: 'duration',
    detail: '4 days',
  },
  {
    icon: <RiGroupLine />,
    title: 'max people',
    detail: '50',
  },
  {
    icon: <RiErrorWarningLine />,
    title: 'min age',
    detail: '12+',
  },
  {
    icon: <BiCommentDetail />,
    title: 'reviews',
    detail: '8 reviews',
  },
];

const services = [
  'Specialized bilingual guide',
  'Private Transport',
  'Entrance fees (Cable and car and Moon Valley)',
  'Box lunch water, banana apple and chocolate',
];

const ticketsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function DetailTour() {
  const [radioValue, setRadioValue] = useState(1);
  return (
    <section className="detailTour">
      <div className="detailTour__intro">
        <h1 className="detailTour__intro-heading">Cano Cristales River Trip</h1>
        <div className="detailTour__location">
          <span className="detailTour__icon">
            <GoLocation></GoLocation>
          </span>
          <span className="detailTour__words">
            Bryce Canyon National Park, USA
          </span>
        </div>
        <div className="detailTour__carousel-wrapper">
          <Carousel
            autoplay
            className="detailTour__carousel"
            draggable={true}
            slidesToShow={2}
          >
            {images.map((item, index) => {
              return (
                <img
                  src={item}
                  key={index}
                  alt="photo"
                  className="detailTour__img"
                />
              );
            })}
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
      <div className="detailTour__content-wrapper">
        <div className="detailTour__content">
          <div className="detailTour__overview">
            <h2 className="detailTour__content-heading">overview</h2>
            <p className="detailTour__overview-description">
              Caño Cristales Tour, (aka the most beautiful river in the world)
              is an exceptional and surprising natural beauty. Its unique
              ecosystem is very fragile and now belongs to the Sierra de la
              Macarena Natural National Park.
            </p>
          </div>
          <div className="detailTour__services">
            <h2 className="detailTour__content-heading">services</h2>
            <ul className="detailTour__services-list">
              {services.map((item, index) => {
                return (
                  <li className="detailTour__services-item" key={index}>
                    <AiOutlineCheckCircle className="detailTour__services-item-icon"></AiOutlineCheckCircle>
                    {item}
                  </li>
                );
              })}
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
              {tourPlanItems.map((item, index) => {
                return (
                  <Panel
                    className="detailTour__plan-item"
                    header={item.header}
                    key={index}
                  >
                    <p>{item.text}</p>
                  </Panel>
                );
              })}
            </Collapse>
          </div>
          <div className="detailTour__map">
            <h2 className="detailTour__content-heading">tour map</h2>
          </div>
        </div>
        <div className="detailTour__booking-wrapper">
          <div className="detailTour__booking">
            <h3 className="detailTour__booking-heading">Book This Tour</h3>
            <div className="detailTour__booking-form">
              <div className="detailTour__booking-date">
                <p className="detailTour__booking-label">From:</p>
                <DatePicker className="detailTour__booking-date-input" />
              </div>
              <div className="detailTour__booking-time">
                <p className="detailTour__booking-label">Time:</p>
                <Radio.Group
                  onChange={e => {
                    setRadioValue(e.target.value);
                  }}
                  value={radioValue}
                >
                  <Radio value={1}>10:00</Radio>
                  <Radio value={2}>12:00</Radio>
                  <Radio value={3}>17:00</Radio>
                </Radio.Group>
              </div>
              <div className="detailTour__booking-tickets">
                <p className="detailTour__booking-label">Tickets:</p>
                <div className="detailTour__booking-tickets-section">
                  <label
                    htmlFor="tickets-section1"
                    className="detailTour__booking-tickets-description"
                  >
                    Adult (18+ years){' '}
                    <span className="detailTour__booking-tickets-price">
                      $138.00
                    </span>
                  </label>
                  <Select id="tickets-section1" defaultValue="0">
                    {ticketsNumber.map((item, index) => {
                      return (
                        <Option value={item} key={index}>
                          {item}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                <div className="detailTour__booking-tickets-section">
                  <label
                    htmlFor="tickets-section2"
                    className="detailTour__booking-tickets-description"
                  >
                    Youth (13-17 years){' '}
                    <span className="detailTour__booking-tickets-price">
                      $128.00
                    </span>
                  </label>
                  <Select id="tickets-section2" defaultValue="0">
                    {ticketsNumber.map((item, index) => {
                      return (
                        <Option value={item} key={index}>
                          {item}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                <div className="detailTour__booking-tickets-section">
                  <label
                    htmlFor="tickets-section3"
                    className="detailTour__booking-tickets-description"
                  >
                    Children (0-12 years){' '}
                    <span className="detailTour__booking-tickets-price">
                      $0.00
                    </span>
                  </label>
                  <Select id="tickets-section3" defaultValue="0">
                    {ticketsNumber.map((item, index) => {
                      return (
                        <Option value={item} key={index}>
                          {item}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className="detailTour__booking-footer">
                <div className="detailTour__booking-count">
                  <span className="detailTour__booking-count-words">
                    Total:
                  </span>
                  <span className="detailTour__booking-total">$0.00</span>
                </div>
                <Button
                  className="detailTour__booking-btn"
                  type="primary"
                  size="large"
                >
                  book now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
