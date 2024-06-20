import { UserRepositoryImplementation } from '../db/repository/user-repository';
import { UserService } from '../service/user-service';
import UserController from './user-controller';

const userRepository = new UserRepositoryImplementation();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export default userController;
