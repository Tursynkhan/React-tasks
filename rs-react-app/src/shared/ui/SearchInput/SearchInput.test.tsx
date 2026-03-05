import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  it('renders search input with placeholder', () => {
    render(
      <SearchInput value="" onChange={vi.fn()} placeholder="Search movies" />
    );

    expect(screen.getByPlaceholderText('Search movies')).toBeInTheDocument();
  });

  it('renders with default placeholder', () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('displays current value', () => {
    render(<SearchInput value="Test query" onChange={vi.fn()} />);

    const input = screen.getByDisplayValue('Test query');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<SearchInput value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Search');

    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onKeyDown when Enter key pressed', async () => {
    const user = userEvent.setup();
    const handleKeyDown = vi.fn();

    render(
      <SearchInput value="" onChange={vi.fn()} onKeyDown={handleKeyDown} />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, '{Enter}');

    expect(handleKeyDown).toHaveBeenCalled();
  });

  it('renders with small size by default', () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(<SearchInput value="" onChange={vi.fn()} size="medium" />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
