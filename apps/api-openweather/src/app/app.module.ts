import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherController } from './weather/weather.controller';
import { OriginCheckMiddleware } from './origin-check.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { WeatherTranslationService } from './weather/translations/translation.service';

@Module({
  imports: [CacheModule.register({
    max: 100, // Maximum number of items in cache
  }),
],
  controllers: [AppController, WeatherController],
  providers: [AppService, WeatherTranslationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OriginCheckMiddleware).forRoutes(WeatherController);
  }
}
