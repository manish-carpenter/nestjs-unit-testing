import { BadRequestException } from '@nestjs/common';
import { ParsePokemonIdPipe } from './parse-pokemon-id.pipe';
import { PokemonController } from './pokemon.controller';

describe('ParsePokemonIdPipe', () => {
  let pipe: ParsePokemonIdPipe;

  beforeEach(() => {
    pipe = new ParsePokemonIdPipe();
  });

  it('should be defined', () => {
    expect(new ParsePokemonIdPipe()).toBeDefined();
  });

  it(`should throw error for non number`, () => {
    const value = () => {
      pipe.transform(`hello`);
    }
    expect(value).toThrowError(BadRequestException);
  })

  it(`should throw error if number is less than 1`, () => {
    const value = () => {
      pipe.transform('-1')
    }

    expect(value).toThrowError(BadRequestException);
  })

  it(`should throw error if number is greate than 151`, () => {
    const value = () => {
      pipe.transform(`152`)
    }

    expect(value).toThrowError(BadRequestException);
  })

  it(`should return pokemon number if number is in betwee 1 and 151`, () => {
    const value = pipe.transform(`2`);

    expect(value).toBe(2);
  })

});
