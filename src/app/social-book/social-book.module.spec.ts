import { SocialBookModule } from './social-book.module';

describe('SocialBookModule', () => {
  let socialBookModule: SocialBookModule;

  beforeEach(() => {
    socialBookModule = new SocialBookModule();
  });

  it('should create an instance', () => {
    expect(socialBookModule).toBeTruthy();
  });
});
