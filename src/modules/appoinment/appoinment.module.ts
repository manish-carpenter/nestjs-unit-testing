import { Module } from '@nestjs/common';
import { AppoinmentService } from './appoinment.service';

@Module({
  providers: [AppoinmentService]
})
export class AppoinmentModule {}
