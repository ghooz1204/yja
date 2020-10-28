import { get } from 'axios';

export const getMovieList = async () => {
    const URL = 'https://yts.mx/api/v2/list_movies.json';
    const response = await get(URL);
    return response;
};
