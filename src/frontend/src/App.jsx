import {
  Button,
  Stack,
  Typography,
} from '@mui/material'

import AppLayout from './components/layout/AppLayout.jsx'

function App() {
  return (
    <AppLayout>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
      >
        LeihListe
      </Typography>

      <Stack
        direction="row"
        spacing={2}
      >
        <Button variant="contained">
          Primärer Button
        </Button>

        <Button variant="outlined">
          Sekundärer Button
        </Button>
      </Stack>
    </AppLayout>
  )
}

export default App