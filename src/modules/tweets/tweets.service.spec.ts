import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  describe('createTweet', () => {
    it('should create tweet', () => {
      //arage
      service.tweets = [];
      const payload = 'This is my tweet';

      //act
      const tweet = service.createTweet(payload);

      //assert
      expect(tweet).toBe(payload);
      expect(service.tweets).toHaveLength(1);
    });

    it(`should prevent the tweets created which are over 100 characters`, () => {
      // Arrange
      const payload =
        'This is a long tweet over 100 characters This is a long tweet over 100 characters This is a long t...';

      // Act
      const tweet = () => {
        return service.createTweet(payload);
      };

      // Asert
      expect(tweet).toThrowError();
    });
  });
});
