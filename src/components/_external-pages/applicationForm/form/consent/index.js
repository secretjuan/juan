/* eslint-disable */
import { useState, useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { Box, Stack, Typography, TextField, Select, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import { fData, fCamelCase } from 'utils/formatNumber';
// components
import { UploadAvatar } from 'components/upload';

import onboard_api from '../../../../../api/user';

const image_bucket = process.env.REACT_APP_AWS_URI;
const HIRING = [
  { label: 'Employee Referral', image: '', value: 'A' },
  { label: 'Government ADS (PESO / Barangay)', image: '', value: 'B' },
  { label: 'Job Portal (Indeed, Trabahanap, Jobstreet, Bestjobs, Linked-in etc.)', image: '', value: 'C' },
  { label: 'Social Media (Posted in FB page)', image: '', value: 'D' },
  { label: 'Walk-in', image: '', value: 'E' }
];

export default function ConsentForm({ stored, openSworn, onNext, onStoreData, sworn, isReview }) {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isUploaded, setUpload] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [fields, setFields] = useState([]);

  const store = stored.consent ? stored.consent : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stored]);

  const handleSworn = () => {
    openSworn();
  };

  const handleDataPrivacy = () => {
    window.open("https://bit.ly/3bPlmPB", "_blank")
  };

  const handleDropAvatar = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      setAvatarUrl({
        ...file,
        preview: URL.createObjectURL(file),
        file
      });
    }
  }, []);

  const Schema = Yup.object().shape({
    person_findHiring: Yup.string().required('Where did you find our hiring is required'),
    invited_by: Yup.boolean(),
    referral_name: Yup.string(),
    person_landmark_address: Yup.string().required('Landmark address is required'),
    pref_objective: Yup.string().required('Application letter is required'),
    pref_image: Yup.string(),
    sworn: Yup.boolean()
  });

  const formik = useFormik({
    initialValues: {
      person_findHiring: store.person_findHiring || '',
      invited_by: store.invited_by || false,
      referral_name: store.referral_name || '',
      person_landmark_address: store.person_landmark_address || '',
      pref_objective: store.pref_objective || '',
      pref_image: store.pref_image || '',
      sworn: sworn || false
    },
    enableReinitialize: true,
    validationSchema: Schema,
    onSubmit: async (values) => {
      setLoading(true);
      let isComplete = true;
      let data = [];
      const fieldRequired = [];

      if (values.person_findHiring === undefined || values.person_findHiring === '') {
        alert('Where did you find our hiring?');
        return setLoading(false);
      }
      if (!store.pref_image) {
        if (!avatarUrl.file) {
          setLoading(false);
          return alert('No Profile image selected');
        }
      }

      await Object.keys(values).forEach((item) => {
        const field = values[item];

        if (item === 'referral_name' || item === 'invited_by' || item === 'pref_image') return '';
        if (!field) {
          isComplete = false;
          fieldRequired.push(`Required field ${fCamelCase(item)}`);
        }

        return true;
      });

      if (!isComplete) {
        setFields(fieldRequired);
        setLoading(false);
        return false;
      }

      data = {
        person_findHiring: values.person_findHiring || '',
        invited_by: values.invited_by || false,
        referral_name: values.referral_name || '',
        person_landmark_address: values.person_landmark_address || '',
        pref_objective: values.pref_objective || '',
        pref_image: '',
        sworn: values.sworn || false
      };
      if (!store.pref_image) {
        const upload_image = await onboard_api.request_upload_url(avatarUrl.file);
        if (!upload_image) {
          setLoading(false);
          return alert('Something went wrong in uploading your image.');
        }

        data['pref_image'] = upload_image;
      } else {
        data['pref_image'] = store.pref_image;
      }
      console.log(privacy)
      if (!privacy) {
        alert("Please check and agree with the data privacy form agreement")
        setLoading(false)
      }
      else {
        await onStoreData(data, 'consent');
        await onNext();
        return true;  
      }
      
    }
  });

  const { errors, values, touched, handleSubmit, getFieldProps } = formik;

  const handleUploadNew = () => {
    setUpload(true);
  };

  const handleUploadNewCancel = () => {
    setUpload(false);
  };

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value)
  } 

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={5} sx={{ width: { md: '75%', sm: '50%' }, mt: { md: 10, sm: 10, xs: 5 } }}>
          <Box sx={{ textAlign: 'left' }}>
            <Stack sx={{ mt: 2 }} direction={{ xs: 'column', sm: 'column' }} spacing={2}>
              <Box sx={{ my: 1, display: 'block' }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  Where did you find our hiring?
                </Typography>
                <Select native {...getFieldProps('person_findHiring')} value={values.person_findHiring} sx={{ mt: 1 }}>
                  <option selected value="" key="initial_person_findHiring" disabled>
                    Select
                  </option>
                  {HIRING.map((v, k) => (
                    <option key={k} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </Select>

                <Box>
                  <FormControlLabel
                    sx={{ mb: 3 }}
                    checked={formik.values.invited_by}
                    control={<Checkbox color="primary" {...getFieldProps('invited_by')} />}
                    label={
                      <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                        Invited by
                      </Typography>
                    }
                  />
                  {formik.values.invited_by && (
                    <>
                      <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                        Name of referral
                      </Typography>
                      <TextField
                        fullWidth
                        sx={{ mt: 1 }}
                        label="Referral Name"
                        {...getFieldProps('referral_name')}
                        error={Boolean(touched.referral_name && errors.referral_name)}
                        helperText={touched.referral_name && errors.referral_name}
                      />
                    </>
                  )}
                </Box>
              </Box>

              <Box sx={{ my: 1 }}>
                <Typography variant="body1" sx={{ mb: 0, fontWeight: '400', opacity: 0.65 }}>
                  Write your full address and landmark of your present home town.
                </Typography>
                <Typography variant="body2" sx={{ mt: '0 !important', mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  ex: 5TH floor FERN building P. Paredes St. Sampaloc Manila / Near at PRC beside FEU TECH
                </Typography>
                <TextField
                  fullWidth
                  label="Search Location"
                  {...getFieldProps('person_landmark_address')}
                  sx={{ mt: 1 }}
                  error={Boolean(touched.person_landmark_address && errors.person_landmark_address)}
                  helperText={touched.person_landmark_address && errors.person_landmark_address}
                />
              </Box>
            </Stack>
          </Box>

          <Typography variant="body1" sx={{ mt: 3, fontWeight: '400', textAlign: 'left', opacity: 0.65 }}>
            Resume Picture
          </Typography>
          <Typography
            variant="caption"
            sx={{ mt: '0 !important', mb: 0, fontWeight: '400', textAlign: 'left', color: 'grey', opacity: 0.65 }}
          >
            Please upload a professional portrait that clearly shows your face Note: 2x2 Size and White Background
          </Typography>

          <Box
            sx={{
              textAlign: 'left',
              width: '25%',
              marginLeft: 'auto'
            }}
          >
            {typeof store.pref_image === 'undefined' ||
              (!isUploaded && (
                <>
                  <Box
                    src={`${image_bucket}/${store.pref_image}`}
                    component="img"
                    width={120}
                    height={120}
                    sx={{ objectFit: 'cover', objectPosition: 'center', borderRadius: 120, margin: '1rem auto' }}
                  />
                  {!isReview && (
                    <Stack direction="row" sx={{ justifyContent: 'center', my: 4 }}>
                      <Button variant="contained" onClick={handleUploadNew}>
                        Change picture
                      </Button>
                    </Stack>
                  )}
                </>
              ))}

            {store.length <= 0 && (
              <UploadAvatar
                accept="image/*"
                file={avatarUrl}
                onDrop={handleDropAvatar}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            )}
            {isUploaded && (
              <Stack direction="row" sx={{ justifyContent: 'center', my: 4 }}>
                <Button variant="outlined" onClick={handleUploadNewCancel}>
                  Cancel changing
                </Button>
              </Stack>
            )}
          </Box>
          <TextField
            label="Application Letter"
            key="pref_objective"
            rows={6}
            fullWidth
            multiline
            sx={{ mt: 3 }}
            {...getFieldProps('pref_objective')}
          />

          <FormControlLabel
            sx={{ mb: 1, mt: 1 }}
            {...(isReview ? { checked: true } : { checked: sworn })}
            control={<Checkbox color="primary" {...getFieldProps('sworn')} />}
            label={
              <Typography
                variant="body2"
                align="left"
                sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', mt: '0 !important' }}
              >
                I have read the{' '}
                <Button
                  variant="text"
                  onClick={handleSworn}
                  sx={{
                    p: '0 !important',
                    height: 'auto !important',
                    minWidth: 'auto !important',
                    ml: 1,
                    color: 'blue.main'
                  }}
                >
                  Sworn statement
                </Button>
              </Typography>
            }
          />
          <FormControlLabel
            sx={{ mb: 3, mt: '0 !important'}}
            checked={privacy}
            control={<Checkbox color="primary" {...getFieldProps('sworn')} onChange={(e) => handlePrivacyChange(e)} />}
            
            label={
              <Typography
                variant="body2"
                align="left"
                sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', mt: '0 !important' }}
              >
                By using this form you agree 
                with the storage and handling of your data by 
                this website in accordance with our
                <Button
                  variant="text"
                  onClick={handleDataPrivacy}
                  sx={{
                    p: '0 !important',
                    height: 'auto !important',
                    minWidth: 'auto !important',
                    ml: 1,
                    color: 'blue.main'
                  }}
                >
                  Data Privacy
                </Button>
              </Typography>
            }
          />
          {!isReview && (
            <>
              <Box sx={{ textAlign: 'left' }}>
                {fields &&
                  fields.length > 0 &&
                  fields.map((value, key) => (
                    <Typography variant="overline" component="p" key={key} sx={{ color: 'red' }}>
                      {value}
                    </Typography>
                  ))}
              </Box>
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
