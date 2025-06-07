import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lancamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  data!: Date;

  @Column()
  descricao!: string;

  @Column('decimal')
  valor!: number;

  @Column()
  tipo!: string;
}
