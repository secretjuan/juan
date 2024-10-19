/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { useState, useEffect, useCallback } from 'react';
import { capitalCase } from 'change-case';
// material
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import { 
  Card, 
  Grid, 
  Container, 
  Box, 
  CardHeader, 
  Typography, 
  CardContent,
  Button } from '@material-ui/core';
import LoadingScreen from '../../LoadingScreen';
import user_api from '../../../api/user';
import { UploadSingleFile } from '../../upload';
import PublishIcon from '@material-ui/icons/Publish';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  position: 'relative',
  paddingTop: 42,
  display: 'flex',
  alignItems: 'center'
}));


// ----------------------------------------------------------------------
const DOCUMENTS_LIST = [
  'psa-nso',
  'hs-diploma',
  'health-card',
  'mayors-permit',
  'nbi',
  'sss-e1',
  'philhealth',
  'pagibig',
  'tin',
  'picture',
  'attire'
];

export default function MemberForm() {
  const [singleFile, setFile] = useState([]);
  const [isLoading, setLoading] = useState([]);
  const [DOCUMENTS_TO_UPLOAD, setDocumentUpload] = useState([]);
  const [EXISTING_DOCUMENT, setExistingDocument] = useState([]);


  const handleSaveDocument = async (type) => {
    setLoading((prevState) => ({ ...prevState, [type]: true }));
    if (!singleFile[type] || !singleFile[type].file) {
      setLoading((prevState) => ({ ...prevState, [type]: false }));
      return alert(`Empty file ${capitalCase(type)}`);
    }

    const upload_image = await user_api.request_upload_url(singleFile[type].file);
    if (!upload_image) {
      setLoading((prevState) => ({ ...prevState, [type]: false }));
      return alert('Something went wrong in uploading your image.');
    }

    const data = {
      company: undefined, // to be added in request user_api
      id: undefined,
      name: upload_image,
      type
    };
   
    try {
      const response = await user_api.post_applicant_documents_upload_record_url(data);
      if (response.status === 200) {
       
        alert(`Uploading of ${label(type)} success`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

 
  

  // const handleMouseEnter = (imageKey) => {
  //   setHoveredImages((prevState) => ({
  //     ...prevState,
  //     [imageKey]: true
  //   }));
  // };

  // const handleMouseLeave = (imageKey) => {
  //   setHoveredImages((prevState) => ({
  //     ...prevState,
  //     [imageKey]: false
  //   }));
  // };

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const load = async () => {
      const request = await user_api.get_user_documents();
      if (!request.ok) {
        return setLoading(false);
      }

      //const existing = [];

      const payload = request.data;
      await payload.data.forEach((value) => {
        const index = DOCUMENTS_LIST.indexOf(value.doctype);
        if (index !== -1) {
          setExistingDocument(EXISTING_DOCUMENT =>[...EXISTING_DOCUMENT, {doctype:value.doctype, url:value.url}]);
          // if(!EXISTING_DOCUMENT.includes(value.doctype)){
          //   setExistingDocument(EXISTING_DOCUMENT =>[...EXISTING_DOCUMENT, {doctype:value.doctype, url:value.url}]);
          // }
          //DOCUMENTS_LIST.splice(index, 1);
        }
      });

      // setExistingDocument(existing);
      setDocumentUpload(DOCUMENTS_LIST);
    };

    load();
  }, []);


  const handleDropSingleFile = useCallback((acceptedFiles, DOCUMENT_TYPE) => {
    //console.log('acceptedFiles', acceptedFiles, DOCUMENT_TYPE);
    const file = acceptedFiles[0];
    if (file) {
      setFile((prevState) => ({
        ...prevState,
        [DOCUMENT_TYPE]: {
          ...file,
          preview: URL.createObjectURL(file),
          file
        }
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function FileHandler({data, EXISTING_DOCUMENT, singleFile, handleDropSingleFile }){
    let found = false
    let fileUrl;
    EXISTING_DOCUMENT.forEach((file) =>{
      if(file.doctype === data){
        fileUrl = file.url
        found = true
        return
      }
    });

    if(found){
     
      return (
        <>
          <UploadSingleFile
            file={singleFile[data]}
            fileStatus={1}
            fileUrl={fileUrl}
            onDrop={(e) => {
              handleDropSingleFile(e, data);
            }}
          />
        </> 
      )
    }else{
        return (
        <>
          <UploadSingleFile
          file={singleFile[data]}
          fileStatus={0}
          onDrop={(e) => {
            handleDropSingleFile(e, data);
          }}
        /> 
      </>)
    }
  }

  // ----------------------------------------------------------------------

  const label = (value) => {
    switch (value) {
      case 'psa-nso':
        return 'PSA / NSO Birth Certificate';
      case 'hs-diploma':
        return 'High School Diploma';
      case 'health-card':
        return 'Health Card';
      case 'mayors-permit':
        return 'Mayors Permit';
      case 'nbi':
        return 'NBI';
      case 'sss-e1':
        return 'SSS E1 Form / Registration Form';
      case 'philhealth':
        return 'Philhealth Member’s Data Form/ ID';
      case 'pagibig':
        return 'Pag-IBIG Member’s Data Form/ ID';
      case 'tin':
        return 'TIN Id';
      case 'attire':
        return 'applicant grooming and attire';
      case 'picture':
        return '2x2 picture';
      default:
        return value;
    }
  };

  return (
    <>
      <RootStyle>
        <Container maxWidth="lg">
        {/* <Typography
            component="h2"
            variant="h6"
            color="common.black"
            sx={{ textAlign: 'left', mt: { xs: 2, md: 3 }, mb: 1 }}
          >
            List of Under Recruiter review
          </Typography>
          <Box sx={{ p: 2 }}>
            {EXISTING_DOCUMENT && EXISTING_DOCUMENT.map((value, key) => (
              <Box key={key} sx={{ textAlign: 'left', mb: 2 }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li>
                    <Typography variant="overline" color="common.black">
                      {value.doctype}
                    </Typography>
                  </li>
                </ul>
              </Box>
            ))}
          </Box> */}

          {DOCUMENTS_TO_UPLOAD.length > 0 && (
            <Typography
              component="h2"
              variant="h3"
              color="common.black"
              sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
            >
              Pending Documents Required
            </Typography>
          )}

          <Box sx={{ textAlign: 'center', mb: 10, mt: 3 }}>
            <Grid
              container
              spacing={3}
              sx={{
                justifyContent: 'center',
                width: { xs: '100%', md: '100%' },
                margin: { xs: '0', md: 'auto' }
              }}
            >
              <Box sx={{ width: '100%', margin: { xs: '0', md: 'auto' } }}>
                <Grid container spacing={3}>
                  {DOCUMENTS_LIST &&
                    DOCUMENTS_LIST.map((value, key) => {
                      const title = label(value);
                      const loopCount = key + 1
                      const existingDoctypeButtons = EXISTING_DOCUMENT
                      .filter((doc) => doc.doctype === value)
                      .map((doc, docKey) => (
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <Button key={docKey} startIcon={<OpenInNewIcon />}>
                            open
                          </Button>
                        </a>
                      ));

                      return (
                        <Grid item xs={12} md={4} key={key}>
                          {isLoading[value] && <LoadingScreen />}

                          <Card key={key}>
                            <CardHeader title={capitalCase(title)} />
                            {!isLoading[value] && (
                              <>
                                <CardContent>
                                  <FileHandler
                                    data={value}
                                    EXISTING_DOCUMENT={EXISTING_DOCUMENT}
                                    singleFile={singleFile}
                                    handleDropSingleFile={handleDropSingleFile}
                                  />
                                </CardContent>

                                <LoadingButton
                                  fullWidth
                                  size="large"
                                  onClick={() => handleSaveDocument(value)}
                                  variant="text"
                                  loading={isLoading[value]}
                                >
                                  <PublishIcon/> Upload
                                </LoadingButton>
                              </>
                            )}
                          </Card>
                          {loopCount === 1 && (
                          <Box sx={{marginTop:'15px'}}>
                            <Typography variant='caption'> Uploaded Files </Typography>  
                            <Box
                              sx={{
                                width: '100%',
                                backgroundColor: 'blue',
                                padding: 1,
                                borderRadius: 2,
                                boxShadow: 2,
                                margin: { xs: '0', md: 'auto' },
                                display: 'flex',
                                justifyContent: 'flex-start',
                                overflowX: 'auto',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '8px',
                                }}
                              >
                                {existingDoctypeButtons}
                              </div>
                            </Box>
                          </Box>
                        )}
                        {loopCount === 2 && (
                          <Box sx={{marginTop:'15px'}}>
                            <Typography variant='caption'> Uploaded Files </Typography>  
                            <Box
                              sx={{
                                width: '100%',
                                backgroundColor: 'blue',
                                padding: 1,
                                borderRadius: 2,
                                boxShadow: 2,
                                margin: { xs: '0', md: 'auto' },
                                display: 'flex',
                                justifyContent: 'flex-start',
                                overflowX: 'auto',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '8px',
                                }}
                              >
                                {existingDoctypeButtons}
                              </div>
                            </Box>
                          </Box>
                        )}
                        {loopCount === 3 && (
                          <Box sx={{marginTop:'15px'}}>
                            <Typography variant='caption'> Uploaded Files </Typography>  
                            <Box
                              sx={{
                                width: '100%',
                                backgroundColor: 'blue',
                                padding: 1,
                                borderRadius: 2,
                                boxShadow: 2,
                                margin: { xs: '0', md: 'auto' },
                                display: 'flex',
                                justifyContent: 'flex-start',
                                overflowX: 'auto',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '8px',
                                }}
                              >
                                {existingDoctypeButtons}
                              </div>
                            </Box>
                          </Box>
                        )}
                        {loopCount === 4 && (
                          <Box sx={{marginTop:'15px'}}>
                            <Typography variant='caption'> Uploaded Files </Typography>  
                            <Box
                              sx={{
                                width: '100%',
                                backgroundColor: 'blue',
                                padding: 1,
                                borderRadius: 2,
                                boxShadow: 2,
                                margin: { xs: '0', md: 'auto' },
                                display: 'flex',
                                justifyContent: 'flex-start',
                                overflowX: 'auto',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '8px',
                                }}
                              >
                                {existingDoctypeButtons}
                              </div>
                            </Box>
                          </Box>
                        )}
                        {loopCount === 5 && (
                          <Box sx={{marginTop:'15px'}}>
                            <Typography variant='caption'> Uploaded Files </Typography>  
                            <Box
                              sx={{
                                width: '100%',
                                backgroundColor: 'blue',
                                padding: 1,
                                borderRadius: 2,
                                boxShadow: 2,
                                margin: { xs: '0', md: 'auto' },
                                display: 'flex',
                                justifyContent: 'flex-start',
                                overflowX: 'auto',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '8px',
                                }}
                              >
                                {existingDoctypeButtons}
                              </div>
                            </Box>
                          </Box>
                        )}
                        {loopCount === 6 && (
                          <Box sx={{marginTop:'15px'}}>
                            <Typography variant='caption'> Uploaded Files </Typography>  
                            <Box
                              sx={{
                                width: '100%',
                                backgroundColor: 'blue',
                                padding: 1,
                                borderRadius: 2,
                                boxShadow: 2,
                                margin: { xs: '0', md: 'auto' },
                                display: 'flex',
                                justifyContent: 'flex-start',
                                overflowX: 'auto',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '8px',
                                }}
                              >
                                {existingDoctypeButtons}
                              </div>
                            </Box>
                          </Box>
                        )}
                        {loopCount === 7 && (
                          <Box sx={{marginTop:'15px'}}>
                            <Typography variant='caption'> Uploaded Files </Typography>  
                            <Box
                              sx={{
                                width: '100%',
                                backgroundColor: 'blue',
                                padding: 1,
                                borderRadius: 2,
                                boxShadow: 2,
                                margin: { xs: '0', md: 'auto' },
                                display: 'flex',
                                justifyContent: 'flex-start',
                                overflowX: 'auto',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '8px',
                                }}
                              >
                                {existingDoctypeButtons}
                              </div>
                            </Box>
                          </Box>
                        )}
                        {loopCount === 8 && (
                          <Box sx={{marginTop:'15px'}}>
                            <Typography variant='caption'> Uploaded Files </Typography>  
                            <Box
                              sx={{
                                width: '100%',
                                backgroundColor: 'blue',
                                padding: 1,
                                borderRadius: 2,
                                boxShadow: 2,
                                margin: { xs: '0', md: 'auto' },
                                display: 'flex',
                                justifyContent: 'flex-start',
                                overflowX: 'auto',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '8px',
                                }}
                              >
                                {existingDoctypeButtons}
                              </div>
                            </Box>
                          </Box>
                        )}
                        {loopCount === 9 && (
                          <Box sx={{marginTop:'15px'}}>
                            <Typography variant='caption'> Uploaded Files </Typography>  
                            <Box
                              sx={{
                                width: '100%',
                                backgroundColor: 'blue',
                                padding: 1,
                                borderRadius: 2,
                                boxShadow: 2,
                                margin: { xs: '0', md: 'auto' },
                                display: 'flex',
                                justifyContent: 'flex-start',
                                overflowX: 'auto',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '8px',
                                }}
                              >
                                {existingDoctypeButtons}
                              </div>
                            </Box>
                          </Box>
                        )}
                        {loopCount === 10 && (
                          <Box sx={{marginTop:'15px'}}>
                            <Typography variant='caption'> Uploaded Files </Typography>  
                            <Box
                              sx={{
                                width: '100%',
                                backgroundColor: 'blue',
                                padding: 1,
                                borderRadius: 2,
                                boxShadow: 2,
                                margin: { xs: '0', md: 'auto' },
                                display: 'flex',
                                justifyContent: 'flex-start',
                                overflowX: 'auto',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '8px',
                                }}
                              >
                                {existingDoctypeButtons}
                              </div>
                            </Box>
                          </Box>
                        )}
                        {loopCount === 11 && (
                          <Box sx={{marginTop:'15px'}}>
                            <Typography variant='caption'> Uploaded Files </Typography>  
                            <Box
                              sx={{
                                width: '100%',
                                backgroundColor: 'blue',
                                padding: 1,
                                borderRadius: 2,
                                boxShadow: 2,
                                margin: { xs: '0', md: 'auto' },
                                display: 'flex',
                                justifyContent: 'flex-start',
                                overflowX: 'auto',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '8px',
                                }}
                              >
                                {existingDoctypeButtons}
                              </div>
                            </Box>
                          </Box>
                        )}

                        </Grid>
                      );
                    })}
                </Grid>
              </Box>
            </Grid>
          </Box>
          {/* {EXISTING_DOCUMENT.length === 11 && (
            <Typography
              component="h2"
              variant="h3"
              color="common.black"
              sx={{ textAlign: 'center', mt: { xs: 2, md: 3 }, mb: 10 }}
            >
              Kindly notify your recruiter manager to validate your uploaded documents.
            </Typography>
          )} */}
        </Container>
      </RootStyle>
    </>
  );
}
