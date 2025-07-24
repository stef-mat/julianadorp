import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LocationsPage from './pages/LocationsPage';

const LocationsWrapper = () => {
    const location = useLocation();
    const filters = location.state?.filters || [];
    return <LocationsPage initialFilters={filters} />;
};

const App = () => {

    const GlobalStyles = () => (
        <style jsx global>{`
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slide-up { from { transform: translateY(20px); opacity: 0.8; } to { transform: translateY(0); opacity: 1; } }
          .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
          .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
        `}</style>
    );

    return (
        <BrowserRouter>
            <main style={{ fontFamily: "'Nunito', sans-serif" }}>
                <GlobalStyles />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/locations" element={<LocationsWrapper />} />
                    <Route path="*" element={<LandingPage />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
