import {
  Collapse,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Tabs,
  Upload,
  message,
} from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { AiOutlineInbox } from 'react-icons/ai';

import './FormTour.scss';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Panel } = Collapse;
const { Dragger } = Upload;
const { Option } = Select;

const FormTour = props => {
  const { form, onFinish } = props;
  const [minAge, setMinAge] = useState(null);
  console.log(minAge);

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
  return (
    <Form
      className="form-tour"
      form={form}
      name="form-tour"
      onFinish={onFinish}
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
          <Input size="large" placeholder="Tour title" />
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
                  <Select
                    size="large"
                    style={{ width: 200 }}
                    onChange={e => setMinAge(e)}
                  >
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
                  placeholder="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error obcaecati placeat, aliquid nostrum atque repellendus iure necessitatibus dolor ab dolorum aperiam facere voluptates delectus voluptatem dolore ullam eveniet non magni."
                />
              </Form.Item>

              <Collapse defaultActiveKey={['1']}>
                <Panel header="Images" key="1">
                  <Form.Item
                    label="Cover image"
                    name="cover"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your tour title!',
                      },
                    ]}
                  >
                    <Dragger
                      name="image"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      multiple={false}
                      maxCount={1}
                      beforeUpload={beforeUpload}
                      listType="picture"
                    >
                      <p className="ant-upload-drag-icon">
                        <AiOutlineInbox />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag image to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        This image will be used to display as the cover photo of
                        your tour. It will show up on the tour card interface.
                      </p>
                    </Dragger>
                  </Form.Item>
                  <Form.Item
                    label="Gallery"
                    name="gallery"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your tour title!',
                      },
                    ]}
                  >
                    <Dragger
                      name="image-detail"
                      multiple={true}
                      beforeUpload={beforeUpload}
                      listType="picture"
                      maxCount={5}
                    >
                      <p className="ant-upload-drag-icon">
                        <AiOutlineInbox />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag image to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        This image will be used to display as the cover photo of
                        your tour. It will show up on the tour card interface.
                      </p>
                    </Dragger>
                  </Form.Item>
                </Panel>
              </Collapse>
            </TabPane>
            <TabPane tab="Ticket" key="2">
              <Form.Item
                label="Children (0 - 12 years)"
                name="0to12"
                rules={[
                  {
                    required: true,
                    message: 'Please input your tour duration!',
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={30}
                  size="large"
                  placeholder="1"
                  addonBefore="$"
                  style={{ width: 200 }}
                  disabled={minAge - 1 > 0}
                />
              </Form.Item>
              <Form.Item
                label="Youth (13 - 17 years)"
                name="12to18"
                rules={[
                  {
                    required: true,
                    message: 'Please input your tour duration!',
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={30}
                  size="large"
                  placeholder="1"
                  addonBefore="$"
                  style={{ width: 200 }}
                  disabled={minAge - 1 > 12}
                />
              </Form.Item>
              <Form.Item
                label="Adult (18+ years)"
                name="upper18"
                rules={[
                  {
                    required: true,
                    message: 'Please input your tour duration!',
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={30}
                  size="large"
                  placeholder="1"
                  addonBefore="$"
                  style={{ width: 200 }}
                  disabled={minAge - 1 > 18}
                />
              </Form.Item>
            </TabPane>
            <TabPane tab="Tour plan" key="3"></TabPane>
          </Tabs>
        </div>
      </div>
      <div className="form-tour__content__right"></div>
    </Form>
  );
};

FormTour.propTypes = {
  type: PropTypes.string,
  form: PropTypes.any,
  onFinish: PropTypes.func,
};

export default FormTour;
