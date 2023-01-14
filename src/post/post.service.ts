import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private readonly PostRepository: Repository<Post>
    ){
    }

async all(): Promise<Post[]> {
    return this.PostRepository.find();
}

async create(data): Promise<Post>{
    return this.PostRepository.save(data);
}

async get(id: number): Promise<Post> {
    return this.PostRepository.findOneBy({id});
}

async update(id: number, data): Promise<any>{
    return this.PostRepository.update(id, data);
}

async delete(id: number): Promise<any> {
    return this.PostRepository.delete(id);
}

}
