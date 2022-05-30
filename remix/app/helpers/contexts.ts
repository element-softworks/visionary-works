import { createContext } from 'react';
import { Message } from '~/sessions';

export const ClientStyleContext = createContext<{
	reset: () => void;
}>({
	reset: () => {},
});

export interface ServerStyleContextData {
	key: string;
	ids: Array<string>;
	css: string;
}

export const ServerStyleContext = createContext<ServerStyleContextData[]>([]);

export const MessageContext = createContext<{
	message: Message | null;
}>({
	message: null,
});

export const HeaderHeightContext = createContext<Partial<{ height: number | null }>>({
	height: null,
});
