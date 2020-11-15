import { alert_constants } from './constants';

export const alertActions = {
    success,
    error,
    showMessage,
    clear
};

function success(message, show, title) {
    return { type: alert_constants.SUCCESS, message , show, title };
}
function showMessage(message, show, title) {
    return { type: alert_constants.SHOW, message, show , title};
}

function error(message, show, title) {
    return { type: alert_constants.ERROR, message, show, title};
}

function clear() {
    return { type: alert_constants.CLEAR };
}