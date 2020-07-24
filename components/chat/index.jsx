import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  content: {
    flex: "1 100",
  },
  cover: {
    width: 500,
  },
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1.5),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default function Chat() {
  const classes = useStyles();
  const theme = useTheme();
  const messageArray = [
    {
      property: "flex-start",
      message: "exelente gracias por la ayuda",
      data: "5:12",
    },
    {
      property: "flex-end",
      message: "Lorem Ipsum is simply dummy text of the printing .",
      data: "5:30",
    },
    {
      property: "flex-start",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
      data: "5:12",
    },
  ];
  const message = messageArray.map((item) => {
    return (
      <div style={{ width: "100%" }}>
        <Box
          display="flex"
          justifyContent={item.property}
          m={1}
          p={1}
          bgcolor="background.paper"
        >
          <Avatar
            alt="Remy Sharp"
            src="/img/foto2.jpg"
            className={classes.large}
          />
          <Box p={1}>
            <CardContent className={classes.content}>
              <div className={classes.root}></div>
              <Typography component="h7" variant="h7">
                {item.message}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {item.data}
              </Typography>
            </CardContent>
          </Box>
        </Box>
      </div>
    );
  });
  return (
    <Card className={classes.root}>
      <div className={classes.details}>{message}</div>
    </Card>
  );
}
