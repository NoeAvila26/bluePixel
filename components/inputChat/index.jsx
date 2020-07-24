import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import NearMeIcon from '@material-ui/icons/NearMe';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    
  },
  iconButton: {
    padding: 10,
    
  },
  divider: {
    height: 28,
    margin: 20,
    
  },
 
}));

export default function InputChat() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <AttachFileSharpIcon className={classes.AttachFileSharpIcon} aria-label="AttachFileSharpIcon">
        <MenuIcon />
      </AttachFileSharpIcon>
      <TagFacesIcon className={classes.TagFacesIcon} aria-label="TagFacesIcon">
        <MenuIcon />
      </TagFacesIcon>
      <InputBase
        className={classes.input}
        placeholder="Tu mensaje "
        inputProps={{ 'aria-label': 'search' }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <NearMeIcon color="primary" className={classes.NearMeIcon} aria-label="next">
        <NearMeIcon />
      </NearMeIcon>
    </Paper>
  );
}