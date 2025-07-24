import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocationsPage from '../LocationsPage';
import { FavoritesProvider } from '../../hooks/useFavorites';
import { locaties } from '../../data';

const renderWithProvider = (ui) => {
    return render(<FavoritesProvider>{ui}</FavoritesProvider>);
};

beforeEach(() => {
    window.localStorage.clear();
});

test('toggling a favorite stores it in localStorage', async () => {
    renderWithProvider(<LocationsPage setPageState={() => {}} initialFilters={[]} />);
    const name = locaties[0].naam;

    userEvent.click(screen.getAllByText('Meer info →')[0]);
    const saveBtn = await screen.findByText('Opslaan');
    userEvent.click(saveBtn);

    const stored = JSON.parse(window.localStorage.getItem('favorites'));
    expect(stored).toContain(name);
});

test('toggling a favorite twice removes it from localStorage', async () => {
    renderWithProvider(<LocationsPage setPageState={() => {}} initialFilters={[]} />);
    const name = locaties[0].naam;

    userEvent.click(screen.getAllByText('Meer info →')[0]);
    const saveBtn = await screen.findByText('Opslaan');
    userEvent.click(saveBtn);
    const savedBtn = await screen.findByText('Opgeslagen!');
    userEvent.click(savedBtn);

    const stored = JSON.parse(window.localStorage.getItem('favorites'));
    expect(stored).not.toContain(name);
});
