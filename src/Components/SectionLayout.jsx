import { Box, Divider, Typography } from "@mui/material";
import { getCompanyTitle } from "../utils/common";
import styles from "../style/companyDetail.module.scss";
import { ReactComponent as InfoIcon } from '../icons/information-circle.svg';
import { ReactComponent as PhoneIcon } from '../icons/phone-call.svg';
import { ReactComponent as EmailIcon } from '../icons/mail-search.svg';
import { ReactComponent as WebsiteIcon } from '../icons/globe.svg';
import { ReactComponent as FacebookIcon } from '../icons/facebook.svg';
import { ReactComponent as InstagramIcon } from '../icons/instagram.svg';
import { ReactComponent as TwitterIcon } from '../icons/twitter.svg';
import { ReactComponent as LinkedInIcon } from '../icons/linkedin.svg';
import { ReactComponent as LocationIcon } from '../icons/location-marker.svg';
import { ReactComponent as CameraIcon } from '../icons/camera.svg';
import Titles from "./Titles";
import { useEffect, useState } from "react";
import axios from "axios";

const SectionLayout = ({ data }) => {
    const [screenshot, setScreenshot] = useState();

    
    useEffect(() => {
        const fetchCompany = async () => {
            const screenshotRes = await axios.post("http://localhost:3001/api/screenshot", 
            { url: data.url },
            { responseType: "blob" });
            
            const screenshotURL = URL.createObjectURL(screenshotRes.data);
            setScreenshot(screenshotURL);
          };
          if (data?.url) {
            fetchCompany();
          }
    }, [data])
    
    return (
        <div>
            {data ? <Box sx={{ display: "flex", flexDirection: "column", m: 1, gap:1 }}>
                {/* First Section: Full-Width Row */}
                <Box
                    sx={{
                        width: "100%",
                        height: "33%",
                        backgroundColor: "white",
                        display: "flex",
                        flexDirection: "row",
                        borderRadius: '5px',
                        padding: 3
                    }}
                >
                    
                    <img src={data.logo} alt={data.name} className={styles.logo} />
                    <Box sx={{ marginLeft: 2, display: "flex", flexDirection: "row", alignItems: "flex-start", flex: 1, paddingRight: 3}}>
                    
                    <Box sx={{ flex: 2 }}>
                        <Typography variant="h6">{getCompanyTitle(data.name)}</Typography>
                        <Box 
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,                               
                            }}
                        >
                            <InfoIcon sx={{ fontSize: 20 }} />                            
                            <Typography variant="body2" className={styles.title}>Description</Typography>                                                     
                            
                        </Box>
                        <Typography
                                variant="body2"
                                sx={{
                                    marginTop: 1,                                    
                                }}
                            >
                                {data.description}
                        </Typography>
                        </Box>
                    </Box>  
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: "#ECECEC" }} />
                    <Box
                        sx={{
                            flex: 3,
                            // textAlign: "center",
                            color: "text.secondary", 
                            paddingLeft: 3
                        }}
                    >
                    <Titles value={data.phone}>   
                        <PhoneIcon />                            
                        <Typography variant="body2" className={styles.title}>Phone</Typography>                                                     
                    </Titles>
                    <Titles value={data.email} styles={{marginTop: 3}}>   
                        <EmailIcon />
                        <Typography variant="body2" className={styles.title}>Email</Typography>                                                     
                    </Titles>
                    </Box>                 
                </Box>

                {/* Second Section: Two Columns (Full Width) */}
                <Box
                    sx={{
                        display: "flex",
                        flexGrow: 1, // Allow columns to fill remaining height
                        width: "100%",
                        gap: 1,
                    }}
                >
                    {/* Left Column */}
                    <Box
                        sx={{
                            flex: 1, 
                            backgroundColor: "white",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            borderRadius: '5px',
                            padding: 2
                        }}
                    >
                        <Typography variant="h6">Company Detail</Typography>
                        <Titles value={data.url} styles={{marginTop: 3}}>   
                            <WebsiteIcon />
                            <Typography variant="body2" className={styles.title}>Website</Typography>                                                     
                        </Titles>
                        <Titles value={data.description} styles={{marginTop: 3}}>   
                            <InfoIcon />
                            <Typography variant="body2" className={styles.title}>Description</Typography>                                                     
                        </Titles>
                        <Titles value={data.email} styles={{marginTop: 3}}>   
                            <EmailIcon />
                            <Typography variant="body2" className={styles.title}>Email</Typography>                                                     
                        </Titles>
                        <Titles value={data.facebook} styles={{marginTop: 3}}>   
                            <FacebookIcon />
                            <Typography variant="body2" className={styles.title}>Facebook</Typography>                                                     
                        </Titles>
                        <Titles value={data.instagram} styles={{marginTop: 3}}>   
                            <InstagramIcon />
                            <Typography variant="body2" className={styles.title}>Instagram</Typography>                                                     
                        </Titles>
                        <Titles value={data.twitter} styles={{marginTop: 3}}>   
                            <TwitterIcon />
                            <Typography variant="body2" className={styles.title}>Twitter</Typography>                                                     
                        </Titles>
                        <Titles value={data.linkedin} styles={{marginTop: 3}}>   
                            <LinkedInIcon />
                            <Typography variant="body2" className={styles.title}>LinkedIn</Typography>                                                     
                        </Titles>
                        <Titles value={data.address} styles={{marginTop: 3}}>   
                            <LocationIcon />
                            <Typography variant="body2" className={styles.title}>Address</Typography>                                                     
                        </Titles>
                    </Box>

                    {/* Right Column */}
                    <Box
                        sx={{
                            flex: 3,
                            backgroundColor: "white",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            borderRadius: '5px',
                            padding: 2
                        }}
                    >
                        <Titles value={''}>   
                            <CameraIcon />
                            <Typography variant="h6">Screenshot of Webpage</Typography>                            
                        </Titles>
                        <img src={screenshot} alt="screenshot" />
                    </Box>
                </Box>
            </Box> : null}
        </div>
    )
}
export default SectionLayout;