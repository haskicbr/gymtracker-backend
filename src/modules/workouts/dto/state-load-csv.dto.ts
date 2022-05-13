import { IsString } from 'class-validator';

export default class StateLoadCsvDto {
  @IsString()
  csv: string;
}
