import React from "react";

const OptionSwitch = ({ type, setType }) => {
  return (
    <div className="text-center">
      <button
        onClick={() => setType(type === "signIn" ? "signUp" : "signIn")}
        className="text-black  hover:underline"
      >
        {type === "signIn" ? "Зареєструватись" : "Вже зареєстрований"}
      </button>
    </div>
  );
};

export default OptionSwitch;
