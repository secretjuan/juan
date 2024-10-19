import { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Container,
  Stack,
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// eslint-disable-next-line camelcase
import user_api from '../../../api/user';
import storage from '../../../api/base/storage';
import { UsersContext } from '../../../contexts/UserContext';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  position: 'relative',
  paddingTop: 42,
  display: 'flex',
  alignItems: 'center'
}));

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line camelcase
  const { setUser, check_login } = useContext(UsersContext);
  const Schema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Schema,
    // eslint-disable-next-line consistent-return
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (!values.email || !values.password) return setSubmitting(false);

        const form = new FormData();
        form.append('email', values.email);
        form.append('password', values.password);

        const result = await user_api.sign_in_email(form);
        if (!result.ok) {
          alert('Invalid username or password');
          return setSubmitting(false);
        }

        const payload = result.data.data;
        await storage.storeUser(payload);

        setUser(payload);
        resetForm();
        setSubmitting(false);
        navigate(`/account/app`, { replace: true });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  useEffect(() => {
    const load = async () => {
      await check_login();
    };
    load();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            Login
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
                          label="Email address"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />

                        <TextField
                          fullWidth
                          autoComplete="current-password"
                          type={showPassword ? 'text' : 'password'}
                          label="Password"
                          {...getFieldProps('password')}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword} edge="end">
                                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                        <LoadingButton
                          fullWidth
                          type="submit"
                          variant="contained"
                          size="large"
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
                          Sign in
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
