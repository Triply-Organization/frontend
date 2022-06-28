import { Button, Form } from 'antd';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

import section1Background from '../../assets/images/section-1-background.png';
import section2Banner1 from '../../assets/images/section-2_banner-1.jpg';
import section2Banner2 from '../../assets/images/section-2_banner-2.jpg';
import section2Banner3 from '../../assets/images/section-2_banner-3.jpg';
import section2Shape from '../../assets/images/section-2_shape.png';
import CardVoucher from '../../components/CardVoucher/CardVoucher';
import Search from '../../components/Search/Search';
import './Home.scss';

const Home = () => {
  const [formSearch] = Form.useForm();

  const onSearch = values => {
    console.log(values);
  };

  return (
    <div className="home-wrapper">
      <div className="section-1">
        <img className="section-1__bg" src={section1Background} alt="triply" />
        <div className="section-1__content">
          <h2 className="section-subtitle">Natural beauty</h2>
          <h1>Discover the most engaging places</h1>
          <button>
            Explore Now
            <BsArrowRight />
          </button>
        </div>
        <Search form={formSearch} onFinish={onSearch} />
      </div>
      <div className="section-2">
        <div className="section-2__title">
          <h2 className="section-subtitle">Don&apos;t Miss</h2>
          <h1 className="section-title">Specical Offers</h1>
        </div>
        <div className="section-2__panel-voucher">
          <CardVoucher
            background={section2Banner1}
            title={'Weekly Flash Deals'}
            subTitle={'Up to 30% off'}
            buttonContent={'View Deals'}
            buttonOnClick={() => {}}
          />
          <CardVoucher
            background={section2Banner2}
            title={'Summer Escapes'}
            subTitle={'Plan your next trip'}
            buttonContent={'Learn more'}
            buttonOnClick={() => {}}
          />
          <CardVoucher
            background={section2Banner3}
            title={'Exclusive Deals'}
            subTitle={'Want to save up to 50%'}
            buttonContent={'Subscribe Us'}
            buttonOnClick={() => {}}
          />
        </div>
        <div className="section-2__auth">
          <img src={section2Shape} alt="auth" />
          <div className="section-2__auth__typho">
            <h2>Not a Member Yet?</h2>
            <p>
              Join us! Our members can access savings of up to 50% and earn Trip
              Coins while booking.
            </p>
            <div className="section-2__auth__control">
              <Button type="primary" className="section-2__auth__control__btn">
                Sign In <BsArrowRight />
              </Button>
              <Button className="section-2__auth__control__btn">
                Register <BsArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
