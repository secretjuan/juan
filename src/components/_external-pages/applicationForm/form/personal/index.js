/* eslint-disable */
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { fCamelCase } from 'utils/formatNumber';
// material
import { Box, Stack, Typography, TextField, Select, Checkbox, FormControlLabel, Divider } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
var moment = require('moment');
const SEX = [
  { label: 'Male', image: '', value: 'male' },
  { label: 'Female', image: '', value: 'female' },
  { label: "I'd rather not say", image: '', value: "I'd rather not say" }
];

const CIVIL_STATUS = [
  { label: 'Single', image: '', value: 'single' },
  { label: 'Married', image: '', value: 'married' },
  { label: 'Widow', image: '', value: 'widow' },
  { label: 'Separated', image: '', value: 'separated' },
  { label: 'Annulled', image: '', value: 'anulled' },
  { label: 'In-Relationship', image: '', value: 'in-relationship' }
];

export default function PersonalForm({ stored, onNext, onStoreData, isReview }) {
  const [isLoading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [blk, setBlk] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [date, setDate] = useState();
  useEffect(() => {
    let eighteenYearsAgo = new Date();
    eighteenYearsAgo = eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear()-18);
    setDate(moment(eighteenYearsAgo).format("YYYY-MM-DD"))
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stored]);
  const store = stored.personal ? stored.personal : undefined;
  const Schema = Yup.object().shape({
    person_fname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    person_lname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    person_mname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Middle name required'),
    person_sex: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Gender required'),
    person_civil_status: Yup.string().required('Civil status required'),
    person_birthdate: Yup.string().required('Birth date required'),
    person_age: Yup.string(),
    person_permanent_address_street_blk_pres: Yup.string().required('Permanent address block no required'),
    person_permanent_address_street: Yup.string().required('Permanent street address required'),
    person_permanent_address_zipcode: Yup.string().required('Permanent zip code required'),
    person_permanent_address_city: Yup.string().required('Permanent city required'),
    person_present_address_street_blk: Yup.string(),
    person_present_address_street: Yup.string(),
    person_present_address_zipcode: Yup.string(),
    person_present_address_city: Yup.string(),
    person_tin: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('TIN number required or/ put N/A'),
    person_pagibig: Yup.string().min(2, 'Too Short!').required('PAGIBIG number required or put N/A'),
    person_phlhealth: Yup.string().min(2, 'Too Short!').required('PHIL-Health number required or put N/A'),
    person_sss: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('SSS number required or put N/A'),
    person_email: Yup.string().email('Email must be a valid email address').required('Email address required'),
    person_contact_no_mob: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Contact no. required'),
    person_emergency_name: Yup.string().min(2, 'Too Short!').required('Emergency name required or/ put N/A'),
    person_emergency_contact_no: Yup.string()
      .min(2, 'Too Short!')
      .required('Emergency contact no required or/ put N/A'),
    person_emergency_relationship: Yup.string()
      .min(2, 'Too Short!')
      .required('Emergency relationship required or/ put N/A')
  });

  const formik = useFormik({
    initialValues: {
      same_present_address: store.same_present_address || false,
      person_fname: store.person_fname || '',
      person_lname: store.person_lname || '',
      person_mname: store.person_mname || '',
      person_sex: store.person_sex || '',
      person_civil_status: store.person_civil_status || '',
      person_birthdate: store.person_birthdate || '',
      person_age: store.person_age || '',
      person_present_address_street_blk: store.person_present_address_street_blk || '',
      person_present_address_street: store.person_present_address_street || '',
      person_present_address_zipcode: store.person_present_address_zipcode || '',
      person_present_address_city: store.person_present_address_city || '',
      person_permanent_address_street_blk_pres: store.person_permanent_address_street_blk_pres || '',
      person_permanent_address_street: store.person_permanent_address_street || '',
      person_permanent_address_zipcode: store.person_permanent_address_zipcode || '',
      person_permanent_address_city: store.person_permanent_address_city || '',
      person_tin: store.person_tin || '',
      person_pagibig: store.person_pagibig || '',
      person_phlhealth: store.person_phlhealth || '',
      person_sss: store.person_sss || '',
      person_email: store.person_email || '',
      person_contact_no_mob: store.person_contact_no_mob || '',
      person_emergency_name: store.person_emergency_name || '',
      person_emergency_contact_no: store.person_emergency_contact_no || '',
      person_emergency_relationship: store.person_emergency_relationship || ''
    },
    enableReinitialize: true,
    validationSchema: Schema,
    onSubmit: async (values) => {
      setLoading(true);
      let isComplete = true;
      const fieldRequired = [];

      Object.keys(values).forEach((item) => {
        const field = values[item];

        if (
          item === 'same_present_address' ||
          item === 'person_present_address_street_blk' ||
          item === 'person_present_address_street' ||
          item === 'person_present_address_zipcode' ||
          item === 'person_present_address_city'
        ) {
          return true;
        }

        if (item === 'person_age' && field < 18) {
          fieldRequired.push(`Age requirement exceeds ${fCamelCase(item)}`);
          isComplete = false;
        }

        if (!field) {
          if (item === 'same_present_address') {
            return true;
          }

          fieldRequired.push(`Required field ${fCamelCase(item)}`);
          isComplete = false;
        }

        return true;
      });

      if (!isComplete) {
        setFields(fieldRequired);
        setLoading(false);
        return false;
      }

      const data = {
        person_fname: values.person_fname || '',
        person_lname: values.person_lname || '',
        person_mname: values.person_mname || '',
        person_sex: values.person_sex || '',
        person_civil_status: values.person_civil_status || '',
        person_birthdate: values.person_birthdate || '',
        person_age: values.person_age || '',
        person_present_address_street_blk: values.person_present_address_street_blk || '',
        person_present_address_street: values.person_present_address_street || '',
        person_present_address_zipcode: values.person_present_address_zipcode || '',
        person_present_address_city: values.person_present_address_city || '',
        person_permanent_address_street_blk_pres: values.person_permanent_address_street_blk_pres || '',
        person_permanent_address_street: values.person_permanent_address_street || '',
        person_permanent_address_zipcode: values.person_permanent_address_zipcode || '',
        person_permanent_address_city: values.person_permanent_address_city || '',
        person_tin: values.person_tin || '',
        person_pagibig: values.person_pagibig || '',
        person_phlhealth: values.person_phlhealth || '',
        person_sss: values.person_sss || '',
        person_email: values.person_email || '',
        person_contact_no_mob: values.person_contact_no_mob || '',
        person_emergency_name: values.person_emergency_name || '',
        person_emergency_contact_no: values.person_emergency_contact_no || '',
        person_emergency_relationship: values.person_emergency_relationship || ''
      };
      if (values.same_present_address) {
        data.same_present_address = true;
        data.person_present_address_street_blk_pres = values.person_permanent_address_street_blk_pres;
        data.person_present_address_street = values.person_permanent_address_street;
        data.person_present_address_zipcode = values.person_permanent_address_zipcode;
        data.person_present_address_city = values.person_permanent_address_city;
      } 
      else {
        data.same_present_address = false;
        data.person_present_address_street_blk = blk;
        data.person_present_address_street = street; 
        data.person_present_address_zipcode = zip;
        data.person_present_address_city = city;
        if (
          data.person_present_address_street_blk === '' ||
          data.person_present_address_street_blk === undefined
        ) {
          data.person_present_address_street_blk = 'N/A';
        }
        if (data.person_present_address_street === '' || data.person_present_address_street === undefined) {
          data.person_present_address_street = 'N/A';
        }
        if (data.person_present_address_zipcode === '' || data.person_present_address_zipcode === undefined) {
          data.person_present_address_street = 'N/A';
        }
        if (data.person_present_address_city === '' || data.person_present_address_city === undefined) {
          data.person_present_address_city = 'N/A';
        }
      }
      setLoading(false);
      onStoreData(data, 'personal');
      onNext();
      return true;
    }
  });

  const { errors, values, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

  function getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
  }

  const handleAgeValue = (value) => {
    const dob = new Date(value);
    const today = new Date();
    const age = getAge(dob)
    //const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 18) {
      setFieldValue('person_birthdate', '');
      setFieldValue('person_age', '');
      return alert('You are not qualified for the age requirement');
    }
    setFieldValue('person_birthdate', value);
    setFieldValue('person_age', age);
    return '';
  };
  const handleChange = (e) => {
    if (e.target.checked) {
      setBlk(values.person_permanent_address_street_blk_pres)
      setCity(values.person_permanent_address_city);
      setStreet(values.person_permanent_address_street);
      setZip(values.person_permanent_address_zipcode);      
    }
    else {
      setBlk("");
      setCity("");
      setStreet("");
      setZip("");
    }
    
  }
  useEffect(() => {
    if (values.same_present_address) {
        setBlk(values.person_permanent_address_street_blk_pres);
        setCity(values.person_permanent_address_city);
        setStreet(values.person_permanent_address_street);
        setZip(values.person_permanent_address_zipcode); 
    }
    else {
      if (values.person_present_address_street !== "" || values.person_present_address_zipcode !== "" || values.person_present_address_city !== "" || values.person_present_address_street_blk !== "") {
        setBlk(values.person_present_address_street_blk);
        setCity(values.person_present_address_city);
        setStreet(values.person_present_address_street);
        setZip(values.person_present_address_zipcode);   
      }
      else {
        setBlk("");
        setCity("");
        setStreet("");
        setZip("");
      }

    }  
  }, []);

  const textFieldSX = {
      input: {
          "-webkit-text-fill-color": `black !important`,
          color: `black !important`,
      },
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} validateOnChange={true} validateOnBlur={false}>
        <Stack spacing={5} sx={{ width: { md: '100%', sm: '100%' }, textAlign: 'left', mt: 10 }}>
          {/* Basic Information */}
          <Divider sx={{ my: 5 }}>
            <Typography variant="overline">Basic information</Typography>
          </Divider>
          <Stack direction={{ md: 'column', sm: 'column', xs: 'row' }} sx={{ width: '100%', minWidth: '100%' }}>
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                First name
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_fname')}
                error={Boolean(touched.person_fname && errors.person_fname)}
                helperText={touched.person_fname && errors.person_fname}
              />
            </Box>

            <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Middle name
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_mname')}
                error={Boolean(touched.person_mname && errors.person_mname)}
                helperText={touched.person_mname && errors.person_mname}
              />
            </Box>

            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Last name
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_lname')}
                error={Boolean(touched.person_lname && errors.person_lname)}
                helperText={touched.person_lname && errors.person_lname}
              />
            </Box>
          </Stack>
          {/* Secondary Information */}
          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '68%', minWidth: '68%', mt: '1rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Sex
              </Typography>
              <Select native {...getFieldProps('person_sex')} fullWidth value={values.person_sex}>
                <option selected value="" key="initial_person_sex" disabled>
                  Select
                </option>
                {SEX.map((v, k) => (
                  <option key={k} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </Select>
            </Box>
            <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Civil Status
              </Typography>
              <Select native {...getFieldProps('person_civil_status')} fullWidth value={values.person_civil_status}>
                <option selected value="" key="initial_person_civil_status" disabled>
                  Select
                </option>
                {CIVIL_STATUS.map((v, k) => (
                  <option key={k} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </Select>
            </Box>
          </Stack>
          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '68%', minWidth: '68%', mt: '1rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Birthdate
              </Typography>
              <TextField
                fullWidth
                type="date"
                InputProps={{ inputProps: { min: '1900-12-31', max: date } }}
                {...getFieldProps('person_birthdate')}
                onChange={(e) => handleAgeValue(e.target.value)}
                error={Boolean(touched.person_birthdate && errors.person_birthdate)}
                helperText={touched.person_birthdate && errors.person_birthdate}
              />
            </Box>
            <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Age
              </Typography>
              <TextField
                fullWidth
                InputProps={{ inputProps: { min: 18, readOnly: true, fontColor: "black" }}}
                {...getFieldProps('person_age')}
                type="number"
                error={Boolean(touched.person_age && errors.person_age)}
                helperText={touched.person_age && errors.person_age}
              />
            </Box>
          </Stack>
          <br />
          <br />
          {/* Permanent Address Information */}
          <Divider>
            <Typography variant="overline">Permanent Address</Typography>
          </Divider>
          <br />
          
          <Stack sx={{ mt: '0rem !important' }} direction={{ xs: 'column', sm: 'column' }} spacing={2}>
            <Stack
              direction={{ md: 'column', sm: 'column', xs: 'row' }}
              sx={{ width: '100%', minWidth: '100%', mt: 2 }}
            >
              <Box component="div" sx={{ width: '100%' }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  Blk # /Lot # / House Number
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('person_permanent_address_street_blk_pres')}
                  error={Boolean(
                    touched.person_permanent_address_street_blk_pres && errors.person_permanent_address_street_blk_pres
                  )}
                  helperText={
                    touched.person_permanent_address_street_blk_pres && errors.person_permanent_address_street_blk_pres
                  }
                />
              </Box>

              <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  Street name / Building Name
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('person_permanent_address_street')}
                  error={Boolean(touched.person_permanent_address_street && errors.person_permanent_address_street)}
                  helperText={touched.person_permanent_address_street && errors.person_permanent_address_street}
                />
              </Box>
              <Box component="div" sx={{ width: '100%' }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  City
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('person_permanent_address_city')}
                  error={Boolean(touched.person_permanent_address_city && errors.person_permanent_address_city)}
                  helperText={touched.person_permanent_address_city && errors.person_permanent_address_city}
                />
              </Box>
              <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  Zip Code
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('person_permanent_address_zipcode')}
                  error={Boolean(touched.person_permanent_address_zipcode && errors.person_permanent_address_zipcode)}
                  helperText={touched.person_permanent_address_zipcode && errors.person_permanent_address_zipcode}
                />
              </Box>
            </Stack>
          </Stack>
          <br />
          <br />
          {/* Present Address Information */}
          <>
            <Divider sx={{ mb: 5, mt: 5 }}>
              <Typography variant="overline">Present Address</Typography>
            </Divider>
            <Box sx={{ my: '0 !important', display: 'block' }}>
              <Box onChange={(e) => handleChange(e)}>
                <FormControlLabel
                  sx={{ mb: 1 }}
                  checked={formik.values.same_present_address}
                  control={<Checkbox color="primary" {...getFieldProps('same_present_address')} />}
                  
                  label={
                    <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                      Same as permanent Address
                    </Typography>
                  }
                />
              </Box>
            </Box>
            <Stack sx={{ mt: '1rem !important' }} direction={{ xs: 'column', sm: 'column' }} spacing={2}>
              <Stack
                direction={{ md: 'column', sm: 'column', xs: 'row' }}
                sx={{ width: '100%', minWidth: '100%', mt: '1rem !important' }}
              >
                <Box component="div" sx={{ width: '100%' }}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                    Blk # /Lot # / House Number
                  </Typography>
                  <TextField
                    fullWidth
                    {...getFieldProps('person_present_address_street_blk_pres')}
                    error={Boolean(
                      touched.person_present_address_street_blk_pres && errors.person_present_address_street_blk_pres
                    )}
                    helperText={touched.person_present_address_street_blk_pres && errors.person_present_address_street_blk_pres}
                    onChange={(e) => setBlk(e.target.value)}
                    value={blk}
                    disabled={formik.values.same_present_address}
                    sx={textFieldSX}
                  />
                </Box>

                <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                    Street name / Building Name
                  </Typography>
                  <TextField
                    fullWidth
                    {...getFieldProps('person_present_address_street')}
                    error={Boolean(touched.person_present_address_street && errors.person_present_address_street)}
                    helperText={touched.person_present_address_street && errors.person_present_address_street}
                    onChange={(e) => setStreet(e.target.value)}
                    value={street}
                    disabled={formik.values.same_present_address}
                    sx={textFieldSX}
                  />
                </Box>
                <Box component="div" sx={{ width: '100%' }}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                    City
                  </Typography>
                  <TextField
                    fullWidth
                    {...getFieldProps('person_present_address_city')}
                    error={Boolean(touched.person_present_address_city && errors.person_present_address_city)}
                    helperText={touched.person_present_address_city && errors.person_present_address_city}
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    disabled={formik.values.same_present_address}
                    sx={textFieldSX}
                  />
                </Box>
                <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                    Zip Code
                  </Typography>
                  <TextField
                    fullWidth
                    {...getFieldProps('person_present_address_zipcode')}
                    error={Boolean(touched.person_present_address_zipcode && errors.person_present_address_zipcode)}
                    helperText={touched.person_present_address_zipcode && errors.person_present_address_zipcode}
                    onChange={(e) => setZip(e.target.value)}
                    value={zip}
                    disabled={formik.values.same_present_address}
                    sx={textFieldSX}
                  />
                </Box>
              </Stack>
            </Stack>
          </>
          <br /> <br />
          {/* Goverment Id Information */}
          <Divider sx={{ my: 5 }}>
            <Typography variant="overline">Government ID</Typography>
          </Divider>
          <br />
          <Stack
            sx={{ mt: '1rem !important', width: { md: '50%', sm: '50%', xs: '100%' } }}
            direction={{ xs: 'column', sm: 'column' }}
            spacing={2}
          >
            <Stack
              direction={{ md: 'column', sm: 'column', xs: 'row' }}
              sx={{ width: '100%', minWidth: '100%', mt: '0 !important' }}
            >
              <Box component="div" sx={{ width: '100%' }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  TIN Number
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('person_tin')}
                  inputProps={{ maxLength: 9 }}
                  error={Boolean(touched.person_tin && errors.person_tin)}
                  helperText={touched.person_tin && errors.person_tin}
                />
              </Box>

              <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  PAGIBIG Number
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('person_pagibig')}
                  inputProps={{ maxLength: 12 }}
                  error={Boolean(touched.person_pagibig && errors.person_pagibig)}
                  helperText={touched.person_pagibig && errors.person_pagibig}
                />
              </Box>
            </Stack>
            <Stack
              direction={{ md: 'column', sm: 'column', xs: 'row' }}
              sx={{ width: '100%', minWidth: '100%', mt: '2rem !important' }}
            >
              <Box component="div" sx={{ width: '100%' }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  PHILHealth number
                </Typography>
                <TextField
                  fullWidth
                  inputProps={{ maxLength: 12 }}
                  {...getFieldProps('person_phlhealth')}
                  error={Boolean(touched.person_phlhealth && errors.person_phlhealth)}
                  helperText={touched.person_phlhealth && errors.person_phlhealth}
                />
              </Box>

              <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  SSS number
                </Typography>
                <TextField
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                  {...getFieldProps('person_sss')}
                  error={Boolean(touched.person_sss && errors.person_sss)}
                  helperText={touched.person_sss && errors.person_sss}
                />
              </Box>
            </Stack>
          </Stack>
          <br />
          <br />
          {/* Contact Information */}
          <Divider sx={{ mt: 10, mb: 4 }}>
            <Typography variant="overline">Contact information</Typography>
          </Divider>
          <br />
          <Stack
            sx={{ mt: '1rem !important', width: { md: '50%', sm: '50%', xs: '100%' } }}
            direction={{ xs: 'column', sm: 'column' }}
            spacing={2}
          >
            <Stack
              direction={{ md: 'column', sm: 'column', xs: 'row' }}
              sx={{ width: '100%', minWidth: '100%', mt: '0 !important' }}
            >
              <Box component="div" sx={{ width: '100%' }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('person_email')}
                  error={Boolean(touched.person_email && errors.person_email)}
                  helperText={touched.person_email && errors.person_email}
                />
              </Box>

              <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  Contact No. / Mobile No.
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('person_contact_no_mob')}
                  error={Boolean(touched.person_contact_no_mob && errors.person_contact_no_mob)}
                  helperText={touched.person_contact_no_mob && errors.person_contact_no_mob}
                />
              </Box>
            </Stack>
          </Stack>
          {/* Emergency Information */}
          <br />
          <br />
          <Divider sx={{ my: 5 }}>
            <Typography variant="overline">Emergency Contact</Typography>
          </Divider>
          <br />
          <Stack
            sx={{ mt: '1rem !important', width: { md: '75%', sm: '75%', xs: '100%' } }}
            direction={{ xs: 'column', sm: 'column' }}
            spacing={2}
          >
            <Stack
              direction={{ md: 'column', sm: 'column', xs: 'row' }}
              sx={{ width: '100%', minWidth: '100%', mt: '0 !important' }}
            >
              <Box component="div" sx={{ width: '100%' }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  Name (ex: Juan dela cruz)
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('person_emergency_name')}
                  error={Boolean(touched.person_emergency_name && errors.person_emergency_name)}
                  helperText={touched.person_emergency_name && errors.person_emergency_name}
                />
              </Box>

              <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  Relationship (ex: Father / Mother )
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('person_emergency_relationship')}
                  error={Boolean(touched.person_emergency_relationship && errors.person_emergency_relationship)}
                  helperText={touched.person_emergency_relationship && errors.person_emergency_relationship}
                />
              </Box>

              <Box component="div" sx={{ width: '100%' }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                  Contact No. (ex: 09123456789 )
                </Typography>
                <TextField
                  fullWidth
                  {...getFieldProps('person_emergency_contact_no')}
                  error={Boolean(touched.person_emergency_contact_no && errors.person_emergency_contact_no)}
                  helperText={touched.person_emergency_contact_no && errors.person_emergency_contact_no}
                />
              </Box>
            </Stack>
          </Stack>
          {!isReview && (
            <>
              <Box sx={{ mt: 10 }} component="div" />
              <Box sx={{ textAlign: 'left' }}>
                {fields &&
                  fields.length > 0 &&
                  fields.map((value, key) => (
                    <Typography variant="overline" component="p" key={key} sx={{ color: 'red' }}>
                      {value}
                    </Typography>
                  ))}
              </Box>

              <Stack direction={'row'} sx={{ justifyContent: 'flex-end' }}>
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
