import {
  Box,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'

function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: 220,
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <List>
        <ListItemButton>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Gegenstände" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Kategorien" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Anfragen" />
        </ListItemButton>
      </List>

      <List
        sx={{
          marginTop: 'auto',
        }}
      >
        <ListItemButton>
          <ListItemText primary="Abmelden" />
        </ListItemButton>
      </List>
    </Box>
  )
}

export default Sidebar