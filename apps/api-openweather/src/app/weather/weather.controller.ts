import {
  Controller,
  Get,
  Query,
  Req,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { AppService } from '../app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { WeatherResponse } from '@shared/types/weather';
// import { WEATHER_API_URL } from '@shared/config/weather';
import { WeatherTranslationService } from './translations/translation.service';
import { Language } from '@shared/config';

@Controller('weather')
export class WeatherController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly appService: AppService,
    private readonly translateService: WeatherTranslationService
  ) {}

  @Get('data')
  async getWeatherData(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('q') q: string,
    @Query('lang') lang: string,
    @Query('refresh') refresh: string,
    @Req() req: any
  ) {
    let queryParam: string;

    if (lat && lon && !isNaN(Number(lat)) && !isNaN(Number(lon))) {
      queryParam = `lat=${lat}&lon=${lon}`;
    } else if (q) {
      queryParam = `q=${q}`;
    } else {
      throw new HttpException(
        'Either valid Latitude and Longitude or a query parameter (q) is required',
        HttpStatus.BAD_REQUEST
      );
    }

    const cacheKey = `weather_${queryParam}`;

    if (!refresh) {
      const cachedData = await this.cacheManager.get(cacheKey);
      if (cachedData) {
        req.res.setHeader('Cache-Control', 'public, max-age=900');
        return cachedData;
      }
    }

    // Fetch weather data from OpenWeatherMap API
    const apiKey = this.appService.weatherApiKey;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?${queryParam}&appid=${apiKey}&units=metric&lang=${
          lang || Language.English
        }`
        // WEATHER_API_URL + '/dummy'
      );
      const data = response.data as WeatherResponse;

      // Cache the response for 15 minutes
      await this.cacheManager.set(cacheKey, data, 900);

      return data;
    } catch {
      throw new HttpException(
        'Failed to fetch weather data',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('dummy')
  getHelloWorld() {
    return this.appService.getDummyData();
  }

  @Get('translations')
  async getTranslations(@Query('lang') lang: string) {
    if (!lang) {
      throw new HttpException(
        'Missing language parameter',
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      const translations = this.translateService.getTranslation(lang);
      return translations;
    } catch (error) {
      throw new HttpException('Language not supported', HttpStatus.BAD_REQUEST);
    }
  }
}
