// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Card, Box, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
//
import { motion } from 'framer-motion';
import { varFadeInDown } from '../../animate';
import { 
  Modal,
  Button,
  Backdrop,
  Fade,
  Stack,
  TextField,
  IconButton,
  InputAdornment 
} from '@material-ui/core';
import { Link } from '@mui/material';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { LoadingButton } from '@material-ui/lab';
import user_api from '../../../api/user';
import SecureLS from 'secure-ls';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns';
import moment from 'moment';
const ls = new SecureLS({ encodingType: "aes" });
const RootStyle = styled('div')(() => ({
  position: 'relative',
  marginBottom: 64,
  paddingTop: 24,
  paddingBottom: 24,
  display: 'flex',
  alignItems: 'center'
}));

const cover = '/static/background/wavy-one.png';
const SERVICE_CORE = [
  {
    id: 0,
    title: 'Deropa Park',
    description:'Quezon City',
    image: '/static/court1.jpg',
    rate: '1000'
  },
  {
    id: 1,
    title: 'Mendoza Village',
    description:'Manila City',
    image: '/static/court2.jpg',
    rate: '2000'
  },
  {
    id: 2,
    title: 'Villilia Park - Basketball',
    description:'Tagaytay City',
    image: '/static/court3.jpg',
    rate: '3000'
  },
  {
    id: 3,
    title: 'Villilia Park - Badminton',
    description:'Caloocan City',
    image: '/static/court5.jpg',
    rate: '4000'
  },
  {
    id: 4,
    title: 'St. Dominic 9 Park',
    description:'Eastwood Libis City',
    image: '/static/court4.jpg',
    rate: '5000'
  },
  {
    id: 5,
    title: 'Asamba Park',
    description:'Cubao City',
    image: '/static/court6.jpg',
    rate: '6000'
  },
  {
    id: 6,
    title: 'Malaria Court',
    description:'Pasay City',
    image: '/static/court8.jpg',
    rate: '7000'
  },
  {
    id: 7,
    title: 'T.E Village Court',
    description:'Payatas Village',
    image: '/static/court9.jpg',
    rate: '8000'
  }

];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ServicesCore() {
  const [openRent, setOpenRent] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openChooseDate, setOpenChooseDate] = useState(false);
  const [openReceipt, setOpenReceipt] = useState(false);
  const [timeFrom, setTimeFrom] = useState(new Date())
  const [timeTo, setTimeTo] = useState(new Date())
  const [scheduleDate, setScheduleDate] = useState();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerContact, setRegisterContact] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [court, setCourt] = useState({})

  const defaultValue = {
    startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
  };
  const [selectedDayRange, setSelectedDayRange] = useState([defaultValue]);
  const getCurrentDate = () => {
    return moment().format('YYYY-MM-DD');
  };
  const handleClickRent = (value) => {
    setCourt({courtId: value.id, courtImage: value.image, courtTitle: value.title, courtDesc: value.description, courtRate: value.rate})
    setOpenRent(true)
  }
  const handleCloseRent = () => {
    setOpenRent(false)
  }
  const handleOpenLogin = () => {
    const token = ls.get("token")
    
    if(token) {
      setOpenRent(false)
      setOpenChooseDate(true)
    }
    else {
      setOpenRent(false)
      setOpenLogin(true)
      setOpenRegister(false) 
    }

  }
  const handleCloseLogin = () => {
    setOpenLogin(false)
  }
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleSignIn = async () => {
    if (!email || !password) {
      // Display error message or prevent form submission
      alert('All fields are required');
      return;
    }
    else {
      const data = {
        email: email,
        password: password,
      }
      const result = await user_api.sign_in_email(data)
      if(result.status !== 200) {
        alert(result.data.msg)
      }
      else {
        ls.set("token", result.data.token)
        alert("Login Succesful")
        setOpenRegister(false)
        setOpenLogin(false)
        setOpenRent(true)
      }
    }
  };
  const handleOpenRegister = () => {
    setOpenRegister(true);
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };
  const handleSignUp = async () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!registerEmail || !registerPassword || !registerContact || !registerName) {
      // Display error message or prevent form submission
      alert('All fields are required');
      return;
    }
    else if (!regex.test(registerEmail)) {
      alert("Invalid email address");
    }
    else {
      const data = {
        email: registerEmail,
        password: registerPassword,
        phone: registerContact,
        name: registerName
      }
      const result = await user_api.sign_up_email(data)
      if(result.status !== 200) {
        alert(result.data.msg)
      }
      else {
        alert("Registration Succesful")
        setOpenRegister(false)
        setOpenLogin(true)
      }
    }
  };
  const handleOpenChooseDate = () => {
    setOpenChooseDate(true);
  };
  const handleCloseChooseDate = () => {
    setOpenChooseDate(false);
  };
  const handleReserve = () => {
    if (!scheduleDate || !timeFrom || !timeTo) {
      // Display error message or prevent form submission
      alert('All fields are required');
      return;
    }
    else {
      alert("You have save the date " + scheduleDate)
      setOpenChooseDate(false); 
      handleOpenReceipt(true);
    }

  };
  const handleOpenReceipt = () => {
    setOpenReceipt(true);
  };
  const handleCloseReceipt = () => {
    setOpenReceipt(false);
  };
  return (
    <RootStyle
      sx={{
        backgroundImage: `url(${cover})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#FFFFFF'
      }}
    >
      <Container maxWidth="lg">
        <Grid container sx={{ width: '100%' }}>
          {SERVICE_CORE &&
            SERVICE_CORE.map((value, index) => (
              <Grid item xs={12} md={6} key={index} sx={{ p: 2}}>
                <motion.div variants={varFadeInDown} key={index}>
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: { xs: "100%", md: "100%" },
                      p: { xs: 4, md: 0 }
                    }}
                  >
                    <Box key={index} sx={{ textAlign: 'center' }}>
                      <Box
                        component="img"
                        src={value.image}
                        sx={{ width: "100%", height: "408px", objectFit: 'contain', margin: '24px auto' }}
                        onClick={() => handleClickRent(value)}
                      />
                      <Typography variant="h4" color="common.black" component="h3" sx={{ my: 2 }}>
                        {value.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="common.black"
                        component="p"
                        sx={{ fontWeight: '400', width: { xs: '100%', md: '100%' }, margin: 'auto' }}
                      >
                        {value.description}
                      </Typography>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
        </Grid>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={openRent}
          onClose={handleCloseRent}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openRent}>
            <Box sx={style}>
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: { xs: "100%", md: "100%" }
                }}
              >
                <Box key={court.id} sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" color="common.black" component="h3" sx={{ my: 2 }}>
                    {court.courtTitle} is located at {court.courtDesc}. Starting rate is {court.courtRate} Pesos per hour. Other rates to consider:
                  </Typography>
                  <Typography
                    variant="h6"
                    color="common.black"
                    component="p"
                    sx={{ fontWeight: '400', width: { xs: '100%', md: '100%' }, margin: 'auto' }}
                  >
                    Airconditioned Rates: 6,000 Pesos Per Hour
                    Scoreboard: 112 Pesos Per Game
                    Operating Hours: Daily 8:00pm-10:00pm
                    Covered: Yes
                    Flooring (Wood?): Yes
                    Parking Information: Free (First come first serve)
                  </Typography>
                  <Button variant="contained"  style={{ backgroundColor: "#ff9800", color: '#fff' }} onClick={handleOpenLogin} sx={{ mt: 2, px: 17, mb: 2 }}>
                    Rent
                  </Button>
                </Box>
              </Card>

            </Box>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={openLogin}
          onClose={handleCloseLogin}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openLogin}>
            <Box sx={style}>
              <Typography
                component="h2"
                variant="h3"
                color="common.black"
                sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
              >
                Login
              </Typography>
              <Box sx={{ textAlign: 'center', mb: 10, mt: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email address"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
    
                  />

                  <TextField
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
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
                    onClick={handleSignIn}
                  >
                    Sign in
                  </LoadingButton>
                </Stack>
                <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                  <Typography
                    component="h5"
                    variant="h5"
                    color="common.black"
                    sx={{ textAlign: 'center', my: { xs: 2 } }}
                  >
                    No account yet? <Link href="#" onClick={handleOpenRegister} >Sign up</Link>
                  </Typography>
                </Stack>
              </Box>

            </Box>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={openRegister}
          onClose={handleCloseRegister}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openRegister}>
            <Box sx={style}>
              <Typography
                component="h2"
                variant="h3"
                color="common.black"
                sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
              >
                Register
              </Typography>
              <Box sx={{ textAlign: 'center', mb: 10, mt: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email address"
                    type="text"
                    value={registerEmail}
                    required
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />

                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={registerPassword}
                    required
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    label="Contact"
                    value={registerContact}
                    required
                    onChange={(e) => setRegisterContact(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Fullname"
                    value={registerName}
                    required
                    onChange={(e) => setRegisterName(e.target.value)}
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
                    onClick={handleSignUp}
                  >
                    Sign up
                  </LoadingButton>
                </Stack>
                <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                  <Typography
                    component="h5"
                    variant="h5"
                    color="common.black"
                    sx={{ textAlign: 'center', my: { xs: 2 } }}
                  >
                    Already have an account? <Link href="#" onClick={handleOpenLogin}>Sign in</Link>
                  </Typography>
                </Stack>
              </Box>

            </Box>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={openChooseDate}
          onClose={handleCloseChooseDate}
          closeAfterTransition
          BackdropComponent={Backdrop}
          style={{"height": "100%", "width": "100%"}}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openChooseDate}>
            <Box sx={style} style={{width:"100%"}}>
              <Typography
                component="h2"
                variant="h3"
                color="common.black"
                sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
              >
                Choose time and date
              </Typography>
              <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    value={scheduleDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: getCurrentDate(), // Set minimum date to current date
                    }}
                    style={{"height": "100%", "width": "100%"}}
                    onChange={(e) => setScheduleDate(e.target.value)}
                />
              </Stack>
              <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                <TextField
                  id="from"
                  label="From"
                  type="time"
                  value={timeFrom}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                }}
                  style={{"height": "100%", "width": "100%"}}
                  onChange={(e) => setTimeFrom(e.target.value)}
                />
              </Stack>
              <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                <TextField
                  id="to"
                  label="To"
                  type="time"
                  value={timeTo}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                }}
                  style={{"height": "100%", "width": "100%"}}
                  onChange={(e) => setTimeTo(e.target.value)}
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
                  onClick={handleReserve}
                >
                  Reserve
                </LoadingButton>
              </Stack>
            </Box>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={openReceipt}
          onClose={handleCloseReceipt}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openReceipt}>
            <Box sx={style} style={{width:"100%"}}>
              <Typography
                component="h2"
                variant="h3"
                color="common.black"
                sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
              >
                Summary of transaction
              </Typography>
              <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
                <Typography
                  component="h5"
                  variant="h5"
                  color="common.black"
                  sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
                >
                  Court Name: {court.courtTitle}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
                <Typography
                  component="h5"
                  variant="h5"
                  color="common.black"
                  sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
                >
                  Court Location: {court.courtDesc}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
                <Typography
                  component="h5"
                  variant="h5"
                  color="common.black"
                  sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
                >
                  Date of reservation: {scheduleDate}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
                <Typography
                  component="h5"
                  variant="h5"
                  color="common.black"
                  sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
                >
                  Time of reservation: {timeFrom} - {timeTo}
                </Typography>
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
                  onClick={handleCloseReceipt}
                >
                  Close
                </LoadingButton>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </RootStyle>
  );
}
