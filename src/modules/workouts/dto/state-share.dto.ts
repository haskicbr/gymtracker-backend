import { IsString } from 'class-validator';

export default class StateShareDto {
  @IsString()
  uid: string;
}
