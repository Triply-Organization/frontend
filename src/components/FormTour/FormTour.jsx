import {
  Button,
  Collapse,
  DatePicker,
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
import {
  AiOutlineEye,
  AiOutlineInbox,
  AiOutlineMinusCircle,
  AiOutlinePlus,
} from 'react-icons/ai';

import './FormTour.scss';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Panel } = Collapse;
const { Dragger } = Upload;
const { Option } = Select;

const FormTour = props => {
  const { form, onFinish } = props;
  const [minAge, setMinAge] = useState(null);
  const [duration, setDuration] = useState(null);

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
                icon={<AiOutlinePlus />}
                htmlType="submit"
                className="form-tour__control-header__btn"
              >
                Add now
              </Button>
              <Button
                size="large"
                icon={<AiOutlineEye />}
                className="form-tour__control-header__btn"
              >
                Review
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
                        message: 'Please input your tour cover image',
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
                  <Form.Item label="Gallery" name="gallery">
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
            <TabPane tab="Tour plan" key="3">
              <Collapse defaultActiveKey={['1']}>
                {Array.from(Array(duration), (_, i) => {
                  return (
                    <Panel header={`Day ${i + 1}`} key={i + 1}>
                      <Form.Item
                        label="Description"
                        name={`day${i + 1}`}
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
                    </Panel>
                  );
                })}
              </Collapse>
            </TabPane>
            <TabPane tab="Date open" key="4">
              <Form.List name="dateOpen">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: 'flex',
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          className="date-open-form"
                          {...restField}
                          name={[name, key]}
                          rules={[
                            {
                              required: true,
                              message: 'Missing last name',
                            },
                          ]}
                        >
                          <DatePicker size="large" />
                        </Form.Item>
                        <AiOutlineMinusCircle
                          onClick={() => remove(name)}
                          style={{ fontSize: '18px' }}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block>
                        More open
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Form>
  );
};

FormTour.propTypes = {
  type: PropTypes.string,
  form: PropTypes.any,
  onFinish: PropTypes.func,
};

export default FormTour;
