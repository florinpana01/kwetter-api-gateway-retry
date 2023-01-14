import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './follow.entity';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow) private readonly FollowRepository: Repository<Follow>
    ){
    }

async all(): Promise<Follow[]> {
    return this.FollowRepository.find();
}

async create(data): Promise<Follow>{
    return this.FollowRepository.save(data);
}

async get(id: number): Promise<Follow> {
    return this.FollowRepository.findOneBy({id});
}

async update(id: number, data): Promise<any>{
    return this.FollowRepository.update(id, data);
}

async delete(id: number): Promise<any> {
    return this.FollowRepository.delete(id);
}

}
