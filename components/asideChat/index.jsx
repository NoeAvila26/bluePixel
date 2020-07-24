import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import AvatarChat from "../avatarChat1";
import Badge from "@material-ui/core/Badge";

const messages = [
  {
    id: 1,
    primary: "Georgina Martinez",
    secondary: "lo recibiste",
    person: "/img/foto3.jpg",
    data: "5:12am",
  },
  {
    id: 2,
    primary: "Adriana Diaz",
    secondary: `No`,
    person: "/img/foto1.jpg",
    data: "6:00pm"
  },
  {
    id: 3,
    primary: "Abelardo pajarito",
    secondary: `Ok gracias`,
    person: "/img/foto4.jpg",
    data: "6:00pm"
  },
  {
    id: 4,
    primary: "Abelardo pajarito",
    secondary: `Ok gracias`,
    person: "/img/foto2.jpg",
    data: "12:00pm"
  },
  {
    id: 5,
    primary: "Abelardo Gomez",
    secondary: `Ok gracias`,
    person: "/img/foto1.jpg",
    data: "3:00pm"
  },
  {
    id: 6,
    primary: "Abelardo Gomez",
    secondary: `Ok gracias`,
    person: "/img/foto3.jpg",
    data: "6:00pm"
  },
];

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(8, 0, 0),
  },
  paper: {
    paddingBottom: 50,
    position: "relative",
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "relative",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 100,
    margin: "0 auto",
  },
  root: {
    "& > svg": {
      margin: theme.spacing(2),
    },
  },
  buttonFloat: {
    position: "absolute",
    bottom: -30,
    right: 20,
  },
  marginBadge: {
    margin: "0 20px 100px",
  },
  dataTime: {
    font:7,
    margin: "100px 0 30",
  },
}));

export default function AsideChat() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />

      <Paper square className={classes.paper}>
        <Typography
          className={classes.text}
          variant="h6"
          gutterBottom
        ></Typography>
        <List className={classes.list}>
          {messages.map(({ id, primary, secondary, person, data }) => (
            <React.Fragment key={id}>
              
              <ListItem button>
                <ListItemAvatar>
                  <AvatarChat srcImage={person}></AvatarChat>
                </ListItemAvatar>

                <ListItemText primary={primary} secondary={secondary} />
                
                
                <p><small>{data}</small></p>
                <Badge
                  className={classes.marginBadge}
                  badgeContent={2}
                  color="primary"
                ></Badge>
                
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        <Fab className={classes.buttonFloat} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Paper>
    </React.Fragment>
  );
}
