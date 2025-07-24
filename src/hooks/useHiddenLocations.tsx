import { useState, useEffect } from 'react';
import { HiddenHook } from '../types';

const STORAGE_KEY = 'hiddenLocations';

export const useHiddenLocations = (): HiddenHook => {
    const [hidden, setHidden] = useState<Set<string>>(() => {
        if (typeof window === 'undefined') return new Set();
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? new Set(JSON.parse(stored)) : new Set();
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...hidden]));
    }, [hidden]);

    const hideLocation = (name: string) => {
        setHidden(prev => new Set(prev).add(name));
    };

    const restoreLocation = (name: string) => {
        setHidden(prev => {
            const newSet = new Set(prev);
            newSet.delete(name);
            return newSet;
        });
    };

    return { hidden, hideLocation, restoreLocation };
};
