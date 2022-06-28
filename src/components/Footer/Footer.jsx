/* eslint-disable no-unused-vars */
import { Button } from 'antd';
import { Typography } from 'antd';
import { Input } from 'antd';
import React from 'react';

import logo from '../../assets/images/logo-white.png';
import './Footer.scss';

const { Title } = Typography;

const services = [
  'booking',
  'rentalCar',
  'hostelWorld',
  'triago',
  'tripAdvior',
];

const explore = [
  'madrid tour',
  'stockholm city',
  'roma city',
  'shanghai city',
  'tokyo',
];

const footerItem = ['privacy', 'policy', 'about us', 'FAQ', 'blog'];

export default function Footer() {
  return (
    <footer className="footer__wrapper">
      <div className="footer__upper">
        <div className="footer__info-wrapper">
          <div className="footer__heading">
            <img src={logo} alt="" className="footer__info-logo" />
          </div>
          <div className="footer__info-description">
            <span className="footer__info-description-words">
              Nisi ut aliquip ex ea commodo consequatute irure dolor in
              reprehenderit in voluptatevelit esse cillum dolore eu fugiat nulla
              excepteur pariatur.
            </span>
          </div>
          <div className="footer__info-address">
            <span className="footer__info-address-words">
              754 West Gartner Street Encino, CA 91316
            </span>
          </div>
          <Button className="footer__info-view-map-btn" size="large">
            View Map
          </Button>
        </div>
        <div className="footer__list-wrapper">
          <Title className="footer__heading" level={4}>
            Our Services
          </Title>
          <ul className="footer__list">
            {services.map((item, index) => {
              return (
                <li className="footer__item" key={index}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="footer__list-wrapper">
          <Title className="footer__heading" level={4}>
            Explore
          </Title>
          <ul className="footer__list">
            {explore.map((item, index) => {
              return (
                <li className="footer__item" key={index}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="footer__detail-wrapper">
          <Title className="footer__heading" level={4}>
            Get Updates & More
          </Title>
          <p className="footer__detail-words">
            Subscribe to the free newsletter and stay up to date
          </p>
          <div className="footer__detail-form">
            <Input
              className="footer__detail-input"
              size="large"
              placeholder="Your email"
            />
            <Button className="footer__detail-btn">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="footer__lower">
        <div className="footer__lower-words">
          Copyright © 2022{' '}
          <a href="#" className="footer__lower-link">
            Triply
          </a>
          . All Rights Reserved.
        </div>
        <div className="footer__lower-list">
          {footerItem.map((item, index) => (
            <li className="footer_lower-item" key={index}>
              {item}
            </li>
          ))}
        </div>
      </div>
    </footer>
  );
}
