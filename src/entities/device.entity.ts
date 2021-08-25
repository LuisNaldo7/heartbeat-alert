import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('device')
export class DeviceEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'guid',
  })
  guid?: string;
  @Column({
    name: 'description',
  })
  description?: string;
  @Column({
    name: 'max_timeout',
    default: 60,
  })
  maxTimeout?: number;
  @Column({
    name: 'last_seen',
    default: null,
  })
  lastSeen?: number;
  @Column({
    name: 'type',
    default: null,
  })
  type?: string;
  @Column({
    name: 'mail_sent',
    default: false,
  })
  mailSent?: boolean;
  @Column({
    name: 'enabled',
    default: false,
  })
  enabled?: boolean;
}
