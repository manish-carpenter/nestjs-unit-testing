import { Injectable } from '@nestjs/common';
import { Patient } from './patient.model';

export interface PatientInput {
  name: string,
}

@Injectable()
export class PatientService {
  register = async (patientInput: PatientInput): Promise<Patient> => {
    return {
      id: 1,
      name: patientInput.name,
    };
  };
};
