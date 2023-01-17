import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entitiy';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies : Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  // main.ts에서 pipe 안에 transform을 걸어놨기 때문에 id : string을 id : number로 바꿈
  getOne(id: number): Movie {
    const movie =  this.movies.find(movie => movie.id === id);
    if(!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: number): boolean {
    this.getOne(id);
    this.movies =  this.movies.filter(movie => movie.id !== id);
    return true;
  }

  create(movieData : CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData : UpdateMovieDTO) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({...movie, ...updateData});
  }
}
