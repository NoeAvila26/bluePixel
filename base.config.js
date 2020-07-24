export default {
    defaultTitle: 'NR Finance-México',
    rootDomain: process.env.NODE_ENV === 'development' ? 'sandbox.blackpixel.mx' : 'nrfm.blackpixel.mx',
    httpsUri: process.env.NODE_ENV === 'development' ? 'https://gql.sandbox.blackpixel.mx' : 'https://gql.nrfm.blackpixel.mx',
    wssUri: process.env.NODE_ENV === 'development' ? 'wss://gql.sandbox.blackpixel.mx' : 'wss://gql.nrfm.blackpixel.mx',
    cdnRoot: process.env.NODE_ENV === 'development' ? 'https://cdn.blackpixel.mx' : 'https://cdn.nrfm.blackpixel.mx',
    previewRoot: process.env.NODE_ENV === 'development' ? 'https://preview.sandbox.blackpixel.mx' : 'https://preview.nrfm.blackpixel.mx',
    passwordMinLength: 8,
    recaptchaSiteKey: '6LfwGO0UAAAAAFsA2opOyafoNO0iDoFarAx6je2-'
};
