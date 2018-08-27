import { DataService } from "../dataService";
import { IWeather } from "../models/weather.interface";
const apiKey: string = 'c92276425f1d8a1128d4dde0ff21fd35';

export class WeatherService extends DataService<IWeather> {

    constructor() {
        super(`http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${apiKey}`, apiKey);
    }

}