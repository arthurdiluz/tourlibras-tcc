import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from '@env' /* eslint-disable-line import/no-unresolved */

const facebook = Object.freeze({
    appId: FACEBOOK_APP_ID || '',
    appSecret: FACEBOOK_APP_SECRET || ''
})

export default facebook
