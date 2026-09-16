import { createContext, useEffect, useState } from "react"
import { getCurrentUser } from '../api/auth.api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let res = await getCurrentUser()
        setUser(res.data.user)
      } catch (error) {
        console.log(error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, getToken, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}