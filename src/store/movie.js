import { handleActions, createAction } from 'redux-actions';
import { call, put, takeLatest } from "redux-saga/effects";
import { getMovieList } from '../api/movie';

const GET_MOVIE = 'movie/GET_MOVIE';
const GET_MOVIE_SUCCESS = 'movie/GET_MOVIE_SUCCESS';
const GET_MOVIE_FAILURE = 'movie/GET_MOVIE_FAILURE';

export const getMovie = createAction(GET_MOVIE);

export function *getMovieSaga(action) {
    try {
        const response = yield call(getMovieList);
        console.log(response);
    } catch (e) {
        yield put({
            type: GET_MOVIE_FAILURE,
            error: e
        })
    }
}

export function *movieSaga() {
    yield takeLatest(GET_MOVIE, getMovieSaga);
};

const initialState = {
    movieList: null,
    error: false
}

const movie = handleActions(
    {
        [GET_MOVIE]: (state, action) => ({
            ...state,
            loading: true
        }),
        [GET_MOVIE_SUCCESS]: (state, action) => ({
            ...state,
            ...action.payload,
            loading: false
        }),
        [GET_MOVIE_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
            loading: false
        })
    },
    initialState
);

export default movie;