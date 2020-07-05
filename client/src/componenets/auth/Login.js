import React, { Fragment , useState} from "react";
import {Link} from 'react-router-dom';

export const Login = () => {

    const  [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData || {};


    const submitForm = e => {
        e.preventDefault();
        console.log(formData);
    }

    const onChange = e => 
        setFormData({...formData,[e.target.name]: e.target.value})

   

  return (
    <Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Login Your Account
      </p>
      <form className="form" action="create-profile.html" onSubmit = { e=> submitForm(e)}>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address"
           name="email"
           value = {email}
           onChange={ e => onChange(e)}  required/>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value= {password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Don't have account yet? <Link to="/register">Sign UP</Link>
      </p>
    </Fragment>
  );
};
