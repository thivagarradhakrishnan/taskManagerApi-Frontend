import { createContext, useContext, useEffect, useState } from 'react'
import api from '../lib/api'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token and validate it
    const token = localStorage.getItem('token')
    if (token) {
      // Validate token with backend
      api.get('/auth/me')
        .then(({ user }) => {
          setUser(user)
        })
        .catch(() => {
          localStorage.removeItem('token')
          setUser(null)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const signUp = async (email, password, role = 'user') => {
  try {
    const data = await api.post('/auth/register', { email, password, role });

    if (data.token) {
      localStorage.setItem('token', data.token);
      const user = await api.get('/auth/me');
      setUser(user);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};


  const signIn = async (email, password) => {
  try {
    const data = await api.post('/auth/login', { email, password });

    if (data.token) {
      localStorage.setItem('token', data.token);

      // Fetch user info after setting token

      const userData = data.user || data
        console.log('Login response user data:', userData)
        setUser(userData)
      const user = await api.get('/auth/me');
      setUser(user);


    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};


  const signOut = async () => {
    try {
      localStorage.removeItem('token')
      setUser(null)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const getUserRole = () => {
    return user?.role || 'user'
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    getUserRole
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}