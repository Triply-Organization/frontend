/* eslint-disable no-undef */
import { Form } from 'antd';
import React, { useState } from 'react';

import FormModal from '../../src/components/FormModal/FormModal';

describe('component/CardTour', () => {
  beforeEach(() => {
    cy.viewport(1200, 700);
  });

  it('should render without crashing', () => {
    const form = Form.useForm();
    const [visible, setVisible] = useState(false);
    const props = {
      nameForm: 'FORM',
      title: 'CYPRESS',
      okText: 'OK',
      cancelText: 'CANCEL',
      form,
      visible,
      onCreate: () => {
        console.log('CREATE');
      },
      onCancel: () => {
        console.log('CANCEL');
      },
      children: 'FORM CYPRESS',
    };
    cy.mount(
      <div>
        <FormModal {...props} />
        <button
          onClick={() => {
            setVisible(true);
          }}
        >
          Open modal
        </button>
      </div>,
    );
  });
});
