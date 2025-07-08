import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function useSession() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session')
        if (!res.ok) throw new Error('Session invalid')
        const { user } = await res.json()
        setUser(user)
      } catch (error) {
        router.replace('/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSession()
  }, [router])

  return { user, isLoading }
}