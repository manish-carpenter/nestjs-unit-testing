import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentService } from './appoinment.service';

describe('AppoinmentService', () => {
  let service: AppoinmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppoinmentService],
    }).compile();

    service = module.get<AppoinmentService>(AppoinmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`should schedule an unconfirmed appoinment for a user on success`, () => {
    const startTime = new Date('2022-01-01T14:00:00Z');
    const endTime = new Date('2022-01-01T15:00:00Z');

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
});
