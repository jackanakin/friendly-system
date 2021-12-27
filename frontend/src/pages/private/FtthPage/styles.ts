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

export const FtthTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

export const FtthTable = styled.table`
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
  grid-template-columns: repeat(10, 1fr);
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

export const TableTdExtra = styled.td`
  border-top: none;
  display: flex;
  flex: 1;
  flex-direction: row;
  grid-column: 1/-1;
  font-size: 13px;
  background-color: #ffff;
  width: 100%;
`;
