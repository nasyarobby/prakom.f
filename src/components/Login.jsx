import React, { useState } from "react";
import useAuthService from "./../services/useAuthService";

function NotificationBox({ show, children, variant, ...props }) {
  return (
    <div
      className={`box rounded shadow-md py-4 px-10 mt-10 mx-auto text-white
      ${variant === "error" ? `bg-red-500` : `bg-green-500`} 
      ${!show && `invisible`}`}
      style={{ width: "360px" }}
    >
      {children}
    </div>
  );
}

function Login() {
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");

  const { data, error, loading, login } = useAuthService();

  const loginHandler = (ev) => {
    ev.preventDefault();
    login(nip, password);
  };

  if (data && data.status === "success" && data.data.token) {
    window.location.assign(
      (process.env.REACT_APP_API_HOST || "http://localhost:8080") +
        "/?token=" +
        data.data.token
    );
  }
  return (
    <div className="container mx-auto">
      <NotificationBox
        show={data}
        variant={data && data.status === "success" ? "success" : "error"}
      >
        {data &&
          data.status === "fail" &&
          (data.data.login || "Terjadi kesalahan.")}
        {data && data.status === "success" && "Login berhasil"}
      </NotificationBox>
      <div
        className="box rounded-lg shadow-md py-4 px-10 mt-10 mx-auto"
        style={{ width: "360px" }}
      >
        <h1 className="text-center text-2xl font-semibold">Login Pegawai</h1>
        <input
          placeholder="NIP"
          type="text"
          className="rounded border-gray-400 border p-2 w-full my-2"
          value={nip}
          onChange={(e) => setNip(e.target.value)}
        />
        {data && data.status === "fail" && data.data.npwp && (
          <div class="text-xs text-red-600">{data.data.npwp}</div>
        )}
        <input
          placeholder="password"
          type="password"
          className="rounded border-gray-400 border p-2 w-full my-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {data && data.status === "fail" && data.data.password && (
          <div class="text-xs text-red-600">{data.data.password}</div>
        )}
        <button
          className="bg-orange-400 rounded-full w-full p-2 my-4"
          onClick={loginHandler}
        >
          Login
        </button>
        <div className="text-center"></div>
      </div>
    </div>
  );
}

export default Login;
