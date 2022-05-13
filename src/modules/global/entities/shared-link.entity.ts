import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shared_links')
export class SharedLink {
  @PrimaryGeneratedColumn()
  uid: string;

  @Column('longtext')
  content: string;
}
