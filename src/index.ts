export type optionType = {
   country: string;
   lat: number;
   local_names: {};
   lon: number;
   name: string;
   state: string
}

export type forecastType = {
    city: {
       coord: {
        lat: number;
        lon: number;
       }
       country: string;
       id: number;
       population: number;
       timezone: number;
       sunset: number;
       sunrise: number;
       name: string
    };
    cnt: number;
    cod: string;
    list:[
        {
            clouds:{
                all: number;
            }
            dt: number;
            dt_txt: string;
            main: {
                feels_like: number;
                grnd_level: number;
                humidity: number;
                pressure: number;
                sea_level: number;
                temp: number;
                temp_kf: number;
                temp_max: number;
                temp_min: number;
            }
            pop: number;
            rain?: {'3h': number};
            sys: {pod: string};
            visibility: number;
            weather: [{
                description : string;
                icon: string;
                id: number;
                main: string
            }]
            wind: {
                deg: number
                gust: number;
                speed: number;
            }
        }
    ];
    message: number;
}