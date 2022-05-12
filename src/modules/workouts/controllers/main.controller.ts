import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GymStateParserService } from '../services/gym-state-parser.service';
import { StateLoadCsvDto, StateLoadDto } from '../dto';

@Controller('workouts')
export class MainController {
  constructor(private readonly gymStateParserService: GymStateParserService) {}
  @Post('convert-state-to-csv')
  downloadPlan(@Body() dto: StateLoadDto): string {
    return this.gymStateParserService.convertGymStateToCSV(dto);
  }

  @Post('convert-csv-to-state')
  uploadPlan(@Body() dto: StateLoadCsvDto): string {
    try {
      return this.gymStateParserService.convertCSVToState(dto.csv);
    } catch (e) {
      throw new HttpException('CSV parse error', HttpStatus.BAD_REQUEST);
    }
  }
}
