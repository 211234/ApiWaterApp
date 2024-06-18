import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fullName!: string;

    @Column()
    street!: string;

    @Column()
    calle!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;
}
