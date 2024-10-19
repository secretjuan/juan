import { useEffect, useState } from 'react';
import { isString } from 'lodash';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Paper, Box, Typography } from '@material-ui/core';
// utils
import { fData } from '../../utils/formatNumber';
import underReview from '../../assets/underReview.webp'
import pdfLogo from '../../assets/pdfLogo3.jpeg'
//
import { UploadIllustration } from '../../assets';
import { makeStyles } from '@material-ui/styles';
import Image from 'mui-image'
// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  //padding: theme.spacing(0, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' }
}));


const useStyles = makeStyles((theme) => ({
    overlayContainer: {
      position: 'relative',
      display: 'inline-block',
      '&:hover img': {
        opacity: 0.5, // Blur effect on image when hovering
      },
    },
    overlayText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#fff',
      fontSize: '12px',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      opacity: 0, // Initially hidden
      transition: 'opacity 0.3s ease', // Transition effect for opacity change
      zIndex: 1, // Ensure text appears above the image
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: '91px 69px', // Adjust padding as needed
      whiteSpace: 'nowrap', // Keep the text on a single line
    },
    overlayTextVisible: {
      opacity: 1, // Show text on hover
    },
  }));
// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sx: PropTypes.object
};

export default function UploadSingleFile({ error, file, fileStatus, sx, ...other }) {
  const classes = useStyles();
  const [hoveredImages, setHoveredImages] = useState({});
  const [fileType, setFileType] = useState()




  useEffect(() =>{
    if(file){
      setFileType(file.file.type)
      console.log(file)
    }
  },[file])

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other
  });

  const handleMouseEnter = (imageKey) => {
    setHoveredImages((prevState) => ({
      ...prevState,
      [imageKey]: true
    }));
  };

  const handleMouseLeave = (imageKey) => {
    setHoveredImages((prevState) => ({
      ...prevState,
      [imageKey]: false
    }));
  };

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
          ...(file && { height:"100%",width:"100%",padding:"3%" })
        }}
      >
        <input {...getInputProps()} />
        {fileStatus === 0 ? 
         <>
          <UploadIllustration sx={{ width: 180, pl: 2 }} />
          <Box sx={{ p: 1, ml: { md: 2 } }} style={{height:"200px"}}>
            <Typography style={{marginTop:"40px"}}gutterBottom variant="h5">
              Drop or Select file
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Drop files here or click&nbsp;
              <Typography variant="body2" component="span" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                browse
              </Typography>
              &nbsp;thorough your machine
            </Typography>
          </Box>
         </>: 
          <div 
            className={classes.overlayContainer}
            onMouseEnter={() => handleMouseEnter(file)}
            onMouseLeave={() => handleMouseLeave(file)}
          >
            <img src={underReview} alt="under review" width="300px" height="200px"/>

            <Typography
              className={`${classes.overlayText} ${
                hoveredImages[file] ? classes.overlayTextVisible : ''
              }`}
            >
              Drop file or Click to Reupload
            </Typography>
          </div>
        }

        {fileType === 'image/jpeg' && (
          <Box
            component="img"
            alt="file preview"
            src={isString(file) ? pdfLogo : file.preview}
            sx={{
              top: 8,
              borderRadius: 1,
              objectFit: 'cover',
              position: 'absolute',
              width: 'calc(100% - 16px)',
              height: 'calc(100% - 16px)'
            }}
          />
        )}

        {fileType === 'image/png' && (
          <Box
            component="img"
            alt="file preview"
            src={isString(file) ? file : file.preview}
            sx={{
              top: 8,
              borderRadius: 1,
              //objectFit: 'cover',
              position: 'absolute',
              width: 'calc(100% - 16px)',
              height: 'calc(100% - 64px)'
            }}
          />
        )}
        
        {fileType === 'application/pdf' && (
          <Box
          sx={{
            top: 8,
            borderRadius: 1,
            objectFit: 'cover',
            position: 'absolute',
            width: 'calc(100% - 16px)',
            height: 'calc(100% - 16px)',
          }}
          >
            <Image
            alt="file preview"
            src={pdfLogo}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="caption"
                style={{ color: '#fff', textAlign: 'center' }}
              >
                {file.file.name}
              </Typography>
          </Box>
          </Box>
          
        )}
      </DropZoneStyle>
      

      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}
