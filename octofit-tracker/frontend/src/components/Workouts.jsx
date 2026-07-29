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

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => `${getApiBaseUrl()}/workouts/`, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadWorkouts() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)

        const payload = await response.json()
        setWorkouts(normalizeApiPayload(payload))
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Failed to load workouts')
        }
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()

    return () => controller.abort()
  }, [endpoint])

  return (
    <section className="page-shell">
      <h2>Workouts</h2>
      <p className="subtle">Endpoint: {endpoint}</p>

      {loading && <p>Loading workouts...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <ul className="entity-list">
          {workouts.map((workout) => (
            <li key={workout._id || workout.id} className="entity-card">
              <strong>{workout.title}</strong>
              <span>Focus: {workout.focus}</span>
              <span>Duration: {workout.durationMinutes} min</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Workouts
