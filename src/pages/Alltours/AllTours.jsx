import { Button, Pagination, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  BsSortDown,
  BsSortDownAlt,
  BsSortNumericDown,
  BsSortNumericDownAlt,
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import {
  getDestinationsServiceTours,
  getToursByFilter,
} from '../../app/toursSlice';
import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import CardTour from '../../components/CardTour/CardTour';
import ImageBreadcrumb from '../../components/ImageBreadcrumb/ImageBreadcrumb';
import Search from '../../components/Search/Search';
import './AllTours.scss';

const { Option } = Select;

const AllTours = () => {
  const [typeSort, setTypeSort] = useState('price');
  const [isSortPriceDown, setSortPriceDown] = useState(true);
  const [isSortRatingDown, setSortRatingDown] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({});

  // ANTD

  // USE EFFECT
  useEffect(() => {
    const request = {
      destinations: searchParams.get('destinations'),
    };
    if (request.destinations) dispatch(getToursByFilter(request));
  }, [searchParams]);

  useEffect(() => {
    loading();
  }, []);

  // Redux
  const listTours = useSelector(state => state.tours.list);
  const listFilter = useSelector(state => state.tours.listFilter);
  const destinations = useSelector(state => state.tours.destinations);
  const services = useSelector(state => state.tours.services);
  const loadingCallAPI = useSelector(state => state.tours.loading);
  const dispatch = useDispatch();

  // React router

  const loadingContext = useLoadingContext();

  const loading = async () => {
    //loading some data
    if (listTours.length === 0 || destinations.length === 0 || services === 0)
      dispatch(getDestinationsServiceTours());
    //call method to indicate that loading is done
    loadingContext.done();
  };

  // console.log(listTours);

  const renderIconSortPrice = () => {
    return (
      <Button
        className="all-tours__header__sort__button"
        type="ghost"
        onClick={() => setSortPriceDown(!isSortPriceDown)}
        icon={
          isSortPriceDown ? (
            <BsSortNumericDownAlt className="all-tours__header__sort__icon" />
          ) : (
            <BsSortNumericDown className="all-tours__header__sort__icon" />
          )
        }
      />
    );
  };
  const renderIconSortRating = () => {
    return (
      <Button
        className="all-tours__header__sort__button"
        type="ghost"
        onClick={() => setSortRatingDown(!isSortRatingDown)}
        icon={
          isSortRatingDown ? (
            <BsSortDown className="all-tours__header__sort__icon" />
          ) : (
            <BsSortDownAlt className="all-tours__header__sort__icon" />
          )
        }
      />
    );
  };
  const onPagination = page => {
    console.log(page);
  };

  const onSearch = values => {
    setSearchParams({ destinations: values.destinations });
    console.log(searchParams);
  };
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
          <div className="all-tours__header">
            <p>
              <b>20</b> Tours
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
