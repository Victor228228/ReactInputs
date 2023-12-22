import React, {useEffect, useReducer, useState} from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.includes("@")
    }
  }

  return {
    value: "",
    isValid: false
  }
}
const passwordReducer = (prevState, action) => {
  if (action.type === "USER_PASSWORD") {
    return {
      value: action.value,
      isValid: action.value.trim().length > 7
    }
  }

  return {
    value: "",
    isValid: false
  }
}

const Login = (props) => {
  const [emailState, dispatchEmailState] = useReducer(emailReducer, {value: "", isValid: undefined});
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {value: "", isValid: undefined});
  const [formIsValid, setFormIsValid] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("update")
      setFormIsValid(
          emailState.isValid && passwordState.isValid
      );
    }, 1000);

    return () => {
      console.log("clear")
      clearTimeout(timer);
    }
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmailState({type: "USER_INPUT", value: event.target.value});
    /*setInputEmail(event.target.value);*/

  };

  const passwordChangeHandler = (event) => {
    /*setInputPassword(event.target.value);*/
    dispatchPasswordState({type: "USER_PASSWORD", value: event.target.value});
  };

  /*const validateEmailHandler = () => {
    setEmailIsValid(emailState.value.includes("@"));
  };*/

  /*const validatePasswordHandler = () => {
    setPasswordIsValid(inputPassword.trim().length > 6);
  };*/

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
              emailState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            /*onBlur={validateEmailHandler}*/
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            /*onBlur={validatePasswordHandler}*/
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
