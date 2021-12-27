export const axiosErrorHandler = function (error: any): string {
    if (error.response) {
        // Request made and server responded
        const message = error?.response?.data?.error;
        return message ? message : "Erro inesperado";
    } else if (error.request) {
        // The request was made but no response was received
        return "Falha de conexão";
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    return "Erro inesperado";
}