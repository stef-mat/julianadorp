import React, { createContext, useContext, useState, useMemo } from 'react';
import { locaties } from '../data';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(new Set());

    const toggleFavorite = (locationName) => {
        setFavorites(prev => {
            const newSet = new Set(prev);
            newSet.has(locationName) ? newSet.delete(locationName) : newSet.add(locationName);
            return newSet;
        });
    };

    const favoriteLocations = useMemo(() => {
        return locaties.filter(location => favorites.has(location.naam));
    }, [favorites]);

    const value = { favorites, favoriteLocations, toggleFavorite };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    return useContext(FavoritesContext);
};
