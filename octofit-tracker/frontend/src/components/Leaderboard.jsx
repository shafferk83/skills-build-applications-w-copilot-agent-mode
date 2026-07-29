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

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => `${getApiBaseUrl()}/leaderboard/`, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadLeaderboard() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)

        const payload = await response.json()
        setLeaderboard(normalizeApiPayload(payload))
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Failed to load leaderboard')
        }
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()

    return () => controller.abort()
  }, [endpoint])

  return (
    <section className="page-shell">
      <h2>Leaderboard</h2>
      <p className="subtle">Endpoint: {endpoint}</p>

      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <ul className="entity-list">
          {leaderboard.map((entry) => (
            <li key={entry._id || entry.id} className="entity-card">
              <strong>{entry.team?.name || 'Team'}</strong>
              <span>Week: {new Date(entry.weekStartDate).toLocaleDateString()}</span>
              <span>Top users: {entry.topUsers?.length || 0}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Leaderboard
