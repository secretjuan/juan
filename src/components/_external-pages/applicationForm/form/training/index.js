/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { Box, Stack, Typography, TextField, Divider } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

export default function TrainingForm({ stored, onNext, onStoreData, isReview }) {
  const [isLoading, setLoading] = useState(false);

  const store = stored.training ? stored.training : undefined;

  const Schema = Yup.object().shape({
    person_training_details: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(' Date Started-End / Number of Hours/ Months required or put N/A'),
    person_sponsor: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Conducted/Sponsored required or put N/A'),
    person_convicted: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Conducted/Sponsored by required or put N/A if none')
  });

  const formik = useFormik({
    initialValues: {
      person_training_details: store?.person_training_details || '',
      person_sponsor: store?.person_sponsor || '',
      person_convicted: store?.person_convicted || ''
    },
    enableReinitialize: true,
    validationSchema: Schema,
    onSubmit: async (values) => {
      setLoading(true);
      let isComplete = true;

      Object.keys(values).forEach((item) => {
        const field = values[item];
        if (!field) {
          isComplete = false;
        }

        return true;
      });

      if (!isComplete) {
        return false;
      }

      const data = {
        person_training_details: values.person_training_details || '',
        person_sponsor: values.person_sponsor || '',
        person_convicted: values.person_convicted || ''
      };

      onStoreData(data, 'training');
      onNext();
      return true;
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={5} sx={{ width: { md: '100%', sm: '100%' }, textAlign: 'left', mt: 10 }}>
          {/* Training Information */}
          <Divider sx={{ my: 2 }}>
            <Typography variant="overline">Training information</Typography>
          </Divider>
          <Stack direction={{ md: 'column', sm: 'column', xs: 'row' }} sx={{ width: '100%', minWidth: '100%' }}>
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400' }}>
                Conducted/Sponsored by
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: '400' }}>
                ex. TESDA
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_sponsor')}
                error={Boolean(touched.person_sponsor && errors.person_sponsor)}
                helperText={touched.person_sponsor && errors.person_sponsor}
              />
            </Box>
            <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400' }}>
                Date Started-End / Number of Hours/ Months
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: '400' }}>
                ex: January - March 2020 / 3 months
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_training_details')}
                error={Boolean(touched.person_training_details && errors.person_training_details)}
                helperText={touched.person_training_details && errors.person_training_details}
              />
            </Box>
          </Stack>

          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'column' }}
            sx={{ width: '50%', minWidth: '50%', mt: '1rem !important' }}
          >
            <Box component="div" sx={{ width: '100%', mt: 4 }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400' }}>
                Have you ever been charged or convicted of any crime or violation of any law
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: '400' }}>
                If YES, please give details if NONE Write N/A
              </Typography>
              <TextField
                fullWidth
                rows={6}
                multiline
                {...getFieldProps('person_convicted')}
                error={Boolean(touched.person_convicted && errors.person_convicted)}
                helperText={touched.person_convicted && errors.person_convicted}
              />
            </Box>
          </Stack>
          {!isReview && (
            <>
              <Box sx={{ mt: 10 }} component="div" />
              <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
                <Box
                  sx={{
                    mx: { md: 1, sm: 1, xs: 0 },
                    width: { md: '25%', sm: '25%', xs: '100%' }
                  }}
                >
                  <LoadingButton
                    fullWidth
                    size="large"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                    sx={{
                      backgroundColor: 'blue.main',
                      boxShadow: '1px solid #000',
                      '&:hover': {
                        transition: 'all 0.4s ease',
                        backgroundColor: 'blue.light'
                      }
                    }}
                  >
                    Continue
                  </LoadingButton>
                </Box>
              </Stack>
            </>
          )}
        </Stack>
      </Form>
    </FormikProvider>
  );
}
