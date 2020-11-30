import React, {useState} from "react";
import {useDispatch} from 'react-redux'

const loginurl = "http://localhost:5000/login"
function Login (props) {
  const dispatch = useDispatch()

  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const loginAccount = async () =>{
  setIsLoading(true)
  const configs = {
    method: "POST",
    mode: "cors",
    headers :{"Content-Type" : "application/json"},
    body: JSON.stringify({
      username : inputUsername,
      password: inputPassword
    })
  }
  try {
    const response = await fetch(loginurl, configs);
    let flaskResponse = await response.json();
    flaskResponse.token = flaskResponse.token.slice(2, flaskResponse.token.length - 2)
    sessionStorage.setItem("token", flaskResponse.token)
    dispatch({
      type: 'TOKEN',
      token: flaskResponse.token
    })
    props.history.push('/home')
  } catch (error) {
    console.log(error);
  }
}

  return (
    <main>
   <center> {isLoading ? 
      <div>Logging in...</div>
      :
      <div className="loginCard">
        <h1>Login Page</h1>
        
        <form className = "loginForm">
          <input id="username"
          className = "inputField" 
          type = "text"
          placeholder="Username"
          onChange = {e => setInputUsername(e.target.value)}
          ></input>

          <br></br>

        <input id="password" 
        className = "inputField"
        type = "password"
        placeholder="Password" 
        onChange = {e => setInputPassword(e.target.value)}

        ></input>
        </form>
        <br></br>
        <button onClick={() => loginAccount()}
        className = "loginButton"
        id="loginButton">Login</button>
        <br></br>
      
      </div>
    }
    </center>
    </main>
  )
}

export default Login;