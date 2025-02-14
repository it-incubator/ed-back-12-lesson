import 'reflect-metadata';
import { Container } from 'inversify';
import { AdminUsersRepository, UsersRepository } from './users-repository';
import { UsersService } from './users-service';

export const container = new Container();

container.bind(UsersRepository).to(UsersRepository);
container.bind(AdminUsersRepository).to(AdminUsersRepository);
container.bind(UsersService).to(UsersService);
