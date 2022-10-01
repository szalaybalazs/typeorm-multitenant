import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class user {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  temp_email: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_activated: boolean;

  @Column({ nullable: true })
  verification_token: string;

  @Column({ nullable: true })
  reset_token: string;

  @Column('timestamp', { nullable: true })
  reset_token_expiry: Date;

  @Column('varchar', { array: true, default: [] })
  scopes?: string[];

  @Column('varchar', { array: true, default: null, nullable: true })
  communication_preferences: string[];

  @Column({ default: false })
  is_ready: boolean;

  @Column({ default: false })
  is_ready_confirmed: boolean;

  @Column({ default: false })
  is_over_eighteen: boolean;

  @Column({ default: false })
  is_mainland_uk: boolean;

  @Column('timestamp', { nullable: true })
  deleted_at: Date;

  @Column('boolean', { default: false })
  is_deleted: boolean;

  @Column({ default: false })
  agreed_to_terms: boolean;

  @Column({ default: false })
  is_locked: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  registered_at: Date;
}

export default null;
