import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('shared_links')
export class SharedLink {
  @PrimaryColumn('uuid')
  readonly uid: string;

  @Column('longtext')
  content: string;
}
