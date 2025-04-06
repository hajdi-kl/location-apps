import { OriginCheckMiddleware } from './origin-check.middleware';

describe('OriginCheckMiddleware', () => {
  it('should be defined', () => {
    expect(new OriginCheckMiddleware()).toBeDefined();
  });
});
