import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import {SIGNUP_FAILURE, SIGNUP_SUCCESS} from '../../util/constants';
import {withRouter} from 'react-router-dom';
import * as actions from '../../flux/actions/actions';

const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	progess: {
		position: 'absolute'
	}
});


function SignupPage(props) {
	const {classes} = props;

	const AuthStore = props.stores.authStore;

	const [state, setState] = useState({
		errors: {},
		loading: false,
	});


	const handleSignupSuccess = () => {
		setState({
			errors: {},
			loading:false,
			success: true
		})
	}

	const handleSignupFailure = (error) => {
		if (!state.success) {
			setState(prevState => {
				let newState = Object.assign({}, prevState)
				newState.errors = error
				newState.loading = false
				return newState
			})
		}
	}

	const handleChange = (event) => {
		setState(prevState => {
			let newState = Object.assign({}, state)
			newState.errors = {}
			newState = {
				...newState,
				[event.target.name]: event.target.value
			}
			return newState
		})
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		actions.signup(state.displayName, state.email, state.password);
		setState({...state, loading: true});
	};

	useEffect(() => {

		AuthStore.authAddChangeListener(SIGNUP_SUCCESS, handleSignupSuccess);
		AuthStore.authAddChangeListener(SIGNUP_FAILURE, handleSignupFailure)

		return function cleanup() {
			setState({});
			AuthStore.authRemoveChangeListener(SIGNUP_SUCCESS, handleSignupSuccess);
			AuthStore.authRemoveChangeListener(SIGNUP_FAILURE, handleSignupFailure);
		};
		// eslint-disable-next-line
	}, []);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div hidden={!state.success} className={classes.paper}>
				<Typography component="h1" variant="h5">
					User successfully created. Click <Link href="login">HERE</Link> to login.
				</Typography>
			</div>
			<div hidden={state.success} className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="displayName"
								label="Display name"
								name="displayName"
								autoComplete="displayName"
								helperText={state.errors.displayName}
								error={state.errors?.displayName ? true : false}
								onChange={handleChange}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								helperText={state.errors.email}
								error={state.errors?.email ? true : false}
								onChange={handleChange}
							/>
						</Grid>


						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								helperText={state.errors.password}
								error={state.errors?.password ? true : false}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								id="confirmPassword"
								autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
						disabled={state.loading ||
						!state.email ||
						!state.password ||
						!state.displayName
						}>
						Sign Up
						{state.loading && <CircularProgress size={30} className={classes.progess}/>}
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
					{state.errors?.general && (
						<Typography variant="body2" className={classes.customError}>
							{state.errors.general}
						</Typography>
					)}
				</form>


			</div>
		</Container>
	);
}


// eslint-disable-next-line
export default withRouter(withStyles(styles)(SignupPage));
//
// class SignupPage extends Component {
// 	constructor(props) {
// 		super(props);
//
// 		this.state = {
// 			displayName: '',
// 			email: '',
// 			password: '',
// 			errors: [],
// 			loading: false,
// 		};
// 	}
//
// 	componentWillReceiveProps(nextProps) {
// 		if (nextProps.UI.errors) {
// 			this.setState({
// 				errors: nextProps.UI.errors,
// 			});
// 		}
// 	}
//
// 	handleChange = (event) => {
// 		this.setState({
// 			[event.target.name]: event.target.value,
// 		});
// 	};
//
// 	handleSubmit = (event) => {
// 		event.preventDefault();
// 		this.setState({loading: true});
// 		const newUserData = {
// 			displayName: this.state.displayName,
// 			email: this.state.email,
// 			password: this.state.password,
// 		};
// 		axios
// 			.post(URL_SIGNUP, newUserData, {
// 				headers: {
// 					'Access-Control-Allow-Origin': '*',
// 				},
// 			})
// 			.then((response) => {
// 				if (response.data.success) {
// 					loginWithEmailAndPassword(newUserData.email, newUserData.password).then(r => {
// 						// console.log(r)
// 						localStorage.setItem('AuthToken', `Bearer ${r.user.accessToken}`);
// 						this.setState({
// 							email: this.state.email,
// 							loading: false,
// 						});
// 						this.props.history.push('/');
// 					})
// 				} else {
// 					throw new Error("Error creating user, try again later.")
// 				}
// 			})
// 			.catch((error) => {
// 				if (error.response !== undefined) {
// 					this.setState({
// 						errors: error.response.data,
// 						loading: false,
// 					});
// 				} else {
// 					this.setState({
// 						errors: 'Unknown error occurred',
// 						loading: false,
// 					});
// 				}
//
// 			});
// 	};
//
// 	render() {
// 		const {classes} = this.props;
// 		const {errors, loading} = this.state;
// 		return (
// 			<Container component="main" maxWidth="xs">
// 				<CssBaseline/>
// 				<div className={classes.paper}>
// 					<Avatar className={classes.avatar}>
// 						<LockOutlinedIcon/>
// 					</Avatar>
// 					<Typography component="h1" variant="h5">
// 						Sign up
// 					</Typography>
// 					<form className={classes.form} noValidate>
// 						<Grid container spacing={2}>
// 							<Grid item xs={12} sm={12}>
// 								<TextField
// 									variant="outlined"
// 									required
// 									fullWidth
// 									id="displayName"
// 									label="Display name"
// 									name="displayName"
// 									autoComplete="displayName"
// 									helperText={errors.displayName}
// 									error={errors.displayName ? true : false}
// 									onChange={this.handleChange}
// 								/>
// 							</Grid>
//
// 							<Grid item xs={12}>
// 								<TextField
// 									variant="outlined"
// 									required
// 									fullWidth
// 									id="email"
// 									label="Email Address"
// 									name="email"
// 									autoComplete="email"
// 									helperText={errors.email}
// 									error={errors.email ? true : false}
// 									onChange={this.handleChange}
// 								/>
// 							</Grid>
//
//
// 							<Grid item xs={12}>
// 								<TextField
// 									variant="outlined"
// 									required
// 									fullWidth
// 									name="password"
// 									label="Password"
// 									type="password"
// 									id="password"
// 									autoComplete="current-password"
// 									helperText={errors.password}
// 									error={errors.password ? true : false}
// 									onChange={this.handleChange}
// 								/>
// 							</Grid>
// 							<Grid item xs={12}>
// 								<TextField
// 									variant="outlined"
// 									required
// 									fullWidth
// 									name="confirmPassword"
// 									label="Confirm Password"
// 									type="password"
// 									id="confirmPassword"
// 									autoComplete="current-password"
// 									onChange={this.handleChange}
// 								/>
// 							</Grid>
// 						</Grid>
// 						<Button
// 							type="submit"
// 							fullWidth
// 							variant="contained"
// 							color="primary"
// 							className={classes.submit}
// 							onClick={this.handleSubmit}
// 							disabled={loading ||
// 							!this.state.email ||
// 							!this.state.password ||
// 							!this.state.displayName
// 							}>
// 							Sign Up
// 							{loading && <CircularProgress size={30} className={classes.progess}/>}
// 						</Button>
// 						<Grid container justifyContent="flex-end">
// 							<Grid item>
// 								<Link href="login" variant="body2">
// 									Already have an account? Sign in
// 								</Link>
// 							</Grid>
// 						</Grid>
// 					</form>
// 				</div>
// 			</Container>
// 		);
// 	}
// }
//
// export default withStyles(styles)(SignupPage);
