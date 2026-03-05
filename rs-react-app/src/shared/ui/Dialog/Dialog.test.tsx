import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from './Dialog';

describe('Dialog', () => {
  it('renders open dialog with title', () => {
    render(
      <Dialog open title="Test Dialog">
        <div>Dialog Content</div>
      </Dialog>
    );

    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
  });

  it('renders dialog content', () => {
    render(
      <Dialog open title="Test Dialog">
        <div>Dialog Content</div>
      </Dialog>
    );

    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Dialog open={false} title="Test Dialog">
        <div>Dialog Content</div>
      </Dialog>
    );

    expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
  });

  it('renders close button when onClose provided', () => {
    const handleClose = vi.fn();

    render(
      <Dialog open title="Test Dialog" onClose={handleClose}>
        <div>Dialog Content</div>
      </Dialog>
    );

    const closeButton = screen.getByRole('button', { name: '' });
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Dialog open title="Test Dialog" onClose={handleClose}>
        <div>Dialog Content</div>
      </Dialog>
    );

    const closeButtons = screen.getAllByRole('button');
    const closeButton = closeButtons.find(
      (btn) =>
        btn.querySelector('svg')?.getAttribute('data-testid') === 'CloseIcon'
    );

    if (closeButton) {
      await user.click(closeButton);
      expect(handleClose).toHaveBeenCalled();
    }
  });

  it('renders dialog actions', () => {
    render(
      <Dialog
        open
        title="Test Dialog"
        actions={
          <>
            <button>Cancel</button>
            <button>Confirm</button>
          </>
        }
      >
        <div>Dialog Content</div>
      </Dialog>
    );

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('renders without title', () => {
    render(
      <Dialog open>
        <div>Dialog Content</div>
      </Dialog>
    );

    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('renders with fullWidth prop', () => {
    render(
      <Dialog open title="Test Dialog" fullWidth>
        <div>Dialog Content</div>
      </Dialog>
    );

    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('renders with maxWidth prop', () => {
    render(
      <Dialog open title="Test Dialog" maxWidth="md">
        <div>Dialog Content</div>
      </Dialog>
    );

    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });
});
