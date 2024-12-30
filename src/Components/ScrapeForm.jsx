import React, { useState } from "react";
import { Box, Button, FormControl, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import styles from  "../style/scrapeForm.module.scss";
import SearchIcon from '@mui/icons-material/Search';
import { saveScrape } from "../utils/apis";
import { Link } from "react-router-dom";
import { getCompanyTitle } from "../utils/common";

const ScrapeForm = ({ id, name }) => {
    const [url, setUrl] = useState("");

    const handleSubmit = () => {
        saveScrape(url);
        setUrl('');
    }
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" to="/" className={styles.link}>
            Home
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href={`/${id}`}
            className={styles.link}
        >
            {name ? getCompanyTitle(name) : ''}
        </Link>
    ];

    return (
        <Box sx={{width: '100%', backgroundColor: 'white', height: id ? '123px' :'82px'}}>
            <Box
            component="form"
            sx={{ width: '100%', 
                display: 'flex', 
                justifyContent: 'flex-start', 
                alignItems: 'center',                 
                backgroundColor: "white",
                flexWrap: "wrap",
                gap: 2
            }}
            noValidate
            autoComplete="off"
            >
                <FormControl variant="outlined" 
                    sx={{m: 1,
                        flex: "1 1 auto", 
                        minWidth: "200px", 
                        maxWidth: {
                            xs: "100%",
                            sm: "60%",
                            md: "26%",
                        }
                    }}>
                    <OutlinedInput
                        size="small"
                        className={styles.urlinputbox}
                        placeholder="Enter domain name"
                        startAdornment={<InputAdornment position="start"><SearchIcon /> </InputAdornment>}
                        onChange={(e) => setUrl(e.target.value)}
                        value={url}
                    />

                </FormControl>
                <Button variant="contained" 
                    sx={{m: 1,
                        flex: "0 0 auto",
                        width: {
                            xs: "100%",
                            sm: "auto",
                        },
                        textAlign: "center",
                    }} 
                    className={styles.scrapebtn} 
                    onClick={handleSubmit}>
                        Fetch & Save Details
                </Button>                
            </Box>
            {id && <Stack spacing={1} style={{margin: '20px'}}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            </Stack>}
        </Box>
    )
}

export default ScrapeForm;