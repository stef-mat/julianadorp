import { useState, useMemo } from 'react';
import { locaties } from '../data/index';
import { FavoritesHook, Location } from '../types';

export const useFavorites = (): FavoritesHook => {
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    const toggleFavorite = (locationName: string) => {
        const newFavorites = new Set(favorites);
        newFavorites.has(locationName) ? newFavorites.delete(locationName) : newFavorites.add(locationName);
        setFavorites(newFavorites);
    };

    const favoriteLocations = useMemo<Location[]>(() => {
        return locaties.filter(location => favorites.has(location.naam));
    }, [favorites]);

    return { favorites, favoriteLocations, toggleFavorite };
};