import React from 'react';
import "../css/login.css";

interface LoginForm {
    state: {username: string, password: string}
    prompt: string
    handleChangeUser: any;
    handleChangePass: any;
    handleSubmit: any;
}


class LoginForm extends React.Component {
    constructor(props: any) {
        super(props);
        this.prompt = props.prompt;
        this.state = { username: '' , password: ''};

        this.handleChangeUser = this.handleChangeUserFunc.bind(this);
        this.handleChangePass = this.handleChangePassFunc.bind(this);
        this.handleSubmit = this.handleSubmitFunc.bind(this);
    }

    handleChangeUserFunc(event: any) {
        this.setState({ username: event.target.value });
    }

    handleChangePassFunc(event: any) {
        this.setState({ password: event.target.value });
    }

    handleSubmitFunc(event: any) {
        alert(`USERNAME: ${this.state.username} PASSWORD: ${this.state.password}`)
        event.preventDefault();
    }

    render(): React.ReactElement {
        return (
            <form onSubmit={this.handleSubmit}>
                <label className="fieldTitle">
                    <b>Username</b>
                    <input className="field" name="uname" type="text" value = {this.state.username} onChange={this.handleChangeUser} />
                </label>
                <label className="fieldTitle">
                    <b>Password</b>
                    <input className="field" type="password" value = {this.state.password} onChange={this.handleChangePass} />
                </label>
                <input className="loginSubmit" type="submit" value="Login" />
                <input className="loginSubmit" type="submit" value="Forgot Password" />
            </form>
        )
    }
}

export default LoginForm;