import React from 'react';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AccountTree, PhoneRounded } from '@material-ui/icons';


import { DefaultDrawer } from './styles';
import { useGlobal } from '../../../providers/global/GlobalProvider';

export default function AppMenu() {
  const { openMenu, toggleMenu } = useGlobal();

  return (
    <DefaultDrawer anchor="left" open={openMenu} variant="temporary" ModalProps={{ onBackdropClick: toggleMenu }}>
      <div>
        <IconButton onClick={toggleMenu}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem component={Link} to="/ftth" button onClick={toggleMenu}>
          <ListItemIcon>
            <AccountTree />
          </ListItemIcon>
          <ListItemText primary="FTTH" />
        </ListItem>

        <ListItem component={Link} to="/phone_subscriber" button onClick={toggleMenu}>
          <ListItemIcon>
            <PhoneRounded />
          </ListItemIcon>
          <ListItemText primary="Telefonia" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {/*<ListItem component={Link} to="/integrations" button onClick={toggleDrawer}><ListItemText primary="Integrações" /></ListItem>*/}
      </List>
    </DefaultDrawer>
  );
}
