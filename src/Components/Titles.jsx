import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Titles = ({ children, value, styles }) => {
    console.log("🚀 ~ Titles ~ value:", value)
    return (
        <>
            <Box 
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    ...styles                            
                }}
            >
                {children}
            </Box>
            <Typography
                    variant="body2"
                    sx={{
                        marginTop: 1,                                    
                    }}
                >
                    {value}
            </Typography>
        </>
    )
}
export default Titles;