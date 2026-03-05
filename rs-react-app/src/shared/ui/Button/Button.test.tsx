import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click Me</Button>);

    expect(
      screen.getByRole('button', { name: 'Click Me' })
    ).toBeInTheDocument();
  });

  it('renders contained variant by default', () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders outlined variant', () => {
    render(<Button variant="outlined">Outlined Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders admin variant', () => {
    render(<Button variant="admin">Admin Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders disabled button', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders with custom type attribute', () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
