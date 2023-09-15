import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';
import exp from 'constants';
import { platform } from 'os';

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

  describe(`updatedTweet`, () => {
    it(`should prevent update and throw error, tweet index does not exist`, () => {
      // Arrange
      service.tweets = [];
      const payload = {
        tweet: `First Tweet`,
        id: 1
      }

      // Act
      const tweet = () => {
        return service.updateTweet(payload.tweet, payload.id)
      }

      // Assert
      expect(tweet).toThrowError();
      
    })

    it(`should prevent the update tweet if tweet length is greater then 100`, () => {
      // Arrage
      service.tweets = ['Dummy twee'];
      const tweet = `This is going to be a very long tweet. A tweet which contain more then 100 character at least. You can check it`;

      const payload = {
        tweet: tweet,
        id: 0
      }

      // Act
      const response = () => { 
        return service.updateTweet(payload.tweet, payload.id)
      }

      // Assert
      expect(response).toThrowError(`Tweet too long`)
    })

    it(`Should update the tweet and return updated tweet`, () => {
      // Arrage
      service.tweets = ['Hi, its older tweet'];
      const payload = {
        tweet: `Hi, its latest tweet`,
        id: 0
      }

      // Act 
      const tweet = service.updateTweet(payload.tweet, payload.id);

      // Assert
      expect(tweet).toBe(payload.tweet)
      expect(service.tweets[payload.id]).toBe(payload.tweet)
      expect(service.tweets).toHaveLength(1)

    })
  });

  describe(`getTweet`, () => {
  it(`Should return tweet array`, () => {
    // Arrage
    service.tweets = [`Tweet 1`, `Tweet 2`, `Tweet 3`];

    // Act
    const tweets = service.getTweets()

    // Assert
    expect(tweets).toBe(service.tweets)
    expect(tweets).toHaveLength(3)
  })

  describe(`deleteTweet`, () => {
    it(`Should throw error if tweet does not exist on particular indext`, () => {
      // Arrage
      service.tweets = [];
      const payload = 1

      // Act
      const tweet = () => {
        return service.deleteTweet(payload)
      }

      // Assert
      expect(tweet).toThrowError('This Tweet does not exist')
    })

    it(`Should delete tweet`, () => {
      // Arrage
      service.tweets = [`Tweet 1`]
      const payload = 0;

      // Act
      const deletedTweet = service.deleteTweet(payload)

      // Assert
      expect(deletedTweet).toBe(`Tweet 1`)
    })
  })

  })
});
