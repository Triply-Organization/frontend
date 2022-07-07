import { CloudSyncOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Tabs,
  Upload,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import {
  getDestinationsServiceTours,
  getDetailTour,
  updateTour,
} from '../../app/toursSlice';
import './CMSEditTour.scss';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });

const CMSEditTour = () => {
  const { TabPane } = Tabs;
  const { Option } = Select;

  const dispatch = useDispatch();
  const services = useSelector(state => state.tours.services);
  const tour = useSelector(state => state.tours.tour);
  const loading = useSelector(state => state.tours.loading);

  const loadingContext = useLoadingContext();
  loadingContext.done();
  const { id } = useParams();
  const [formInformation] = Form.useForm();
  const [formCover] = Form.useForm();
  const [formGallery] = Form.useForm();

  const [previewVisibleCover, setPreviewVisibleCover] = useState(false);
  const [previewVisibleGallery, setPreviewVisibleGallery] = useState(false);
  const [previewImageCover, setPreviewImageCover] = useState('');
  const [previewImageGallery, setPreviewImageGallery] = useState('');
  const [cover, setCover] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [valueInformation, setValueInformation] = useState({});
  const [valueCover, setValueCover] = useState({});
  const [valueGallery, setValueGallery] = useState({});
  const [disableUpdateInfomation, setDisableUpdateInfomation] = useState(true);
  const [disableUpdateCover, setDisableUpdateCover] = useState(true);
  const [disableUpdateGallery, setDisableUpdateGallery] = useState(true);

  useEffect(() => {
    if (_.isEmpty()) {
      dispatch(getDestinationsServiceTours());
    }
  }, []);

  useEffect(() => {
    if (id) dispatch(getDetailTour(id));
    loadingContext.done();
  }, [id]);

  useEffect(() => {
    if (!_.isEmpty(tour)) {
      const valueFormInformation = {
        title: tour.title,
        maxPeople: tour.maxPeople,
        minAge: tour.minAge,
        overview: tour.overView,
        services: tour.services.map(item => item.id),
      };

      const valueFormCoverImage = tour.tourImages.filter(
        item => item.type === 'cover',
      );

      const valueFormCoverGallery = tour.tourImages.filter(
        item => item.type === 'gallery',
      );

      setCover(valueFormCoverImage);
      setValueCover(valueFormCoverImage);
      setGallery(valueFormCoverGallery);
      setValueGallery(valueFormCoverGallery);
      formInformation.setFieldsValue(valueFormInformation);
      setValueInformation(valueFormInformation);
    }
  }, [tour]);

  const onChangeValueInfomation = (changedValues, values) => {
    if (_.isEqual(values, valueInformation)) setDisableUpdateInfomation(true);
    else setDisableUpdateInfomation(false);
  };

  const onEditInformation = values => {
    const newService = values.services.filter(
      x => !valueInformation.services.includes(x),
    );
    const deletedService = valueInformation.services.filter(
      x => !values.services.includes(x),
    );
    const servicesParams = {
      newServiceToTour: newService,
      deleteServiceFromTour: deletedService,
    };
    values.services = servicesParams;
    const params = {
      id: id,
      body: values,
    };

    dispatch(updateTour(params));
    setDisableUpdateInfomation(true);
  };

  //   const uploadCoverImage = async options => {
  //     const { onSuccess, onError, file } = options;
  //     const fmData = new FormData();
  //     const config = {
  //       headers: {
  //         'content-type': 'multipart/form-data',
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     };
  //     fmData.append('image[]', file);
  //     try {
  //       const res = await axios.post(
  //         'https://api.nhivo-rentcar.me/api/images/',
  //         fmData,
  //         config,
  //       );
  //       onSuccess('Ok');
  //       const tempCoverImg = {
  //         id: res.data.data[0]?.id,
  //         type: 'cover',
  //         file,
  //       };
  //       setCover(tempCoverImg);
  //     } catch (err) {
  //       console.log('Eroor: ', err);
  //       onError({ err });
  //     }
  //   };

  //   const uploadGalleryImage = async options => {
  //     const { onSuccess, onError, file } = options;

  //     const fmData = new FormData();
  //     const config = {
  //       headers: {
  //         'content-type': 'multipart/form-data',
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     };
  //     fmData.append('image[]', file);
  //     try {
  //       const res = await axios.post(
  //         'https://api.nhivo-rentcar.me/api/images/',
  //         fmData,
  //         config,
  //       );
  //       onSuccess('Ok');
  //       const tempCoverImg = {
  //         id: res.data.data[0]?.id,
  //         type: 'gallery',
  //         file,
  //       };
  //       setGalleryImage([...galleryImage, tempCoverImg]);
  //     } catch (err) {
  //       console.log('Eroor: ', err);
  //       onError({ err });
  //     }
  //   };

  const onEditFormCoverImage = values => {
    console.log(values);
  };

  const onEditFormGallery = values => {
    console.log(values);
  };

  const handleCancelCover = () => setPreviewVisibleCover(false);
  const handleCancelGallery = () => setPreviewVisibleGallery(false);

  const handlePreviewCover = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImageCover(file.url || file.preview);
    setPreviewVisibleCover(true);
  };

  const handlePreviewGallery = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImageGallery(file.url || file.preview);
    setPreviewVisibleGallery(true);
  };

  const handleChangeCover = ({ fileList: newFileList }) => {
    setCover(newFileList);
    if (_.isEqual(newFileList, valueCover)) setDisableUpdateCover(true);
    else setDisableUpdateCover(false);
  };

  const handleChangeGallery = ({ fileList: newFileList }) => {
    setGallery(newFileList);
    if (_.isEqual(newFileList, valueGallery)) setDisableUpdateGallery(true);
    else setDisableUpdateGallery(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
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
        <Breadcrumb.Item>Edit Tour</Breadcrumb.Item>
      </Breadcrumb>

      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="Infomation" key="1" className="card__tab-pane">
            <Form
              onValuesChange={onChangeValueInfomation}
              form={formInformation}
              name="form-edit-tour"
              onFinish={onEditInformation}
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please input your tour title!',
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Tour title"
                  style={{ width: '500px' }}
                />
              </Form.Item>

              <Space className="form-edit__space-number" size={'large'}>
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
                    <Option value={0}>0</Option>
                    <Option value={12}>12</Option>
                    <Option value={18}>18</Option>
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
                <Select size="large" mode="multiple">
                  {services.map((item, index) => {
                    return (
                      <Option key={index} value={parseInt(item.id)}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  disabled={disableUpdateInfomation}
                  loading={loading}
                  block
                  type="primary"
                  size="large"
                  icon={<CloudSyncOutlined />}
                  htmlType="submit"
                >
                  Update now
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Cover Image" key="2" className="card__tab-pane">
            <Form
              form={formCover}
              name="form-edit-tour-image-cover"
              onFinish={onEditFormCoverImage}
              layout="vertical"
              autoComplete="off"
            >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={cover}
                onPreview={handlePreviewCover}
                onChange={handleChangeCover}
              >
                {cover.length !== 0 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisibleCover}
                footer={null}
                onCancel={handleCancelCover}
              >
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImageCover}
                />
              </Modal>

              <Form.Item>
                <Button
                  disabled={disableUpdateCover}
                  style={{ marginTop: '1rem' }}
                  block
                  type="primary"
                  size="large"
                  icon={<CloudSyncOutlined />}
                  htmlType="submit"
                >
                  Update cover image
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Gallery" key="3" className="card__tab-pane">
            <Form
              form={formGallery}
              name="form-edit-tour-image"
              onFinish={onEditFormGallery}
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item name="gallery">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={gallery}
                  onPreview={handlePreviewGallery}
                  onChange={handleChangeGallery}
                >
                  {gallery.length >= 10 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisibleGallery}
                  footer={null}
                  onCancel={handleCancelGallery}
                >
                  <img
                    alt="example"
                    style={{
                      width: '100%',
                    }}
                    src={previewImageGallery}
                  />
                </Modal>
              </Form.Item>

              <Form.Item>
                <Button
                  disabled={disableUpdateGallery}
                  block
                  type="primary"
                  size="large"
                  icon={<CloudSyncOutlined />}
                  htmlType="submit"
                >
                  Update gallery image
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          {/* <TabPane tab="Tour Plans" key="4" className="card__tab-pane">
            <Form
              form={formTourPlans}
              name="form-edit-tour-plans"
              onFinish={onEditFormTourPlans}
              layout="vertical"
              autoComplete="off">
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
                        ]}>
                        <Input
                          style={{ resize: 'none' }}
                          rows={3}
                          size="large"
                        />
                      </Form.Item>
                      <Form.Item
                        style={{ padding: '0 1rem' }}
                        label="Destination"
                        name={['tourPlans', i + 1, 'destination']}
                        rules={[
                          {
                            required: true,
                            message: `Please input Description your tour plan day ${
                              i + 1
                            }`,
                          },
                        ]}>
                        <Select size="large">
                          {destinations.map((item, index) => {
                            return (
                              <Option key={index} value={item.id}>
                                {item.name}
                              </Option>
                            );
                          })}
                        </Select>
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
                        ]}>
                        <TextArea
                          style={{ resize: 'none' }}
                          rows={3}
                          size="large"
                        />
                      </Form.Item>
                    </Panel>
                  );
                })}
              </Collapse>

              <Form.Item>
                <Button
                  style={{ marginTop: '1rem' }}
                  block
                  type="primary"
                  size="large"
                  icon={<CloudSyncOutlined />}
                  htmlType="submit">
                  Update your tour plans
                </Button>
              </Form.Item>
            </Form>
          </TabPane> */}
        </Tabs>
      </div>
    </>
  );
};

export default CMSEditTour;
