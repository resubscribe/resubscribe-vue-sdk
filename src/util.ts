import Color from 'color';
import packageJson from '../package.json';

import { Options } from './store';

export const baseUrl = 'https://app.resubscribe.ai';
export const apiUrl = 'https://api.resubscribe.ai';
export const domain = 'app.resubscribe.ai';

export const version = `vue:${packageJson.version}`;

export const api = {
    get: async (
        path: string,
        params: Record<string, string>,
        apiKey: string | undefined,
    ) => {
        const query = Object.entries({
            ...params,
            v: version,
        })
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
        const url = `${apiUrl}/v1/${path}?${query}`;
        const response = await fetch(
            url,
            {
                cache: 'no-cache',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...(apiKey ? {'Authorization': 'Bearer ' + apiKey} : {}),
                }
            },
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}`);
        }
        return response.json();
    },
}

export const getNavigatorLanguage = (): string | null => {
    if (navigator.languages && navigator.languages.length) {
        return navigator.languages[0];
    } else {
        return (navigator as any).userLanguage || navigator.language || (navigator as any).browserLanguage || null;
    }
};

export const registerConsent = (options: Options) => {
    const navLang = getNavigatorLanguage();
    const params: Record<string, string> = {
        slug: options.slug,
        uid: options.userId,
        ...(options.userEmail ? {email: options.userEmail} : {}),
        ait: options.aiType,
        ...(navLang ? {brloc: navLang} : {}),
        ...(options.metadata ? {metadata: JSON.stringify(options.metadata)} : {}),
    }
    api.get(
        'sessions/consent',
        params,
        options.apiKey,
    ).catch((e) => {
        console.error('Failed to fetch sessions/consent: ', e);
    });
};

export type AIType = 'intent' | 'churn' | 'delete' | 'subscriber' | 'presubscription' | 'precancel';

export type CloseFn = (via: 'cancel-consent' | 'close') => void;

export type State = 'closed' | 'confirming' | 'open';

export const getTitle = (aiType: AIType): string => {
    switch (aiType) {
        case 'intent':
            return 'Not ready to pay?';
        case 'churn':
            return "We're sorry to see you go";
        case 'delete':
            return "We're sorry to see you go";
        case 'subscriber':
            return 'Would you like to tell us about your experience?';
        case 'presubscription':
            return 'Can we ask you a few questions?';
        case 'precancel':
            return 'Can we ask you a few questions?';
        default:
            return '';
    }
};

export const getDescription = (aiType: AIType): string => {
    switch (aiType) {
        case 'intent':
            return 'Can we ask you a few questions? It should only take a few minutes.';
        case 'churn':
            return 'Can we ask you a few questions? It should only take a few minutes.';
        case 'delete':
            return 'Can we ask you a few questions? It should only take a few minutes.';
        case 'subscriber':
            return 'Can we ask you a few questions? It should only take a few minutes.';
        case 'presubscription':
            return "We'd love to hear your thoughts. It should only take a few minutes.";
        case 'precancel':
            return "We'd love to hear your thoughts. It should only take a few minutes.";
        default:
            return '';
    }
};

export const isDarkColor = (color: string): boolean => {
    return Color(color).isDark();
};

export const reduceOpacity = (color: string, opacity: number) => {
    return Color(color).alpha(opacity).string();
}
