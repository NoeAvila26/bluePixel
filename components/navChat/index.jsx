import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AvatarChat2 from '../avatarChat2'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 2,
  },
});

export default function navChat() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      
      <AvatarChat2></AvatarChat2>
      <div>
      <CardContent>
        <Typography variant="h7" component="h2">
          Georgina Martinez
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Mentor
        </Typography>
      </CardContent>
      </div>
    </Card>
  );
}
