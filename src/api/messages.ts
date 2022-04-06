import {
	MESSAGE_TYPE_RQ,
	IMApiOldMessageResponse,
	IMApiRequest,
	IMApiResponse,
	MESSAGE_TYPE_RS,
	IMapiUserConnectResponse,
	IMApiMessageResponse,
	MApiResponses
} from './messages.types';

/**
 * Клиент для WS API wss://ya-praktikum.tech/ws/chats/
 * Документация: {@link https://ya-praktikum.tech/api/v2/openapi/ws}
 * Реализовано в первом приближении. Есть проблемы на стороне сервера.
 * При отключении по таймауту(60сек) ws заново не соединяется.
 */
const wsUrl = 'wss://ya-praktikum.tech/ws/chats';

const connections: {[chatId: number]: WebSocket} = {};
const keepAliveTimers: {[chatId: number]: NodeJS.Timeout} = {};

/**
 * Создание нового WS подключение и добавление его в список подключений
 * @param userId - ID пользовател
 * @param chatId - ID чата
 * @param token - Токен присланный сервером
 */
export function createConnection(
	userId: number,
	chatId: number,
	token: string,
	handlers: {
		onClose: (chatId: number) => void;
		onMessage: (chatId: number, message: MApiResponses) => void;
	}
) {
	const logPreffix = `[wss - ${chatId}]`;
	const connection = new WebSocket(`${wsUrl}/${userId}/${chatId}/${token}`);
	connection.addEventListener('open', () => {
		console.debug(`${logPreffix} Соединение установлено`);
		connections[chatId] = connection;
		send(chatId, {
			type: MESSAGE_TYPE_RQ.GET_OLD,
			content: '0'
		});
		keepAliveTimers[chatId] = keepAlive(send.bind(null, chatId, {type: MESSAGE_TYPE_RQ.PING}));
	});

	connection.addEventListener('close', (event) => {
		if (event.wasClean) {
			console.debug(`${logPreffix} Соединение закрыто чисто`);
		} else {
			console.debug(`${logPreffix} Обрыв соединения`);
		}
		clearInterval(keepAliveTimers[chatId]);
		handlers.onClose(chatId);

		console.debug(`${logPreffix} Код: ${event.code} | Причина: ${event.reason}`);
	});

	connection.addEventListener('message', (event) => {
		const data = JSON.parse(event.data);
		console.debug(`${logPreffix} Получены данные`, data);
		const message = messageHandler(data, chatId);
		if (message) {
			handlers.onMessage(chatId, message);
		}
	});

	connection.addEventListener('error', (event) => {
		console.error(`${logPreffix} Ошибка`, event);
	});
}

/**
 * Отправка сообщение на сервер
 * @param chatId - ID чата(подключения)
 * @param message - Сообщение
 */
export function send<T extends IMApiRequest>(chatId: number, message: T) {
	const connection = connections[chatId];
	if (connection && connection.readyState === connection.OPEN) {
		connection.send(JSON.stringify(message));
	} else {
		console.warn(`[wss - ${chatId} - send] Нет соединения`);
	}
}

/**
 * Отключение от канала с указанным ID и кодом **1000**.
 * Если вызывается без указания ID, закрываются все соединения
 * @param chatId - ID чата(подключения)
 */
export function disconnect(chatId?: number) {
	if (chatId) {
		closeFn(chatId);
	} else {
		Object.keys(connections).forEach((connectionId) => closeFn(+connectionId));
	}
}

const closeFn = (chatId: number) => {
	const connection = connections[chatId];
	clearInterval(keepAliveTimers[chatId]);
	if (connection) {
		if (connection.readyState !== connection.CLOSED) {
			connection.close(1000);
		}
		delete connections[chatId];
	} else {
		console.warn(`[wss - ${chatId} - disconnect] Нет соединения`);
	}
};

/**
 * Обработка сообщения с сервера.
 * @param data - Пришедшие с сервера данные
 * @param chatId - ID чата
 */
const messageHandler = (data: unknown, chatId: number): MApiResponses | undefined => {
	if (Array.isArray(data) && data.length) {
		return data.reverse().map<IMApiOldMessageResponse>((oldMessage) => {
			return {...oldMessage, type: MESSAGE_TYPE_RS.MESSAGE, file: undefined}; // HACK Внезапное изменение сервера
		});
	} else if (data !== null && typeof data === 'object') {
		switch ((data as IMApiResponse).type) {
			case MESSAGE_TYPE_RS.PONG: {
				console.debug(`[wss - ${chatId} - message] pong`);
				return;
			}
			case MESSAGE_TYPE_RS.MESSAGE: {
				const message = data as IMApiMessageResponse;
				return {...message, user_id: message.userId!}; // HACK Внезапное изменение сервера
			}
			case MESSAGE_TYPE_RS.USER_CONNECTED: {
				return data as IMapiUserConnectResponse;
			}
			default: {
				console.debug(`[wss - ${chatId} - message] unknown`);
			}
		}
	}
};

const keepAlive = (callback: Function, timeout = 55000) => {
	return setInterval(() => {
		callback();
	}, timeout);
};
