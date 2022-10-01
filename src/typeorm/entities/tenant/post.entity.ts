import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author_id: string;

  @Column()
  content: string;
}

export default null;
