import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Home/Home.css'
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useNavigate();

  const login = () => {
    axios({
      url: "http://localhost:8140/login",
      method: "POST",
      withCredentials: true, // 서로다른 도메인에 요청시 여부
      data: {
        email: email,
        password: password
      },
    }).then((result) => {
      if (result.status === 200) {
        router('/mypage');
      }
    }).catch((error) => console.log(error));
  }

  const accessToken = () => {
    axios({
      url: "http://localhost:8140/accesstoken",
      method: "GET",
      withCredentials: true,
    }).then((result) => {
      console.log(result);
    }).catch((error) => console.log(error));
  }

  const refreshToken = () => {
    axios({
      url: "http://localhost:8140/refreshtoken",
      method: "GET",
      withCredentials: true
    }).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    })
  }

  const logout = () => {
    axios({
      url: "http://localhost:8140/logout",
      method: "POST",
      withCredentials: true
    }).then((result) => {
      if (result.status === 200) {
        window.open('/', '_self')
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    axios({
      url: "http://localhost:8140/login/success",
      method: "GET",
      withCredentials: true
    }).then((result) => {
      if (result.status === 200) {
        router('/mypage');
        setIsLogin(true);
      }
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <div className='wrapper'>
      <div className='login-wrapper'>
        <h3>JWT - Login</h3>
        <button onClick={accessToken}>get Access Token</button>
        <button onClick={refreshToken}>get Refresh Token</button>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input type="submit" value="Login" onClick={login} />
        </form>
        <Link to={'/signup'} >sign up</Link>
      </div>
    </div>
  )
}

export default Home;