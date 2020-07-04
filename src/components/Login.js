import React, {Component, useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
            This field is required!
        </div>
    );
    }
};

const Login = () => {
    const initialLoginState = {
        id: null,
        fullname: "",
        email: "",
        username: "",
        password: "",
        token: ""
    }
    const [login, setLogin] = useState((initialLoginState))
    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = event => {
        const {name, value} = event.target;
        setLogin({...login, [name]: value});
    };

    const userLogin = () => {
        let data = {
            username: login.username,
            password: login.password
        };

        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(data)
                .then(response => {
                    setLogin({
                        id: response.data.id,
                        fullname: response.data.fullname,
                        email: response.data.email,
                        username: response.data.username,
                        token: response.data.token
                    });
                    this.props.history.push("/profile");
                    window.location.reload();

                    setSubmitted(true);
                    console.log(response.data);
                }).catch(e => {
                console.log(e);
            });
        }
    }

    const newLogin = () => {
        setLogin(initialLoginState);
        setSubmitted(false);
    };

    return (
            <div className="col-md-12">
            <div className="card card-container">
            <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
            />

            <Form
        onSubmit={userLogin()}
        ref={c => {
            this.form = c;
        }}
    >
    <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
        type="text"
        className="form-control"
        name="username"
        value={login.username}
        onChange={handleInputChange}
        validations={[required]}
        />
        </div>

        <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
        type="password"
        className="form-control"
        name="password"
        value={login.password}
        onChange={handleInputChange}
        validations={[required]}
        />
        </div>

        <div className="form-group">
            <button
        className="btn btn-primary btn-block">
    <span>Login</span>
        </button>
        </div>

    <CheckButton
        style={{ display: "none" }}
        ref={c => {
            this.checkBtn = c;
        }}
        />
        </Form>
        </div>
        </div>
    );
};

export default Login;