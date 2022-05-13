import { Module } from '@nestjs/common';

import { GymStateParserService } from './services/gym-state-parser.service';
import { MainController } from './controllers/main.controller';

@Module({
  providers: [GymStateParserService],
  controllers: [MainController],
})
export class WorkoutsModule {}
