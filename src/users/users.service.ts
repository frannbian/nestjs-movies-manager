import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(email: string = null): Promise<User[]> {
    return this.usersRepository.findBy({ email: email });
  }

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  create(email: string, password: string, role: string) {
    const user = this.usersRepository.create({ email, password, role });

    return this.usersRepository.save(user);
  }
}
