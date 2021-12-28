import styled from 'styled-components';
import { DefaultSurface } from '../../../components/AppLayout/DefaultSurface/DefaultSurface';

export const Surface = styled(DefaultSurface)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;
