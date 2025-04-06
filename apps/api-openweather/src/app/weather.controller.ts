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
import { AppService } from './app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { WeatherResponse } from '@shared/types/weather';

@Controller('weather')
export class WeatherController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly appService: AppService,
  ) {}


  @Get('data')
  async getWeatherData(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('refresh') refresh: string,
    @Req() req: any,
  ) {
    if (!lat || !lon) {
      throw new HttpException(
        'Latitude and Longitude are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const cacheKey = `weather_${lat}_${lon}`;

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
        // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
        'http://localhost:3000/api/weather/dummy'
      );
      const data = response.data as WeatherResponse;

      // Cache the response for 15 minutes
      await this.cacheManager.set(cacheKey, data, 900 );

      return data;
    } catch {
      throw new HttpException(
        'Failed to fetch weather data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('dummy')
  getHelloWorld() {
    return this.appService.getDummyData();
  }
}
