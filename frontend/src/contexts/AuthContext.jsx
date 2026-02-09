import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si el usuario está logueado al montar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.getCurrentUser();
        setUser(response.data.user);
      } catch (error) {
        console.error('No autenticado:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (userData) => {
    try {
      const response = await api.register(userData);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.error || 'Error en el registro';
      return { success: false, error: message };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      setUser(response.data.user);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.error || 'Error al iniciar sesión';
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Limpiar usuario incluso si la llamada a la API falla
      setUser(null);
      return { success: false };
    }
  };

  const refreshUser = async () => {
    try {
      const response = await api.getCurrentUser();
      setUser(response.data.user);
    } catch (error) {
      console.error('Error al refrescar usuario:', error);
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
