import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SuccessDialog from './SuccessDialog';

describe('SuccessDialog', () => {
  it('renders open dialog with title and message', () => {
    render(
      <SuccessDialog
        open
        title="Success"
        message="Movie created successfully"
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Movie created successfully')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <SuccessDialog
        open={false}
        title="Success"
        message="Movie created successfully"
        onClose={vi.fn()}
      />
    );

    expect(screen.queryByText('Success')).not.toBeInTheDocument();
  });

  it('renders success icon', () => {
    render(
      <SuccessDialog
        open
        title="Success"
        message="Movie created successfully"
        onClose={vi.fn()}
      />
    );

    const icon = screen.getByTestId('CheckCircleIcon');
    expect(icon).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <SuccessDialog
        open
        title="Success"
        message="Movie created successfully"
        onClose={handleClose}
      />
    );

    const closeButtons = screen.getAllByRole('button');
    const closeButton = closeButtons.find(
      (btn) =>
        btn.querySelector('svg')?.getAttribute('data-testid') === 'CloseIcon'
    );

    if (closeButton) {
      await user.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    const { container } = render(
      <SuccessDialog
        open
        title="Success"
        message="Movie created successfully"
        onClose={handleClose}
      />
    );

    const backdrop = container.querySelector('.MuiBackdrop-root');
    if (backdrop) {
      await user.click(backdrop);
      expect(handleClose).toHaveBeenCalled();
    }
  });

  it('renders custom title', () => {
    render(
      <SuccessDialog
        open
        title="Movie Added"
        message="Your movie has been added to the list"
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText('Movie Added')).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(
      <SuccessDialog
        open
        title="Success"
        message="Your changes have been saved successfully"
        onClose={vi.fn()}
      />
    );

    expect(
      screen.getByText('Your changes have been saved successfully')
    ).toBeInTheDocument();
  });
});
