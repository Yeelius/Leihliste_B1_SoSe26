import { Box, Container } from '@mui/material'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

function AppLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Header />

      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Sidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            padding: 3,
          }}
        >
          <Container
            maxWidth="xl"
            disableGutters
          >
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default AppLayout