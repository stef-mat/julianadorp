import { useState, useMemo } from 'react';
import { locaties } from '../data/index';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState(new Set());

    const toggleFavorite = (locationName) => {
        const newFavorites = new Set(favorites);
        newFavorites.has(locationName) ? newFavorites.delete(locationName) : newFavorites.add(locationName);
        setFavorites(newFavorites);
    };

    const favoriteLocations = useMemo(() => {
        return locaties.filter(location => favorites.has(location.naam));
    }, [favorites]);

    return { favorites, favoriteLocations, toggleFavorite };
};