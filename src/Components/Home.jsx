import { Box } from "@mui/material";
import React from "react";
import ScrapeForm from "./ScrapeForm";
import CompanyList from "./CompanyList";

const Home = () => {
    return (
        <Box sx={{backgroundColor: '#ECECEC', width: '100%', height: '105vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 0 }}>
                <ScrapeForm />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <CompanyList />
            </Box>
        </Box>
    )
}

export default Home;