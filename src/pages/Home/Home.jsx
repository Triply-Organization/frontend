import { Form } from 'antd';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

import section1Background from '../../assets/images/section-1-background.png';
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
          <h2>Natural beauty</h2>
          <h1>Discover the most engaging places</h1>
          <button>
            Explore Now
            <AiOutlineArrowRight />
          </button>
        </div>
        <Search form={formSearch} onFinish={onSearch} />
      </div>
    </div>
  );
};

export default Home;
