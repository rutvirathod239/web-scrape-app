import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid"
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from '../style/companyList.module.scss';
import { deleteCompanyData, getCompanyList } from "../utils/apis";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { getCompanyTitle } from "../utils/common";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { CSVLink } from "react-csv";
import { ReactComponent as ExportIcon } from '../icons/list-plus.svg';

const columns = [
    {
        field: 'logo',
        headerName: '',
        width: 10,
        renderCell: (params) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {params.row.logo ? (
                    <img
                        src={params.row.logo}
                        alt={params.row.name}
                        style={{ width: 25, height: 25, borderRadius: 5, margin: 0 }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: 25,
                            height: 25,
                            borderRadius: 5,
                            backgroundColor: "#ccc",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 0,
                        }}
                    >
                        N/A
                    </Box>
                )}
            </Box>
        )
    },
    {   field: 'name', 
        headerName: 'COMPANY', 
        width: 200,
        renderCell: (params) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link to={`/${params.row._id}`} className={styles.link}><Typography className={styles.text}>{getCompanyTitle(params.row.name)}</Typography></Link>
            </Box>
        ),
    },
    {   headerName: 'SOCIAL PROFILES', width: 150,
        renderCell: (params) => (
            <Box sx={{ display: "flex", gap: 1 }}>
                <a
                    href={params.row.facebook || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: params.row.facebook ? "inherit" : "#ccc", pointerEvents: params.row.facebook ? "auto" : "none" }}
                >
                    <FacebookRoundedIcon size={5} />
                </a>
                <a
                    href={params.row.twitter || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: params.row.twitter ? "inherit" : "#ccc", pointerEvents: params.row.twitter ? "auto" : "none" }}
                >
                    <TwitterIcon size={5} />
                </a>
                <a
                    href={params.row.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: params.row.linkedin ? "inherit" : "#ccc", pointerEvents: params.row.linkedin ? "auto" : "none" }}
                >
                    <LinkedInIcon size={5} />
                </a>
            </Box>
        ),
    },
    {   field: 'description', 
        headerName: 'DESCRIPTION', 
        width: 400,
        renderCell: (params) => (
            // <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography 
                    noWrap
                    sx={{
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                    className={styles.cellText}>{params.row.description}</Typography>
            // </Box>
        )
    },
    {   field: 'address', 
        headerName: 'ADDRESS', 
        width: 250,
        renderCell: (params) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography className={styles.cellText}>{params.row.address}</Typography>
            </Box>
        )
    },
    {   field: 'phone', 
        headerName: 'PHONE NO.', 
        width: 200,
        renderCell: (params) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography className={styles.text}>{params.row.phone}</Typography>
            </Box>
        )
    },
    {   field: 'email', 
        headerName: 'EMAIL', 
        width: 200,
        renderCell: (params) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography className={styles.text}>{params.row.email}</Typography>
            </Box>
        )
    },
];
const headers = [
    { label: "LOGO", key: "logo" },
    { label: "NAME", key: "name" },
    { label: "DESCRIPTION", key: "description" },
    { label: "PHONE", key: "phone" },
    { label: "EMAIL", key: "email" },
    { label: "FACEBOOK", key: "facebook" },
    { label: "LINKEDIN", key: "linkedin" },
    { label: "INSTAGRAM", key: "instagram" },
    { label: "TWITTER", key: "twitter" },
];
const CustomPagination = ({ totalRows, page, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalRows / pageSize);
    const startIndex = page * pageSize + 1;
    const endIndex = Math.min((page + 1) * pageSize, totalRows);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const getVisiblePages = () => {
        const visiblePages = [];
        if (totalPages <= 3) {
            return pageNumbers;
        }

        if (page + 1 > 1) {
            visiblePages.push(page + 1);
        } else {
            visiblePages.push(1);
        }

        if (page + 1 < totalPages - 1) {
            visiblePages.push(page + 2);
        }
        
        if (page + 2 < totalPages - 1) {
            visiblePages.push('...');
        }

        visiblePages.push(totalPages);
        
        return [...new Set(visiblePages)];
    };

    const visiblePages = getVisiblePages();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '8px 16px',
            }}
        >
            <span>
                Showing 
                <span className={styles.pagecount}> {startIndex} - {endIndex}</span> of <span className={styles.pagecount}>{totalRows}</span>
            </span>
            <Box sx={{ marginLeft: '10px', display: 'flex', border: '1px solid #D1D5DB', borderRadius: '4px' }} >
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 0}
                    className={styles.pagebtn}
                    style={{
                        cursor: page === 0 ? 'not-allowed' : 'pointer',
                    }}
                >
                    <ArrowBackIosRoundedIcon fontSize="16px" sx={{stroke: page === 0 ? '#D1D5DB' :'#6B7280', strokeWidth: 2}}/>
                </button>
                {visiblePages.map((pageNum, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (pageNum !== '...') {
                                onPageChange(pageNum - 1);
                            }
                        }}
                        className={`${styles.pagebtn} ${styles.numberbtn} ${page === pageNum - 1 ? styles.activebtn : ''}`}
                        disabled={pageNum === '...'}
                    >
                        {pageNum}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={endIndex === totalRows}
                    className={styles.pagebtn}
                    style={{                        
                        cursor: endIndex === totalRows ? 'not-allowed' : 'pointer',
                    }}
                >
                    <ArrowForwardIosRoundedIcon fontSize="16px" sx={{stroke: endIndex === totalRows ? '#D1D5DB' :'#6B7280', strokeWidth: 2}}/>
                </button>
            </Box>
        </Box>
    );
};

