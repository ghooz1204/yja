import { handleActions, createAction } from 'redux-actions';
import { call, put, takeLatest } from "redux-saga/effects";
import { getMovieList } from '../api/movie';

import {startLoading, finishLoading} from './loading';

const GET_MOVIE = 'movie/GET_MOVIE';
const GET_MOVIE_SUCCESS = 'movie/GET_MOVIE_SUCCESS';
const GET_MOVIE_FAILURE = 'movie/GET_MOVIE_FAILURE';

export const getMovie = createAction(GET_MOVIE);

export function *getMovieSaga() {
    yield put(startLoading());
    try {
        const MOVIE_LIST = yield call(getMovieList);
        yield put({
            type: GET_MOVIE_SUCCESS,
            payload: MOVIE_LIST
        })
    } catch (e) {
        yield put({
            type: GET_MOVIE_FAILURE,
            error: e
        })
    }
    yield put(finishLoading());
}

export function *movieSaga() {
    yield takeLatest(GET_MOVIE, getMovieSaga);
};

const initialState = {
    movieList: null,
    error: false
}

const movie = handleActions({
        [GET_MOVIE_SUCCESS]: (state, action) => ({
            ...state,
            movieList: action.payload,
        }),
        [GET_MOVIE_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload,
        })
    },
    initialState
);

export default movie;