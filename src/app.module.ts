import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './modules/tweets/tweets.module';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { AppoinmentModule } from './modules/appoinment/appoinment.module';

@Module({
  imports: [TweetsModule, PokemonModule, AppoinmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
