import { Module } from '@nestjs/common';

import { GymStateParserService } from './services/gym-state-parser.service';
import { MainController } from './controllers/main.controller';
import { ShareController } from './controllers/share.controller';

@Module({
  providers: [GymStateParserService],
  controllers: [MainController, ShareController],
})
export class WorkoutsModule {}
