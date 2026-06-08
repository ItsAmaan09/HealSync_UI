import { Routes } from '@angular/router';
import { AppointmentDetails } from './appointment-details/appointment-details';
import { AppointmentList } from './appointment-list/appointment-list';
import { BookAppointment } from './book-appointment/book-appointment';

export const APPOINTMENTS_ROUTES: Routes = [
  {
    path: '',
    component: AppointmentList,
    title: 'HealSync | Appointment List'
  },
  {
    path: 'appointment-list',
    component: AppointmentList,
    title: 'HealSync | Appointment List'
  },
  {
    path: 'appointment-details',
    component: AppointmentDetails,
    title: 'HealSync | Appointment Details'
  },
  {
    path: 'book-appointment',
    component: BookAppointment,
    title: 'HealSync | Book Appointment'
  }
];
