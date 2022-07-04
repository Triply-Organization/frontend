import { Form, Modal } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const FormModal = ({
  nameForm,
  title,
  okText,
  cancelText,
  form,
  visible,
  onCreate,
  onCancel,
  children,
  ...prop
}) => {
  return (
    <Modal
      {...prop}
      form={form}
      visible={visible}
      title={title}
      okText={okText}
      cancelText={cancelText}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name={nameForm}>
        {children}
      </Form>
    </Modal>
  );
};

FormModal.propTypes = {
  nameForm: PropTypes.string,
  title: PropTypes.any,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  form: PropTypes.any,
  visible: PropTypes.bool,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.any,
};

export default FormModal;
