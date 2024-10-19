/* eslint-disable */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import { Avatar, Container, Paper, Box, Typography, Stepper, StepLabel, Step, Button, Stack, StepButton } from '@material-ui/core';

import { ConsentForm, PersonalForm, EducationForm, FamilyForm, WorkForm, TrainingForm, MedicalForm } from './form';
import SwornStatement from './form/sworn';
import FormDialog from './form/dialog';

import user_api from 'api/user';

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
  'Consent',
  'Personal Information',
  'Education background',
  'Family background',
  'Working experience',
  'Medication information',
  'Review Information'
];

// ----------------------------------------------------------------------

export default function ApplicationForm() {
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

  useEffect(() => {
    const load = async () => {
      if (activeStep !== 6) {
        setOpenSworn(true);
      }

      if (activeStep === 6) {
        setReview(true);
      }
      Object.keys(form).forEach((val) => {
        if (localStorage.getItem(val)) {
          const set_data = [];
          set_data[val] = JSON.parse(localStorage.getItem(val));
          setForm((prev_state) => ({ ...prev_state, ...set_data }));
        }
      });
      setUser(user);
      setLoading(false);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSworn = () => {
    setSworn(true);
    setOpenSworn(false);
  };

  const openSworn = () => {
    setOpenSworn(true);
  };

  const handleCancelDialog = () => {
    setFormDialog(false);
  };

  const handleFormDialog = () => {
    setFormDialog(true);
  };

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

  const handleFormData = (form_data, form_type) => {
    const set_data = [];
    if (!form_data) return;
    set_data[form_type] = form_data;
    localStorage.setItem(form_type, JSON.stringify(form_data));

    setForm((prev_state) => ({ ...prev_state, ...set_data }));
  };

  const handleLoopKeys = (name, value, form_obj) => {
    const loop = [];
    value &&
      Object.values(value).forEach((item) => {
        if (item === undefined) return '';
        form_data.append(name, item);
      });
    return loop;
  };

  const handleSubmit = async () => {
    let form_data = new FormData();
    form_data.append('company', process.env.REACT_APP_COMPANY);
    
    setLoading(true);
    if (!form) return;

    const form_obj = {
      ...form.consent,
      ...form.personal,
      ...form.education,
      ...form.family,
      ...form.work,
      ...form.training,
      ...form.medical
    };

    form_obj &&
      Object.keys(form_obj).forEach((item) => {
        switch (item) {
          case 'person_contact_address':
          case 'person_contact_name':
          case 'person_contact_no':
          case 'person_contact_position':
            form_obj[item].map((vlx) => {
              form_data.append(`${item}[]`, vlx);
            });
            delete form_obj[item];
            break;
          case 'person_sibling[]':
          case 'person_sibling_relationship[]':
          case 'other_hosp_name[]':
          case 'other_hosp_hospital[]':
          case 'other_hosp_year[]':
          case 'surgery_name[]':
          case 'surgery_hospital[]':
          case 'surgery_year[]':
            form_obj[item].map((vlx) => {
              form_data.append(item, vlx);
            });
            delete form_obj[item];
            break;
          default:
            form_data.append(item, form_obj[item]);
            break;
        }
      });

    // form checker
    // for (var pair of form_data.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    const result = await user_api.post_application_form(form_data);
    if (!result.ok) {
      if (result.data.status === 422) {
        alert(result.data.message);
      } else {
        alert('Unable to process your application');
      }
      return setLoading(false);
    }
    else {
      const jsonData = JSON.parse(result.data.data.data)
      fetch(
        ' https://discord.com/api/webhooks/1003873664011337819/oCO_8ZEwNcNyPKrDj9FXY7-BOu6F9iS46A75RG45D-xEUM5iZHsNtNQvGFe-oJlmTpfh',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // the username to be displayed
            username: 'APEX Notification',
            // the avatar to be displayed
            avatar_url:
              'https://staff.7star.com.ph/media/logos/logo-letter-1.png',
            // contents of the message to be sent
            content:
             "New applicant from 7star \n Email: " +result.data.data.username+"\n Name: "+jsonData.person_fname +" "+jsonData.person_lname+"\n Contact No: "+jsonData.person_contact_no_mob+"\n Address: " + jsonData.person_present_address_street + " " + jsonData.person_present_address_city,
          }),
        }
      );
    }

    // remove local storage
    Object.keys(form).forEach((val) => {
      localStorage.removeItem(val);
    });

    localStorage.setItem('complete', JSON.stringify(result.data));
    alert('Application submitted success');
    navigate(`/apply/success`, { replace: true });
    setLoading(false);
    return true;
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
                  <ConsentForm
                    user={user}
                    stored={form}
                    onNext={handleNext}
                    onStoreData={handleFormData}
                    openSworn={openSworn}
                    sworn={isSworn}
                  />
                )}
                {activeStep === 1 && (
                  <PersonalForm user={user} stored={form} onNext={handleNext} onStoreData={handleFormData} />
                )}
                {activeStep === 2 && (
                  <EducationForm user={user} stored={form} onNext={handleNext} onStoreData={handleFormData} />
                )}
                {activeStep === 3 && (
                  <FamilyForm user={user} stored={form} onNext={handleNext} onStoreData={handleFormData} />
                )}
                {activeStep === 4 && (
                  <WorkForm user={user} stored={form} onNext={handleNext} onStoreData={handleFormData} />
                )}
                {activeStep === 5 && (
                  <MedicalForm user={user} stored={form} onNext={handleNext} onStoreData={handleFormData} />
                )}
                {activeStep === 6 && (
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
                    <ConsentForm
                      user={user}
                      stored={form}
                      onNext={handleNext}
                      onStoreData={handleFormData}
                      openSworn={openSworn}
                      sworn={isSworn}
                      isReview={'true'}
                    />
                    <PersonalForm
                      user={user}
                      stored={form}
                      onNext={handleNext}
                      onStoreData={handleFormData}
                      isReview={true}
                    />
                    <EducationForm
                      user={user}
                      stored={form}
                      onNext={handleNext}
                      onStoreData={handleFormData}
                      isReview={true}
                    />
                    <FamilyForm
                      user={user}
                      stored={form}
                      onNext={handleNext}
                      onStoreData={handleFormData}
                      isReview={true}
                    />
                    <WorkForm
                      user={user}
                      stored={form}
                      onNext={handleNext}
                      onStoreData={handleFormData}
                      isReview={true}
                    />
                    <MedicalForm
                      user={user}
                      stored={form}
                      onNext={handleNext}
                      onStoreData={handleFormData}
                      isReview={true}
                    />
                  </Box>
                )}
              </>
            )}

            <Stack sx={{ justifyContent: 'flex-end', float: { md: 'left', sm: 'left', xs: 'initial' } }}>
              <Box
                {...(activeStep !== 6
                  ? {
                      sx: {
                        mt: { md: -10, sm: -10, xs: 0 },
                        mx: { md: 1, sm: 1, xs: 0 },
                        mr: { md: 'auto', sm: 'auto' },
                        float: { md: 'left', sm: 'left', xs: 'initial' },
                        width: { md: '100%', sm: '100%', xs: '100%' }
                      }
                    }
                  : {
                      sx: {
                        mt: { md: 10, sm: 10, xs: 0 },
                        mb: { md: 10, sm: 10, xs: 0 },
                        mx: { md: 1, sm: 1, xs: 0 },
                        mr: { md: 'auto', sm: 'auto' },
                        float: { md: 'left', sm: 'left', xs: 'initial' },
                        width: { md: '100%', sm: '100%', xs: '100%' }
                      }
                    })}
              >
                {activeStep !== 0 && (
                  <Button
                    fullWidth
                    size="large"
                    variant="outlined"
                    onClick={handleBack}
                    sx={{
                      borderColor: 'blue.main',
                      color: 'blue.main',
                      boxShadow: '1px solid #000',
                      '&:hover': {
                        transition: 'all 0.4s ease',
                        backgroundColor: 'blue.light'
                      }
                    }}
                  >
                    Go Back
                  </Button>
                )}
              </Box>
            </Stack>

            {activeStep === 6 && (
              <Stack sx={{ justifyContent: 'flex-end', float: { md: 'right', sm: 'right', xs: 'initial' } }}>
                <Box
                  sx={{
                    mt: { md: 10, sm: 10, xs: 0 },
                    mb: { md: 10, sm: 10, xs: 0 },
                    mx: { md: 1, sm: 1, xs: 0 },
                    mr: { md: 'auto', sm: 'auto' },
                    float: { md: 'left', sm: 'left', xs: 'initial' },
                    width: { md: '100%', sm: '100%', xs: '100%' }
                  }}
                >
                  <Button
                    fullWidth
                    size="large"
                    variant="outlined"
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                      float: { md: 'right', sm: 'right', xs: 'initial' },
                      backgroundColor: 'blue.main',
                      borderColor: 'blue.main',
                      color: 'common.white',
                      boxShadow: '1px solid #000',
                      '&:hover': {
                        transition: 'all 0.4s ease',
                        backgroundColor: 'blue.light'
                      }
                    }}
                  >
                    Submit Application
                  </Button>
                </Box>
              </Stack>
            )}
          </Box>
        </Container>

        <FormDialog open={openDialog} onConfirm={handleFormDialog} onCancel={handleCancelDialog} />
        <SwornStatement open={open} onConfirm={handleSworn} />
      </RootStyle>
    </>
  );
}
