import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [watchLater, setWatchLater] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        const storedWatchLater = localStorage.getItem("watchLater");

        if (storedFavs) setFavorites(JSON.parse(storedFavs));
        if (storedWatchLater) setWatchLater(JSON.parse(storedWatchLater));
    }, []);

    // Sync favorites to localStorage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Sync watchLater to localStorage
    useEffect(() => {
        localStorage.setItem('watchLater', JSON.stringify(watchLater));
    }, [watchLater]);

    // Favorites Methods
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    };

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    // Watch Later Methods
    const addToWatchLater = (movie) => {
        setWatchLater(prev => [...prev, movie]);
    };

    const removeFromWatchLater = (movieId) => {
        setWatchLater(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isWatchLater = (movieId) => {
    return watchLater.some(movie => Number(movie.id) === Number(movieId));
};


    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        watchLater,
        addToWatchLater,
        removeFromWatchLater,
        isWatchLater
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
