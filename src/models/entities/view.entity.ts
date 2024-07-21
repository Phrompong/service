import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('history')
export class ViewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  view: number;

  @Column()
  update_on: Date;

  @Column()
  create_on: Date;
}
