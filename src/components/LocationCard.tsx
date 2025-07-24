import React from 'react';
import { Euro, Heart } from 'lucide-react';
import { getCategoryStyle } from '../data/utils';
import { LocationCardProps } from '../types';

const LocationCard = ({ location, isFavorite, onToggleFavorite, onShowDetails }: LocationCardProps) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col">
        <div className="relative">
            <div onClick={() => onShowDetails(location)} className="cursor-pointer">
                <img src={location.image} alt={location.naam} className="w-full h-48 object-cover rounded-t-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                 <h3 className="absolute bottom-3 left-4 text-xl font-bold text-white drop-shadow-md">{location.naam}</h3>
            </div>
            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold border ${getCategoryStyle(location.categorie)}`}>
                {location.categorie}
            </div>
            <button onClick={() => onToggleFavorite(location.naam)} className="absolute top-3 right-3 p-2 bg-white/70 backdrop-blur-sm rounded-full text-rose-500 hover:bg-white transition-colors">
                <Heart className={`w-6 h-6 transition-all ${isFavorite ? 'fill-current' : 'stroke-current'}`} />
            </button>
        </div>
        <div className="p-5 flex flex-col flex-grow">
            <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow">{location.beschrijving}</p>
            <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-auto">
                <div className="flex items-center gap-2 text-sm text-emerald-700 font-semibold">
                    <Euro className="w-5 h-5" />
                    <span>{location.prijsindicatie.split(',')[0]}</span>
                </div>
                <button onClick={() => onShowDetails(location)} className="text-amber-800 font-semibold hover:text-rose-600 transition-colors text-sm">
                    Meer info →
                </button>
            </div>
        </div>
    </div>
);

export default LocationCard;