import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from './DatePicker';

describe('DatePicker', () => {
  it('displays current date value', () => {
    render(
      <DatePicker
        label="Release Date"
        name="release_date"
        value="2024-01-15"
        onChange={vi.fn()}
      />
    );

    const input = screen.getByDisplayValue('2024-01-15');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when date is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DatePicker
        label="Release Date"
        name="release_date"
        value=""
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(/release date/i);
    await user.type(input, '2024-03-15');

    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with error state', () => {
    render(
      <DatePicker
        label="Release Date"
        name="release_date"
        value=""
        onChange={vi.fn()}
        error
        helperText="Date is required"
      />
    );

    expect(screen.getByText('Date is required')).toBeInTheDocument();
  });

  it('renders disabled date picker', () => {
    render(
      <DatePicker
        label="Release Date"
        name="release_date"
        value=""
        onChange={vi.fn()}
        disabled
      />
    );

    const input = screen.getByLabelText(/release date/i);
    expect(input).toBeDisabled();
  });

  it('renders with placeholder', () => {
    render(
      <DatePicker
        label="Release Date"
        name="release_date"
        value=""
        onChange={vi.fn()}
        placeholder="Select date"
      />
    );

    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
  });

  it('calls onBlur when input loses focus', async () => {
    const user = userEvent.setup();
    const handleBlur = vi.fn();

    render(
      <DatePicker
        label="Release Date"
        name="release_date"
        value=""
        onChange={vi.fn()}
        onBlur={handleBlur}
      />
    );

    const input = screen.getByLabelText(/release date/i);
    await user.click(input);
    await user.tab();

    expect(handleBlur).toHaveBeenCalled();
  });
});
