import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentService } from './appoinment.service';
import { PatientModule } from '../patient/patient.module';
import { PatientService } from '../patient/patient.service';

describe('AppoinmentService', () => {
  let service: AppoinmentService;
  let patientService: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PatientModule],
      providers: [AppoinmentService],
    }).compile();

    service = module.get<AppoinmentService>(AppoinmentService);
    patientService = module.get<PatientService>(PatientService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`should schedule an unconfirmed appoinment for a user on success`, async () => {
    const startTime = new Date('2022-01-01T14:00:00Z');
    const endTime = new Date('2022-01-01T15:00:00Z');

    const id = await patientService.register({ name: `John` });

    
    const newAppoinment = service.scheduleAppoinment({
      patientId: 1,
      startTime,
      endTime,
    });

    expect(newAppoinment).toEqual({
      patientId: 1,
      startTime,
      endTime,
      confirmed: false,
    });
  });

  it(`should throw error when end time is before start time`, () => {
    const startTime = new Date('2022-01-01T14:00:00Z')
    const endTime = new Date('2022-01-01T13:00:00Z')

    const appoinment = () => {
      return service.scheduleAppoinment({
        patientId: 1,
        startTime: startTime,
        endTime: endTime,
      })
    }
    expect(appoinment).toThrowError(`Appointment's endTime should be after startTime`);
  });

  it(`should throw error if end time is equal to start time`, () => {
    const appoinmentData = {
      patientId: 1,
      startTime: new Date('2022-01-01T14:00:00Z'),
      endTime: new Date('2022-01-01T14:00:00Z'),
    }

    const appoinment = () => {
      return service.scheduleAppoinment(appoinmentData);
    };

    expect(appoinment).toThrowError(`Appointment's endTime should be after startTime`)
  })

  it(`should throw error if appointment end time is in next day`, () => {
    const startTime = new Date(`2022-01-01T13:00:00Z`);
    const endTime = new Date(`2022-02-02T14:00:00Z`);

    const appointmentData = {
      patientId: 1,
      startTime: startTime,
      endTime: endTime,
    }

    const appointment = () => {
      return service.scheduleAppoinment(appointmentData)
    }

    expect(appointment).toThrowError(`Appointment should end on the same day`)

  })
});
