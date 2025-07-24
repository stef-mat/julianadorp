import { useMemo } from 'react';
import { locaties } from '../data/index';
import { Location } from '../types';

export const useFilteredLocations = (searchTerm: string, selectedCategories: string[]): Location[] => {
    return useMemo<Location[]>(() => {
        if (!selectedCategories || selectedCategories.length === 0) {
            return locaties.filter(location => 
                Object.values(location).some(val => 
                    String(val).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        return locaties.filter(location => {
            const matchesSearch = Object.values(location).some(val => 
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesCategory = selectedCategories.includes(location.categorie);

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategories]);
};