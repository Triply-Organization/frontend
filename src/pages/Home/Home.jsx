import { Button, message } from 'antd';
import Aos from 'aos';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsArrowRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';

import {
  getDestinationsServiceTours,
  getPopularTours,
} from '../../app/toursSlice';
import section1Background from '../../assets/images/section-1-bg.webp';
import section2Banner1 from '../../assets/images/section-2_banner-1.webp';
import section2Banner2 from '../../assets/images/section-2_banner-2.webp';
import section2Banner3 from '../../assets/images/section-2_banner-3.webp';
import section2Shape from '../../assets/images/section-2_shape.webp';
import CardTour from '../../components/CardTour/CardTour';
import CardVoucher from '../../components/CardVoucher/CardVoucher';
import Search from '../../components/Search/Search';
import './Home.scss';

const Home = () => {
  // Redux
  const destinations = useSelector(state => state.tours.destinations);
  const services = useSelector(state => state.tours.services);
  const popularTours = useSelector(state => state.tours.popularTours);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  // React router
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
    Aos.refresh();
    loading();
    document.title = 'Home';
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  const loading = async () => {
    if (_.isEmpty(destinations) || _.isEmpty(services))
      dispatch(getDestinationsServiceTours());
    if (_.isEmpty(popularTours)) dispatch(getPopularTours());
  };

  const onSearch = values => {
    const searchParams = {};
    if (values.destinations) {
      searchParams.destination = values.destinations;
    }
    if (values['services[]']) {
      searchParams['services[]'] = values['services[]'];
    }

    if (values.when) {
      searchParams.startDate = moment(values.when).format('YYYY-MM-DD');
    }

    if (values['guests[]']) {
      searchParams['guests[]'] = values['guests[]'];
    }

    if (!_.isEmpty(searchParams)) {
      navigate({
        pathname: '/tours',
        search: createSearchParams({
          ...searchParams,
          orderBy: 'asc',
          orderType: 'price',
          page: '1',
        }).toString(),
      });
    } else {
      message.error({
        content: 'Please choose at least one field to search tour!',
        key: 'search-empty',
      });
    }
  };

  const handleNavigateLogin = () => {
    localStorage.clear('user');
    localStorage.clear('token');
    navigate('/login');
  };

  const handleNavigateRegister = () => {
    localStorage.clear('user');
    localStorage.clear('token');
    navigate('/register');
  };

  return (
    <div className="home-wrapper">
      <div className="section-1">
        <img
          width={1275}
          height={800}
          className="section-1__bg"
          src={section1Background}
          alt="triply"
          data-aos="fade-left"
        />
        <div className="section-1__content">
          <h2 className="section-subtitle" data-aos="fade-right">
            {t('home.natural_beauty')}
          </h2>
          <h1> {t('home.slogan')}</h1>
          <button
            onClick={() =>
              navigate('/tours?orderType=price&page=1&orderBy=asc')
            }
          >
            {t('cta.explore')}
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
          <h2 className="section-subtitle">{t('home.offer.dont_miss')}</h2>
          <h1 className="section-title">{t('home.offer.special_offer')}</h1>
        </div>
        <div className="section-2__panel-voucher">
          <CardVoucher
            data-aos="fade-right"
            background={section2Banner1}
            title={t('home.offer.item_1.title')}
            subTitle={t('home.offer.item_1.sub_title')}
            buttonContent={t('home.offer.item_1.btn')}
            buttonOnClick={() =>
              navigate('/tours?orderType=price&page=1&orderBy=asc')
            }
          />
          <CardVoucher
            data-aos="fade-up"
            background={section2Banner2}
            title={t('home.offer.item_2.title')}
            subTitle={t('home.offer.item_2.sub_title')}
            buttonContent={t('home.offer.item_2.btn')}
            buttonOnClick={() =>
              navigate('/tours?orderType=price&page=1&orderBy=asc')
            }
          />
          <CardVoucher
            data-aos="fade-left"
            background={section2Banner3}
            title={t('home.offer.item_3.title')}
            subTitle={t('home.offer.item_3.sub_title')}
            buttonContent={t('home.offer.item_3.btn')}
            buttonOnClick={() =>
              navigate('/tours?orderType=price&page=1&orderBy=asc')
            }
          />
        </div>
        {_.isEmpty(localStorage.getItem('token')) && (
          <div className="section-2__auth">
            <img src={section2Shape} alt="auth" />
            <div className="section-2__auth__typho">
              <h2>{t('home.auth.title')}</h2>
              <p>{t('home.auth.content')}</p>
              <div className="section-2__auth__control">
                <Button
                  type="primary"
                  onClick={handleNavigateLogin}
                  className="section-2__auth__control__btn"
                  data-aos="fade-left"
                >
                  {t('cta.login')} <BsArrowRight />
                </Button>
                <Button
                  className="section-2__auth__control__btn"
                  data-aos="fade-right"
                  onClick={handleNavigateRegister}
                >
                  {t('cta.register')} <BsArrowRight />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="section-3">
        <div className="section-2__title">
          <h2 className="section-subtitle" data-aos="fade-down">
            {t('home.popular_tour.title')}
          </h2>
          <h1 className="section-title" data-aos="fade-up">
            {t('home.popular_tour.content')}
          </h1>
        </div>
        <div className="section-3__content-wrapper">
          {popularTours.map((item, index) => {
            return <CardTour key={index} tour={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
