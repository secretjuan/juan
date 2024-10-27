import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInDown } from '../../animate';
import { Stack } from '@material-ui/core';

const cover = '/favicon/bg.avif';

const RootStyle = styled('div')(() => ({
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '0vh',
    height: 'auto',
    paddingBottom: '50px',
    paddingTop: '50px',
    backgroundColor: '#fff',
    color: 'white',
  }));

const companyData = [
  { label: 'Full Name', value: 'Juan Miguel Sanchez' },
  { label: 'Nationality', value: 'Filipino' },
  { label: 'Birthday', value: 'November 16, 2002' },
  { label: 'Education', value: 'Bachelor of Science in Information Technology' },
  { label: 'N/A', value: '?' },
  { label: 'N/A', value: '?' }
];

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
    zIndex: 10,
    maxWidth: '100%',
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(13),
    marginBottom: '25px'
  }));

export default function AboutTable() {
  return (
    <RootStyle
      sx={{
        backgroundImage: `url(${cover})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#FFFFFF',
        backgroundAttachment: 'fixed'
      }}
    >
        {/* <ContentStyle>
            <motion.div variants={varFadeInDown}>
              <Typography variant="h1" sx={{ color: 'black' }}>
                About Me
              </Typography>
            </motion.div>
          </ContentStyle> */}
        <Container 
            maxWidth="md" 
            sx={{ 
                backgroundColor: '#363636', 
                color: '#fff', padding: 4, 
                borderRadius: 2,
                borderColor: 'black'
                }}
            >
        <Typography variant="h4" gutterBottom sx={{ borderBottom: '1px solid #fff', paddingBottom: 1 }}>
            Personal Information
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
            <Table>
            <TableBody>
                {companyData.map((item, index) => (
                <TableRow key={index}>
                    <TableCell component="th" scope="row" sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}>
                    {item.label}
                    </TableCell>
                    <TableCell sx={{ color: '#fff', borderBottom: '1px solid #444' }}>
                    {item.value.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button variant="outlined" color="inherit" sx={{ marginRight: 1 }}>
            Shop Now
            </Button>
            <Button variant="contained" color="secondary">
            Data Migration Tool
            </Button>
        </Box>
        </Container>
    </RootStyle>        
  );
}
