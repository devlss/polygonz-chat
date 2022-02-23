import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {IApiBadRequestError} from './types';

const API_URL = new URL('https://ya-praktikum.tech/api/v2');

/**
 * Клиент для API https://ya-praktikum.tech/api/v2/swagger/
 */
export const ax = axios.create({baseURL: API_URL.href, withCredentials: true});
ax.interceptors.request.use(requestHandler);
ax.interceptors.response.use(responseHandler, responseErrorHandler);

/**
 * Перехватчик запросов на сервер. Позволяет выполнять обработку всех запросов
 * до отправки в сетевой стэк
 * @param request   Объект конфигурации запроса на сервер
 */
function requestHandler(request: AxiosRequestConfig): AxiosRequestConfig {
	// eslint-disable-next-line no-console
	// console.debug('[API req]', request);

	return request;
}

/**
 * Перехватчик ответов от сервера. Позволяет выполнять обработку всех ответов
 * до возвращения в промис вызвавшего метода
 * @param response  Объект ответ от сервера
 */
function responseHandler<T>(response: AxiosResponse<T>): AxiosResponse<T> {
	// eslint-disable-next-line no-console
	// console.debug('[API resp]', response);

	return response;
}

/**
 * Перехватчик ошибок от сервера. Позволяет выполнять обработку всех ошибок,
 * до возвращения в промис вызвавшего метода
 * @param response  Объект ошибки от сервера
 */
function responseErrorHandler(responseError: AxiosError<unknown>): Promise<IApiBadRequestError> {
	let badRequestError: IApiBadRequestError;

	if (responseError.response) {
		if (responseError.request.responseType === 'text' && typeof responseError.response.data === 'string') {
			try {
				badRequestError = JSON.parse(responseError.response.data);
			} catch (error) {
				// Несмотря на описание Api, формат ошибок иногда не такой как должен быть
				badRequestError = {
					reason: responseError.response.data
				};
			}
		} else {
			badRequestError = responseError.response.data as IApiBadRequestError;
		}

		if (badRequestError) {
			badRequestError.status = responseError.response.status;
		}
	} else {
		badRequestError = {
			reason: 'API Error'
		};
	}

	// eslint-disable-next-line no-console
	console.error('[API error]', badRequestError, responseError.response);

	return Promise.reject(badRequestError);
}
