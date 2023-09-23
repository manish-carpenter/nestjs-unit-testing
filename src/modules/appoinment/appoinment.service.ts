import { Injectable } from '@nestjs/common';
import { AppoinmentData } from './appoinment.model';

export interface AppoinmentInput {
  patientId: number,
  startTime: Date,
  endTime: Date,
}

@Injectable()
export class AppoinmentService {
  public scheduleAppoinment(appoinmentData: AppoinmentInput): AppoinmentData {
    return {
      ...appoinmentData,
      confirmed: false,
    }
  }
}
