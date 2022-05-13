import { Connection, EntityManager, getManager, getConnection } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EntityService {
  public get manager(): EntityManager {
    return getManager();
  }

  public get connection(): Connection {
    return getConnection();
  }
}
