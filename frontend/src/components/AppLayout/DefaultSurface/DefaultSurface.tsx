import React from 'react';
import { Container, ContainerWrapper } from './styles';

export function DefaultSurface({ children }: { children: React.ReactNode }) {
  return (
    <ContainerWrapper>
      <Container>{children}</Container>
    </ContainerWrapper>
  );
}
