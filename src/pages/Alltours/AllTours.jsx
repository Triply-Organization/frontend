/* eslint-disable no-unused-vars */
import { FilterFilled, FilterOutlined } from '@ant-design/icons';
import {
  Button,
  Collapse,
  Empty,
  Form,
  InputNumber,
  Pagination,
  Rate,
  Skeleton,
  Slider,
  Space,
  Spin,
  Tag,
} from 'antd';
import { Tooltip } from 'antd';
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
  const [inputValueStartSlider, setInputValueStartSlider] = useState(0);
  const [inputValueEndSlider, setInputValueEndSlider] = useState(1000);
  const [inputValueSlider, setInputValueSlider] = useState([
    inputValueStartSlider,
    inputValueEndSlider,
  ]);

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
    const loading = () => {
      let temp = {
        destination: searchParams.get('destination'),
        'guests[]': searchParams.getAll('guests[]'),
        service: searchParams.get('service'),
        startDate: searchParams.get('startDate'),
        orderBy: searchParams.get('orderBy'),
        orderType: 'price',
        page: '1',
      };

      // console.log(temp);

      let o = Object.fromEntries(
        Object.entries(temp).filter(([x, v]) => v != null),
      );

      setCurrentSearch(o);
      setSearchParams({
        ...o,
        orderBy: sortPrice,
        orderType: 'price',
        page: 1,
      });

      if (temp?.destination) {
        formSearch.setFieldsValue({
          destinations: temp.destination,
        });
      }

      if (temp['service']) {
        if (services?.filter(item => item.id == temp.service)[0]);
        formSearch.setFieldsValue({
          service: services?.filter(item => item.id == temp.service)[0].name,
        });
      }

      if (temp?.startDate) {
        formSearch.setFieldsValue({
          when: moment(new Date(temp.startDate)),
        });
      }

      if (temp['guests[]']) {
        // console.log(temp['guests[]']);
        formSearch.setFieldsValue({
          'guests[]': temp['guests[]'],
        });
      }
      //call method to indicate that loading is done
      setTimeout(() => {
        loadingContext.done();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }, 600);
    };
    loading();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(location.search)) {
      dispatch(getToursByFilter(location.search));
    }
  }, [location.search]);

  const renderIconSortPrice = () => {
    if (sortPrice === 'desc')
      return (
        <Tooltip title="Descending">
          <Button
            className="all-tours__header__sort__button"
            type="ghost"
            onClick={() => setSortPrice('asc')}
            icon={
              <BsSortNumericDownAlt className="all-tours__header__sort__icon" />
            }
          />
        </Tooltip>
      );
    else
      return (
        <Tooltip title="Ascending">
          <Button
            className="all-tours__header__sort__button"
            type="ghost"
            onClick={() => setSortPrice('desc')}
            icon={
              <BsSortNumericDown className="all-tours__header__sort__icon" />
            }
          />
        </Tooltip>
      );
  };

  const onSearch = values => {
    const searchParams = {};
    console.log(values);
    if (values.destinations) {
      searchParams.destination = values.destinations;
    }
    if (values['service']) {
      searchParams['service'] = values['service'];
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

  const onCloseFilterPrice = () => {
    setFilterPrice([]);
  };
  useEffect(() => {
    const tempSearchParams = {};
    tempSearchParams.startPrice = inputValueStartSlider;
    tempSearchParams.endPrice = inputValueEndSlider;
    setFilterPrice([inputValueStartSlider, inputValueEndSlider]);

    if (!_.isEmpty(currentSearch))
      setSearchParams({
        ...currentSearch,
        ...tempSearchParams,
        orderBy: sortPrice,
        orderType: 'price',
        page: page,
      });
  }, [sortPrice, page, inputValueStartSlider, inputValueEndSlider]);
  const navigate = useNavigate();

  const onChangeStartSlider = value => {
    if (inputValueEndSlider > value) setInputValueStartSlider(value);
  };
  const onChangeEndSlider = value => {
    if (inputValueStartSlider < value) setInputValueEndSlider(value);
  };

  const onChangeSlider = value => {
    setInputValueStartSlider(value[0]);
    setInputValueEndSlider(value[1]);
  };

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
              <Slider
                range={true}
                min={0}
                max={1000}
                onChange={_.debounce(onChangeSlider, 300)}
                value={[inputValueStartSlider, inputValueEndSlider]}
                defaultValue={[inputValueStartSlider, inputValueEndSlider]}
                tipFormatter={value =>
                  value.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })
                }
              />

              <div className="slider-input-wrapper">
                <InputNumber
                  min={0}
                  max={inputValueEndSlider - 1}
                  value={inputValueStartSlider}
                  onChange={onChangeStartSlider}
                />
                <InputNumber
                  min={inputValueStartSlider + 1}
                  max={1000}
                  value={inputValueEndSlider}
                  onChange={onChangeEndSlider}
                />
              </div>
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
          {sortPrice && (
            <Tag>
              <b>Sort Price: </b>
              {sortPrice === 'desc' ? 'Descending' : 'Ascending'}
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