const CustomToolbar = ({ selectedRows, rows, handleDelete }) => {
    return (
        <GridToolbarContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', m: 1, padding: '10px', paddingLeft: '15px', gap: '10px' }}>
                <Typography variant="body2" className={styles.rowcounts}>
                    {selectedRows.length} Selected
                </Typography>
                <Button variant="outlined" className={styles.btn} onClick={() => handleDelete(selectedRows)}>Delete</Button>            
                <CSVLink data={rows} headers={headers}>
                    <Button variant="outlined" className={styles.btn}>
                        <ExportIcon /> 
                        <Typography className={styles.exportbtn}>Export as CSV</Typography>
                    </Button>
                </CSVLink>            
            </Box>
        </GridToolbarContainer>
    )
}

const CompanyList = () => {
    
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [page, setPage] = useState(0);
    const pageSize = 10;

    const getData = async () => {
        const data = await getCompanyList();
        setRows(data?.data);
    }

    useEffect(() => {
        getData();
    }, [])
    
    const handleSelectionChange = (newSelection) => {
        setSelectedRows([...selectedRows, newSelection]);
    };

    const handleDelete = (selectedRows) => {
        deleteCompanyData(selectedRows)
        .then(() => getData())
        .catch((err) => console.log("err", err));        
    }

    const rowsToDisplay = rows.slice(page * pageSize, (page + 1) * pageSize);

    return (
        <Box sx={{backgroundColor: "white", borderRadius: '8px', margin: '5px 5px 10px 5px' }}>            
            <Box>
                <Paper elevation={3} className={styles.paper}>
                    <DataGrid 
                        rows={rowsToDisplay} 
                        columns={columns} 
                        autoHeight 
                        checkboxSelection 
                        getRowId={(row) => row._id}
                        pageSize={pageSize}
                        disableColumnMenu
                        onRowSelectionModelChange={handleSelectionChange}
                        hideFooterSelectedRowCount
                        rowsPerPageOptions={[]} 
                        components={{
                            Toolbar:  () => (<CustomToolbar selectedRows={selectedRows} rows={rows} handleDelete={handleDelete} />),
                            Pagination: () => (
                                <CustomPagination
                                    totalRows={rows.length}
                                    page={page}
                                    pageSize={pageSize}
                                    onPageChange={(newPage) => setPage(newPage)}
                                />
                            ),
                        }}                        
                        sx={{
                            '& .MuiDataGrid-columnHeaderTitle': {
                              color: '#6B7280',
                              fontSize: '11px',
                              fontWeight: 600,
                            },
                            '& .MuiDataGrid-columnHeader': {
                                backgroundColor: '#F9FAFB',
                                width: '100%'
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#F9FAFB',
                            },
                            '& .MuiCheckbox-root': {
                                width: '14px',
                                height: '14px',
                                padding: 0,
                                backgroundColor: 'transparent',
                                border: '1px solid #D1D5DB',
                                borderRadius: '3px',
                                '& svg': {
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '3px',
                                    border: '1px solid transparent',
                                    backgroundColor: 'transparent',
                                    '& path': {
                                        display: 'none',
                                    },
                                    '& circle': {
                                        display: 'none',
                                    },
                                },
                                '&.Mui-checked': {
                                    backgroundColor: '#D1D5DB',
                                    borderColor: '#D1D5DB',
                                    '& svg': {
                                        backgroundColor: '#D1D5DB', 
                                        borderColor: '#D1D5DB',
                                        color: '#D1D5DB',
                                        '& path': {
                                            display: 'block',
                                        },
                                    },
                                },
                                '&.MuiCheckbox-indeterminate': {
                                    backgroundColor: '#D1D5DB',
                                    borderColor: '#D1D5DB',
                                    '& svg': {
                                        backgroundColor: '#D1D5DB',
                                    },
                                },
                            },
                            '& .MuiDataGrid-footerContainer': {
                                display: 'flex',
                                justifyContent: 'flex-start'
                            },
                            '& .MuiTablePagination-root': {
                                marginLeft: 0,
                            },
                        }}
                    />
                </Paper>
            </Box>
        </Box>
    )
}
export default CompanyList;