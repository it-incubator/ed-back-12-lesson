import { Container } from 'inversify';
import { UsersRepository } from './features/users/infra/users.repository';

export const container = new Container();
container.bind(UsersRepository).toSelf();
