import { DataService } from "../dataService";
import { IWeather } from "../models/weather.interface";
const apiKey: string = 'c92276425f1d8a1128d4dde0ff21fd35';

export class WeatherService extends DataService<IWeather> {
    weather: IWeather = null;
    lastPoll: number = null;


    constructor() {
        super(`http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${apiKey}`, apiKey);
        const localWeather: string = localStorage.getItem('weather');
        try {
            if (localWeather) {
                const localWeatherObject: any = JSON.parse(localWeather);
                this.weather = localWeatherObject.weather;
                this.lastPoll = localWeatherObject.lastPoll;
            }
        } catch (error) {
            alert(error);
            localStorage.clear();
        }
    }

    async getWeather(endpoint?: string): Promise<IWeather> {
        if (this.weather !== null && this.lastPoll !== null) {
            var timeNow = Math.round(new Date().getTime() / 1000);
            var tomorrow = timeNow + (24 * 3600);
            if (this.lastPoll > tomorrow) {
                return this.weather;
            }
        }

        return await super.getAll().then((weather: IWeather) => {
            this.weather = weather;
            this.lastPoll = Date.now();
            let weatherObject = {
                weather: this.weather,
                lastPoll: this.lastPoll
            }
            localStorage.setItem('weather', JSON.stringify(weatherObject));

            return weather;
        })
    }

}