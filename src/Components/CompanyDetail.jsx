import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ScrapeForm from "./ScrapeForm";
import { useParams } from "react-router-dom";
import { getCompanyDetail } from "../utils/apis";
import SectionLayout from "./SectionLayout";

const CompanyDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const getCompanyData = async (id) => {
        const company = await getCompanyDetail(id);
        setData(company?.data);
    }

    useEffect(() => {
        getCompanyData(id)
    },[id])

    return (
        <Box sx={{backgroundColor: '#ECECEC', width: '100%', height: '105vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 0 }}>
                <ScrapeForm id={id} name={data?.name} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
            <SectionLayout data={data}/>
            {/* <Grid container direction="row" spacing={2}>
                    <Grid item xs>
                        <Box
                            sx={{
                                height: "100%",
                                minHeight: 150,
                                border: "1px solid black",
                                fontSize: 30,
                                textAlign: "center",
                            }}
                        >
                            1
                        </Box>
                    </Grid>
                    <Grid item container direction="column" xs spacing={2}>
                        <Grid item xs>
                            <Box
                                sx={{
                                    height: "100%",
                                    minHeight: 150,
                                    border: "1px solid black",
                                    fontSize: 30,
                                    textAlign: "center",
                                }}
                            >
                                2
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Box
                                sx={{
                                    height: "100%",
                                    minHeight: 250,
                                    border: "1px solid black",
                                    fontSize: 30,
                                    textAlign: "center",
                                }}
                            >
                                3
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Box
                            sx={{
                                height: "100%",
                                minHeight: 150,
                                border: "1px solid black",
                                fontSize: 30,
                                textAlign: "center",
                            }}
                        >
                            4
                        </Box>
                    </Grid>
                </Grid> */}
            </Box>
        </Box>
    )
}

export default CompanyDetail;