import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like) private readonly LikeRepository: Repository<Like>
    ){
    }

async all(): Promise<Like[]> {
    return this.LikeRepository.find();
}

async create(data): Promise<Like>{
    return this.LikeRepository.save(data);
}

async get(id: number): Promise<Like> {
    return this.LikeRepository.findOneBy({id});
}

async update(id: number, data): Promise<any>{
    return this.LikeRepository.update(id, data);
}

async delete(id: number): Promise<any> {
    return this.LikeRepository.delete(id);
}

}
