import React, {Fragment} from 'react';
// import { Component } from 'react';
// import io from 'socket.io-client'
// import fetch from 'isomorphic-fetch'
import Head from "next/head";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SectionChat from "../components/sectionChat"
import AsideChat from "../components/asideChat"
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: '120px'
    },
    title: {
        fontSize: '24px',
        color: theme.palette.primary.main
    }
}));

const HomeView = () => {
    const classes = useStyles();
    return <Fragment>
        <Head>
            <title>Chat</title>
        </Head>
        <Container maxWidth={"xl"} className={classes.root}>
        <Grid container spacing={0}>
        <Grid item xs={12} md={3} >
        < AsideChat></AsideChat>
        </Grid>
        <Grid item xs={12} md={8}>
        <SectionChat></SectionChat>
        </Grid>
        </Grid>
        
        <Typography className={classes.title}></Typography>
        </Container>
    </Fragment>
};

// class HomeView extends Component{
// static async getInitialProps({res, req, apollo, agent}) {
//     const response = await fetch('http://localhost:3000/messages')
//     const messages = await response.json()
//     return { messages }
// }
//  statatic defaultProps = {
//     messages:[]
// }
//  state = {
//     field:'',
//     messages: this.props.messages
// }
//  componentDidMount() {
//      this.socket = io('http://localhost:3000/')
//      this.socket.on('message', this.handleMessage)
//  }
//  componentWillUnmount () {
//     this.socket.off('message', this.handleMessage)
//     this.socket.close()
//  }
//  handleMessage = (message) => {
//      this.setState(state => ({messages: state.messages.concat(message)}))
//  }
//  handleChange = event => {
//      this.setState({ fiels: event.target.value})
//  }
//  handleSubmit = event => {
//      event.preventDefault()
//      const message = {
//          id: (newDate()).getTime(),
//          value: this.state.field
//      }
//   this.socket.emit('message', message)   
//   this.setState(state => ({
//       field: '',
//       messages: state.messages.concat(message)
//   }))
//  }
//  render () {
//     return (
//         <main>
//             <div>
//                 <ul>
                    
//                     {this.state.messages.map(message =>
//                         <likey={message.id}>{message.value}</<span class="hljs-name">li>
//                     )}
//                 </<span class="hljs-name">ul>
                
//                 <formonSubmit={this.handleSubmit}>
//                     <input
//                         onChange={this.handleChange}
//                         type='text'
//                         placeholder='Hola Platzi!'
//                         value={this.state.field}
//                     />
//                     <button>Enviar</<span class="hljs-name">button>
//                 </<span class="hljs-name">form>
//             </<span class="hljs-name">div>
//         </<span class="hljs-name">main>
//     )
// }

// }


export default HomeView;

