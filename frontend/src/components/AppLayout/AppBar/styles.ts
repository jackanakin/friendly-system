import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export const MenuBar = styled(AppBar)`
  background: linear-gradient(45deg, #0d47a1 30%, #2962ff 90%);
`;
export const Content = styled(Toolbar)`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  p {
    margin-left: 5px;
  }
`;

export const Separator = styled.div`
  height: 20px;
  width: 2px;
  padding: 5px;
`;
