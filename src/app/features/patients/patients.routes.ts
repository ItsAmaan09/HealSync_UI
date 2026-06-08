import { Routes } from '@angular/router';
import { PatientList } from './patient-list/patient-list';
import { PatientForm } from './patient-form/patient-form';


export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    component: PatientList,
    title: 'HealSync | Patient List'
  },
  {
    path: 'patient-list',
    component: PatientList,
    title: 'HealSync | Patient List'
  },
  {
    path: 'patient-form',
    component: PatientForm,
    title: 'HealSync | Patient Form'
  },

];
