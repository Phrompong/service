import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('views')
export class ViewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  update_on: Date;

  @Column()
  create_on: Date;
}
