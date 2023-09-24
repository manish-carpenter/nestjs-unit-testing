import { HttpException, Injectable } from '@nestjs/common';
import { AppoinmentData } from './appoinment.model';

export interface AppoinmentInput {
  patientId: number,
  startTime: Date,
  endTime: Date,
}

@Injectable()
export class AppoinmentService {
  public scheduleAppoinment(appoinmentData: AppoinmentInput): AppoinmentData {
    if (appoinmentData.endTime <= appoinmentData.startTime) {
      throw new Error(`Appointment's endTime should be after startTime`)
    }

    if (appoinmentData.endTime.getUTCDate() !== appoinmentData.startTime.getUTCDate() || 
     appoinmentData.endTime.getUTCMonth() !== appoinmentData.startTime.getUTCMonth()) {
      throw new Error(`Appointment should end on the same day`);
    }

    return {
      ...appoinmentData,
      confirmed: false,
    }
  }
}
