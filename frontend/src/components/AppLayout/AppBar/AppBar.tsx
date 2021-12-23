import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Menu, ExitToApp } from '@material-ui/icons';

import { MenuBar, Content } from './styles';
import { useGlobal } from '../../../providers/global/GlobalProvider';
import { useAuth } from '../../../providers/auth/AuthProvider';

export default function AppBar() {
  const { toggleMenu } = useGlobal();
  const { user, signout } = useAuth();

  return (
    <MenuBar position="relative">
      <Content>
        <div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleMenu}>
            <Menu fontSize="large" />
          </IconButton>
        </div>
        <div>
          <Typography variant="h5" noWrap>
            {user?.name}
          </Typography>
          <div style={{ width: 11 + "px" }} />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={signout}>
            <ExitToApp fontSize="large" />
          </IconButton>
        </div>
      </Content>
    </MenuBar>
  );
}
