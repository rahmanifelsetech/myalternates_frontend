export type AppConfig = {
    apiPrefix: string
    baseUrl: string
    storageUrl: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    dateFormat: string
    dateTimeFormat: string
}

const apiPrefix = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'
const baseUrl = apiPrefix.replace('/api/v1', '')

const appConfig: AppConfig = {
    apiPrefix,
    baseUrl,
    storageUrl: `${baseUrl}/storage`,
    authenticatedEntryPath: '/',
    unAuthenticatedEntryPath: '/auth/signin',
    tourPath: '/',
    locale: 'en',
    dateFormat: 'YYYY-MM-DD',
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
}

export default appConfig;
