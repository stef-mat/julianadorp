export interface Location {
  categorie: string;
  naam: string;
  adres: string;
  gps_coordinaten: string;
  beschrijving: string;
  prijsindicatie: string;
  openingstijden: string;
  website: string;
  image?: string;
}

export interface FavoritesHook {
  favorites: Set<string>;
  favoriteLocations: Location[];
  toggleFavorite: (name: string) => void;
}

export interface HiddenHook {
  hidden: Set<string>;
  hideLocation: (name: string) => void;
  restoreLocation: (name: string) => void;
}

export type FilteredLocationsHook = (searchTerm: string, selectedCategories: string[]) => Location[];

export interface PageState {
  page: 'landing' | 'locations';
  filters: string[];
}

export interface LandingPageProps {
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
}

export interface LocationsPageProps {
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
  initialFilters: string[];
}

export interface PageHeaderProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onShowFavorites: () => void;
  onRestoreHidden: () => void;
  hasHidden: boolean;
  activeView: string;
  favoritesCount: number;
}

export interface LocationCardProps {
  location: Location;
  isFavorite: boolean;
  onToggleFavorite: (name: string) => void;
  onShowDetails: (location: Location) => void;
}

export interface LocationModalProps {
  location: Location | null;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (name: string) => void;
  onHideLocation: (name: string) => void;
}
