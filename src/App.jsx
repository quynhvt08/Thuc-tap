import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import ThemeCustomization from 'themes';
import router from 'routes';
import ScrollTop from 'components/ScrollTop';
import LoginForm from './components/LoginForm';

export default function App() {
  const User = {
    taikhoan: "admin",
    password: "12345"
  };

  const [user, setUser] = useState({ taikhoan: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const LoginUser = details => {
    console.log(details);

    if (details.taikhoan === User.taikhoan && details.password === User.password) {
      console.log("Đăng nhập thành công (User).");
      setUser({ taikhoan: details.taikhoan });
      localStorage.setItem('user', JSON.stringify({ taikhoan: details.taikhoan }));
    } else {
      console.log("Tài khoản hoặc mật khẩu chưa chính xác!");
      setError("Tài khoản hoặc mật khẩu chưa chính xác!");
    }
  };

  const Logout = () => {
    setUser({ taikhoan: "" });
    localStorage.removeItem('user');
  };

  return (
    <>
      {user.taikhoan !== "" ? (
        <div className="App">
          <ThemeCustomization>
            <ScrollTop>
              <RouterProvider router={router} />
              {/* <button onClick={Logout}>Đăng xuất</button> */}
            </ScrollTop>
          </ThemeCustomization>
        </div>
      ) : (
        <LoginForm Login={LoginUser} error={error} />
      )}
    </>
  );
}
