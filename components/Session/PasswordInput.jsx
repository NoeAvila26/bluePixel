import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import cryptoRandomString from "crypto-random-string";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles(theme => ({
    control: {
        width: '100%'
    }
}));

const PasswordInput = ({value, onChange, ...props}) => {
    const id = cryptoRandomString({type: 'url-safe', length: 4}),
        classes = useStyles(),
        [showPassword, setShowPassword] = useState(false);
    return <FormControl className={classes.control} {...props}>
        <InputLabel htmlFor="password-input">Contraseña</InputLabel>
        <Input
            id={id}
            required
            autoComplete={"current-password"}
            type={showPassword ? 'text' : 'password'}
            value={value}
            name={'password'}
            onChange={event => onChange(event.target.value)}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="mostrar contraseña"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={event => event.preventDefault()}
                        edge="end" size={"small"}
                    >
                        {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                    </IconButton>
                </InputAdornment>
            }
        />
    </FormControl>;
};

export default PasswordInput;
