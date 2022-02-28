import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { User } from 'src/user/entities/user.entity';

export const mockAddAccountParams: CreateUserInput = {
  name: 'test user',
  email: 'user@email.com',
  password: '123456',
};
export const mockUpdateUserParams: UpdateUserInput = {
  name: 'test user',
  email: 'user@email.com',
};
export const mockUserModel: User = {
  id: '1',
  ...mockAddAccountParams,
};
export const mockUpdateUserModel: User = {
  ...mockUserModel,
  email: 'updated_user@email.com',
};
export const mockUserArrayModel: User[] = [
  mockUserModel,
  {
    id: '2',
    name: 'name2',
    email: 'email2@email.com',
    password: '123456',
  },
  {
    id: '3',
    name: 'name3',
    email: 'email3@email.com',
    password: '654321',
  },
];

export default class TestUser {
  static giveMeAValidUser(): User {
    const user = new User();
    user.email = 'willianbr.ac68@gmail.com';
    user.name = 'willian';
    user.id = '1';
    return user;
  }
}
