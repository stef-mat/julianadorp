import React from 'react';
import { MapPin, Clock, Globe, Euro, Heart, X } from 'lucide-react';
import { getCategoryStyle, getGoogleMapsUrl } from '../data/utils';
import { useFavorites } from '../hooks/useFavorites';
import { useHiddenLocations } from '../hooks/useHiddenLocations';

const LocationModal = ({ location, onClose }) => {
    const { favorites, toggleFavorite } = useFavorites();
    const { hideLocation } = useHiddenLocations();
    const isFavorite = location ? favorites.has(location.naam) : false;
    // Render niets als er geen locatie is geselecteerd
    if (!location) return null;

    return (
        // De overlay die het hele scherm bedekt
        <div 
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in" 
            onClick={onClose}
        >
            {/* Het daadwerkelijke modal-venster */}
            <div 
                className="bg-amber-50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up" 
                onClick={e => e.stopPropagation()} // Voorkomt dat klikken in de modal de modal sluit
            >
                {/* Afbeelding bovenaan */}
                <div className="relative">
                    <img src={location.image} alt={location.naam} className="w-full h-60 object-cover rounded-t-2xl" />
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 p-2 bg-white/70 backdrop-blur-sm rounded-full text-slate-800 hover:bg-white transition-transform hover:scale-110"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Inhoud van de modal */}
                <div className="p-6 md:p-8">
                    {/* Header: Categorie en Naam */}
                    <div className="mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getCategoryStyle(location.categorie)}`}>
                            {location.categorie}
                        </span>
                        <h2 className="text-4xl font-bold text-amber-900 mt-2" style={{ fontFamily: "'Comic Sans MS', 'cursive', 'sans-serif'" }}>
                            {location.naam}
                        </h2>
                    </div>

                    {/* Beschrijving */}
                    <div className="mb-6 bg-white/80 p-4 rounded-xl border border-amber-200">
                        <p className="text-slate-700 leading-relaxed">{location.beschrijving}</p>
                    </div>

                    {/* Raster met Prijs en Openingstijden */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                            <h3 className="font-bold text-emerald-900 flex items-center gap-2 mb-2"><Euro className="w-5 h-5" /> Prijsindicatie</h3>
                            <p className="text-emerald-800 text-sm">{location.prijsindicatie}</p>
                        </div>
                        <div className="bg-sky-50 p-4 rounded-xl border border-sky-200">
                            <h3 className="font-bold text-sky-900 flex items-center gap-2 mb-2"><Clock className="w-5 h-5" /> Openingstijden</h3>
                            <p className="text-sky-800 text-sm">{location.openingstijden}</p>
                        </div>
                    </div>

                    {/* Adres informatie */}
                    <div className="mb-6">
                        <h3 className="font-bold text-amber-900 flex items-center gap-2 mb-2"><MapPin className="w-5 h-5" /> Adres</h3>
                        <p className="text-slate-700">{location.adres}</p>
                        {location.gps_coordinaten !== "Niet expliciet vermeld" && (
                            <p className="text-sm text-slate-500">{location.gps_coordinaten}</p>
                        )}
                    </div>
                    
                    {/* Knoppen voor acties */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-amber-200">
                        <button
                            onClick={() => toggleFavorite(location.naam)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${ isFavorite ? 'bg-rose-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-rose-50' }`}
                        >
                            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                            {isFavorite ? 'Opgeslagen!' : 'Opslaan'}
                        </button>
                        <button
                            onClick={() => { hideLocation(location.naam); onClose(); }}
                            className="px-4 py-2 rounded-full font-semibold bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            Verberg
                        </button>
                        <a 
                            href={getGoogleMapsUrl(location.gps_coordinaten, location.naam)} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-900 transition-colors font-semibold"
                        >
                            <MapPin className="w-5 h-5" />
                            Open in Kaart
                        </a>
                        {location.website && location.website !== "Niet gespecificeerd" && (
                            <a 
                                href={!location.website.startsWith('http') ? `https://${location.website}` : location.website}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 text-slate-700 rounded-full hover:bg-slate-50 transition-colors font-semibold"
                            >
                                <Globe className="w-5 h-5" />
                                Website
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;
