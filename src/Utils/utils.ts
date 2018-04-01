import * as moment from 'moment-timezone';

export const IndiaTZName = 'Asia/Kolkata';

export class Utils {
    static createTodayDateInIndiaTZ(): moment.Moment {
        return moment.tz(moment.tz.guess()).tz(IndiaTZName);
    }

    static createDateFromEpochInIndiaTZ(dateEpoch: number): moment.Moment {
        return moment.unix(dateEpoch).tz(IndiaTZName);
    }

    static checkSameDayInSameTZ(moment1: moment.Moment, moment2: moment.Moment, raiseErrorTZMismatch: boolean = true) {
        // tslint:disable-next-line:triple-equals
        if (raiseErrorTZMismatch && (moment1.tz() != moment2.tz())) {
            throw new Error('Timezones don\'t match');
        }

        // tslint:disable-next-line:triple-equals
        return (moment1.clone().startOf('day').format() == moment2.clone().startOf('day').format());
    }

    static numberToMaxFixed(originalNumber: number, maxAfterDecimal: number = 2): number {
        return parseFloat(originalNumber.toFixed(maxAfterDecimal));
    }

    static stringToNormalCase(originalString: string): string {
        if (originalString.length > 0) {
            const firstChar = originalString[0];

            const firstCharUpper = firstChar.toUpperCase();
            const restString = originalString.slice(1, originalString.length);
            return [firstCharUpper, restString].join('');
        } else {
            return originalString;
        }
    }
}

export interface ForecaseAtInstance {
    dt: number;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };

    weather: [{
        id: number;
        main: string; // Make enum
        description: string;
        icon: string;
    }];

    clouds: {
        all: number;
    };

    wind: {
        speed: number;
        deg: number;
    };

    dt_txt: string;
}

export interface Forecast5DaysMixed {
    cnt: number;
    list: Array<ForecaseAtInstance>;
}

export interface Forecast5DaysSeperated {
    forecastDay1: Array<ForecaseAtInstance>;
    forecastDay2: Array<ForecaseAtInstance>;
    forecastDay3: Array<ForecaseAtInstance>;
    forecastDay4: Array<ForecaseAtInstance>;
    forecastDay5: Array<ForecaseAtInstance>;
}