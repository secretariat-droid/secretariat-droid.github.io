
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';
import AdminPage from './components/AdminPage';
import { Artisan } from './types';
import { ADMIN_PASSWORD } from './constants';
import { MOCK_ARTISANS } from './mockData';

interface ArtisanContextType {
  artisans: Artisan[];
  addArtisan: (artisan: Omit<Artisan, 'id'>) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const ArtisanContext = createContext<ArtisanContextType | undefined>(undefined);

export const useArtisanContext = () => {
  const context = useContext(ArtisanContext);
  if (!context) {
    throw new Error('useArtisanContext must be used within an ArtisanProvider');
  }
  return context;
};

const ArtisanProvider = ({ children }: { children: ReactNode }) => {
  const [artisans, setArtisans] = useState<Artisan[]>(MOCK_ARTISANS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addArtisan = useCallback((artisan: Omit<Artisan, 'id'>) => {
    const newArtisan = { ...artisan, id: new Date().toISOString() };
    setArtisans(prev => [newArtisan, ...prev]);
  }, []);

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const value = { artisans, addArtisan, isAuthenticated, login, logout };

  return (
    <ArtisanContext.Provider value={value}>
      {children}
    </ArtisanContext.Provider>
  );
};

const Layout = ({ children }: { children: ReactNode }) => (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">NEHHDC Artisan Registry</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
);

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useArtisanContext();
    return isAuthenticated ? <>{children}</> : <Navigate to="/admin" replace />;
};

const App = () => {
  return (
    <ArtisanProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register/:craftType" element={<RegistrationPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </HashRouter>
    </ArtisanProvider>
  );
};

export default App;
