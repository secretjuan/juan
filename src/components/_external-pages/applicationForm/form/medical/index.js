/* eslint-disable  */
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';

// material
import {
  Box,
  Stack,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

export default function MedicalForm({ stored, onNext, onStoreData, isReview }) {
  const store = stored.medical ? stored.medical : undefined;

  const [isLoading, setLoading] = useState(false);
  const [gender, setGender] = useState();
  //const [childhoodSuccess, setChildhoodSuccess] = useState(false);
  const [medicalSuccess, setMedicalSuccess] = useState(false);
  const [familySuccess, setFamilySuccess] = useState(false);
  const [family_agree_no_hospitalization, setAgreeFamilyHospital] = useState(false);
  const [family_agree_no_history, setAgreeFamilyHistory] = useState(false);
  const [medical_agree_no_hospitalization, setAgreeNoHospital] = useState(false);
  const [medical_agree_no_history, setAgreeNoHistory] = useState(false);
  const [no_surgery, setNoSurgery] = useState(false);
  const [no_hospitalizations, setNoHospitalizations] = useState(false);
  const [lastMenstruationDate, setLastMenstruationDate] = useState();
  const [dysmenorrhea, setDysmenorrhea ] = useState();
  const [mensCycleStatus, setMensCycleStatus ] = useState('Regular');
  const [displayStatus, setDisplayStatus ] = useState('None');
  const [pcosValue, setPcosValue ] = useState('None');
  const [CHILDHOOD_ILLNESS, setChildIllnesChxbox] = useState([
    { label: 'Measles', key: 'illness_measles', value: false },
    { label: 'Mumps', key: 'illness_mumps', value: false },
    { label: 'Chicken Pox', key: 'illness_chickenpox', value: false },
    { label: 'Rheumatic Fever', key: 'illness_rheumatic', value: false },
    { label: 'Polio', key: 'illness_polio', value: false }
  ]);
  const [MEDICAL_HISTORY, setMedicalHistoryChxbox] = useState([
    { label: 'Alcohol Abuse', key: 'medHISTORY_alcohol_abuse', value: false },
    { label: 'Anemia', key: 'medHISTORY_anemia', value: false },
    { label: 'Anesthetic Complication', key: 'medHISTORY_anesthetic', value: false },
    { label: 'Anxiety Disorder', key: 'medHISTORY_anxiety', value: false },
    { label: 'Asthma', key: 'medHISTORY_asthma', value: false },
    { label: 'Autoimmune Problems', key: 'medHISTORY_autoimmuneProblems', value: false },
    { label: 'Birth Defects', key: 'medHISTORY_birthDefetchs', value: false },
    { label: 'Bladder Problems', key: 'medHISTORY_bladdeProblems', value: false },
    { label: 'Bleeding Disease', key: 'medHISTORY_bleedingDisease', value: false },
    { label: 'Blood Clots', key: 'medHISTORY_bloodClots', value: false },
    { label: 'Blood Transfusion', key: 'medHISTORY_bloodTransfusion', value: false },
    { label: 'Bowel Disease', key: 'medHISTORY_bowelDisease', value: false },
    { label: 'Depression', key: 'medHISTORY_depresion', value: false },
    { label: 'Diabetes', key: 'medHISTORY_diabetes', value: false },
    { label: 'Hearing Impairment', key: 'medHISTORY_hearing_impairment', value: false },
    { label: 'Heart Attack', key: 'medHISTORY_heartAttack', value: false },
    { label: 'Heart Pain / Angina', key: 'medHISTORY_heartPain', value: false },
    { label: 'Hepatitis A', key: 'medHISTORY_hepatitisA', value: false },
    { label: 'Hepatitis B', key: 'medHISTORY_hepatitisB', value: false },
    { label: 'Hepatitis C', key: 'medHISTORY_hepatitisC', value: "" },
  ]);
  const [FAMILY_HISTORY, setFamilyHistoryChxbox] = useState([
    { label: 'I am adopted and do not know my biological family history', key: 'fam_HISTORY_adopted', value: false },
    { label: 'Alcohol Abuse', key: 'fam_HISTORY_alcohol_abuse', value: false },
    { label: 'Anemia', key: 'fam_HISTORY_anemia', value: false },
    { label: 'Anesthetic Complication', key: 'fam_HISTORY_anesthetic', value: false },
    { label: 'Anxiety Disorder', key: 'fam_HISTORY_anxiety', value: false },
    { label: 'Arthritis', key: 'fam_HISTORY_athritis', value: false },
    { label: 'Bladder Problems', key: 'fam_HISTORY_bladdeProblems', value: false },
    { label: 'Bleeding Disease', key: 'fam_HISTORY_bleedingDisease', value: false },
    { label: 'Cancer', key: 'fam_HISTORY_cancer', value: false },
    { label: 'Depression', key: 'fam_HISTORY_depresion', value: false },
    { label: 'Diabetes', key: 'fam_HISTORY_diabetes', value: false },
    { label: 'Heart Disease', key: 'fam_HISTORY_heartDisease', value: false },
    { label: 'High Blood Pressure', key: 'fam_HISTORY_highBlood', value: false },
    { label: 'High Cholesterol', key: 'fam_HISTORY_cholesterol', value: false },
    { label: 'Kidney Disease', key: 'fam_HISTORY_kidneyDisease', value: false },
    { label: 'Leukemia', key: 'fam_HISTORY_leukemia', value: false },
    { label: 'Lung/ Respiratory Disease', key: 'fam_HISTORY_respiratoryDisease', value: false },
    { label: 'Migraine', key: 'fam_HISTORY_migraine', value: false },
    { label: 'Osteoporosis', key: 'fam_HISTORY_osteoporosis', value: false },
    { label: 'Seizures / Convulsion', key: 'fam_HISTORY_seizures', value: false },
    { label: 'Severe Allergy', key: 'fam_HISTORY_severAllergy', value: false },
    { label: 'Stroke', key: 'fam_HISTORY_stroke', value: false },
    { label: 'Thyroid Problems', key: 'famHISTORY_thyroid', value: false }
  ]);

  const [surgeryField, setSurgeryField] = useState([
    {
      surgery_name: '',
      surgery_hospital: '',
      surgery_year: ''
    },
    {
      surgery_name: '',
      surgery_hospital: '',
      surgery_year: ''
    },
    {
      surgery_name: '',
      surgery_hospital: '',
      surgery_year: ''
    }
  ]);

  const [otherHospital, setOtherHospital] = useState([
    {
      other_hosp_name: '',
      other_hosp_hospital: '',
      other_hosp_year: ''
    },
    {
      other_hosp_name: '',
      surgery_hospital: '',
      surgery_year: ''
    },
    {
      other_hosp_name: '',
      other_hosp_hospital: '',
      other_hosp_year: ''
    }
  ]);

  const Schema = Yup.object().shape({
    illness_none: Yup.boolean(),
    medical_history_none: Yup.boolean(),
    family_history_none: Yup.boolean(),
    surgery_name: Yup.array(),
    surgery_hospital: Yup.array(),
    surgery_year: Yup.array(),
    other_hosp_name: Yup.array(),
    other_hosp_hospital: Yup.array(),
    other_hosp_year: Yup.array()
  });

  const formik = useFormik({
    initialValues: {
      illness_none: store.illness_none || false,
      medical_history_none: store.medical_history_none || false,
      family_history_none: store.family_history_none || false,
      surgery_name: store.surgery_name || [],
      surgery_hospital: store.surgery_hospital || [],
      surgery_year: store.surgery_year || [],
      other_hosp_name: store.other_hosp_name || [],
      other_hosp_hospital: store.other_hosp_hospital || [],
      other_hosp_year: store.other_hosp_year || [],
      menstrual_cycle: store.menstrual_cycle || false,
      pcos_value: store.pcos_value || false,
      last_menstruation_date: store.last_menstruation_date || false
    },
    enableReinitialize: true,
    validationSchema: Schema,
    onSubmit: async (values) => {
      setLoading(true);
      let isComplete = true;
      const data = [];

      Object.keys(values).forEach((item) => {
        const field = values[item];

        if (
          item === 'illness_none' ||
          item === 'medical_history_none' ||
          item === 'family_history_none' ||
          item === 'surgery_name' ||
          item === 'surgery_hospital' ||
          item === 'surgery_year' ||
          item === 'other_hosp_name' ||
          item === 'other_hosp_hospital' ||
          item === 'other_hosp_year' ||
          item === 'last_menstruation_date' ||
          item === 'medical_history_dysmenorrhea' ||
          item === 'menstrual_cycle' || 
          item === 'pcos_value'
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

      if (!values.illness_none) {
        CHILDHOOD_ILLNESS.filter((obj) => (obj.value ? (data[obj.key] = 'on') : ''));
      }

      if (!values.medical_history_none) {
        FAMILY_HISTORY.filter((obj) => (obj.value ? (data[obj.key] = 'on') : ''));
      }

      if (!values.family_history_none) {
        MEDICAL_HISTORY.filter((obj) => (obj.value ? (data[obj.key] = 'on') : ''));
      }

      let surgery_name = [];
      let surgery_hospital = [];
      let surgery_year = [];
      if (!no_surgery) {
        surgeryField.filter((item) => {
          if (item.surgery_name === '' || item.surgery_name === undefined) {
            surgery_name.push('N/A');
          } else {
            surgery_name.push(item.surgery_name);
          }
          if (item.surgery_hospital === '' || item.surgery_hospital === undefined) {
            surgery_hospital.push('N/A');
          } else {
            surgery_hospital.push(item.surgery_hospital);
          }
          if (item.surgery_year === '' || item.surgery_year === undefined) {
            surgery_year.push('N/A');
          } else {
            surgery_year.push(item.surgery_year);
          }
        });
      } else {
        for (let i = 0; i < 2; i++) {
          surgery_name.push('N/A');
          surgery_hospital.push('N/A');
          surgery_year.push('N/A');
        }
      }

      let other_hosp_name = [];
      let other_hosp_hospital = [];
      let other_hosp_year = [];

      if (!no_hospitalizations) {
        surgeryField.filter((item) => {
          if (item.other_hosp_name === '' || item.other_hosp_name === undefined) {
            other_hosp_name.push('N/A');
          } else {
            other_hosp_name.push(item.other_hosp_name);
          }
          if (item.other_hosp_hospital === '' || item.other_hosp_hospital === undefined) {
            other_hosp_hospital.push('N/A');
          } else {
            other_hosp_hospital.push(item.other_hosp_hospital);
          }
          if (item.other_hosp_year === '' || item.other_hosp_year === undefined) {
            other_hosp_year.push('N/A');
          } else {
            other_hosp_year.push(item.other_hosp_year);
          }
        });
      } else {
        for (let i = 0; i < 2; i++) {
          other_hosp_name.push('N/A');
          other_hosp_hospital.push('N/A');
          other_hosp_year.push('N/A');
        }
      }

      medical_agree_no_hospitalization ? (data['medical_agree_no_hospitalization'] = 'on') : '';
      medical_agree_no_history ? (data['medical_agree_no_history'] = 'on') : '';
      family_agree_no_hospitalization ? (data['family_agree_no_hospitalization'] = 'on') : '';
      family_agree_no_history ? (data['family_agree_no_history'] = 'on') : '';
      data['no_hospitalizations'] = no_hospitalizations;
      data['illness_none'] = values.illness_none;
      data['medical_history_none'] = values.medical_history_none;
      data['family_history_none'] = values.family_history_none;
      data['no_surgery'] = no_surgery;
      data['surgery_name[]'] = surgery_name;
      data['surgery_hospital[]'] = surgery_hospital;
      data['surgery_year[]'] = surgery_year;
      data['other_hosp_name[]'] = other_hosp_name;
      data['other_hosp_hospital[]'] = other_hosp_hospital;
      data['other_hosp_year[]'] = other_hosp_year;
      data['last_menstruation_date'] = values.last_menstruation_date;
      data['medical_history_dysmenorrhea'] = values.medical_history_dysmenorrhea;
      data['menstrual_cycle'] = values.menstrual_cycle;
      data['pcos_value'] = values.pcos_value;
      let childhoodSuccess = false;
      let medicalSuccess = false;
      let familySuccess = false;
      setLoading(true);
      for (var x = CHILDHOOD_ILLNESS.length - 1; x >= 0; x--) {
        if(CHILDHOOD_ILLNESS[x].value === true) {
          childhoodSuccess = true
        }
      }
      for (var y = MEDICAL_HISTORY.length - 1; y >= 0; y--) {
        if(MEDICAL_HISTORY[y].value === true) {
          medicalSuccess = true
          setMedicalSuccess(true)
        }
      }
      for (var z = FAMILY_HISTORY.length - 1; z >= 0; z--) {
        if(FAMILY_HISTORY[z].value === true) {
          familySuccess = true
          setFamilySuccess(true)
        }
      }
      if (childhoodSuccess === false && values.illness_none === false) {
        alert("Please select childhood illness, if none select none")
        setLoading(false);
      }
      else if(medicalSuccess === false && values.medical_history_none === false) {
        alert("Please select medical illness history, if none select none")
        setLoading(false);
      }
      else if(familySuccess === false && values.family_history_none === false) {
        alert("Please select family illness history, if none select none")
        setLoading(false);
      }
      else if(!values.last_menstruation_date && gender === 'female') {
        alert("Please input last menstruation period date")
        setLoading(false);
      }
      else {
        onStoreData({ ...data }, 'medical');
        onNext();
        return true; 
      }
    }
  });

  const { values, handleSubmit, setFieldValue } = formik;

  const load = () => {
    let loopSurgery = [];
    let loopHospitalization = [];
    const personal = JSON.parse(localStorage.getItem('personal'))
    setGender(personal.person_sex)
    if (store.family_agree_no_hospitalization) {
      setAgreeFamilyHospital(store.family_agree_no_hospitalization);
    }
    if (store.family_agree_no_history) {
      setAgreeFamilyHistory(store.family_agree_no_history);
    }
    if (store.medical_agree_no_hospitalization) {
      setAgreeNoHospital(store.medical_agree_no_hospitalization);
    }
    if (store.medical_agree_no_history) {
      setAgreeNoHistory(store.medical_agree_no_history);
    }

    store.surgery_name &&
      Object.values(store['surgery_name']).forEach((item, index) => {
        loopSurgery.push({
          surgery_name: item,
          surgery_hospital: store['surgery_hospital'][index],
          surgery_year: store['surgery_year'][index]
        });
      });

    store.other_hosp_hospital &&
      Object.values(store['other_hosp_name']).forEach((item, index) => {
        loopHospitalization.push({
          other_hosp_name: item,
          other_hosp_hospital: store['other_hosp_hospital'][index],
          other_hosp_year: store['other_hosp_year'][index]
        });
      });

    setSurgeryField(loopSurgery);
    setOtherHospital(loopHospitalization);
    if (store.no_surgery) {
      setNoSurgery(store.no_surgery);
    }
    if (store.no_hospitalizations) {
      setNoHospitalizations(store.no_hospitalizations);
    }

    let loopChild = CHILDHOOD_ILLNESS;
    let loopMedical = MEDICAL_HISTORY;
    let loopFamily = FAMILY_HISTORY;

    store &&
      Object.keys(store).forEach((item) => {
        CHILDHOOD_ILLNESS.filter((obj, index) => {
          if (obj.key === item) {
            loopChild[index].value = true;
          }
        });
      });

    store &&
      Object.keys(store).forEach((item) => {
        MEDICAL_HISTORY.filter((obj, index) => {
          if (obj.key === item) {
            loopMedical[index].value = true;
          }
        });
      });

    store &&
      Object.keys(store).forEach((item) => {
        FAMILY_HISTORY.filter((obj, index) => {
          if (obj.key === item) {
            loopFamily[index].value = true;
          }
        });
      });

    if(store.menstrual_cycle === "Irregular") {
      setDisplayStatus("Inline")
    }
    else {
      setDisplayStatus("None")
    }  
    setChildIllnesChxbox(loopChild);
    setMedicalHistoryChxbox(loopMedical);
    setFamilyHistoryChxbox(loopFamily);
    setLastMenstruationDate(store.last_menstruation_date);
    setDysmenorrhea(store.medical_history_dysmenorrhea);
    if(!values.menstrual_cycle) {
      setMensCycleStatus('Regular'); 
      setFieldValue('menstrual_cycle', 'Regular')   
    }
    else {
      setMensCycleStatus(store.menstrual_cycle);
      setFieldValue('menstrual_cycle', store.menstrual_cycle)  
    }
    setPcosValue(store.pcos_value);
    setFieldValue('last_menstruation_date', store.last_menstruation_date)
    setFieldValue('medical_history_dysmenorrhea', store.medical_history_dysmenorrhea)
    setFieldValue('pcos_value', store.pcos_value)
  };

  useEffect(() => {
    load();
  }, [stored]);

  const handleFamilyNoHospital = (ev) => {
    if (ev.target.checked) {
      setAgreeFamilyHospital(true);
    } else {
      setAgreeFamilyHospital(false);
    }
  };

  const handleFamilyNoHistory = (ev) => {
    if (ev.target.checked) {
      setAgreeFamilyHistory(true);
    } else {
      setAgreeFamilyHistory(false);
    }
  };

  const handleHospitalizationAgree = (ev) => {
    if (ev.target.checked) {
      setAgreeNoHospital(true);
    } else {
      setAgreeNoHospital(false);
    }
  };

  const handleNoHistory = (ev) => {
    if (ev.target.checked) {
      setAgreeNoHistory(true);
    } else {
      setAgreeNoHistory(false);
    }
  };

  const handleNoSurgery = (ev) => {
    if (ev.target.checked) {
      setNoSurgery(true);
      setSurgeryField([
        {
          surgery_name: 'N/A',
          surgery_hospital: 'N/A',
          surgery_year: 'N/A'
        },
        {
          surgery_name: 'N/A',
          surgery_hospital: 'N/A',
          surgery_year: 'N/A'
        },
        {
          surgery_name: 'N/A',
          surgery_hospital: 'N/A',
          surgery_year: 'N/A'
        }
      ]);
    } else {
      setNoSurgery(false);
    }
  };

  const handleHospitalizations = (ev) => {
    if (ev.target.checked) {
      setNoHospitalizations(true);
      setOtherHospital([
        {
          other_hosp_name: 'N/A',
          other_hosp_hospital: 'N/A',
          other_hosp_year: 'N/A'
        },
        {
          other_hosp_name: 'N/A',
          other_hosp_hospital: 'N/A',
          other_hosp_year: 'N/A'
        },
        {
          other_hosp_name: 'N/A',
          other_hosp_hospital: 'N/A',
          other_hosp_year: 'N/A'
        }
      ]);
    } else {
      setNoHospitalizations(false);
    }
  };

  const handleInputChangeSurgery = (e, index) => {
    const { name, value } = e.target;
    const list = [...surgeryField];
    list[index][name] = value;
    setSurgeryField(list);
  };

  const handleInputChangeOther = (e, index) => {
    const { name, value } = e.target;
    const list = [...otherHospital];
    list[index][name] = value;
    setOtherHospital(list);
  };

  const handleNoneCheckbox = (ev, type) => {
    if (ev.target.checked) {
      if (type === 'childhood_illness') {
        setChildIllnesChxbox([
          { label: 'Measles', key: 'illness_measles', value: false },
          { label: 'Mumps', key: 'illness_mumps', value: false },
          { label: 'Chicken Pox', key: 'illness_chickenpox', value: false },
          { label: 'Rheumatic Fever', key: 'illness_rheumatic', value: false },
          { label: 'Polio', key: 'illness_polio', value: false }
        ]);
        setFieldValue('illness_none', true);
      }
      if (type === 'medical_history') {
        setMedicalHistoryChxbox([
          { label: 'Alcohol Abuse', key: 'medHISTORY_alcohol_abuse', value: false },
          { label: 'Anemia', key: 'medHISTORY_anemia', value: false },
          { label: 'Anesthetic Complication', key: 'medHISTORY_anesthetic', value: false },
          { label: 'Anxiety Disorder', key: 'medHISTORY_anxiety', value: false },
          { label: 'Asthma', key: 'medHISTORY_asthma', value: false },
          { label: 'Autoimmune Problems', key: 'medHISTORY_autoimmuneProblems', value: false },
          { label: 'Birth Defects', key: 'medHISTORY_birthDefetchs', value: false },
          { label: 'Bladder Problems', key: 'medHISTORY_bladdeProblems', value: false },
          { label: 'Bleeding Disease', key: 'medHISTORY_bleedingDisease', value: false },
          { label: 'Blood Clots', key: 'medHISTORY_bloodClots', value: false },
          { label: 'Blood Transfusion', key: 'medHISTORY_bloodTransfusion', value: false },
          { label: 'Bowel Disease', key: 'medHISTORY_bowelDisease', value: false },
          { label: 'Depression', key: 'medHISTORY_depresion', value: false },
          { label: 'Diabetes', key: 'medHISTORY_diabetes', value: false },
          { label: 'Hearing Impairment', key: 'medHISTORY_hearing_impairment', value: false },
          { label: 'Heart Attack', key: 'medHISTORY_heartAttack', value: false },
          { label: 'Heart Pain / Angina', key: 'medHISTORY_heartPain', value: false },
          { label: 'Hepatitis A', key: 'medHISTORY_hepatitisA', value: false },
          { label: 'Hepatitis B', key: 'medHISTORY_hepatitisB', value: false },
          { label: 'Hepatitis C', key: 'medHISTORY_hepatitisC', value: false }
        ]);
        setFieldValue('medical_history_none', true);
      }
      if (type === 'family_history') {
        setFamilyHistoryChxbox([
          {
            label: 'I am adopted and do not know my biological family history',
            key: 'fam_HISTORY_adopted',
            value: false
          },
          { label: 'Alcohol Abuse', key: 'fam_HISTORY_alcohol_abuse', value: false },
          { label: 'Anemia', key: 'fam_HISTORY_anemia', value: false },
          { label: 'Anesthetic Complication', key: 'fam_HISTORY_anesthetic', value: false },
          { label: 'Anxiety Disorder', key: 'fam_HISTORY_anxiety', value: false },
          { label: 'Arthritis', key: 'fam_HISTORY_athritis', value: false },
          { label: 'Bladder Problems', key: 'fam_HISTORY_bladdeProblems', value: false },
          { label: 'Bleeding Disease', key: 'fam_HISTORY_bleedingDisease', value: false },
          { label: 'Cancer', key: 'fam_HISTORY_cancer', value: false },
          { label: 'Depression', key: 'fam_HISTORY_depresion', value: false },
          { label: 'Diabetes', key: 'fam_HISTORY_diabetes', value: false },
          { label: 'Heart Disease', key: 'fam_HISTORY_heartDisease', value: false },
          { label: 'High Blood Pressure', key: 'fam_HISTORY_highBlood', value: false },
          { label: 'High Cholesterol', key: 'fam_HISTORY_cholesterol', value: false },
          { label: 'Kidney Disease', key: 'fam_HISTORY_kidneyDisease', value: false },
          { label: 'Leukemia', key: 'fam_HISTORY_leukemia', value: false },
          { label: 'Lung/ Respiratory Disease', key: 'fam_HISTORY_respiratoryDisease', value: false },
          { label: 'Migraine', key: 'fam_HISTORY_migraine', value: false },
          { label: 'Osteoporosis', key: 'fam_HISTORY_osteoporosis', value: false },
          { label: 'Seizures / Convulsion', key: 'fam_HISTORY_seizures', value: false },
          { label: 'Severe Allergy', key: 'fam_HISTORY_severAllergy', value: false },
          { label: 'Stroke', key: 'fam_HISTORY_stroke', value: false },
          { label: 'Thyroid Problems', key: 'famHISTORY_thyroid', value: false }
        ]);
        setFieldValue('family_history_none', true);
      }
    } else {
      if (type === 'childhood_illness') {
        setFieldValue('illness_none', false);
      }
      if (type === 'medical_history') {
        setFieldValue('medical_history_none', false);
      }
      if (type === 'family_history') {
        setFieldValue('family_history_none', false);
      }
    }
  };

  const handleCheckbox = (e, index, type) => {
    const { name, checked } = e.target;
    // childhood_illness
    if (type === 'childhood_illness') {
      if (values.illness_none) {
        setFieldValue('illness_none', false);
      }
      const list = [...CHILDHOOD_ILLNESS];
      list[index].value = checked;
      setChildIllnesChxbox(list);
    }
    // medical_history
    if (type === 'medical_history') {
      if (values.medical_history_none) {
        setFieldValue('medical_history_none', false);
      }
      const list = [...MEDICAL_HISTORY];
      list[index].value = checked;
      setMedicalHistoryChxbox(list);
    }

    // family_history
    if (type === 'family_history') {
      if (values.family_history_none) {
        setFieldValue('family_history_none', false);
      }

      if (name === 'fam_HISTORY_adopted') {
        setFamilyHistoryChxbox([
          {
            label: 'I am adopted and do not know my biological family history',
            key: 'fam_HISTORY_adopted',
            value: true
          },
          { label: 'Alcohol Abuse', key: 'fam_HISTORY_alcohol_abuse', value: false },
          { label: 'Anemia', key: 'fam_HISTORY_anemia', value: false },
          { label: 'Anesthetic Complication', key: 'fam_HISTORY_anesthetic', value: false },
          { label: 'Anxiety Disorder', key: 'fam_HISTORY_anxiety', value: false },
          { label: 'Arthritis', key: 'fam_HISTORY_athritis', value: false },
          { label: 'Bladder Problems', key: 'fam_HISTORY_bladdeProblems', value: false },
          { label: 'Bleeding Disease', key: 'fam_HISTORY_bleedingDisease', value: false },
          { label: 'Cancer', key: 'fam_HISTORY_cancer', value: false },
          { label: 'Depression', key: 'fam_HISTORY_depresion', value: false },
          { label: 'Diabetes', key: 'fam_HISTORY_diabetes', value: false },
          { label: 'Heart Disease', key: 'fam_HISTORY_heartDisease', value: false },
          { label: 'High Blood Pressure', key: 'fam_HISTORY_highBlood', value: false },
          { label: 'High Cholesterol', key: 'fam_HISTORY_cholesterol', value: false },
          { label: 'Kidney Disease', key: 'fam_HISTORY_kidneyDisease', value: false },
          { label: 'Leukemia', key: 'fam_HISTORY_leukemia', value: false },
          { label: 'Lung/ Respiratory Disease', key: 'fam_HISTORY_respiratoryDisease', value: false },
          { label: 'Migraine', key: 'fam_HISTORY_migraine', value: false },
          { label: 'Osteoporosis', key: 'fam_HISTORY_osteoporosis', value: false },
          { label: 'Seizures / Convulsion', key: 'fam_HISTORY_seizures', value: false },
          { label: 'Severe Allergy', key: 'fam_HISTORY_severAllergy', value: false },
          { label: 'Stroke', key: 'fam_HISTORY_stroke', value: false },
          { label: 'Thyroid Problems', key: 'famHISTORY_thyroid', value: false }
        ]);
      } else {
        const list = [...FAMILY_HISTORY];
        list[0].value = false; // adopted
        list[index].value = checked;
        setFamilyHistoryChxbox(list);
      }
    }
  };

  const handleChangeDate = (value) => {
    setLastMenstruationDate(value)
    setFieldValue('last_menstruation_date', value)
  }
  const handleDysmenorrheaCheckbox = (value) => {
    setDysmenorrhea(value)
    setFieldValue('medical_history_dysmenorrhea', value)
  }
  const handleCycleChange = (value) => {
    if(value === "Irregular") {
      setDisplayStatus("Inline")
    }
    else {
      setDisplayStatus("None")
    }
    setMensCycleStatus(value)
    setFieldValue('menstrual_cycle', value)
  }
  const handlePcosChange = (value) => {
    setPcosValue(value)
    setFieldValue('pcos_value', value)
  }
  

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={5} sx={{ width: { md: '100%', sm: '100%' }, textAlign: 'left', mt: 10 }}>
          {/* Childhood Information */}
          <Divider sx={{ my: 2 }}>
            <Typography variant="overline">Medical history information</Typography>
          </Divider>
          <Accordion
            defaultExpanded={true}
            sx={{ p: 0, boxShadow: '0 0 16px rgba(32,32,32,0.15)', borderRadius: 1, mb: 2 }}
            key="childhood-illness"
          >
            <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
              <Stack direction="column" sx={{ alignItems: 'flex-start', px: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Childhood Illness
                </Typography>
              </Stack>
            </AccordionSummary>

            <Stack direction="column" sx={{ px: 4, mb: 4 }}>
              <Divider sx={{ mb: 2 }} />
              {CHILDHOOD_ILLNESS.map((value, index) => (
                <FormControlLabel
                  key={`${value.value}-${index}`}
                  sx={{ mb: 1 }}
                  checked={value.value}
                  name={value.key}
                  control={
                    <Checkbox
                      color="primary"
                      defaultChecked={value.value}
                      onChange={(e) => handleCheckbox(e, index, 'childhood_illness')}
                    />
                  }
                  label={
                    <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                      {value.label}
                    </Typography>
                  }
                />
              ))}
              <FormControlLabel
                key="illness_none"
                sx={{ mb: 1 }}
                checked={formik.values.illness_none}
                control={
                  <Checkbox
                    color="primary"
                    checked={values.illness_none}
                    onChange={(e) => handleNoneCheckbox(e, 'childhood_illness')}
                  />
                }
                label={
                  <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                    None
                  </Typography>
                }
              />
              <Divider sx={{ my: 2 }} />

              <FormControlLabel
                sx={{ mb: '0 !important' }}
                checked={no_surgery}
                control={<Checkbox color="primary" checked={no_surgery} onChange={handleNoSurgery} />}
                label={
                  <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                    No Surgeries
                  </Typography>
                }
              />
              {!no_surgery && (
                <>
                  {surgeryField &&
                    surgeryField.map((field, key) => (
                      <Stack
                        key={key}
                        direction={{ xs: 'column', md: 'row', sm: 'row' }}
                        sx={{ width: '100%', minWidth: '100%', mt: '1rem !important', mb: 1 }}
                      >
                        <Box component="div" sx={{ width: '100%' }}>
                          <Typography variant="body1" sx={{ mb: 1, fontWeight: '400' }}>
                            Surgeries
                          </Typography>
                          <TextField
                            fullWidth
                            name="surgery_name"
                            value={field.surgery_name}
                            onChange={(e) => handleInputChangeSurgery(e, key)}
                          />
                        </Box>

                        <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 }, my: { xs: 3, md: 0 } }}>
                          <Typography variant="body1" sx={{ mb: 1, fontWeight: '400' }}>
                            Hospital
                          </Typography>
                          <TextField
                            fullWidth
                            name="surgery_hospital"
                            value={field.surgery_hospital}
                            onChange={(e) => handleInputChangeSurgery(e, key)}
                          />
                        </Box>
                        <Box component="div" sx={{ width: '100%' }}>
                          <Typography variant="body1" sx={{ mb: 1, fontWeight: '400' }}>
                            Year
                          </Typography>
                          <TextField
                            fullWidth
                            name="surgery_year"
                            value={field.surgery_year}
                            onChange={(e) => handleInputChangeSurgery(e, key)}
                          />
                        </Box>
                      </Stack>
                    ))}
                </>
              )}

              <FormControlLabel
                sx={{ mb: '0 !important', mt: 2 }}
                checked={no_hospitalizations}
                control={<Checkbox color="primary" checked={no_hospitalizations} onChange={handleHospitalizations} />}
                label={
                  <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                    No Hospitalizations
                  </Typography>
                }
              />

              {!no_hospitalizations && (
                <>
                  {otherHospital &&
                    otherHospital.map((field, key) => (
                      <Stack
                        key={key}
                        direction={{ xs: 'column', md: 'row', sm: 'row' }}
                        sx={{ width: '100%', minWidth: '100%', mt: '1rem !important', mb: 1 }}
                      >
                        <Box component="div" sx={{ width: '100%' }}>
                          <Typography variant="body1" sx={{ mb: 1, fontWeight: '400' }}>
                            Other Hospitalizations
                          </Typography>
                          <TextField
                            fullWidth
                            name="other_hosp_name"
                            value={field.other_hosp_name}
                            onChange={(e) => handleInputChangeSurgery(e, key)}
                          />
                        </Box>

                        <Box component="div" sx={{ width: '100%', mx: { md: 3, sm: 1, xs: 0 }, my: { xs: 3, md: 0 } }}>
                          <Typography variant="body1" sx={{ mb: 1, fontWeight: '400' }}>
                            Hospital
                          </Typography>
                          <TextField
                            fullWidth
                            name="other_hosp_hospital"
                            value={field.other_hosp_hospital}
                            onChange={(e) => handleInputChangeOther(e, key)}
                          />
                        </Box>
                        <Box component="div" sx={{ width: '100%' }}>
                          <Typography variant="body1" sx={{ mb: 1, fontWeight: '400' }}>
                            Year
                          </Typography>
                          <TextField
                            fullWidth
                            name="other_hosp_year"
                            value={field.other_hosp_year}
                            onChange={(e) => handleInputChangeOther(e, key)}
                          />
                        </Box>
                      </Stack>
                    ))}
                </>
              )}

              <Divider sx={{ my: 2 }} />

              <FormControlLabel
                sx={{ mb: '0 !important' }}
                checked={medical_agree_no_hospitalization}
                control={
                  <Checkbox
                    color="primary"
                    checked={medical_agree_no_hospitalization}
                    onChange={handleHospitalizationAgree}
                  />
                }
                label={
                  <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                    I hereby declare that I do not have any related medical history, hospitalization, known surgery and
                    medication from any of above stated childhood illnesses.
                  </Typography>
                }
              />
            </Stack>
          </Accordion>

          {/* Medical History Information */}
          <Accordion
            {...(isReview ? { defaultExpanded: true } : {})}
            sx={{ p: 0, boxShadow: '0 0 16px rgba(32,32,32,0.15)', borderRadius: 1, mb: 2 }}
            key="medical-history"
          >
            <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
              <Stack direction="column" sx={{ alignItems: 'flex-start', px: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Medical History
                </Typography>
              </Stack>
            </AccordionSummary>

            <Stack direction="column" sx={{ px: 4, mb: 4 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Please indicate if YOU have a history of the following by checking the box:
              </Typography>
              <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                {MEDICAL_HISTORY.map((value, index) => (
                  <FormControlLabel
                    key={`${value.value}-${index}`}
                    sx={{
                      mb: 1,
                      flex: '1 0 48%',
                      width: {
                        md: '50%',
                        sm: '50%',
                        xs: '100%',
                        display: { md: 'inline-block', sm: 'inline-block', xs: 'block' }
                      }
                    }}
                    checked={value.value}
                    name={value.key}
                    control={
                      <Checkbox
                        color="primary"
                        defaultChecked={value.value}
                        onChange={(e) => handleCheckbox(e, index, 'medical_history')}
                      />
                    }
                    label={
                      <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                        {value.label}
                      </Typography>
                    }
                  />
                ))}
                <FormControlLabel
                  key="medical_history_none"
                  sx={{
                    mb: 1,
                    flex: '1 0 48%',
                    width: {
                      md: '50%',
                      sm: '50%',
                      xs: '100%',
                      display: { md: 'inline-block', sm: 'inline-block', xs: 'block' }
                    }
                  }}
                  checked={formik.values.medical_history_none}
                  control={
                    <Checkbox
                      color="primary"
                      checked={values.medical_history_none}
                      onChange={(e) => handleNoneCheckbox(e, 'medical_history')}
                    />
                  }
                  label={
                    <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                      None
                    </Typography>
                  }
                />
              </Stack>

              {gender === 'female' 
                ?
                  <>
                    <Divider sx={{ my: 2 }} />

                    <Box component="div" sx={{ width: '100%' }}>
                      <Typography variant="body1" sx={{ mb: 1, fontWeight: '400', opacity: 0.65 }}>
                        Last Menstruation Date
                      </Typography>
                      <TextField
                        sx={{width: '50%'}}
                        type="date"
                        value={values.last_menstruation_date}
                        onChange={(e) => handleChangeDate(e.target.value)}
                      />
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                      <FormControlLabel
                        key={`medical_history-dysmenorrhea `}
                        sx={{
                          mb: 1,
                          flex: '1 0 48%',
                          width: {
                            md: '50%',
                            sm: '50%',
                            xs: '100%',
                            display: { md: 'inline-block', sm: 'inline-block', xs: 'block' }
                          }
                        }}
                        checked={dysmenorrhea}
                        control={
                          <Checkbox
                            color="primary"
                            defaultChecked={values.medical_history_dysmenorrhea}
                            onChange={(e) => handleDysmenorrheaCheckbox(e.target.checked)}
                          />
                        }
                        label={
                          <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                            Experiencing Dysmenorrhea 
                          </Typography>
                        }
                      />

                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Menstrual Cycle</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={values.menstrual_cycle || "Regular"}
                          onChange={(e) => handleCycleChange(e.target.value)}
                        >
                          <FormControlLabel value="Regular" control={<Radio />} label="Regular" default/>
                          <FormControlLabel value="Irregular" control={<Radio />} label="Irregular" />
                        </RadioGroup>
                      </FormControl>
                      
                    </Stack>
                    <Stack direction="row" sx={{ flexWrap: 'wrap', display: `${displayStatus}`, mt: 3 }}>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Diagnosed With PCOS</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          defaultValue={values.pcos_value || "Yes"}
                          onChange={(e) => handlePcosChange(e.target.value)}
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                      
                    </Stack>
                    
                  </> 
                :
                  ''
              }
              

              <Divider sx={{ my: 2 }} />

              <FormControlLabel
                sx={{ mb: '0 !important' }}
                checked={medical_agree_no_history}
                control={<Checkbox color="primary" checked={medical_agree_no_history} onChange={handleNoHistory} />}
                label={
                  <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                    I hereby declare that I do not have medically relevant recollections (symptoms, concerns and past
                    diseases), hospitalization, known surgery and on-going medication from any of above stated medical
                    conditions
                  </Typography>
                }
              />
            </Stack>
          </Accordion>

          {/* Family History Information */}
          <Accordion
            {...(isReview ? { defaultExpanded: true } : {})}
            sx={{ p: 0, boxShadow: '0 0 16px rgba(32,32,32,0.15)', borderRadius: 1, mb: 2 }}
            key="family-history"
          >
            <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
              <Stack direction="column" sx={{ alignItems: 'flex-start', px: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Family History
                </Typography>
              </Stack>
            </AccordionSummary>

            <Stack direction="column" sx={{ px: 4, mb: 4 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Please indicate if YOUR FAMILY have a history of the following by checking the box:
              </Typography>
              <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                {FAMILY_HISTORY.map((value, index) => (
                  <FormControlLabel
                    key={`${value.value}-${index}`}
                    sx={{
                      mb: 1,
                      flex: '1 0 48%',
                      width: {
                        md: '50%',
                        sm: '50%',
                        xs: '100%',
                        display: { md: 'inline-block', sm: 'inline-block', xs: 'block' }
                      }
                    }}
                    checked={value.value}
                    name={value.key}
                    control={
                      <Checkbox
                        color="primary"
                        defaultChecked={value.value}
                        onChange={(e) => handleCheckbox(e, index, 'family_history')}
                      />
                    }
                    label={
                      <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                        {value.label}
                      </Typography>
                    }
                  />
                ))}

                <FormControlLabel
                  key="family_history_none"
                  sx={{
                    mb: 1,
                    flex: '1 0 48%',
                    width: {
                      md: '50%',
                      sm: '50%',
                      xs: '100%',
                      display: { md: 'inline-block', sm: 'inline-block', xs: 'block' }
                    }
                  }}
                  checked={formik.values.family_history_none}
                  control={
                    <Checkbox
                      color="primary"
                      checked={values.family_history_none}
                      onChange={(e) => handleNoneCheckbox(e, 'family_history')}
                    />
                  }
                  label={
                    <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                      None
                    </Typography>
                  }
                />
              </Stack>

              <Divider sx={{ my: 2 }} />

              <FormControlLabel
                sx={{ mb: '1rem !important' }}
                checked={family_agree_no_hospitalization}
                control={
                  <Checkbox
                    color="primary"
                    checked={family_agree_no_hospitalization}
                    onChange={handleFamilyNoHospital}
                  />
                }
                label={
                  <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                    I hereby declare that I do not have medically relevant recollections (symptoms, concerns and past
                    diseases), hospitalization, known surgery and on-going medication from any of above stated medical
                    conditions.
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ mb: '0 !important' }}
                checked={family_agree_no_history}
                control={
                  <Checkbox color="primary" checked={family_agree_no_history} onChange={handleFamilyNoHistory} />
                }
                label={
                  <Typography variant="body2" align="left" sx={{ color: 'text.secondary' }}>
                    I hereby declare that I DO NOT KNOW /NOT SURE of the medical history of my family
                  </Typography>
                }
              />
            </Stack>
          </Accordion>
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
