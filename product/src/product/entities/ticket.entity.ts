import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TicketType } from '../constants/ticket.enum';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid', { name: 'ticket_id' })
  ticketId: string;

  @Column('simple-array', { name: 'ticket_types' })
  ticketTypes: TicketType[];
}
