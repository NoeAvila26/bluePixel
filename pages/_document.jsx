/*_document.jsx*/
import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import {ServerStyleSheets} from '@material-ui/core/styles';
import App from '../components/App';
import cryptoRandomString from "crypto-random-string";

class WebDocument extends Document {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <html lang="en">
            <Head>
                <meta property="csp-nonce" content={this.props.nonce}/>
                <link nonce={this.props.nonce} rel={"stylesheet"} href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700&display=swap"/>
                <link nonce={this.props.nonce} rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link nonce={this.props.nonce} rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link nonce={this.props.nonce} rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link nonce={this.props.nonce} rel="manifest" href="/site.webmanifest"/>
                <meta name="msapplication-TileColor" content={App.Theme.palette.primary.main}/>
                <meta name={"theme-color"} content={App.Theme.palette.primary.main}/>
                <script src="https://www.google.com/recaptcha/api.js" async defer nonce={this.props.nonce}/>
                <style id="jss-server-side" nonce={this.props.nonce}>${this.props.style}</style>
            </Head>
            <body style={{
                scrollBehavior: 'smooth'
            }}>
            <Main/>
            <NextScript nonce={this.props.nonce}/>
            </body>
            </html>
        );
    }

    static getInitialProps = async (ctx) => {
        const nonce = cryptoRandomString({type: 'base64', length: 48}),
            cspPolicy = {
                'default-src': [
                    "'self'",
                    "data:",
                    "cdn.blackpixel.mx",
                    "*.google.com",
                    "*.googleapis.com",
                    "*.gstatic.com",
                    "*.sandbox.blackpixel.mx",
                    "blackpixel.sfo2.digitaloceanspaces.com",
                    `'sha256-4qHwYstA/HMoqYktYjfAnyNPmBqLeAqunX99JaEvimc='`,
                    `'nonce-${nonce}'`,
                    'cdn.jsdelivr.net'
                ],
                'style-src': [
                    "'self'",
                    "'unsafe-inline'",
                    '*'
                ],
                'connect-src': [
                    "wss://gql.sandbox.blackpixel.mx",
                    "https://gql.sandbox.blackpixel.mx",
                    "https://sandbox.blackpixel.mx",
                    "sfo2.digitaloceanspaces.com",
                    "blackpixel.sfo2.digitaloceanspaces.com"
                ],
                'frame-src': [
                    "www.google.com"
                ],
                "media-src": [
                    "*.sandbox.blackpixel.mx",
                ],
                'object-src': [
                    "'none'"
                ],
                'base-uri': [
                    "'none'"
                ]
            };
        const sheets = new ServerStyleSheets(),
            originalRenderPage = ctx.renderPage;

        /*CSP Desactivado*/
        // ctx.res.setHeader('Content-Security-Policy', Object.keys(cspPolicy).map(key => `${key} ${cspPolicy[key].reduce((prev, value) => prev + (prev === '' ? '' : ' ') + value, '')};`).reduce((prev, value) => prev + (prev === '' ? '' : ' ') + value, ''));

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: App => props => sheets.collect(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps, nonce,
            style: sheets.toString(),
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
        };
    };

}

export default WebDocument;
