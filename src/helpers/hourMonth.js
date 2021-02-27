import moment from 'moment';

export const toHourMonth = ( date ) => {
    const hourMonth = moment(date);
    return hourMonth.format('HH:mm a | MMMM Do');
};