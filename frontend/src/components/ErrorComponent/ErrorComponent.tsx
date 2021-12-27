import { Error } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { Container } from './styles';

interface ComponentProps {
    text?: string;
}

export function ErrorComponent({ text }: ComponentProps) {
    return (
        <Container>
            <Error fontSize="large" />
            <Typography variant="subtitle1">
                {text ? text : "Erro desconhecido"}
            </Typography>
        </Container>
    );
}
