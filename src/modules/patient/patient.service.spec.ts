import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService],
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`register patient`, () => {
    it(`should register patient and return id and name`, async () => {
      const newPatient = await service.register({ name: 'John'});

      expect(newPatient).toEqual({
        id: expect.any(Number),
        name: 'John',
      });
    });
  });

  describe(`does patient exist`, () => {
    it(`should return true if patient exist otherwise should return false`, async () => {
      const id: number = 1;

      const isPatientExist = await service.isPatientExist(id);

      expect(isPatientExist).toBe(false);
    });

    it(`should return true if patient registered successfully`, async () => {
      const {id: patientId} = await service.register({name: `john`});

      const exists = await service.isPatientExist(patientId);

      expect(exists).toBe(true);
    });

    it(`should return different ids when registering patient twice`, async () => {
      const firstPatient = await service.register({ name: `john1` });
      const secondPatient = await service.register({ name: `john1` });

      expect(firstPatient).not.toEqual(secondPatient);
    })
  });
  
});
