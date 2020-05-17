import eu from './translations/eu.js'
import routes from './routes.js'

export const I18N = {
  locales: [
    {
      code: 'eu'
    }
  ],
  parsePages: false,   // Disable babel parsing
  strategy: 'prefix_except_default',
  defaultLocale: 'eu',
  pages: routes,
  vueI18n: {
    fallbackLocale: 'eu',
    messages: {
      eu
    }
  }
}
