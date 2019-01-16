import axios, { AxiosError } from 'axios';
import HttpStatus from 'http-status-codes';
import { PleiepengesøknadApiData } from '../types/PleiepengesøknadApiData';
import { getEnvironmentVariable } from './envHelper';

const apiUrl = getEnvironmentVariable('API_URL');

export const sendApplication = (data: PleiepengesøknadApiData) => axios.post(`${apiUrl}/soknad`, data);

export const isForbidden = ({ response }: AxiosError) =>
    response !== undefined && response.status === HttpStatus.FORBIDDEN;

export const isUnauthorized = ({ response }: AxiosError) =>
    response !== undefined && response.status === HttpStatus.UNAUTHORIZED;
