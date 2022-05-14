import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { GymStateParserService } from '../services/gym-state-parser.service';
import { StateLoadDto } from '../dto';
import { EntityService } from '../../global/services/entity.service';
import { SharedLink } from '../../global/entities/shared-link.entity';
import StateShareDto from '../dto/state-share.dto';

@Controller('share')
export class ShareController {
  constructor(
    private readonly gymStateParserService: GymStateParserService,
    private readonly entityService: EntityService,
  ) {}

  @Post('link')
  async createSharedLink(@Body() dto: StateLoadDto) {
    const sharedLink = new SharedLink();
    sharedLink.content = JSON.stringify(dto);

    return await this.entityService.manager.save<SharedLink>(sharedLink);
  }

  @Get('link/:uid')
  async getSharedLink(@Param('uid') uid: StateShareDto['uid']) {
    const sharedLink = await this.entityService.manager.findOne(SharedLink, {
      where: { uid },
    });

    if (sharedLink === undefined) {
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }

    return sharedLink;
  }
}
