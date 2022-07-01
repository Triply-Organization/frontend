/* eslint-disable no-unused-vars */
import { Button, Pagination, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  BsSortDown,
  BsSortDownAlt,
  BsSortNumericDown,
  BsSortNumericDownAlt,
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import { getListTours } from '../../app/toursSlice';
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
  const [loadingDOM, setLoadingDOM] = useState(true);

  // Redux
  const listTours = useSelector(state => state.tours.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (listTours.length === 0) {
      // dispatch(getListTours());
    }

    setTimeout(() => {
      setLoadingDOM(false);
    }, 600);
  }, []);

  const data = [
    {
      image:
        'https://demo2wpopal.b-cdn.net/triply/wp-content/uploads/2020/11/5c62cf53ebd1d70c3b6378fd_candre-mandawe-770529-unsplash-copy-820x520.jpg',
      duration: 7,
      destination: 'Bryce Canyon National Park, USA',
      name: 'Waterfalls, Geysers and Glacier',
      price: 100,
      maxPeople: 40,
    },
    {
      image:
        'https://demo2wpopal.b-cdn.net/triply/wp-content/uploads/2020/11/5c62cf53ebd1d70c3b6378fd_candre-mandawe-770529-unsplash-copy-820x520.jpg',
      duration: 7,
      destination: 'Bryce Canyon National Park, USA',
      name: 'Waterfalls, Geysers and Glacier',
      price: 100,
      maxPeople: 40,
    },
    {
      image:
        'https://demo2wpopal.b-cdn.net/triply/wp-content/uploads/2020/11/5c62cf53ebd1d70c3b6378fd_candre-mandawe-770529-unsplash-copy-820x520.jpg',
      duration: 7,
      destination: 'Bryce Canyon National Park, USA',
      name: 'Waterfalls, Geysers and Glacier',
      price: 100,
      maxPeople: 40,
    },
    {
      image:
        'https://demo2wpopal.b-cdn.net/triply/wp-content/uploads/2020/11/5c62cf53ebd1d70c3b6378fd_candre-mandawe-770529-unsplash-copy-820x520.jpg',
      duration: 7,
      destination: 'Bryce Canyon National Park, USA',
      name: 'Waterfalls, Geysers and Glacier',
      price: 100,
      maxPeople: 40,
    },
    {
      image:
        'https://demo2wpopal.b-cdn.net/triply/wp-content/uploads/2020/11/5c62cf53ebd1d70c3b6378fd_candre-mandawe-770529-unsplash-copy-820x520.jpg',
      duration: 7,
      destination: 'Bryce Canyon National Park, USA',
      name: 'Waterfalls, Geysers and Glacier',
      price: 100,
      maxPeople: 40,
    },
    {
      image:
        'https://demo2wpopal.b-cdn.net/triply/wp-content/uploads/2020/11/5c62cf53ebd1d70c3b6378fd_candre-mandawe-770529-unsplash-copy-820x520.jpg',
      duration: 7,
      destination: 'Bryce Canyon National Park, USA',
      name: 'Waterfalls, Geysers and Glacier',
      price: 100,
      maxPeople: 40,
    },
    {
      image:
        'https://demo2wpopal.b-cdn.net/triply/wp-content/uploads/2020/11/5c62cf53ebd1d70c3b6378fd_candre-mandawe-770529-unsplash-copy-820x520.jpg',
      duration: 7,
      destination: 'Bryce Canyon National Park, USA',
      name: 'Waterfalls, Geysers and Glacier',
      price: 100,
      maxPeople: 40,
    },
  ];

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
  return (
    <Spin spinning={loadingDOM}>
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
          <Search />
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
            {data.map((tour, index) => (
              <CardTour key={index} tour={tour} tag={'featured'} />
            ))}
          </div>
          <Pagination
            defaultCurrent={1}
            total={data.length + 1}
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
