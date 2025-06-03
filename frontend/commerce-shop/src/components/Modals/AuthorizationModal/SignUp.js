import React, { useState, useContext } from "react";
import { useApi } from "../../../hooks";
import { UserContext } from "../../../context/UserContext";

const SignUpForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const { publicFetch } = useApi();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    publicFetch("auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((data) => {
        localStorage.setItem("user", data.access_token);
        setUser(data.access_token);
        onSubmit(); // Закрыть модалку
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-7 min-w-7 flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignUp} className="bg-white p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Реєстрація</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ім’я</label>
          <input
            type="text"
            className="w-full px-4 py-2 border-2 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Прізвище</label>
          <input
            type="text"
            className="w-full px-4 py-2 border-2 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border-2 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Пароль</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-gray-800 border-2 border-gray-800 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300"
        >
          Зареєструватись
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
