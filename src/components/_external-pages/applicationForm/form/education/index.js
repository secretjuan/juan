/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { Box, Stack, Typography, TextField, Select, Checkbox, FormControlLabel } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

export default function EducationForm({ stored, onNext, onStoreData, isReview }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stored]);

  const store = stored.education ? stored.education : undefined;

  const Schema = Yup.object().shape({
    educ_elem: Yup.string().min(2, 'Too Short!').required('Elementary name required'),
    educ_elem_year: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Elementary year required'),
    educ_hs: Yup.string().min(2, 'Too Short!').required('Highschool name required'),
    educ_hs_year: Yup.number().required('Highschool year required'),
    educ_college: Yup.string(),
    educ_college_graduated: Yup.string(),
    educ_college_course: Yup.string(),
    educ_college_year: Yup.string(),
    vocational_chkbox: Yup.boolean(),
    educ_voc: Yup.string(),
    educ_voc_course: Yup.string(),
    educ_voc_year: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      vocational_chkbox: store.vocational_chkbox || '',
      educ_elem: store.educ_elem || '',
      educ_elem_year: store.educ_elem_year || '',
      educ_hs: store.educ_hs || '',
      educ_hs_year: store.educ_hs_year || '',
      educ_college: store.educ_college || '',
      educ_college_graduated: store.educ_college_graduated || '',
      educ_college_course: store.educ_college_course || '',
      educ_college_year: store.educ_college_year || '',
      educ_voc: store.educ_voc || '',
      educ_voc_course: store.educ_voc_course || '',
      educ_voc_year: store.educ_voc_year || ''
    },
    enableReinitialize: true,
    validationSchema: Schema,
    onSubmit: async (values) => {
      setLoading(true);
      let isComplete = true;

      Object.keys(values).forEach((item) => {
        const field = values[item];

        if (
          item === 'vocational_chkbox' ||
          item === 'educ_college' ||
          item === 'educ_college_graduated' ||
          item === 'educ_college_course' ||
          item === 'educ_college_year' ||
          item === 'educ_voc' ||
          item === 'educ_voc_course' ||
          item === 'educ_voc_year'
        )
          return true;

        if (!field) {
          if (item === 'vocational_chkbox') {
            return true;
          }
          isComplete = false;
        }

        return true;
      });

      if (!isComplete) {
        setLoading(false);
        return false;
      }

      const data = {
        vocational_chkbox: values.vocational_chkbox || false,
        educ_elem: values.educ_elem || '',
        educ_elem_year: values.educ_elem_year || '',
        educ_hs: values.educ_hs || '',
        educ_hs_year: values.educ_hs_year || '',
        educ_college: values.educ_college || '',
        educ_college_graduated: values.educ_college_graduated || '',
        educ_college_course: values.educ_college_course || '',
        educ_college_year: values.educ_college_year || '',
        educ_voc: values.educ_voc || '',
        educ_voc_course: values.educ_voc_course || '',
        educ_voc_year: values.educ_voc_year || ''
      };

      if (!values.vocational_chkbox) {
        data.educ_voc = 'N/A';
        data.educ_voc_course = 'N/A';
        data.educ_voc_year = 'N/A';
      }
      setLoading(false);
      onStoreData(data, 'education');
      onNext();
      return true;
    }
  });

  const { errors, values, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={5} sx={{ width: { md: '100%', sm: '100%' }, textAlign: 'left', mt: 10 }}>
          {/* Elementary Information */}
          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '68%', minWidth: '100%', mt: '1rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Elementary
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('educ_elem')}
                error={Boolean(touched.educ_elem && errors.educ_elem)}
                helperText={touched.educ_elem && errors.educ_elem}
              />
            </Box>

            <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Year Completed
              </Typography>
              <TextField
                fullWidth
                type="number"
                {...getFieldProps('educ_elem_year')}
                error={Boolean(touched.educ_elem_year && errors.educ_elem_year)}
                helperText={touched.educ_elem_year && errors.educ_elem_year}
              />
            </Box>
          </Stack>

          {/* Highschool Information */}
          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '68%', minWidth: '100%', mt: '2rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Highschool
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('educ_hs')}
                error={Boolean(touched.educ_hs && errors.educ_hs)}
                helperText={touched.educ_hs && errors.educ_hs}
              />
            </Box>

            <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Year Completed
              </Typography>
              <TextField
                fullWidth
                type="number"
                {...getFieldProps('educ_hs_year')}
                error={Boolean(touched.educ_hs_year && errors.educ_hs_year)}
                helperText={touched.educ_hs_year && errors.educ_hs_year}
              />
            </Box>
          </Stack>

          {/* College Information */}
          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '100%', minWidth: '68%', mt: '2rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                College
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('educ_college')}
                error={Boolean(touched.educ_college && errors.educ_college)}
                helperText={touched.educ_college && errors.educ_college}
              />
            </Box>

            <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Did you graduate?
              </Typography>
              <Select
                native
                {...getFieldProps('educ_college_graduated')}
                fullWidth
                value={values.educ_college_graduated}
              >
                <option selected value="" key="initial_educ_hs_mentions" disabled>
                  Select
                </option>

                <option selected value="Yes" key="0">
                  Yes
                </option>

                <option selected value="No" key="1">
                  No
                </option>
              </Select>
            </Box>
          </Stack>

          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '68%', minWidth: '100%', mt: '1rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Course / Degree
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('educ_college_course')}
                error={Boolean(touched.educ_college_course && errors.educ_college_course)}
                helperText={touched.educ_college_course && errors.educ_college_course}
              />
            </Box>

            <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Year Completed
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('educ_college_year')}
                error={Boolean(touched.educ_college_year && errors.educ_college_year)}
                helperText={touched.educ_college_year && errors.educ_college_year}
              />
            </Box>
          </Stack>

          {/* Vocational Information */}
          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '25%', minWidth: '25%', mt: '2rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <FormControlLabel
                sx={{ mb: '0 !important' }}
                checked={formik.values.vocational_chkbox}
                control={<Checkbox color="primary" {...getFieldProps('vocational_chkbox')} />}
                label={
                  <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                    Vocational
                  </Typography>
                }
              />
            </Box>
          </Stack>
          {values.vocational_chkbox && (
            <>
              <Stack
                direction={{ md: 'column', sm: 'column', xs: 'row' }}
                sx={{ width: '35%', minWidth: '35%', mt: '1rem !important' }}
              >
                <Box component="div" sx={{ width: '100%' }}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                    Name of SchooL
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                    (ex. Enderun Ph)
                  </Typography>
                  <TextField
                    fullWidth
                    {...getFieldProps('educ_voc')}
                    error={Boolean(touched.educ_voc && errors.educ_voc)}
                    helperText={touched.educ_voc && errors.educ_voc}
                  />
                </Box>
              </Stack>
              <Stack
                direction={{ md: 'column', sm: 'column', xs: 'row' }}
                sx={{ width: '75%', minWidth: '75%', mt: '2rem !important' }}
              >
                <Box component="div" sx={{ width: '100%' }}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                    Course / Degree
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                    (ex: Manila vocational school / 2 years graduate )
                  </Typography>
                  <TextField
                    fullWidth
                    {...getFieldProps('educ_voc_course')}
                    error={Boolean(touched.educ_voc_course && errors.educ_voc_course)}
                    helperText={touched.educ_voc_course && errors.educ_voc_course}
                  />
                </Box>
                <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                    Year Completed (ex. 2020)
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                    &nbsp;
                  </Typography>
                  <TextField
                    fullWidth
                    {...getFieldProps('educ_voc_year')}
                    error={Boolean(touched.educ_voc_year && errors.educ_voc_year)}
                    helperText={touched.educ_voc_year && errors.educ_voc_year}
                  />
                </Box>
              </Stack>
            </>
          )}
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
