import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private _weatherApiKey: string;
  private helloWorld = 'Hello World!';

  constructor() {
    this._weatherApiKey = process.env.WEATHER_API_KEY ?? '';
  }

  get weatherApiKey(): string {
    return this._weatherApiKey;
  }

  getHello(): { message: string } {
    return { message: this.helloWorld };
  }

  getDummyData() {
    return {
      coord: { lon: -0.1257, lat: 51.5085 },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
      ],
      base: 'stations',
      main: {
        temp: 282.53,
        feels_like: 279.39,
        temp_min: 281.49,
        temp_max: 283.66,
        pressure: 1024,
        humidity: 51,
        sea_level: 1024,
        grnd_level: 1020,
      },
      visibility: 10000,
      wind: { speed: 6.69, deg: 70 },
      clouds: { all: 60 },
      dt: 1743967201,
      sys: {
        type: 2,
        id: 2091269,
        country: 'GB',
        sunrise: 1743917052,
        sunset: 1743964871,
      },
      timezone: 3600,
      id: 2643743,
      name: 'London',
      cod: 200,
    };
  }
}
