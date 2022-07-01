import { Button } from 'antd';
import Aos from 'aos';
import React, { useEffect } from 'react';
import {
  BsArrowRight,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { getDestinationsServiceTours } from '../../app/toursSlice';
import section1Background from '../../assets/images/section-1-background.png';
import section2Banner1 from '../../assets/images/section-2_banner-1.jpg';
import section2Banner2 from '../../assets/images/section-2_banner-2.jpg';
import section2Banner3 from '../../assets/images/section-2_banner-3.jpg';
import section2Shape from '../../assets/images/section-2_shape.png';
import CardTour from '../../components/CardTour/CardTour';
import CardVoucher from '../../components/CardVoucher/CardVoucher';
import Search from '../../components/Search/Search';
import './Home.scss';

const Home = () => {
  // Redux
  const listTours = useSelector(state => state.tours.list);
  const destinations = useSelector(state => state.tours.destinations);
  const services = useSelector(state => state.tours.services);
  const dispatch = useDispatch();

  // React router
  const navigate = useNavigate();

  useEffect(() => {
    loading();
    Aos.init({
      duration: 1000,
    });
    Aos.refresh();
  }, []);

  const loadingContext = useLoadingContext();

  const loading = async () => {
    //loading some data
    if (
      listTours.length === 0 ||
      destinations.length === 0 ||
      services.length === 0
    )
      dispatch(getDestinationsServiceTours());
    //call method to indicate that loading is done
    loadingContext.done();
  };

  const tour = {
    image:
      'https://demo2wpopal.b-cdn.net/triply/wp-content/uploads/2020/11/5c62cf53ebd1d70c3b6378fd_candre-mandawe-770529-unsplash-copy-820x520.jpg',
    duration: 7,
    destination: 'Bryce Canyon National Park, USA',
    name: 'Waterfalls, Geysers and Glacier',
    price: 100,
    maxPeople: 40,
  };

  const onSearch = values => {
    navigate(`/tours?destinations=${values.destinations}`);
  };

  return (
    <div className="home-wrapper">
      <div className="section-1">
        <img
          className="section-1__bg"
          src={section1Background}
          alt="triply"
          data-aos="fade-left"
        />
        <div className="section-1__content">
          <h2 className="section-subtitle" data-aos="fade-right">
            Natural beauty
          </h2>
          <h1>Discover the most engaging places</h1>
          <button data-aos="fade-right">
            Explore Now
            <BsArrowRight />
          </button>
        </div>
        <Search
          onFinish={onSearch}
          destinations={destinations}
          services={services}
        />
      </div>
      <div className="section-2">
        <div className="section-2__title">
          <h2 className="section-subtitle" data-aos="fade-down">
            Don&apos;t Miss
          </h2>
          <h1 className="section-title" data-aos="fade-up">
            Specical Offers
          </h1>
        </div>
        <div className="section-2__panel-voucher">
          <CardVoucher
            data-aos="fade-right"
            background={section2Banner1}
            title={'Weekly Flash Deals'}
            subTitle={'Up to 30% off'}
            buttonContent={'View Deals'}
            buttonOnClick={() => {}}
          />
          <CardVoucher
            data-aos="fade-up"
            background={section2Banner2}
            title={'Summer Escapes'}
            subTitle={'Plan your next trip'}
            buttonContent={'Learn more'}
            buttonOnClick={() => {}}
          />
          <CardVoucher
            data-aos="fade-left"
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
              <Button
                type="primary"
                className="section-2__auth__control__btn"
                data-aos="fade-left"
              >
                Sign In <BsArrowRight />
              </Button>
              <Button
                className="section-2__auth__control__btn"
                data-aos="fade-right"
              >
                Register <BsArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="section-3">
        <div className="section-2__title">
          <h2 className="section-subtitle" data-aos="fade-down">
            What&apos;s new
          </h2>
          <h1 className="section-title" data-aos="fade-up">
            Popular Tours
          </h1>
        </div>
        <div className="section-3__content-wrapper">
          <CardTour tour={tour} tag={'featured'} />
          <CardTour tour={tour} tag={'featured'} />
          <CardTour tour={tour} tag={'featured'} />
          <CardTour tour={tour} tag={'featured'} />
          <CardTour tour={tour} tag={'featured'} />
          <CardTour tour={tour} tag={'featured'} />
        </div>
      </div>
      <div className="section-4">
        <div className="section-4__1st">
          <p className="section-4__text">
            Don&apos;t wait any longer. Contact us!
          </p>
          <Link to="#" className="section-4__link">
            +(84) 1800 - 333 5555
          </Link>
        </div>
        <div className="section-4__2nd">
          <p style={{ opacity: '0' }}>a</p>
          <Link to="#" className="section-4__link">
            support@triply.com
          </Link>
        </div>

        <div className="section-4__follow-us">
          <p className="section-4__text">Follow us</p>
          <div className="section-4__wrapper-button">
            <Button
              className="section-4__button"
              icon={<BsFacebook />}
              shape="circle"
              size="large"
            />
            <Button
              className="section-4__button"
              icon={<BsTwitter />}
              shape="circle"
              size="large"
            />
            <Button
              className="section-4__button"
              icon={<BsYoutube />}
              size="large"
              shape="circle"
            />
            <Button
              className="section-4__button"
              icon={<BsInstagram />}
              size="large"
              shape="circle"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
