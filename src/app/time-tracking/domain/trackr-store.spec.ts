import { TestBed, inject } from '@angular/core/testing';
import {TrackrStore} from "./trackr-store";
import {Year} from "./year";
import {Month} from "./month";
import {Day} from "./day";
let mockTrackrStore: TrackrStore;
fdescribe('AppConfigService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
        });

        prepareMockStore();
    });

    it('should get day from given date', () => {
        let byDate = mockTrackrStore.getDayByDate(new Date("2017/07/12",));
        expect(byDate.id).toBe(12);
        expect(byDate.hours).toBe(8.5);
        expect(byDate.message).toBe("something");
    });

    it('should get monday for given date', () => {
        let monday = mockTrackrStore.getMonday(new Date("2017/07/12")); // wednesday
        expect(monday.getDate()).toBe(10);

        monday = mockTrackrStore.getMonday(new Date("2017/07/16")); // sunday
        expect(monday.getDate()).toBe(10);

        monday = mockTrackrStore.getMonday(new Date("2017/07/18")); // tuesday
        expect(monday.getDate()).toBe(17);

        monday = mockTrackrStore.getMonday(new Date("2017/07/01")); // saturday start of new month
        expect(monday.getDate()).toBe(26);
        expect(monday.getMonth()).toBe(5); //javascript counts months from 0, we check for june obviously
    });

    it('should get all days in week for given date', () => {
        let weekByDate = mockTrackrStore.getWeekByDate(new Date("2017/07/12"));
        expect(weekByDate[0].id).toBe(10); //monday
        expect(weekByDate[6].id).toBe(16); //sunday

        weekByDate = mockTrackrStore.getWeekByDate(new Date("2017/07/20"));
        expect(weekByDate[0].id).toBe(17); //monday
        expect(weekByDate[6].id).toBe(23); //sunday
    });

    it('should get all days in month for given date', () => {
        let days = mockTrackrStore.getDaysForMonthByDate(new Date("2017/07/12"));
        expect(days[0].message).toBe("Im a sunday");
    });
});

function prepareMockStore() {
    mockTrackrStore = new TrackrStore();
    let year = new Year();
    year.id = 2017;

    let month = new Month();
    month.id = 7;
    month.days = [];

    addDay(month, 1, "Im a sunday");
    addDay(month, 2);
    addDay(month, 3);
    addDay(month, 4);
    addDay(month, 5);
    addDay(month, 6);
    addDay(month, 7);
    addDay(month, 8);
    addDay(month, 9);
    addDay(month, 10);
    addDay(month, 11);
    addDay(month, 12);
    addDay(month, 13);
    addDay(month, 14);
    addDay(month, 15);
    addDay(month, 16);
    addDay(month, 17);
    addDay(month, 18);
    addDay(month, 19);
    addDay(month, 20);
    addDay(month, 21);
    addDay(month, 22);
    addDay(month, 23);
    addDay(month, 24);
    addDay(month, 25);
    addDay(month, 26);
    addDay(month, 27);
    addDay(month, 28);
    addDay(month, 29);
    addDay(month, 30);
    addDay(month, 31);
    year.months = [];
    year.months.push(month);

    mockTrackrStore.entities = [];
    mockTrackrStore.entities.push(year);
}

function addDay (month: Month, day: number, message?: string) {
    let newDay = new Day();
    newDay.id = day;
    newDay.hours = 8.5;
    newDay.message = message ? message : "something";

    month.days.push(newDay);
}
