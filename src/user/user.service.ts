import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly UserRepository: Repository<User>
    ){
    }

async all(): Promise<User[]> {
    return this.UserRepository.find();
}

async create(data: any): Promise<User>{
    return this.UserRepository.save(data);
}

async findOne(condition: any): Promise<User> {
    return this.UserRepository.findOne({where: condition});
}

async get(id: number): Promise<User> {
    return this.UserRepository.findOneBy({id});
}

async update(id: number, data): Promise<any>{
    return this.UserRepository.update(id, data);
}

async delete(id: number): Promise<any> {
    return this.UserRepository.delete(id);
}

}
