import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './modules/tweets/tweets.module';
import { PokemonModule } from './modules/pokemon/pokemon.module';

@Module({
  imports: [TweetsModule, PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
