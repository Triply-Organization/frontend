import {
  act,
  fireEvent,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import { expect, it } from 'vitest';

import OrderDetail from '../components/OderDetail/OrderDetail';

describe('Orderdetail component', () => {
  it('should render correctly', () => {
    const result = render(<OrderDetail />);
    expect(result).toMatchSnapshot();
  });

  it('should render Text discount value', () => {
    const data = {
      duration: 4,
      id: 56,
      scheduleId: 2,
      startDay: {
        date: '2022-07-11 00:00:00.000000',
        timezone_type: 3,
        timezone: 'UTC',
      },
      status: 'unpaid',
      subTotal: 376,
      tax: null,
      tickets: {
        adult: { idTicket: 110, amount: 2, priceTick: 138 },
        children: { idTicket: 108, amount: 1, priceTick: 30 },
        youth: { idTicket: 109, amount: 1, priceTick: 70 },
      },
      tourId: 2,
      tourTitle: 'Go to Da Lat',
      user: 2,
      voucher: [
        { id: 1, code: 'VOUCHER', discount: 20, remain: 0 },
        { id: 2, code: 'VIPCODE', discount: 50, remain: 5 },
      ],
    };
    render(
      <OrderDetail
        discountValue={10}
        data={data}
        taxInfo={8}
        finalTotal={406.08}
      />,
    );
    expect(screen.getByTestId('text-discount').textContent).toBe(`-${10}%`);
  });

  it('should render bill discount number', () => {
    const data = {
      bill: {
        discount: '10',
      },
    };
    render(<OrderDetail data={data} />);
    expect(screen.getByTestId('text-discount').textContent).toBe('10');
  });

  it('should render bill discount number', () => {
    const finalTotal = 10;
    render(<OrderDetail finalTotal={finalTotal} />);
    expect(screen.getByTestId('text-finalTotal').textContent).toBe(
      finalTotal?.toLocaleString(`en-US`, {
        style: 'currency',
        currency: 'USD',
      }),
    );
  });

  // it('should render bill discount number', () => {
  //   const data = {
  //     imageTour: {
  //       path: 'https://car-rent-nhivo.s3.ap-southeast-1.amazonaws.com/upload/photo-1607356296477-5454f7a7f0f0-62c904df3523a.jpg',
  //     },
  //   };

  //   render(<OrderDetail data={data} />);
  //   expect(screen.getByTestId('test-imageUrl')).toContain(
  //     'https://car-rent-nhivo.s3.ap-southeast-1.amazonaws.com/upload/photo-1607356296477-5454f7a7f0f0-62c904df3523a.jpg',
  //   );
  // });

  it('should render Text discount value', () => {
    const data = {
      duration: 4,
      id: 56,
      scheduleId: 2,
      startDay: {
        date: '2022-07-11 00:00:00.000000',
        timezone_type: 3,
        timezone: 'UTC',
      },
      status: 'unpaid',
      subTotal: 376,
      tax: null,
      tickets: {
        adult: { idTicket: 110, amount: 2, priceTick: 138 },
        children: { idTicket: 108, amount: 1, priceTick: 30 },
        youth: { idTicket: 109, amount: 1, priceTick: 70 },
      },
      tourId: 2,
      tourTitle: 'Go to Da Lat',
      user: 2,
      voucher: [
        { id: 1, code: 'VOUCHER', discount: 20, remain: 0 },
        { id: 2, code: 'VIPCODE', discount: 50, remain: 5 },
      ],
    };
    render(
      <OrderDetail
        discountValue={10}
        data={data}
        taxInfo={8}
        finalTotal={null}
      />,
    );
    expect(screen.getByTestId('text-finalTotal').textContent).toBe(
      data?.subTotal?.toLocaleString(`en-US`, {
        style: 'currency',
        currency: 'USD',
      }),
    );
  });
});
