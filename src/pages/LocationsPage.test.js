import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocationsPage from './LocationsPage';
import { locaties } from '../data';

beforeEach(() => {
    window.localStorage.clear();
});

test('hidden locations are removed and can be restored', async () => {
    render(<LocationsPage setPageState={() => {}} initialFilters={[]} />);
    const name = locaties[0].naam;

    // Card should be visible initially
    expect(screen.getByText(name)).toBeInTheDocument();

    // open modal of first card
    userEvent.click(screen.getAllByText('Meer info →')[0]);
    const hideBtn = await screen.findByText('Verberg');
    userEvent.click(hideBtn);

    expect(screen.queryByText(name)).not.toBeInTheDocument();

    userEvent.click(screen.getByText('Verborgen herstellen'));
    expect(await screen.findByText(name)).toBeInTheDocument();
});
