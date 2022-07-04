import {
  Breadcrumb,
  Button,
  Collapse,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Space,
  Tabs,
  Upload,
  message,
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  AiOutlineDelete,
  AiOutlineFormatPainter,
  AiOutlineInbox,
  AiOutlinePlus,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { getDestinationsServiceTours } from '../../app/toursSlice';
import './CMSHandleTour.scss';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Panel } = Collapse;
const { Dragger } = Upload;
const { Option } = Select;

const CMSAddTour = () => {
  const [duration, setDuration] = useState(null);
  const [coverImage, setCoverImage] = useState({});
  const [galleryImage, setGalleryImage] = useState([]);
  const [type, setType] = useState('');
  const destinations = useSelector(state => state.tours.destinations);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fakeGallery = [
    {
      id: 1,
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      name: 'nameoftheimage.png',
    },
    {
      id: 2,
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      name: 'nameoftheimag2.png',
    },
  ];

  useEffect(() => {
    if (destinations.length === 0) {
      dispatch(getDestinationsServiceTours());

      console.log(destinations.length);
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes('add-tour')) setType('add');
    else setType('edit');
  }, [location.pathname]);

  const beforeUpload = file => {
    const isPNG = file.type === 'image/png';
    const isJPG = file.type === 'image/jpeg';
    if (!isPNG && !isJPG) {
      message.error(`${file.name} is not a png/jpg file`);
      return Upload.LIST_IGNORE;
    } else {
      return true;
    }
  };

  const onAddTour = values => {
    // Delete gallery image is removed
    const resGallery = galleryImage.filter(function (o1) {
      return values.tourImages.gallery.fileList.some(function (o2) {
        console.log(o1.uid);
        return o1.file.uid === o2.uid; // return the ones with equal id
      });
    });
    // Convert tourplans to array
    const propertyValues = Object.values(values.tourPlans);

    const response = {
      ...values,
      tourImages: [{ ...coverImage }, ...resGallery],
      tourPlans: propertyValues.map((item, index) => ({
        ...item,
        day: index + 1,
      })),
    };

    console.log(response);
  };

  const uploadCoverImage = async options => {
    const { onSuccess, onError, file } = options;
    console.log(`first`);

    const fmData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    fmData.append('image[]', file);
    try {
      const res = await axios.post(
        'https://api.nhivo-rentcar.me/api/images/',
        fmData,
        config,
      );
      onSuccess('Ok');
      const tempCoverImg = {
        id: res.data.data[0]?.id,
        type: 'COVER',
        file,
      };
      setCoverImage(tempCoverImg);
    } catch (err) {
      console.log('Eroor: ', err);
      onError({ err });
    }
  };

  const uploadGalleryImage = async options => {
    const { onSuccess, onError, file } = options;
    console.log(`first`);

    const fmData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    fmData.append('image[]', file);
    try {
      const res = await axios.post(
        'https://api.nhivo-rentcar.me/api/images/',
        fmData,
        config,
      );
      onSuccess('Ok');
      const tempCoverImg = {
        id: res.data.data[0]?.id,
        type: 'GALLERY',
        file,
      };
      setGalleryImage([...galleryImage, tempCoverImg]);
    } catch (err) {
      console.log('Eroor: ', err);
      onError({ err });
    }
  };
  return (
    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>
          <Link to="/home">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/cms/tours">Tours</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Tour</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        className="form-tour"
        name="form-tour"
        onFinish={onAddTour}
        layout="vertical"
        autoComplete="off"
      >
        <div className="form-tour__content__left">
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input your tour title!',
              },
            ]}
          >
            <div className="form-tour__control-header">
              <Input
                size="large"
                placeholder="Tour title"
                style={{ width: '30%' }}
              />
              <Space>
                <Button
                  type="primary"
                  size="large"
                  icon={
                    type === 'add' ? (
                      <AiOutlinePlus />
                    ) : (
                      <AiOutlineFormatPainter />
                    )
                  }
                  htmlType="submit"
                  className="form-tour__control-header__btn"
                >
                  {type === 'add' ? 'Add now' : 'Update'}
                </Button>
                <Button
                  size="large"
                  className="form-tour__control-header__btn"
                  onClick={() => navigate('/cms/tours')}
                >
                  Cancel
                </Button>
              </Space>
            </div>
          </Form.Item>

          <div className="card-container">
            <Tabs type="card">
              <TabPane tab="Infomation" key="1" className="card__tab-pane">
                <Space className="form-tour__space-number" size={'large'}>
                  <Form.Item
                    label="Duration"
                    name="duration"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your tour duration!',
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={e => setDuration(e)}
                      min={1}
                      max={30}
                      size="large"
                      placeholder="1"
                      addonAfter="days"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Max People"
                    name="maxPeople"
                    rules={[
                      {
                        required: true,
                        message: 'Please input max people!',
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      max={30}
                      size="large"
                      placeholder="1"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Min Age"
                    name="minAge"
                    rules={[
                      {
                        required: true,
                        message: 'Please input min age of tour!',
                      },
                    ]}
                  >
                    <Select size="large" style={{ width: 200 }}>
                      <Option value="0">0</Option>
                      <Option value="12">12</Option>
                      <Option value="18">18</Option>
                    </Select>
                  </Form.Item>
                </Space>

                <Form.Item
                  label="Overview"
                  name="overview"
                  rules={[
                    {
                      required: true,
                      message: 'Please input overview your tour!',
                    },
                  ]}
                >
                  <TextArea
                    style={{ resize: 'none' }}
                    rows={3}
                    size="large"
                    placeholder="Tell about your tour..."
                  />
                </Form.Item>

                <Form.Item
                  label="Servies"
                  name="services"
                  rules={[
                    {
                      required: true,
                      message: 'Select your services of tour',
                    },
                  ]}
                >
                  <Select size="large" />
                </Form.Item>

                <Collapse
                  defaultActiveKey={['1']}
                  style={{ marginBottom: '1rem' }}
                >
                  <Panel header="Images" key="1">
                    <Form.Item
                      style={{ padding: '0 1rem' }}
                      label="Cover image"
                      name={['tourImages', 'cover']}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your tour cover image',
                        },
                      ]}
                    >
                      <Dragger
                        multiple={false}
                        maxCount={1}
                        customRequest={uploadCoverImage}
                        beforeUpload={beforeUpload}
                        listType="picture"
                      >
                        <p className="ant-upload-drag-icon">
                          <AiOutlineInbox />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag png/jpeg to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          This image will be used to display as the cover photo
                          of your tour. It will show up on the tour card
                          interface.
                        </p>
                      </Dragger>

                      {type === 'edit' && (
                        <div className="tour-image-wrapper">
                          <div className="tour-image-wrapper__item">
                            <Space>
                              <Image
                                height={48}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                alt=""
                              />
                              <p>nameoftheimage.png</p>
                            </Space>

                            <Button
                              danger
                              type="text"
                              icon={<AiOutlineDelete />}
                            />
                          </div>
                        </div>
                      )}
                    </Form.Item>
                    <Form.Item
                      label="Gallery"
                      name={['tourImages', 'gallery']}
                      style={{ padding: '0 1rem' }}
                    >
                      <Dragger
                        multiple={true}
                        beforeUpload={beforeUpload}
                        customRequest={uploadGalleryImage}
                        listType="picture"
                        maxCount={5}
                      >
                        <p className="ant-upload-drag-icon">
                          <AiOutlineInbox />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag png/jpeg to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          You can post many detailed images of your tour, it
                          will help people understand your tour.
                        </p>
                      </Dragger>

                      {type === 'edit' && (
                        <div className="tour-image-wrapper">
                          {fakeGallery.map((item, index) => (
                            <div
                              className="tour-image-wrapper__item"
                              key={index}
                            >
                              <Space>
                                <Image
                                  height={48}
                                  src={item.src}
                                  alt={item.name}
                                />
                                <p>{item.name}</p>
                              </Space>

                              <Button
                                danger
                                type="text"
                                onClick={() => {
                                  console.log(item.id);
                                }}
                                icon={<AiOutlineDelete />}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </Form.Item>
                  </Panel>
                </Collapse>
              </TabPane>

              <TabPane tab="Tour plan" key="2">
                <Collapse defaultActiveKey={['1']}>
                  {Array.from(Array(duration), (_, i) => {
                    return (
                      <Panel header={`Day ${i + 1}`} key={i + 1}>
                        <Form.Item
                          style={{ padding: '0 1rem' }}
                          label="Title"
                          name={['tourPlans', `${i + 1}`, 'title']}
                          rules={[
                            {
                              required: true,
                              message: `Please input title of day ${i + 1}`,
                            },
                          ]}
                        >
                          <Input
                            style={{ resize: 'none' }}
                            rows={3}
                            size="large"
                          />
                        </Form.Item>
                        <Form.Item
                          style={{ padding: '0 1rem' }}
                          label="Description"
                          name={['tourPlans', i + 1, 'description']}
                          rules={[
                            {
                              required: true,
                              message: `Please input Description your tour plan day ${
                                i + 1
                              }`,
                            },
                          ]}
                        >
                          <TextArea
                            style={{ resize: 'none' }}
                            rows={3}
                            size="large"
                          />
                        </Form.Item>
                        <Form.Item
                          style={{ padding: '0 1rem' }}
                          label="Description"
                          name={['tourPlans', i + 1, 'destinations']}
                          rules={[
                            {
                              required: true,
                              message: `Please input Description your tour plan day ${
                                i + 1
                              }`,
                            },
                          ]}
                        >
                          <Select>
                            {/* {destinations.map((item, index) => <Option value={item.id}>Jack</Option>)} */}
                          </Select>
                        </Form.Item>
                      </Panel>
                    );
                  })}
                </Collapse>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Form>
    </>
  );
};

export default CMSAddTour;
