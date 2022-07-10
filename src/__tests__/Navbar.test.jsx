import {
  act,
  fireEvent,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect } from 'vitest';

import Navbar from '../components/Header/Navbar';

describe('Navbar component', () => {
  it('should render correctly', () => {
    expect(render(<Navbar />)).toMatchSnapshot();
  });

  it('should return correct props', () => {
    const navItem = [
      {
        title: 'title',
        icon: 'icon',
        subnav: [],
        link: '/',
      },
    ];
    const activeTab = 0;
    const handleSetActiveTab = () => console.log('handle');
    const props = {
      navItem,
      activeTab,
      handleSetActiveTab,
    };

    render(
      <BrowserRouter>
        <Navbar {...props} />
      </BrowserRouter>,
    );
    const navbar = screen.getByTestId('header-navbar');
    expect(navbar).toBeInTheDocument();
  });

  it('should return active tab', () => {
    const navItem = [
      {
        title: 'title',
        icon: 'icon',
        subnav: [],
        link: '/',
      },
    ];
    const activeTab = 0;
    const handleSetActiveTab = () => console.log('handle');
    const props = {
      navItem,
      activeTab,
      handleSetActiveTab,
    };

    render(
      <BrowserRouter>
        <Navbar {...props} />
      </BrowserRouter>,
    );
    const headerNavbarItem =
      screen.getByTestId('header-navbar-item').firstElementChild;
    expect(headerNavbarItem.className).toBe(
      'header__navbar-link header__navbar-link--active',
    );
  });
});
