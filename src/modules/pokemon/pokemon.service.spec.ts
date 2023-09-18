import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpService } from '@nestjs/axios';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';


describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let httpService: DeepMocked<HttpService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService]
    }).useMocker(createMock).compile();

    pokemonService = module.get<PokemonService>(PokemonService);
    httpService = module.get(HttpService);
  });

  describe('getPokemon', () => {
    it('should throw error if Id is less than 1', async () => {
      // Arrage
      const payload = 0
  
      // Act
      const response = pokemonService.getPokemon(payload);
  
      // Assert
      await expect(response).rejects.toBeInstanceOf(BadRequestException);

    });

    it('should throw error if Id is greater than 151', async () => {
      // Arrage
      const payload = 152
  
      // Act
      const response = pokemonService.getPokemon(payload);
  
      // Assert
      await expect(response).rejects.toBeInstanceOf(BadRequestException);

    });

    it('valid pokemon Id to return the pokemon', async () => {
      // Arrage
      httpService.axiosRef.mockResolvedValueOnce({
        data: {
          species: { name: `bulbasaur` },
        },
        headers: {},
        config: { url: ``},
        status: 200,
        statusText: ``,
      });
      const payload = 1;
      
      // Act
      const getPokemon = pokemonService.getPokemon(payload);
      
      // Assert
      await expect(getPokemon).resolves.toBe('bulbasaur');
    });
  })
});
