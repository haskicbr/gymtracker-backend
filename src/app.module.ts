import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { WorkoutsModule } from './modules/workouts/workouts.module';
import { GlobalModule } from './modules/global/global.module';

@Module({
  imports: [WorkoutsModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
