import appConfig from '@shared/config/app.config';
import moment from 'moment';

export const formatDate = (date: string | Date) => {
    if (!date) return '';
    return moment(date).format(appConfig.dateFormat);
};

export const formatDateTime = (date: string | Date) => {
    if (!date) return '';
    return moment(date).format(appConfig.dateTimeFormat);
};
