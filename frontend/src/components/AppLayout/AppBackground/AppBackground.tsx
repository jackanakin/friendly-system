import React from 'react';
import PropTypes from 'prop-types';


import { Wrapper } from './styles';
import AppBar from '../AppBar/AppBar';
import AppMenu from '../AppMenu/AppMenu';

export default function AppBackground({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <AppBar />
      <AppMenu />
      {children}
    </Wrapper>
  );
}

AppBackground.prototype = {
  children: PropTypes.element.isRequired,
};
