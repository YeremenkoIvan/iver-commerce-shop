import React, { useState } from "react";
import SignIn from "./SignIn"; // Ваш компонент входа
import SignUp from "./SignUp"; // Ваш компонент регистрации
import OptionSwitch from "./OptionSwitch"; // Компонент для переключения между формами
import Icon from "../../Common/Icon";

export default function AuthorizationModal({ show, setShow }) {
  const [type, setType] = useState("signIn");

  const authTypes = {
    signIn: <SignIn onSubmit={() => setShow(false)} />,
    signUp: <SignUp onSubmit={() => setShow(false)} />,
  };

  if (!show) return null; // Если модальное окно не должно показываться

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setShow(false)}
    >
      <div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
        onClick={(e) => e.stopPropagation()} // Чтобы клик внутри не закрывал окно
      >
        <div className="flex justify-end">
          <Icon
            icon="xmark"
            onClick={() => setShow(false)}
            className=" text-2xl top-2 right-2 text-gray-500 hover:text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-4">
          {authTypes[type]}

          <OptionSwitch type={type} setType={setType} />
        </div>
      </div>
    </div>
  );
}
