import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from "jwt-decode";
import { AppBar, Avatar, Link, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import mystack from '../../images/mystack.png';
function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: 'LOGOUT'});
        navigate('/');
        setUser(null);
    }

    //render the navbar when user log in or log out
    useEffect(()=> {
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} href="/" className={classes.heading} variant="h2" align="center">
                <img className={classes.image} src={mystack} alt="my-stack" height="60" />
                </Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user?(
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0).toUpperCase()}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} href="/auth" variant="contained" color="secondary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
