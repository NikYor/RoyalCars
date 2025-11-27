import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { AuthContext } from '../../context/AuthContext';

vi.mock('../NotificationWrapper', () => ({
  default: () => <div data-testid="notification">Notification</div>,
}));

describe('Navbar', () => {
  const renderWithAuth = ({ isAuthenticated = false, isAdmin = false, logout = vi.fn() }, initialPath = '/') => {
    return render(
      <AuthContext.Provider value={{ isAuthenticated, isAdmin, logout }}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it('renders logo and basic links', () => {
    renderWithAuth({});
    expect(screen.getByText(/Royal Cars/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
  });

  it('shows admin dropdown when isAdmin = true', () => {
    renderWithAuth({ isAdmin: true });
    expect(screen.getByRole('link', { name: /^Cars$/i })).toBeInTheDocument();
  });

  it('shows only Catalog when isAdmin = false', () => {
    renderWithAuth({ isAdmin: false });
    expect(screen.getByRole('link', { name: /Catalog/i })).toBeInTheDocument();
    expect(screen.queryByText(/Bookings/i)).not.toBeInTheDocument();
  });

  it('shows login/register when not authenticated', () => {
    renderWithAuth({ isAuthenticated: false });
    expect(screen.getByRole('link', { name: /LOGIN/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
  });

  it('shows profile and logout when authenticated', () => {
    const logout = vi.fn();
    renderWithAuth({ isAuthenticated: true, logout }, '/');
    expect(screen.getByRole('link', { name: /Profile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /LOGOUT/i })).toBeInTheDocument();
  });

  it('renders NotificationWrapper when not on /profile', () => {
    renderWithAuth({ isAuthenticated: true }, '/catalog');
    expect(screen.getByTestId('notification')).toBeInTheDocument();
  });

  it('does not render NotificationWrapper when on /profile', () => {
    renderWithAuth({ isAuthenticated: true }, '/profile');
    expect(screen.queryByTestId('notification')).not.toBeInTheDocument();
  });
});
