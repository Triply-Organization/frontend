import {
  Button,
  Collapse,
  Form,
  Pagination,
  Rate,
  Select,
  Slider,
  Spin,
  Tag,
} from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  BsSortDown,
  BsSortDownAlt,
  BsSortNumericDown,
  BsSortNumericDownAlt,
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { getDestinationsServiceTours } from '../../app/toursSlice';
import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import CardTour from '../../components/CardTour/CardTour';
import ImageBreadcrumb from '../../components/ImageBreadcrumb/ImageBreadcrumb';
import Search from '../../components/Search/Search';
import './AllTours.scss';

const { Option } = Select;
const { Panel } = Collapse;

const AllTours = () => {
  const [typeSort, setTypeSort] = useState('price');
  const [sortPrice, setSortPrice] = useState('');
  const [sortRating, setSortRating] = useState('');
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterRating, setFilterRating] = useState('');
  const [searchParams, setSearchParams] = useSearchParams({});

  const loadingContext = useLoadingContext();
  const navigate = useNavigate();

  // Redux
  const listTours = useSelector(state => state.tours.list);
  const listFilter = useSelector(state => state.tours.listFilter);
  const destinations = useSelector(state => state.tours.destinations);
  const services = useSelector(state => state.tours.services);
  const loadingCallAPI = useSelector(state => state.tours.loading);
  const dispatch = useDispatch();

  // USE EFFECT
  useEffect(() => {
    const loading = async () => {
      //loading some data
      if (listTours.length === 0 || destinations.length === 0 || services === 0)
        dispatch(getDestinationsServiceTours());
      //call method to indicate that loading is done
      loadingContext.done();
    };
    loading();
  }, []);

  useEffect(() => {
    if (typeSort === 'price') {
      setSortPrice('asc');
      setSortRating('');
    } else {
      setSortRating('asc');
      setSortPrice('');
    }
  }, [typeSort]);

  useEffect(() => {}, [searchParams]);

  // console.log(listTours);

  const renderIconSortPrice = () => {
    if (sortPrice === 'asc')
      return (
        <Button
          className="all-tours__header__sort__button"
          type="ghost"
          onClick={() => setSortPrice('desc')}
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
          onClick={() => setSortPrice('asc')}
          icon={<BsSortNumericDown className="all-tours__header__sort__icon" />}
        />
      );
  };
  const renderIconSortRating = () => {
    if (sortRating === 'asc')
      return (
        <Button
          className="all-tours__header__sort__button"
          type="ghost"
          onClick={() => setSortRating('desc')}
          icon={<BsSortDown className="all-tours__header__sort__icon" />}
        />
      );
    else
      return (
        <Button
          className="all-tours__header__sort__button"
          type="ghost"
          onClick={() => setSortRating('asc')}
          icon={<BsSortDownAlt className="all-tours__header__sort__icon" />}
        />
      );
  };
  const onPagination = page => {
    console.log(page);
  };

  const onSearch = values => {
    const searchParams = {};
    if (values.destinations) {
      searchParams.destinations = values.destinations;
    }
    if (values.services) {
      searchParams.services = values.services;
    }

    if (values.when) {
      searchParams.when = values.when;
    }

    if (values.guests) {
      searchParams.guests = values.guests;
    }

    if (searchParams)
      navigate({
        pathname: '/tours',
        search: createSearchParams(searchParams).toString(),
      });
    else navigate('/tours');
  };

  const onFilter = values => {
    console.log(values);
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
      tempSearchParams.filter_by_price_start = filterPrice[0];
      tempSearchParams.filter_by_price_end = filterPrice[1];
    }
    if (filterRating) {
      tempSearchParams.filter_by_rating = filterRating;
    }

    if (sortPrice) {
      tempSearchParams.sort_by_price = sortPrice;
    }

    if (sortRating) {
      tempSearchParams.sort_by_rating = sortRating;
    }

    if (!_.isEmpty(tempSearchParams)) {
      setSearchParams(tempSearchParams);
    }
  }, [filterPrice, filterRating, sortPrice, sortRating]);

  return (
    <Spin spinning={loadingCallAPI}>
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
          />
        </div>

        <div className="all-tours">
          <Collapse
            defaultActiveKey={['1']}
            ghost
            className="all-tours__filter"
            expandIconPosition="end"
          >
            <Panel header="Filter" key="1">
              <Form
                className="all-tours__filter__item"
                layout={'vertical'}
                onValuesChange={onFilter}
              >
                <Form.Item name="filter_by_price" label="Price">
                  <Slider
                    range
                    defaultValue={[0, 1000]}
                    max={1000}
                    tipFormatter={value =>
                      value.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })
                    }
                  />
                </Form.Item>
                <Form.Item name="filter_by_rating" label="Rating">
                  <Rate allowHalf defaultValue={0} />
                </Form.Item>
              </Form>
            </Panel>
          </Collapse>
          <div className="all-tours__header">
            <p>
              <b>{listFilter.length || listTours.length}</b> Tours
            </p>

            <div className="all-tours__header__sort">
              <div>
                <p>Sort by</p>
                {typeSort === 'price'
                  ? renderIconSortPrice()
                  : renderIconSortRating()}
              </div>
              <Select
                defaultValue="price"
                onChange={value => setTypeSort(value)}
              >
                <Option value="price">Price</Option>
                <Option value="rating">Rating</Option>
              </Select>
            </div>
          </div>
          <div className="all-tours__list-wrapper">
            <div style={{ marginBottom: '1rem' }}>
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

            {listFilter.length === 0 &&
              listTours.map((tour, index) => (
                <CardTour key={index} tour={tour} tag={'featured'} />
              ))}
            {listFilter.length > 0 &&
              listFilter.map((tour, index) => (
                <CardTour key={index} tour={tour} tag={'featured'} />
              ))}
          </div>
          <Pagination
            defaultCurrent={1}
            total={listFilter.length + 1}
            onChange={onPagination}
            defaultPageSize={6}
            className="all-tours__pagination"
          />
        </div>
      </div>
    </Spin>
  );
};

export default AllTours;
