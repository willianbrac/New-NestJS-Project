import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);
    if (!userSaved)
      throw new InternalServerErrorException('Erro ao criar o usuário!');
    return userSaved;
  }
  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('Usuário não encontrado!');
    return user;
  }
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne(email);
    if (!user) throw new NotFoundException('Usuário não encontrado!');
    return user;
  }
  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findUserById(id);
    await this.userRepository.update(user, { ...data });
    const userUpdated = this.userRepository.create({ ...user, ...data });
    return userUpdated;
  }
  async deleteUserById(id: string): Promise<boolean> {
    const user = await this.findUserById(id);
    if (!user) throw new NotFoundException('Usuário não encontrado!');
    const deleted = await this.userRepository.delete(user);
    if (deleted) return true;
    else return false;
  }
}
