import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@material-ui/core';
import { Container } from './styles';

interface ComponentProps {
    text?: string;
}

export function LoadingComponent({ text }: ComponentProps) {
    return (
        <Container>
            <CircularProgress />
            <Typography variant="subtitle1">
                {text ? text : "Carregando"}
            </Typography>
        </Container>
    );
}
