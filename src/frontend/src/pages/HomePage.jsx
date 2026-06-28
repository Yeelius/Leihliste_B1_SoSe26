import { useEffect, useState } from 'react'
import {
  Button,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
  CircularProgress,
} from '@mui/material'
import { getAlleExemplare } from '../api'

function HomePage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getAlleExemplare()
      // DRF liefert bei Pagination: { count, results: [...] }
      setItems(Array.isArray(data) ? data : data.results ?? [])
    } catch (err) {
      setError(err.message || 'Fehler beim Laden der Daten')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        LeihListe
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={loadData}>
          Neu laden
        </Button>

        <Button variant="outlined" onClick={() => console.log(items)}>
          Daten in Console
        </Button>
      </Stack>

      {loading && <CircularProgress size={24} />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          <Typography sx={{ mb: 1 }}>
            {items.length} Gegenstand/Gegenstände gefunden
          </Typography>

          <List>
            {items.map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText
                  primary={`${item.name} (InvNr: ${item.inventarnummer})`}
                  secondary={`${item.kategorie} • ${item.standort} • ${item.zustand_display}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  )
}

export default HomePage