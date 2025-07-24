import React from 'react';
import { Search, Heart } from 'lucide-react';
import { SearchAndFilterProps } from '../types';

const SearchAndFilter = ({
    searchTerm,
    onSearchChange,
    categories,
    selectedCategory,
    onCategoryChange,
    onShowFavorites,
    onRestoreHidden,
    hasHidden,
    activeView,
    favoritesCount
}: SearchAndFilterProps) => (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-200 sticky top-4 z-20">
        <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
                type="text"
                placeholder="Zoek een avontuur..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-full focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2">
            {categories.map(category => (
                <button 
                    key={category} 
                    onClick={() => onCategoryChange(category)} 
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                        activeView === 'all' && selectedCategory === category 
                        ? 'bg-amber-800 text-white border-amber-800 shadow-md' 
                        : 'bg-white text-slate-700 hover:bg-amber-50 hover:border-amber-300 border-slate-200'
                    }`}
                >
                    {category}
                </button>
            ))}
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <button
                onClick={onShowFavorites}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                    activeView === 'favorites'
                    ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                    : 'bg-white text-rose-500 hover:bg-rose-50 hover:border-rose-300 border-rose-200'
                }`}
            >
                <Heart className="w-4 h-4" />
                <span>Mijn Favorieten</span>
                <span className="bg-rose-100 text-rose-600 text-xs font-bold rounded-full px-2 py-0.5">{favoritesCount}</span>
            </button>
            {hasHidden && (
                <button
                    onClick={onRestoreHidden}
                    className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50 transition-colors"
                >
                    Verborgen herstellen
                </button>
            )}
        </div>
    </div>
);

export default SearchAndFilter;