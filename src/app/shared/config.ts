import {environment} from "../../environments/environment";

export const API_URI: string = `${environment.apiUrl}:${environment.apiPort}`;
export const ADMIN_BASE_URI = `${environment.apiUrl}:${environment.apiPort}/api/admin`;
export const CUSTOMER_BASE_URI = `${environment.apiUrl}:${environment.apiPort}/api/customer`;
