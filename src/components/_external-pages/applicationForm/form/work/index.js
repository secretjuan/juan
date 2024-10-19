/* eslint-disable */
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { Box, Stack, Typography, TextField, Divider, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Icon } from '@iconify/react';
import plusIcon from '@iconify/icons-eva/plus-circle-outline';
import minusIcon from '@iconify/icons-eva/minus-circle-outline';

export default function WorkForm({ stored, onNext, onStoreData, isReview }) {
  const [isLoading, setLoading] = useState(false);
  const [referenceField, setReferenceField] = useState([
    {
      person_contact_name: '',
      person_contact_address: '',
      person_contact_no: '',
      person_contact_position: '',
    }
  ]);
  const [checked, setChecked] = useState(false);
  const [showing, setShowing] = useState(true);
  const store = stored.work ? stored.work : [];
  const load = () => {
    let loopItem = [];
    store.person_contact_name &&
      Object.values(store['person_contact_name']).forEach((item, index) => {
        loopItem.push({
          person_contact_name: item,
          person_contact_address: store['person_contact_address'][index],
          person_contact_no: store['person_contact_no'][index],
          person_contact_position: store['person_contact_position'][index]
        });
      });
    setReferenceField(loopItem);

/*    if (store.fresh_graduate) {
      setChecked(true);
    }*/
  };

  const addReference = async () => {
    setReferenceField([
      ...referenceField,
      {
        person_contact_name: '',
        person_contact_address: '',
        person_contact_no: '',
        person_contact_position: ''
      }
    ]);
  };



  useEffect(() => {
    load();
  }, [stored]);

  useEffect(() => {
    setChecked(values.fresh_graduate);
    setFieldValue('fresh_graduate', values.fresh_graduate);
    setShowing(!values.fresh_graduate)
    setReferenceField([
      {
        person_contact_name: '',
        person_contact_address: '',
        person_contact_no: '',
        person_contact_position: '',
      }
    ]);
    if (store.person_position === "N/A" && store.person_place_work === "N/A" && store.person_reason_for_leaving === "N/A") {
      store.person_position = ''
      store.person_place_work = ''
      store.person_reason_for_leaving = ''
    }  
  }, []);
  let Schema
  if (!checked) {
    Schema = Yup.object().shape({
      person_position: Yup.string().min(2, 'Too Short!').max(150, 'Too Long!').required('Position is required'),
      person_startDate: Yup.date().required('Start date is required'),
      person_lastDate: Yup.date().required('Last date is required'),
      person_place_work: Yup.string().required('Place of work is required'),
      person_reason_for_leaving: Yup.string()
        .min(2, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Reason for leaving details required'),
      fresh_graduate: Yup.boolean(),
      person_contact_name: Yup.array(),
      person_contact_address: Yup.array(),
      person_contact_no: Yup.array(),
      person_contact_position: Yup.array()
    });
  } 
  else {
    Schema = Yup.object().shape({
      person_position: Yup.string(),
      person_startDate: Yup.string(),
      person_lastDate: Yup.string(),
      person_place_work: Yup.string(),
      person_reason_for_leaving: Yup.string(),
      fresh_graduate: Yup.boolean(),
      person_contact_name: Yup.array(),
      person_contact_address: Yup.array(),
      person_contact_no: Yup.array(),
      person_contact_position: Yup.array()
    });
  }
  

  const formik = useFormik({
    initialValues: {
      person_position: store.person_position || '',
      person_startDate: store.person_startDate || '',
      person_lastDate: store.person_lastDate || '',
      person_place_work: store.person_place_work || '',
      person_reason_for_leaving: store.person_reason_for_leaving || '',
      fresh_graduate: store.fresh_graduate || false,
      person_contact_name: store.person_contact_name || [],
      person_contact_address: store.person_contact_address || [],
      person_contact_no: store.person_contact_no || [],
      person_contact_position: store.person_contact_position || []
    },
    enableReinitialize: true,
    validationSchema: Schema,
    onSubmit: async (values) => {

      setLoading(true);
      
      if (values.fresh_graduate) {
        values.person_position = 'N/A'
        values.person_place_work = 'N/A'
        values.person_startDate = 'N/A'
        values.person_lastDate = 'N/A'
        values.person_reason_for_leaving = 'N/A'
      }
      let isComplete = true;

      Object.keys(values).forEach((item) => {
        const field = values[item];
        if (
          item === 'fresh_graduate' ||
          item === 'person_contact_name' ||
          item === 'person_contact_address' ||
          item === 'person_contact_no' ||
          item === 'person_contact_position'
        )
        return true;

        if (!field) {
          isComplete = false;
        }

        return true;
      });

      if (!isComplete) {
        return false;
        
      }

      const data = {
        person_position: values.person_position || 'N/A',
        person_startDate: values.person_startDate || 'N/A',
        person_lastDate: values.person_lastDate || 'N/A',
        person_place_work: values.person_place_work || 'N/A',
        person_reason_for_leaving: values.person_reason_for_leaving || '',
        fresh_graduate: values.fresh_graduate || false,
        person_contact_name: values.person_contact_name || 'N/A',
        person_contact_address: values.person_contact_address || 'N/A',
        person_contact_no: values.person_contact_no || 'N/A',
        person_contact_position: values.person_contact_position || 'N/A'
      };
      const person_contact_nameArr = [];
      const person_contact_addressArr = [];
      const person_contact_noArr = [];
      const person_contact_positionArr = [];

      if (!values.fresh_graduate) {
        referenceField.reduce(
          (obj, item) => (
            obj[item.key] === 'person_contact_name', person_contact_nameArr.push(item.person_contact_name)
          ),
          []
        );

        referenceField.reduce(
          (obj, item) => (
            obj[item.key] === 'person_contact_address', person_contact_addressArr.push(item.person_contact_address)
          ),
          []
        );

        referenceField.reduce(
          (obj, item) => (obj[item.key] === 'person_contact_no', person_contact_noArr.push(item.person_contact_no)),
          []
        );

        referenceField.reduce(
          (obj, item) => (
            obj[item.key] === 'person_contact_position', person_contact_positionArr.push(item.person_contact_position)
          ),
          []
        );

        data.person_contact_name = person_contact_nameArr.filter((x) => x !== undefined);
        data.person_contact_address = person_contact_addressArr.filter((x) => x !== undefined);
        data.person_contact_no = person_contact_noArr.filter((x) => x !== undefined);
        data.person_contact_position = person_contact_positionArr.filter((x) => x !== undefined);
      }
        onStoreData(data, 'work');
        onNext();
        return true;     
    }
  });

  const { errors, values, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleFreshGraduate = (ev) => {
    if (ev.target.checked) {
      setChecked(true);
      setFieldValue('fresh_graduate', true);
      setShowing(false);
    } else {
      setChecked(false);
      setFieldValue('fresh_graduate', false);
      setShowing(true);
    }
  };



  const removeTrigger = (idx) => {
    const list = [...referenceField];
    if (list.length !== -1) {
      if (idx === 0) {
        handleUncheck();
      } else {
        list.splice(idx, 1);
      }
    }
    setReferenceField(list);
  };

  const handleUncheck = () => {
    setChecked(false);
    setFieldValue('fresh_graduate', false);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...referenceField];
    list[index][name] = value;

    setReferenceField(list);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

        <Stack spacing={5} sx={{ width: { md: '100%', sm: '100%' }, textAlign: 'left', mt: 10 }}>
          {/* Employment's Information */}
          <Divider sx={{ my: 2 }}>
            <Typography variant="overline" sx={{ mb: '0 !important', fontWeight: 'bold' }}>
              Latest employment
            </Typography>
          </Divider>
          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '100%', minWidth: '100%', mt: '1rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <FormControlLabel
                sx={{ mb: 0 }}
                checked={formik.values.fresh_graduate}
                control={<Checkbox color="primary" checked={values.fresh_graduate} onChange={handleFreshGraduate} />}
                label={
                  <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                    Fresh Graduate
                  </Typography>
                }
              />
            </Box>
          </Stack>
          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '50%', minWidth: '50%', mt: '1rem !important' }}
            style={{ display: (showing ? 'block' : 'none') }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                Position
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                ex: Service crew / Manager / Accountant
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_position')}
                error={Boolean(touched.person_position && errors.person_position)}
                helperText={touched.person_position && errors.person_position}
                required
              />
            </Box>
          </Stack>

          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '52%', minWidth: '52%', mt: '1rem !important' }}
            
          >
            <Box component="div" sx={{ width: '100%' }} style={{ display: (showing ? 'block' : 'none') }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                Start Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                {...getFieldProps('person_startDate')}
                error={Boolean(touched.person_startDate && errors.person_startDate)}
                helperText={touched.person_startDate && errors.person_startDate}
              />
            </Box>
            <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }} style={{ display: (showing ? 'block' : 'none') }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                End Date
              </Typography>
              <TextField
                type="date"
                fullWidth
                {...getFieldProps('person_lastDate')}
                error={Boolean(touched.person_lastDate && errors.person_father_occ)}
                helperText={touched.person_lastDate && errors.person_lastDate}
              />
            </Box>
          </Stack>

          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '50%', minWidth: '50%', mt: '2rem !important' }}
            style={{ display: (showing ? 'block' : 'none') }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                Place of Work
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                ex: Jollibee G. Tuazon
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_place_work')}
                error={Boolean(touched.person_place_work && errors.person_place_work)}
                helperText={touched.person_place_work && errors.person_place_work}
              />
            </Box>
          </Stack>

          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '50%', minWidth: '50%', mt: '2rem !important' }}
            style={{ display: (showing ? 'block' : 'none') }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                Reason for Leaving
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                ex: Resigned
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_reason_for_leaving')}
                error={Boolean(touched.person_reason_for_leaving && errors.person_reason_for_leaving)}
                helperText={touched.person_reason_for_leaving && errors.person_reason_for_leaving}
              />
            </Box>
          </Stack>

          {/* Character reference */}
          <Divider sx={{ my: 2 }}>
            <Typography variant="overline" sx={{ mb: '0 !important', fontWeight: 'bold' }}>
              Character reference
            </Typography>
          </Divider>
          {values !== null && (

            <>
              {referenceField &&
                referenceField.map((field, key) => {
                  return (
                    <Stack
                      key={key}
                      direction={{ md: 'column', sm: 'column', xs: 'row' }}
                      sx={{ width: '100%', minWidth: '100%', mt: '1rem !important', alignItems: 'center' }}
                    >
                      <Box component="div" sx={{ width: '100%' }}>
                        <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                          Name
                        </Typography>
                        <Typography variant="body1" sx={{ mb: '1rem !important', fontWeight: '400', opacity: 0.65 }}>
                          (ex. Maria Torres)
                        </Typography>
                        <TextField
                          fullWidth
                          name="person_contact_name"
                          value={field.person_contact_name}
                          onChange={(e) => handleInputChange(e, key)}
                          error={Boolean(touched.person_contact_name && errors.person_contact_name)}
                          helperText={touched.person_contact_name && errors.person_contact_name}
                        />
                      </Box>

                      <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
                        <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                          Address
                        </Typography>
                        <Typography variant="body1" sx={{ mb: '1rem !important', fontWeight: '400', opacity: 0.65 }}>
                          (ex. 123 Sampaloc, Manila)
                        </Typography>
                        <TextField
                          fullWidth
                          name="person_contact_address"
                          value={field.person_contact_address}
                          onChange={(e) => handleInputChange(e, key)}
                        />
                      </Box>

                      <Box component="div" sx={{ width: '100%' }}>
                        <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                          Contact No.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: '1rem !important', fontWeight: '400', opacity: 0.65 }}>
                          (ex. Manager)
                        </Typography>
                        <TextField
                          fullWidth
                          name="person_contact_no"
                          value={field.person_contact_no}
                          onChange={(e) => handleInputChange(e, key)}
                        />
                      </Box>

                      <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
                        <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                          Position
                        </Typography>
                        <Typography variant="body1" sx={{ mb: '1rem !important', fontWeight: '400', opacity: 0.65 }}>
                          (ex. Manager)
                        </Typography>
                        <TextField
                          fullWidth
                          name="person_contact_position"
                          value={field.person_contact_position}
                          onChange={(e) => handleInputChange(e, key)}
                        />
                      </Box>

                      <Box component="div" sx={{ width: '100%' }}>
                        <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                          &nbsp;
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: '400' }}>
                          &nbsp;
                        </Typography>
                        <Stack direction="row" sx={{ alignItems: 'center' }}>
                          {key === 0 && referenceField.length !== key && (
                            <>
                              <Button
                                size="large"
                                variant="contained"
                                sx={{ boxShadow: 'none' }}
                                color="blue"
                                onClick={addReference}
                              >
                                <Icon icon={plusIcon} width={20} height={20} />
                              </Button>
                            </>
                          )}

                          {key !== 0 && (
                            <>
                              {referenceField.length !== -1 && referenceField.length > 1 && (
                                <>
                                  <Button
                                    size="large"
                                    variant="outlined"
                                    sx={{ boxShadow: 'none' }}
                                    color="blue"
                                    onClick={() => removeTrigger(key)}
                                  >
                                    <Icon icon={minusIcon} width={20} height={20} />
                                  </Button>
                                </>
                              )}
                            </>
                          )}
                        </Stack>
                      </Box>
                    </Stack>
                  );
                })}
            </>
          )}
          {!isReview && (
            <>
              <Divider sx={{ my: 2 }} />

              <Box sx={{ mt: 10 }} component="div" />
              <Stack sx={{ justifyContent: 'flex-end', float: { md: 'right', sm: 'right', xs: 'initial' } }}>
                <Box
                  sx={{
                    mx: { md: 1, sm: 1, xs: 0 },
                    ml: { md: 'auto', sm: 'auto' },
                    float: { md: 'right', sm: 'right', xs: 'initial' },
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
