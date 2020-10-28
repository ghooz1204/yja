import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie } from './store/movie';

const App = () => {
    // const {movieList} = useSelector(state => state.movie);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getMovie());
    }, []);

    return <div className="App"></div>;
};

export default App;
