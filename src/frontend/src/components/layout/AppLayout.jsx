import { Box } from "@mui/material"

function AppLayout({ children }) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "background.default",
            }}
        >
            {children}
        </Box>
    )
}

export default AppLayout