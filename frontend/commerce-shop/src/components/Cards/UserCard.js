import { useApi } from "../../hooks";
import ItemImg from "../../assets/images/default-product-image.png";
import ProfileModal from "../Modals/ProfileModal/ProfileModal";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { useNavigate } from "react-router-dom";

export default function UserCard({ profile }) {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <ProfileModal show={showModal} setShow={setShowModal} profile={profile} />

      <div className="flex flex-col min-w-md max-h-[750px] bg-white rounded-xl shadow-2xl shadow-black/40 p-6">
        <div className="flex flex-col items-center">
          <img
            src={ItemImg}
            alt="defaultImg"
            className=" w-60 h-auto rounded-xl object-cover"
          />
          <button
            onClick={() => setShowModal(true)}
            className="w-full mt-4 px-4 py-2 border rounded-lg border-black hover:bg-gray-900 hover:text-white"
          >
            Редагувати профіль
          </button>
        </div>
        <hr className="border-t border-gray-300 my-4" />

        <div className="mt-6 w-full">
          <p className="text-3xl font-bold ">Контактні дані</p>
          <div>
            <p className="text-2xl font-semibold ">Email</p>
            <p className="text-lg font-semibold text-gray-600">
              {profile?.email}
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold ">Ім'я</p>
            <p className="text-lg font-semibold text-gray-600">
              {profile?.firstName}
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold ">Прізвище </p>
            <p className="text-lg font-semibold text-gray-600">
              {profile?.lastName}
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold ">Роль</p>
            <p className="text-lg font-semibold text-gray-600">
              {profile?.role}
            </p>
          </div>
        </div>
        <hr className="border-t border-gray-300 my-4" />

        <button
          onClick={() => {
            handleLogout();
          }}
          className="px-4 py-2 border rounded-lg border-black hover:bg-gray-900 hover:text-white self-center"
        >
          Вийти з аккаунту
        </button>
      </div>
    </>
  );
}
