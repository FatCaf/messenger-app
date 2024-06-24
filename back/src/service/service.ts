import { ChatRepositoryImplementation } from '../db/repository/chat-repository';
import { UserRepositoryImplementation } from '../db/repository/user-repository';
import { ChatService } from './chat-service/chat-service';
import errorService from './error-service/error-service';
import { UserService } from './user-service/user-service';
import validationService from './validation-service/validation-service';

const chatRepository = new ChatRepositoryImplementation();
const userRepository = new UserRepositoryImplementation();
const userService = new UserService(userRepository);
const chatService = new ChatService(chatRepository);
export { chatService, errorService, userService, validationService };
