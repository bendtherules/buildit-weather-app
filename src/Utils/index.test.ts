import * as moment from 'moment-timezone';
import { Utils, IndiaTZName } from './utils';

test('createTodayDateInIndiaTZ creates in India tz', () => {
    const todayWithUtils = Utils.createTodayDateInIndiaTZ();
    expect(todayWithUtils.tz().toLowerCase()).toBe(IndiaTZName.toLowerCase());
});

test('checkSameDayInSameTZ returns true for same day', () => {
    const tomorrow = moment.tz().add(1, 'd');
    const tomorrow2 = moment.tz().add(2, 'd').subtract(1, 'd');

    expect(Utils.checkSameDayInSameTZ(tomorrow, tomorrow)).toBe(true);
    expect(Utils.checkSameDayInSameTZ(tomorrow, tomorrow2)).toBe(true);
});

test('numberToMaxFixed removes zeroes after decimals', () => {
    const testNumber = 20.00;

    expect(testNumber.toFixed(3)).not.toBe('20');
    expect(Utils.numberToMaxFixed(testNumber, 3)).toBe('20');
});

test('numberToMaxFixed works like number.ToFixed for non-zero after decimal numbers', () => {
    const testNumber = 20.1234;
    
    expect(testNumber.toFixed(3)).toBe('20.123');
    expect(Utils.numberToMaxFixed(testNumber, 3)).toBe('20.123');
});

test('stringToNormalCase returns normal case string for non-empty string', () => {
    const testString = 'hello there';
    const expectedString = 'Hello there';
    
    expect(Utils.stringToNormalCase(testString)).toBe(expectedString);
});

test('stringToNormalCase returns empty string for empty string', () => {
    const testString = '';
    const expectedString = '';
    
    expect(Utils.stringToNormalCase(testString)).toBe(expectedString);
});