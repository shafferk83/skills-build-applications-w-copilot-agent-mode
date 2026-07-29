import { useEffect, useMemo, useState } from 'react'

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'
}

function normalizeApiPayload(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.data)) return payload.data
  if (payload.data && Array.isArray(payload.data.results)) return payload.data.results
  return []
}

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => `${getApiBaseUrl()}/users/`, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)

        const payload = await response.json()
        setUsers(normalizeApiPayload(payload))
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Failed to load users')
        }
      } finally {
        setLoading(false)
      }
    }

    loadUsers()

    return () => controller.abort()
  }, [endpoint])

  return (
    <section className="page-shell">
      <h2>Users</h2>
      <p className="subtle">Endpoint: {endpoint}</p>

      {loading && <p>Loading users...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <ul className="entity-list">
          {users.map((user) => (
            <li key={user._id || user.id} className="entity-card">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              <span>Level: {user.fitnessLevel}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Users
