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
}