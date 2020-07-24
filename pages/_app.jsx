import React, {Fragment} from 'react';
import baseConfig from '../base.config';
import cryptoRandomString from "crypto-random-string";
import fetch from "isomorphic-unfetch";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {ApolloProvider} from 'react-apollo';
import {HttpLink} from "apollo-link-http";
import {WebSocketLink} from "apollo-link-ws";
import {split, ApolloLink} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";
import {SubscriptionClient} from "subscriptions-transport-ws";
import {InMemoryCache} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import withApollo from "next-with-apollo";
import App from 'next/app';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Theme, Context} from '../components/App'
import "animate.css/animate.min.css";
import 'emoji-mart/css/emoji-mart.css'
import 'simplebar/dist/simplebar.min.css';
import "../public/main.css";
import {SnackbarProvider} from 'notistack';
import {onError} from "apollo-link-error";
import moment from "moment";

const httpLink = new HttpLink({
        fetch,
        uri: baseConfig.httpsUri,
        credentials: 'include',
        withCredentials: true
    }),
    errorLink = onError(({networkError, graphQLErrors}) => {
        if (graphQLErrors) {
            graphQLErrors.map(({message, locations, path}) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
            );
        }
        if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    wsClient = new SubscriptionClient(baseConfig.wssUri, {
        reconnect: true
    }, W3CWebSocket),
    wsLink = new WebSocketLink(wsClient),
    link = ApolloLink.from([
        errorLink,
        split(
            ({query}) => {
                const {kind, operation} = getMainDefinition(query);
                return kind === 'OperationDefinition' && operation === 'subscription';
            }, wsLink, httpLink)
    ]);

class WebApp extends App {

    constructor(props) {

        super(props);
        moment.locale("es");
        this.state = {
            agent: props.agent,
            timezone: props.timezone
        }
    }

    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles);
    }

    render() {

        const {Component, pageProps, apollo, router} = this.props,
            {agent, timezone} = this.state;
        return (
            <Fragment>
                <ApolloProvider client={apollo}>
                    <Context.Provider value={{agent, timezone}}>
                        <ThemeProvider theme={{...Theme}}>
                            <CssBaseline/>
                            <SnackbarProvider maxSnack={3}>
                                <Component {...pageProps}/>
                            </SnackbarProvider>
                        </ThemeProvider>
                    </Context.Provider>
                </ApolloProvider>
            </Fragment>
        )
    }

    static getInitialProps = async ({Component, ctx}) => {
        try {

        } catch (error) {
            console.error(error);
        }
    };

}

export default withApollo(({initialState}) => {
    return new ApolloClient({
        ssrMode: true,
        link, cache: new InMemoryCache()
    });
})(WebApp);
