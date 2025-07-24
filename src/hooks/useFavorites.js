import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { locaties } from '../data/index';

const STORAGE_KEY = 'favorites';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        if (typeof window === 'undefined') return new Set();
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? new Set(JSON.parse(stored)) : new Set();
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
    }, [favorites]);

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
        <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
    );
};
export const useFavorites = () => {
    return useContext(FavoritesContext);
};