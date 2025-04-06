import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherController } from './weather.controller';
import { OriginCheckMiddleware } from './origin-check.middleware';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({
    ttl: 900, // Default cache time-to-live (900 seconds = 15 minutes)
    max: 100, // Maximum number of items in cache
  }),
],
  controllers: [AppController, WeatherController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OriginCheckMiddleware).forRoutes(WeatherController);
  }
}
