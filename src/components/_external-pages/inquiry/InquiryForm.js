import * as Yup from 'yup';
import emailjs from 'emailjs-com';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import { Card, Grid, Container, Stack, Box, TextField, Typography } from '@material-ui/core';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  position: 'relative',
  paddingTop: 42,
  display: 'flex',
  alignItems: 'center'
}));

// ----------------------------------------------------------------------

export default function InquiryForm() {
  const Schema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    contact: Yup.string().min(6).required('Contact No. is required'),
    company: Yup.string().min(3).required('Company is required'),
    service: Yup.string().min(3).required('Service is required'),
    message: Yup.string().min(3).required('Message is required')
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      contact: '',
      company: '',
      service: '',
      message: ''
    },
    validationSchema: Schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const userId = process.env.REACT_APP_EMAILJS_USER_ID;
        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_INQUIRY;
        await emailjs.send(serviceId, templateId, values, userId).then(() => alert('Inquiry sent successfully'));

        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <RootStyle>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            color="common.black"
            sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
          >
            RentACourt: Tailored Solutions for Your Game.
          </Typography>
          <Typography
            component="p"
            variant="h5"
            color="common.black"
            sx={{ textAlign: 'center', my: { xs: 2, md: 1 } }}
          >
            Your victories are our mission too.
          </Typography>
          <Typography
            component="p"
            variant="h6"
            color="common.black"
            sx={{
              textAlign: 'center',
              my: { xs: 2, md: 2 },
              fontWeight: '400',
              width: { xs: '100%', md: '75%' },
              mx: 'auto'
            }}
          >
            RentACourt: Your winning partner. We offer more than just courts - we're your ticket to success. With us, execute strategies flawlessly, gain a competitive edge, and achieve cost-effective results. Join us, and let's conquer the game together.
          </Typography>
          <Box sx={{ textAlign: 'center', mb: 10, mt: 3 }}>
            <FormikProvider value={formik}>
              <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={3}
                  sx={{
                    justifyContent: 'center',
                    width: { xs: '100%', md: '45%' },
                    margin: { xs: '0', md: 'auto' }
                  }}
                >
                  <Box sx={{ width: '100%', margin: { xs: '0', md: 'auto' } }}>
                    <Card sx={{ px: 3, py: 5 }}>
                      <Stack spacing={3}>
                        <TextField
                          fullWidth
                          label="Name"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                        <TextField
                          fullWidth
                          label="Email address"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                        <TextField
                          fullWidth
                          label="Contact No."
                          {...getFieldProps('contact')}
                          error={Boolean(touched.contact && errors.contact)}
                          helperText={touched.contact && errors.contact}
                        />
                        <TextField
                          fullWidth
                          multiline
                          minRows={3}
                          maxRows={5}
                          label="Message"
                          {...getFieldProps('message')}
                          error={Boolean(touched.message && errors.message)}
                          helperText={touched.message && errors.message}
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                        <LoadingButton
                          fullWidth
                          type="submit"
                          variant="contained"
                          size="large"
                          style={{ backgroundColor: "#ff9800", color: '#fff' }}
                          sx={{
                            backgroundColor: 'blue.main',
                            transition: 'all 0.4s ease',
                            '&:hover': {
                              backgroundColor: 'blue.light',
                              transition: 'all 0.4s ease'
                            }
                          }}
                          loading={isSubmitting}
                        >
                          Send
                        </LoadingButton>
                      </Stack>
                    </Card>
                  </Box>
                </Grid>
              </Form>
            </FormikProvider>
          </Box>
        </Container>
      </RootStyle>
    </>
  );
}
