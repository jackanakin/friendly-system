import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Menu } from '@material-ui/icons';

import { MenuBar, Content } from './styles';
import { useGlobal } from '../../../providers/global/GlobalProvider';

export default function AppBar() {
  const { toggleMenu } = useGlobal();

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
          <Typography variant="h5" noWrap>
          </Typography>
        </div>
        {/* iptvresume && (
          <div>
            <MdCheckCircle color="#76FF03" size={20} />
            <p>{iptvresume.available}</p>

            <Separator />
            <MdReport color="#DD2C00" size={20} />
            <p>{iptvresume.unnavailable}</p>

            <Separator />
            <MdAirplay color="#333" size={20} />
            <p>{iptvresume.audience}</p>

            <Separator />
            <MdDateRange color="#333" size={20} />
            <p>{iptvresume.lastUpdate}</p>
          </div>
        )*/}
      </Content>
    </MenuBar>
  );
}
