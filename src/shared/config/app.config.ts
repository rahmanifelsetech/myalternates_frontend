export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
}

const appConfig: AppConfig = {
    apiPrefix: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
    authenticatedEntryPath: '/',
    unAuthenticatedEntryPath: '/auth/signin',
    tourPath: '/',
    locale: 'en',
}

export default appConfig;
