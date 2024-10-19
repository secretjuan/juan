/* eslint-disable */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import { Avatar, Container, Paper, Box, Typography, Stepper, StepLabel, Step, Button, Stack, StepButton } from '@material-ui/core';

import ApplicationForm from './form/applicationForm';
import Examination from './form/examination';
import CompletedRequirements from './form/completedRequirements';
import InReview from './form/inReview';
import RecruitmentHeadInterview from './form/recruitmentHeadInterview';
import RequirementSubmission from './form/requirementSubmission';
import MemberForm from './MemberForm';
import StoreInterview from './form/storeInterview';
import Footer from './Footer';
import storage from '../../../api/base/storage';



const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  position: 'relative',
  paddingTop: 42,
  display: 'flex',
  alignItems: 'center'
}));



// variable
const image_bucket = process.env.REACT_APP_IMAGE_URL;
const steps = [
  "Application Form",
	"Examination",
	"In-Review",
	"Recruitment Head Interview",
	"Store Interview",
	"Requirement Submission",
	// "Completed Requirements",
];

// ----------------------------------------------------------------------

export default function NewMemberForm() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [isLoading, setLoading] = useState(false);
  const [isSworn, setSworn] = useState(false); // form data
  const [open, setOpenSworn] = useState(false); // dialog state
  const [openDialog, setFormDialog] = useState(false); // dialog state
  const [user, setUser] = useState([]);
  const [review, setReview] = useState(false);
  const [form, setForm] = useState({
    consent: [],
    personal: [],
    education: [],
    family: [],
    work: [],
    training: [],
    medical: []
  });

  useEffect(() =>{
    const fetchUser = async () =>{
      try{
        const response = await storage.getUser();
        const result = JSON.parse(response);
        const status = result.account_status
        
        if(parseInt(status) === 0) setActiveStep(1)
        if(parseInt(status) === 1) setActiveStep(2)
        if(parseInt(status) === 2) setActiveStep(3)
        if(parseInt(status) === 3) setActiveStep(4)
        if(parseInt(status) >= 4) setActiveStep(5)

      }catch(error){
        console.error('Error fetching User data:', error);
      }
    };
    fetchUser();
  },[])

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 7) {
      setReview(true);
    }
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <>
      <RootStyle>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10, mt: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel
                      {...labelProps}
                      {...(review ? { onClick: () => setActiveStep(index), sx: { cursor: 'pointer' } } : {})}
                      onClick={handleStep(index)} 
                    >
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep === steps.length ? (
              <>
                <Paper sx={{ p: 3, my: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      key="Profile Picture"
                      alt="Picture"
                      src={`${image_bucket}${form.photo}`}
                      sx={{ margin: '0 auto', width: 128, height: 128 }}
                    />
                    <Typography variant="h3">
                      {form.personal.firstName} {form.personal.middleInitial} {form.personal.lastName}
                    </Typography>
                  </Box>
                </Paper>

                <Box sx={{ marginBottom: '120px', display: 'block', mt: 1 }}>
                  <LoadingButton
                    loading={isLoading}
                    size="large"
                    variant="contained"
                    sx={{ width: '100%', textAlign: 'center', mt: 3, mb: 3 }}
                    onClick={handleSubmit}
                  >
                    Save
                  </LoadingButton>
                  <Button
                    size="large"
                    variant="outlined"
                    sx={{ width: '100%', textAlign: 'center', mb: 5 }}
                    onClick={handleBack}
                  >
                    Go Back
                  </Button>
                </Box>
              </>
            ) : (
              <>
                {activeStep === 0 && (
                  // <ConsentForm
                  //   user={user}
                  //   stored={form}
                  //   onNext={handleNext}
                  //   onStoreData={handleFormData}
                  //   openSworn={openSworn}
                  //   sworn={isSworn}
                  // />
                  <ApplicationForm />
                )}
                {activeStep === 1 && (
                  // <PersonalForm user={user} stored={form} onNext={handleNext} onStoreData={handleFormData} />
                  <Examination />
                )}
                {activeStep === 2 && (
                  // <EducationForm user={user} stored={form} onNext={handleNext} onStoreData={handleFormData} />
                  <InReview />
                )}
                {activeStep === 3 && (
                  // <FamilyForm user={user} stored={form} onNext={handleNext} onStoreData={handleFormData} />
                  <RecruitmentHeadInterview />
                )}
                {activeStep === 4 && (
                  // <WorkForm user={user} stored={form} onNext={handleNext} onStoreData={handleFormData} />
                  <StoreInterview />
                )}
                {activeStep === 5 && (
                  // <TrainingForm user={user} stored={form} onNext={handleNext} onStoreData={handleFormData} />
                  <MemberForm />
                )}
                {activeStep === 6 && (
                  // <MedicalForm user={user} stored={form} onNext={handleNext} onStoreData={handleFormData} />
                  <CompletedRequirements />
                )}
                {activeStep === 7 && (
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 20
                      }}
                    />
                    
                  </Box>
                )}
              </>
            )}
          </Box>
          <Footer />
        </Container>
      </RootStyle>
    </>
  );
}
