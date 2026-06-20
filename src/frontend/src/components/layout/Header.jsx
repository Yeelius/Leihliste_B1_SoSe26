import {
  AppBar,
  Avatar,
  Box,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'

function Header() {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            width: 180,
            flexShrink: 0,
          }}
        >
          LeihListe
        </Typography>

        <TextField
          size="small"
          placeholder="Suche"
          sx={{
            width: 320,
            backgroundColor: 'background.paper',
            borderRadius: 1,
          }}
        />

        <Box
          sx={{
            flexGrow: 1,
          }}
        />

        <Avatar
          sx={{
            width: 36,
            height: 36,
          }}
        >
          T
        </Avatar>
      </Toolbar>
    </AppBar>
  )
}

export default Header