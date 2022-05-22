import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shared_links')
export class SharedLink {
  @PrimaryGeneratedColumn('uuid')
  uid: string;
  @Column('mediumtext')
  content: string;
}
