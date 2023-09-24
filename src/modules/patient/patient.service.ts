import { Injectable } from '@nestjs/common';
import { Patient } from './patient.model';

export interface PatientInput {
  name: string,
}

@Injectable()
export class PatientService {
  private patient: Patient [] = [];
  private nextId: number = 1;
  register = async (patientInput: PatientInput): Promise<Patient> => {
    const newPatient = {
      id: this.nextId++,
      name: patientInput.name,
    };

    this.patient.push(newPatient);

    return newPatient;
  };

  isPatientExist = async (id: number): Promise<boolean> => {
    return this.patient.some((patientId) => patientId.id == id);
  }
};
