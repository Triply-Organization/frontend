import { Carousel, Typography } from 'antd';
import React from 'react';
import { AiOutlineDollar } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { BiCommentDetail } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { GrGroup } from 'react-icons/gr';
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

const { Title } = Typography;

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
    icon: <GrGroup />,
    title: 'max people',
    detail: '50',
  },
  {
    icon: <RiGroupLine />,
    title: 'min age',
    detail: '12+',
  },
  {
    icon: <BiCommentDetail />,
    title: 'reviews',
    detail: '8 reviews',
  },
];

export default function DetailTour() {
  return (
    <section className="detailTour">
      <div className="detailTour__overview">
        <Title className="detailTour__overview-heading">
          Cano Cristales River Trip
        </Title>
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
    </section>
  );
}
