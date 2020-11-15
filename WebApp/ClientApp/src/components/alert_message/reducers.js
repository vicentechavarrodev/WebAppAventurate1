import { alert_constants } from './constants';

const initialState = { type: '',message: '',show: false, title:''};

export function alerts(state = initialState, action) {
    switch (action.type) {
        case alert_constants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message,
                show: action.show,
                title: action.title
            };
        case alert_constants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message,
                show: action.show,
                title: action.title
            };
        case alert_constants.SHOW:
            return {
                type: 'alert-info',
                message: action.message,
                show: action.show,
                title: action.title
            };
        case alert_constants.CLEAR:
            return {};
        default:
            return state
    }
}