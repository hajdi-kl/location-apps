import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private weatherApiKey: string;

  constructor() {
    this.weatherApiKey = process.env.WEATHER_API_KEY;
  }

  getData(): { message: string } {
    return { message: 'Hello API'};
  }
}
