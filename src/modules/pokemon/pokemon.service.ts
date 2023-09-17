import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PokemonService {
  constructor (private readonly httpService: HttpService){}

  getPokemon = async (id: number) => {
    if (id < 1 || id > 151 ) {
      throw new BadRequestException(`Invalid pokemon id`);
    }

    const { data } = await this.httpService.axiosRef({
      url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      method: `GET`,
    })

    if (!data || !data.species || !data.species.name) {
      throw new InternalServerErrorException();
    }

    return data.species.name;

  }

}
