import { Typography } from '@material-ui/core';
import { Error, SyncOutlined } from '@material-ui/icons';
import { Container, SyncWrapper } from './styles';

interface PageProps {
    callback(): any;
}

export function ErrorPage({ callback }: PageProps) {
    return (
        <Container>
            <Error fontSize="large" />
            <Typography variant="h5" noWrap>
                Parece que aconteceu um problema...
            </Typography>

            <SyncWrapper onClick={callback}>
                <SyncOutlined fontSize="large" />
            </SyncWrapper>
            <Typography variant="subtitle1">
                Recarregar
            </Typography>
        </Container>
    );
}
