import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from './styles';

export function LoadingPage() {
    return (
        <>
            <LinearProgress />
            <Container>
                <CircularProgress />
            </Container>
        </>
    );
}
