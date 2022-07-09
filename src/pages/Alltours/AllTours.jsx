/* eslint-disable no-unused-vars */
import { FilterFilled, FilterOutlined } from '@ant-design/icons';
import {
  Button,
  Collapse,
  Empty,
  Form,
  Pagination,
  Rate,
  Skeleton,
  Slider,
  Space,
  Spin,
  Tag,
} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillFilter } from 'react-icons/ai';
import { BsSortNumericDown, BsSortNumericDownAlt } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { getDestinationsServiceTours } from '../../app/toursSlice';
import { getToursByFilter } from '../../app/toursSlice';
import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import CardTour from '../../components/CardTour/CardTour';
import ImageBreadcrumb from '../../components/ImageBreadcrumb/ImageBreadcrumb';
import Search from '../../components/Search/Search';
import './AllTours.scss';

const { Panel } = Collapse;

const AllTours = () => {
  const [sortPrice, setSortPrice] = useState('asc');
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterRating, setFilterRating] = useState('');
  const [currentSearch, setCurrentSearch] = useState({});
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({});
  const loadingContext = useLoadingContext();

  const location = useLocation();
  const [formSearch] = Form.useForm();
  // Redux
  const listFilter = useSelector(state => state.tours.listFilter);
  const destinations = useSelector(state => state.tours.destinations);
  const services = useSelector(state => state.tours.services);
  const loadingCallAPI = useSelector(state => state.tours.loadingFilter);
  const totalTours = useSelector(state => state.tours.totalTours);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // USE EFFECT
  useEffect(() => {
    window.scrollTo(0, 0);
    const loading = () => {
      let temp = {
        destination: searchParams.get('destination'),
        'guests[]': searchParams.getAll('guests'),
        service: searchParams.get('service'),
        startDate: searchParams.get('startDate'),
        orderBy: searchParams.get('orderBy'),
        orderType: 'price',
        page: '1',
      };

      let o = Object.fromEntries(
        Object.entries(temp).filter(([x, v]) => v != null),
      );

      setCurrentSearch(o);
      setSearchParams({ ...o, orderBy: sortPrice, page: 1 });

      if (temp?.destination) {
        formSearch.setFieldsValue({
          destinations: temp.destination,
        });
      }

      if (temp?.service) {
        formSearch.setFieldsValue({
          services: parseInt(temp.service),
        });
      }

      if (temp?.startDate) {
        formSearch.setFieldsValue({
          when: moment(new Date(temp.startDate)),
        });
      }

      if (temp['guests[]']) {
        formSearch.setFieldsValue({
          guests: temp['guests[]'],
        });
      }
      //call method to indicate that loading is done
      setTimeout(() => {
        loadingContext.done();
      }, 600);
    };
    loading();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(location.search)) {
      dispatch(getToursByFilter(location.search));
    }
  }, [searchParams]);

  const renderIconSortPrice = () => {
    if (sortPrice === 'desc')
      return (
        <Button
          className="all-tours__header__sort__button"
          type="ghost"
          onClick={() => setSortPrice('asc')}
          icon={
            <BsSortNumericDownAlt className="all-tours__header__sort__icon" />
          }
        />
      );
    else
      return (
        <Button
          className="all-tours__header__sort__button"
          type="ghost"
          onClick={() => setSortPrice('desc')}
          icon={<BsSortNumericDown className="all-tours__header__sort__icon" />}
        />
      );
  };

  const onSearch = values => {
    const searchParams = {};
    if (values.destinations) {
      searchParams.destination = values.destinations;
    }
    if (values.services) {
      searchParams.service = values.services;
    }

    if (values.when) {
      searchParams.startDate = moment(values.when).format('YYYY-MM-DD');
    }

    if (values['guests[]']) {
      searchParams['guests[]'] = values['guests[]'];
    }

    if (searchParams) {
      let o = Object.fromEntries(
        Object.entries(searchParams).filter(([x, v]) => v != null),
      );

      setCurrentSearch(o);
      setSearchParams({
        ...o,
        orderBy: sortPrice,
        orderType: 'price',
        page: 1,
      });
    }
  };

  const onFilter = values => {
    if (values?.filter_by_price) {
      setFilterPrice(values?.filter_by_price);
    }
    if (values?.filter_by_rating) {
      setFilterRating(values?.filter_by_rating);
    }
  };

  const onCloseFilterPrice = () => {
    setFilterPrice([]);
  };

  const onCloseFilterRating = () => {
    setFilterRating();
  };

  useEffect(() => {
    const tempSearchParams = {};
    if (filterPrice && filterPrice.length > 0) {
      tempSearchParams.startPrice = filterPrice[0];
      tempSearchParams.endPrice = filterPrice[1];
    }
    if (filterRating) {
      tempSearchParams.filter_by_rating = filterRating;
    }
    if (!_.isEmpty(currentSearch))
      setSearchParams({
        ...currentSearch,
        ...tempSearchParams,
        orderBy: sortPrice,
        orderType: 'price',
        page: page,
      });
  }, [filterPrice, filterRating, sortPrice, page]);
  const navigate = useNavigate();

  return (
    // <Spin spinning={loadingCallAPI}>
    <div
      style={{
        marginTop: '90px',
      }}
    >
      <div className="breadcrumb-wrapper">
        <ImageBreadcrumb
          title={'All Tours'}
          currentPageTitle={'ALL TOURS'}
          beforePath={[{ title: 'HOME', path: '/' }]}
          breadcrumbBg={breadcrumbBg}
        />
        <Search
          destinations={destinations}
          services={services}
          onFinish={onSearch}
          form={formSearch}
        />
      </div>

      <div className="all-tours">
        <div className="all-tours__header">
          <Collapse
            ghost
            className="all-tours__filter"
            expandIconPosition="start"
            expandIcon={({ isActive }) =>
              isActive ? (
                <FilterFilled style={{ fontSize: '1rem' }} />
              ) : (
                <FilterOutlined style={{ fontSize: '1rem' }} />
              )
            }
          >
            <Panel
              header={t('all_tours.filter.title')}
              key="1"
              extra={
                <div
                  className="all-tours__header__sort"
                  onClick={event => {
                    event.stopPropagation();
                  }}
                >
                  <Space>
                    <p>{t('all_tours.sort')}</p>
                    {renderIconSortPrice()}
                  </Space>
                </div>
              }
            >
              <Form
                className="all-tours__filter__item"
                layout={'vertical'}
                onValuesChange={_.debounce(onFilter, 300)}
                initialValues={{
                  filter_by_price: [0, 1000],
                  filter_by_rating: 0,
                }}
              >
                <Form.Item
                  name="filter_by_price"
                  label={t('all_tours.filter.price')}
                >
                  <Slider
                    range
                    max={1000}
                    tipFormatter={value =>
                      value.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="filter_by_rating"
                  label={t('all_tours.filter.rating')}
                >
                  <Rate allowHalf />
                </Form.Item>
              </Form>
            </Panel>
          </Collapse>
        </div>
        <div style={{ margin: '1rem 0' }}>
          <Tag>
            <b>{totalTours}</b> {t('all_tours.tours')}
          </Tag>
          {filterPrice && filterPrice.length > 0 && (
            <Tag closable onClose={() => onCloseFilterPrice()}>
              <b>Price: </b>
              {filterPrice[0]} - {filterPrice[1]}
            </Tag>
          )}
          {filterRating && (
            <Tag closable onClose={() => onCloseFilterRating()}>
              <b>Rating: </b>
              {filterRating}
            </Tag>
          )}
        </div>

        {listFilter.length > 0 ? (
          <div
            className="all-tours__list-wrapper"
            style={{ height: listFilter.length < 4 && '100%' }}
          >
            {listFilter.map((tour, index) => (
              <Skeleton
                key={index}
                loading={loadingCallAPI}
                active
                style={{ height: '433px' }}
              >
                <CardTour
                  key={index}
                  tour={tour}
                  onClick={() => navigate(`/detail/${tour.id}`)}
                />
              </Skeleton>
            ))}
          </div>
        ) : (
          <Empty description={'No tour'} style={{ width: '100%' }} />
        )}

        {totalTours > 6 && (
          <Pagination
            defaultCurrent={1}
            total={totalTours}
            onChange={page => setPage(page)}
            defaultPageSize={6}
            className="all-tours__pagination"
          />
        )}
      </div>
    </div>
    // </Spin>
  );
};

export default AllTours;
