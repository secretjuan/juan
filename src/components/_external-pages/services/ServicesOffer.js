// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Card, Box, Grid } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInDown } from '../../animate';

const RootStyle = styled('div')(() => ({
  position: 'relative',
  marginTop: 64,
  marginBottom: 64,
  paddingTop: 24,
  paddingBottom: 24,
  display: 'flex',
  alignItems: 'center'
}));

const ListStyle = styled('ul')(({ theme }) => ({
  width: '100%',
  margin: '42px auto',
  color: theme.palette.common.black,
  [theme.breakpoints.up('md')]: {
    marginLeft: 'auto',
    width: '75%'
  }
}));
const ListItemStyle = styled('li')(({ theme }) => ({
  color: theme.palette.common.black,
  [theme.breakpoints.up('md')]: {
    width: '100%',
    textAlign: 'left !important'
  }
}));

const cover = '/static/background/wavy-one.png';
const SERVICE_CORE = [
  {
    id: 0,
    title: 'Full-scale Human Resource Outsourcing',
    description:
      'Our team of human resource experts will help you manage your human resource processes throughout the full employee life cycle.  full-scale human resource service includes:',
    list: [
      'Hiring and Recruitment',
      'Employee Management',
      'Compensation and Benefits Administration',
      'Training and Development'
    ]
  },
  {
    id: 1,
    title: 'Accounting And Bookkeeping Services',
    description:
      'Powered by our extensive service background, secure accounting software, and strict process discipline, let our team of professional experts deliver accounting and bookkeeping needs of your company.',
    list: [
      'Account Payable',
      'Account Receivable',
      'Cash flow analysis',
      'Bookkeeping',
      'Internal Audit',
      'Tax Records management'
    ]
  },
  {
    id: 2,
    title: 'Payroll And Benefits Administration Outsourcing Services',
    description:
      'Let your payroll and benefits administration needs be handled by our team of trained professional experts in the said facet of human resource. With a variety of ways to process through our HRIS system, payroll and benefits adminstration can be completed in a timely and efficient manner.',
    list: []
  },
  {
    id: 3,
    title: 'Recruitment Outsourcing Services',
    description:
      'Outsource your recruitment needs and have our dedicated team of recruitment experts develop a tailored recruitment program that will help you source, recruit, and hire the most qualified job candidates for your organization.',
    list: []
  },
  {
    id: 4,
    title: 'Business Permit Processing Services',
    description:
      'Our Team Of Professional Experts With Extensive Experience In This Facet Will Help You Save Time And Resources By Helping You Determine And Process Business Permits You Need In The Philippines, Including But Not Limited to:',
    list: [
      'DTI Registration',
      'Sec Registration',
      'BIR Permit',
      'Mayor’s Permit',
      'Building Permit',
      'SSS, Philhealth, And Pag-ibig Registration'
    ]
  },
  {
    id: 5,
    title: 'Offshore Outsourcing Services',
    description:
      'Outsource your entire business needs to the philippines while managing your main business operations in your home country. \n\n Let our highly skilled filipino professionals handle your entire human resource process and other technical office jobs at a lower cost but equal expertise',
    list: [
      'Human Resource Process Management',
      'Payroll Management',
      'Accounting, Bookkeeping And Tax Records Management',
      'Customer Care Support',
      'Back Office Support',
      'Account Management',
      'Administrative Tasks And Data Entry'
    ]
  },
  {
    id: 6,
    title: 'Staff Leasing',
    description:
      'Get access to our pool of expert talents that will deliver your particular needs at a lower cost without sacrificing professionalism and quality. Allow us to help your business become flexible with the size of your workforce so that you can adjust to your constantly evolving needs and amount of available resources.',
    list: []
  }
];

export default function ServicesOffer() {
  return (
    <RootStyle
      sx={{
        backgroundImage: `url(${cover})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundColor: '#FFFFFF'
      }}
    >
      <Container maxWidth="lg">
        <Grid container sx={{ width: '100%' }}>
          {SERVICE_CORE &&
            SERVICE_CORE.map((value, index) => (
              <Grid item xs={12} md={6} key={index} sx={{ p: 2 }}>
                <motion.div variants={varFadeInDown} key={index}>
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      height: { xs: 'auto', md: 'auto' },
                      p: { xs: 4, md: 4 },
                      transition: 'all 0.4s ease',
                      borderBottom: '12px solid #2629d5',
                      '&:hover': {
                        transition: 'all 0.4s ease',
                        backgroundColor: 'blue.main',
                        '& p': {
                          color: '#FFFFFF'
                        },
                        '& h3': {
                          color: '#FFFFFF'
                        },
                        '& li': {
                          color: '#FFFFFF'
                        }
                      }
                    }}
                  >
                    <Box key={index}>
                      <Typography
                        variant="h4"
                        color="common.black"
                        component="h3"
                        sx={{ mt: 5, mb: 2, textAlign: 'center' }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="common.black"
                        component="p"
                        sx={{ fontWeight: '400', px: { xs: 1, md: 4 }, margin: 'auto', textAlign: 'left' }}
                      >
                        {value.description}
                      </Typography>

                      <Box sx={{ marginLeft: 'auto' }}>
                        <ListStyle>
                          {value.list.length > 0 &&
                            value.list.map((val, key) => (
                              <ListItemStyle key={key}>
                                <Typography
                                  variant="p"
                                  sx={{ color: 'common.black', mt: 1, fontWeight: '400' }}
                                  component="p"
                                >
                                  {val}
                                </Typography>
                              </ListItemStyle>
                            ))}
                        </ListStyle>
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
