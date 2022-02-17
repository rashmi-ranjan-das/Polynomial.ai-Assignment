import { makeStyles } from '@mui/styles';
import React from "react";
import { AppBar, Toolbar, Badge, Hidden, IconButton, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import '../assets/style.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const TopNav = props => {
    const classes = useStyles();

    return(
        <>
            <AppBar
            className={classes.root}
            style={{ backgroundColor: '#ffffff' }}
            >
            <Toolbar className={classes.newHeight}>
                    <div>
                        <RouterLink to="/" style={{ display: 'flex', textDecoration: 'None' }}>
                        <p className={classes.breadcrumbLink}>Sharebin</p>
                    </RouterLink>
                    </div>
            </Toolbar>
            </AppBar>
        </>
    )
}


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '7px 0px',
    },
    newHeight: {
        minHeight: '60px!important',
        display: 'flex',
        justifyContent: 'space-between'
    },
    logo: {
        height: '80%!important',
    },
    breadcrumbLink: {
        lineHeight: 2.5,
        fontWeight: 'bolder',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 20,
        color: "#228DC1"
    },
    avatarColor: {
        color: '#fff',
    
      },
      avatarRoot: {
        width: "30px",
        height: "30px",
        display: "flex",
        overflow: "hidden",
        position: "relative",
        fontWeight: 600,
        backgroundColor: '#0086ff',
        fontSize: "1.15rem",
        alignItems: "center",
        flexhSrink: "0",
        fontFamily: "Heebo",
        lineHeight: "1",
        userSelect: "none",
        borderRadius: "4px",
        justifyContent: "center",
      },
      userDetails: {
        padding: '15px',
        textAlign: 'center',
        fontFamily: "Inter",
        '& .username': {
          fontSize: '16px',
          lineHeight: '22px',
          color: '#000',
          marginBottom: '10px',
          fontWeight: '300'
        },
        '& .other-details': {
          fontSize: '12px',
          width: '250px'
        },
        '& .text-lite-gray': {
          color: '#9d9d9d'
        }
      },
      heading: {
        backgroundColor: '#284060',
        fontFamily: "Inter",
        color: '#fff',
        fontSize: '12px',
        lineHeight: '1.4',
        padding: '10px'
      }
}))

export default TopNav;
