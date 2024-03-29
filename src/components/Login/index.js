import React,{useState} from 'react'
import {Typography,Paper, Avatar, Button, FormControl, Input, InputLabel} from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link,withRouter} from 'react-router-dom'
import firebase from '../firebase'


const styles = theme => ({
            main : {
                width:'auto',
                display:'block',
                marginLeft: theme.spacing.unit*3,
                marginRight: theme.spacing.unit*3,
                [theme.breakpoints.up(400 + theme.spacing.unit*3*2)]:{
                    width:400,
                    marginLeft:'auto',
                    marginRight:'auto',
                }
            },
            paper:{
                marginTop: theme.spacing.unit *8,
                display:'flex',
                flexDirection:"column",
                alignItems:'center',
                padding: `${theme.spacing.unit*2}px ${theme.spacing.unit*3}px ${theme.spacing.unit*3}px `,
            },
            avatar:{
                margin: theme.spacing.unit,
                backgroundColor: theme.palette.secondary.main,
            },
            form: {
                marginTop: theme.spacing.unit,
                width:"100%"
            },
            submit:{
                marginTop: theme.spacing.unit
            }
})


function SignIn(props) {
    const {classes} = props

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    return(
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" vaiant="h5">
                    Sign In
                </Typography>
                <form className={classes.form} onSubmit={e=> e.preventDefault && false}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email " autoComplete='off' autofocus value={email} onChange={e=> setEmail(e.target.value)}/> 
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">password</InputLabel>
                        <Input id="password" name="password" autoComplete='off' autofocus value={password} onChange={e=> setPassword(e.target.value)}/> 
                    </FormControl>
                    <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={login}
                            className={classes.submit}>
                                Sign In
                    </Button>
                    
                    <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to = '/register'
                            className={classes.submit}>
                                Register
                    </Button>
                </form>
            </Paper>
        </main>
    )
    
async function login(){
    try {
        await firebase.login(email,password)
        props.history.replace('/dashboard')
    }
    catch(error)
    {
        alert(error.message)
    }
}
}
export default withRouter(withStyles(styles)(SignIn))