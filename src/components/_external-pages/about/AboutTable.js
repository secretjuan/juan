import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInDown } from '../../animate';
import { Stack } from '@material-ui/core';
import { FaGithub, FaLinkedin, FaAward } from 'react-icons/fa';

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
  { label: 'Experience', value: '' },
  { 
    label: 'Socials', 
    value: (
      <div style={{ display: 'flex', gap: '10px' }}>
        <a href="https://github.com/JuanMig16" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} style={{ color: '#fff' }} />
        </a>
        <a href="https://www.linkedin.com/in/juan-miguel-sanchez-96416331a/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} style={{ color: '#fff' }}/>
        </a>
        <a href="https://www.credly.com/users/juan-miguel-sanchez.7a027278" target="_blank" rel="noopener noreferrer">
          <FaAward size={30} style={{ color: '#fff' }} />
        </a>
        {/* Add more icons as needed */}
      </div>
    ) 
  },
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
                  <TableCell 
                    component="th" 
                    scope="row" 
                    sx={{ color: '#fff', fontWeight: 'bold', borderBottom: '1px solid #444' }}
                  >
                    {item.label}
                  </TableCell>
                  <TableCell sx={{ color: '#fff', borderBottom: '1px solid #444' }}>
                    {typeof item.value === 'string' ? (
                      item.value.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))
                    ) : (
                      item.value // Render the JSX directly for social icons
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button 
              variant="outlined" 
              color="inherit" 
              sx={{ marginRight: 1 }}
              href="https://www.credly.com/users/juan-miguel-sanchez.7a027278" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View my Credly Badges
            </Button>
        </Box>
        </Container>
    </RootStyle>        
  );
}
