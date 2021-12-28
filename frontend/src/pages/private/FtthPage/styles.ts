import styled from 'styled-components';
import TableRow from '@mui/material/TableRow';
import { DefaultSurface } from '../../../components/AppLayout/DefaultSurface/DefaultSurface';

export const TableRowHeader = styled(TableRow)`
  background-color: gray;
`;

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
