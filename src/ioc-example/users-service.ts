import { AdminUsersRepository, UsersRepository } from './users-repository';
import { inject, injectable } from 'inversify';

@injectable()
export class UsersService {
  constructor(
    @inject(UsersRepository) private userRepository: UsersRepository,
    @inject(AdminUsersRepository) private adminUsersRepository: AdminUsersRepository
  ) {}
}
