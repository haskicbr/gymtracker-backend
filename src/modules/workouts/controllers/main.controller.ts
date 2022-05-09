import { Controller, Post, Body, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { GymStateParserService } from "../services/gym-state-parser.service";
import { StateLoadCsvDto, StateLoadDto } from "../dto";

@Controller('workouts')
export class MainController {

  constructor(private readonly gymStateParserService: GymStateParserService) {
  }

  @Post('download-plan')
  downloadPlan(@Body() dto: StateLoadDto): string {
    return this.gymStateParserService.convertGymStateToCSV(dto);
  }

  @Post('upload-plan')
  uploadPlan(@Body() dto: StateLoadCsvDto): string {
    try {
      return this.gymStateParserService.convertCSVToState(dto.csv);
    } catch (e) {
      throw new HttpException("CSV parse error", HttpStatus.BAD_REQUEST);
    }
  }
}
