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

export const Table = styled.table`
  border: none;
  border-top: 1px solid #EEEEEE;
  font-family: arial, sans-serif;
  border-collapse: collapse;
`;

export const TableTr = styled.tr`
  background-color: #fff;
  border: none;
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: flex-start;
`;

export const TableTh = styled.th`
  border: 1px solid #EEEEEE;
  border-top: none;
  text-align: left;
  padding: 5px;
  color: #363D41;
  font-size: 14px;
`;

export const TableTd = styled.td`
  border: 1px solid #EEEEEE;
  border-top: none;
  text-align: left;
  padding: 5px;
  color: #363D41;
  font-size: 14px;
`;
