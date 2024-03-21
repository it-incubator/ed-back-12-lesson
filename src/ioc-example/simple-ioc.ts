import { AdminUsersRepository, UsersRepository } from './users-repository';
import { UsersService } from './users-service';
import { UsersController } from './users-controller';

const objects: any[] = [];

const userRepository = new UsersRepository();
objects.push(userRepository);

const adminUserRepository = new AdminUsersRepository();
objects.push(adminUserRepository);

const userService = new UsersService(userRepository, adminUserRepository);
objects.push(userService);

const usersController = new UsersController(userService);
objects.push(usersController);

export const ioc = {
  getInstance<T>(ClassType: any) {
    const targetInstance = objects.find((object) => object instanceof ClassType);

    return targetInstance as T;
  },
};

// using ioc in the router - at the entrance to the application
const userControllerInstance = ioc.getInstance<UsersController>(UsersController);
//pass to pouter
