import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchMovie from './SearchMovie';

const mockSetSearchParams = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('react-router-dom', () => ({
  useSearchParams: () => [mockSearchParams, mockSetSearchParams],
}));

describe('SearchMovie', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams.delete('search');
    mockSearchParams.delete('genre');
  });

  it('filters movies by title/description on SEARCH button click', async () => {
    const user = userEvent.setup();

    render(<SearchMovie />);

    const input = screen.getByPlaceholderText('What do you want to watch?');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Inception');
    await user.click(searchButton);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const calledParams = mockSetSearchParams.mock
      .calls[0][0] as URLSearchParams;
    expect(calledParams.get('search')).toBe('Inception');
  });

  it('triggers search on Enter key press in the search input', async () => {
    const user = userEvent.setup();

    render(<SearchMovie />);

    const input = screen.getByPlaceholderText('What do you want to watch?');

    await user.type(input, 'Matrix');
    await user.keyboard('{Enter}');

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const calledParams = mockSetSearchParams.mock
      .calls[0][0] as URLSearchParams;
    expect(calledParams.get('search')).toBe('Matrix');
  });

  it('search works together with genre filter', async () => {
    const user = userEvent.setup();

    mockSearchParams.set('genre', 'Action');

    render(<SearchMovie />);

    const input = screen.getByPlaceholderText('What do you want to watch?');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Avengers');
    await user.click(searchButton);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const calledParams = mockSetSearchParams.mock
      .calls[0][0] as URLSearchParams;

    expect(calledParams.get('search')).toBe('Avengers');
    expect(calledParams.get('genre')).toBe('Action');
  });

  it('removes search param when search input is empty and SEARCH clicked', async () => {
    const user = userEvent.setup();

    mockSearchParams.set('search', 'OldSearch');

    render(<SearchMovie />);

    const input = screen.getByPlaceholderText('What do you want to watch?');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.click(searchButton);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const calledParams = mockSetSearchParams.mock
      .calls[0][0] as URLSearchParams;

    expect(calledParams.has('search')).toBe(false);
  });

  it('setting input with existing search param from URL', () => {
    mockSearchParams.set('search', 'ExistingSearch');

    render(<SearchMovie />);

    const input = screen.getByPlaceholderText('What do you want to watch?');
    expect(input).toHaveValue('ExistingSearch');
  });

  it('updates search input value as user types', async () => {
    const user = userEvent.setup();

    render(<SearchMovie />);

    const input = screen.getByPlaceholderText('What do you want to watch?');

    await user.type(input, 'Test Movie');

    expect(input).toHaveValue('Test Movie');
  });
});
