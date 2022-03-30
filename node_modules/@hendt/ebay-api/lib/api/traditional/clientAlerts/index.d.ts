import { EventType } from './types';
declare enum calls {
    GetPublicAlerts = 0,
    GetUserAlerts = 1,
    Login = 2,
    Logout = 3
}
export { EventType };
export default calls;
