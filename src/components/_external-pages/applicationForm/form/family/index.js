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
import { set } from 'lodash';

export default function FamilyForm({ stored, onNext, onStoreData, isReview }) {
  const [isLoading, setLoading] = useState(false);
  const [siblingsField, setSiblingsField] = useState([]);
  const [checked, setChecked] = useState(false);

  const store = stored.family ? stored.family : undefined;

  useEffect(() => {
    const load = () => {
      window.scrollTo(0, 0);
      if (store['person_sibling[]']) {
        let loopItem = [];
        Object.values(store['person_sibling[]']).forEach((item, index) => {
          loopItem.push({
            person_sibling: item,
            person_sibling_relationship: store['person_sibling_relationship[]'][index]
          });
        });
        setChecked(true);
        setSiblingsField(loopItem);
      }
    };

    load();
  }, [store]);
  const Schema = Yup.object().shape({
    person_father: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Father`s name required'),
 /*   person_father_bdate: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Father`s birthdate required'),*/
    person_father_occ: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Father`s occupation required'),
    person_mother: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Mother`s name required'),
/*    person_mother_bdate: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Mother`s birthdate required'),*/
    person_mother_occ: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Mother`s occupation required'),
    with_spouse: Yup.boolean(),
    with_sibling: Yup.boolean(),
    person_sibling: Yup.array(),
    person_sibling_relationship: Yup.array()
  });

  const formik = useFormik({
    initialValues: {
      person_father: store.person_father || '',
/*      person_father_bdate: store.person_father_bdate || '',*/
      person_father_occ: store.person_father_occ || '',
      person_mother: store.person_mother || '',
/*      person_mother_bdate: store.person_mother_bdate || '',*/
      person_mother_occ: store.person_mother_occ || '',
      person_spouse_name: store.person_spouse_name || 'N/A',
      person_spouse_occ: store.person_spouse_occ || 'N/A',
      person_spouse_child: store.person_spouse_child || 'N/A',
      with_sibling: store.with_sibling || false,
      with_spouse: store.with_spouse || false
    },
    enableReinitialize: true,
    validationSchema: Schema,
    onSubmit: async (values) => {
      // setLoading(true);
      let isComplete = true;

      Object.keys(values).forEach((item) => {
        const field = values[item];

        if (
          item === 'with_spouse' ||
          item === 'with_sibling' ||
          item === 'person_spouse_name' ||
          item === 'person_spouse_occ' ||
          item === 'person_spouse_child' ||
          item === 'person_sibling' ||
          item === 'person_sibling_relationship'
        )
          return true;

        if (!field) {
          if (item === 'with_spouse' || item === 'with_sibling') return true;
          isComplete = false;
        }

        return true;
      });

      if (!isComplete) {
        return false;
      }

      const data = {
        person_father: values.person_father || '',
        person_father_bdate: values.person_father_bdate || '',
        person_father_occ: values.person_father_occ || '',
        person_mother: values.person_mother || '',
        person_mother_bdate: values.person_mother_bdate || '',
        person_mother_occ: values.person_mother_occ || '',
        person_spouse_name: values.person_spouse_name || 'N/A',
        person_spouse_occ: values.person_spouse_occ || 'N/A',
        person_spouse_child: values.person_spouse_child || 'N/A',
        with_sibling: values.with_sibling || false,
        with_spouse: values.with_spouse || false
      };

      let person_sibling = [];
      let person_sibling_relationship = [];
      if (values.with_sibling) {
        siblingsField.filter((item) => {
          person_sibling.push(item.person_sibling);
          person_sibling_relationship.push(item.person_sibling_relationship);
        });

        data['person_sibling[]'] = person_sibling;
        data['person_sibling_relationship[]'] = person_sibling_relationship;
      }
      if (!values.with_spouse) {
        data.person_spouse_name = 'N/A';
        data.person_spouse_age = '0';
        data.person_spouse_occ = 'N/A';
        data.person_spouse_child = 'N/A';
      }
      onStoreData(data, 'family');
      onNext();
      return true;
    }
  });

  const { errors, values, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleSibling = (ev) => {
    if (ev.target.checked) {
      addSiblingFIeld();
      setChecked(true);
      setFieldValue('with_sibling', true);
    } else {
      setChecked(false);
      setSiblingsField([]);
      setFieldValue('with_sibling', false);
    }
  };

  const addSiblingFIeld = () => {
    setSiblingsField([...siblingsField, { person_sibling: '', person_sibling_relationship: '' }]);
  };

  const removeTrigger = (idx) => {
    const list = [...siblingsField];
    if (list.length !== -1) {
      list.splice(idx, 1);

      if (idx === 0) {
        handleUncheck();
      }
    }
    setSiblingsField(list);
  };

  const handleUncheck = () => {
    setChecked(false);
    setFieldValue('with_sibling', false);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...siblingsField];
    list[index][name] = value;
    setSiblingsField(list);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={5} sx={{ width: { md: '100%', sm: '100%' }, textAlign: 'left', mt: 10 }}>
          {/* Father's Information */}
          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '35%', minWidth: '35%', mt: '1rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                Father's name
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                ( First name / Middle name / Last name)
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_father')}
                error={Boolean(touched.person_father && errors.person_father)}
                helperText={touched.person_father && errors.person_father}
              />
            </Box>
          </Stack>

          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '75%', minWidth: '75%', mt: '1rem !important' }}
          >
{/*            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Father's Birthdate
              </Typography>
              <TextField
                fullWidth
                type="date"
                {...getFieldProps('person_father_bdate')}
                error={Boolean(touched.person_father_bdate && errors.person_father_bdate)}
                helperText={touched.person_father_bdate && errors.person_father_bdate}
              />
            </Box>*/}
            <Box component="div" sx={{ width: '100%', mx: { md: 0, sm: 1, xs: 0 } }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Occupation
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_father_occ')}
                error={Boolean(touched.person_father_occ && errors.person_father_occ)}
                helperText={touched.person_father_occ && errors.person_father_occ}
              />
            </Box>
          </Stack>
          <br />
          <br />

          {/* Mother's Information */}
          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '35%', minWidth: '35%', mt: '1rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                Mother's name
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                ( First name / Middle name / Last name)
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_mother')}
                error={Boolean(touched.person_mother && errors.person_mother)}
                helperText={touched.person_mother && errors.person_mother}
              />
            </Box>
          </Stack>

          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '75%', minWidth: '75%', mt: '1rem !important' }}
          >
{/*            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Mother's Birthdate
              </Typography>
              <TextField
                fullWidth
                type="date"
                {...getFieldProps('person_mother_bdate')}
                error={Boolean(touched.person_mother_bdate && errors.person_mother_bdate)}
                helperText={touched.person_mother_bdate && errors.person_mother_bdate}
              />
            </Box>*/}
            <Box component="div" sx={{ width: '100%', mx: { md: 0, sm: 1, xs: 0 } }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                Occupation
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_mother_occ')}
                error={Boolean(touched.person_mother_occ && errors.person_mother_occ)}
                helperText={touched.person_mother_occ && errors.person_mother_occ}
              />
            </Box>
          </Stack>

          {/* With Sibling Information */}
          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '100%', minWidth: '100%', mt: '2rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <FormControlLabel
                sx={{ mb: '0 !important' }}
                checked={formik.values.with_sibling}
                control={<Checkbox color="primary" checked={checked} onChange={handleSibling} />}
                label={
                  <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                    Has Sibling?
                  </Typography>
                }
              />
            </Box>
          </Stack>
          {values.with_sibling && (
            <>
              {siblingsField &&
                siblingsField.map((field, key) => {
                  return (
                    <Stack
                      key={key}
                      direction={{ md: 'column', sm: 'column', xs: 'row' }}
                      sx={{ width: '100%', minWidth: '100%', mt: '1rem !important', alignItems: 'center' }}
                    >
                      <Box component="div" sx={{ width: '100%' }}>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                          Name of Sibling
                        </Typography>

                        <TextField
                          fullWidth
                          name="person_sibling"
                          value={field.person_sibling}
                          onChange={(e) => handleInputChange(e, key)}
                        />
                      </Box>

                      <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                          Relationship
                        </Typography>
                        <TextField
                          fullWidth
                          name="person_sibling_relationship"
                          value={field.person_sibling_relationship}
                          onChange={(e) => handleInputChange(e, key)}
                        />
                      </Box>

                      <Box component="div" sx={{ width: '100%' }}>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                          &nbsp;
                        </Typography>
                        <Stack direction="row" sx={{ alignItems: 'center' }}>
                          {siblingsField.length !== key && (
                            <>
                              <Button
                                size="large"
                                variant="contained"
                                sx={{ boxShadow: 'none' }}
                                color="blue"
                                onClick={addSiblingFIeld}
                              >
                                <Icon icon={plusIcon} width={20} height={20} />
                              </Button>
                            </>
                          )}
                          {siblingsField.length !== -1 && (
                            <>
                              <Button
                                size="large"
                                variant="outlined"
                                sx={{ boxShadow: 'none', ml: 1 }}
                                color="blue"
                                onClick={() => removeTrigger(key)}
                              >
                                <Icon icon={minusIcon} width={20} height={20} />
                              </Button>
                            </>
                          )}
                        </Stack>
                      </Box>
                    </Stack>
                  );
                })}
            </>
          )}
          <Divider sx={{ my: 2 }} />

          {/* Spouse Information */}
          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '25%', minWidth: '25%', mt: '2rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <FormControlLabel
                sx={{ mb: '0 !important' }}
                checked={formik.values.with_spouse}
                control={<Checkbox color="primary" {...getFieldProps('with_spouse')} />}
                label={
                  <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                    With Spouse?
                  </Typography>
                }
              />
            </Box>
          </Stack>

          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '35%', minWidth: '35%', mt: '1rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                Spouse Name
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                First name / Middle name / Last name
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_spouse_name')}
                error={Boolean(touched.person_spouse_name && errors.person_spouse_name)}
                helperText={touched.person_spouse_name && errors.person_spouse_name}
                disabled={!values.with_spouse}
              />
            </Box>
          </Stack>

          <Stack
            direction={{ md: 'column', sm: 'column', xs: 'row' }}
            sx={{ width: '75%', minWidth: '75%', mt: '1rem !important' }}
          >
            <Box component="div" sx={{ width: '100%' }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                Occupation
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                (If Single write N/A)
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_spouse_occ')}
                error={Boolean(touched.person_spouse_occ && errors.person_spouse_occ)}
                helperText={touched.person_spouse_occ && errors.person_spouse_occ}
                disabled={!values.with_spouse}
              />
            </Box>
            <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 } }}>
              <Typography variant="body1" sx={{ mb: '0 !important', fontWeight: '400', opacity: 0.65 }}>
                Name of Child/Children: (please include their age)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                First name / Middle name / Last name
              </Typography>
              <TextField
                fullWidth
                {...getFieldProps('person_spouse_child')}
                error={Boolean(touched.person_spouse_child && errors.person_spouse_child)}
                helperText={touched.person_spouse_child && errors.person_spouse_child}
                disabled={!values.with_spouse}
              />
            </Box>
          </Stack>
          {!isReview && (
            <>
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
