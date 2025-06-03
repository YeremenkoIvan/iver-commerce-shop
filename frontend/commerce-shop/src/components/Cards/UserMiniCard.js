import { useState } from "react";
import UserUpdateModal from "../Modals/UserUpdateModal/UserUpdateModal";

import ItemImg from "../../assets/images/default-product-image.png";
export default function UserMiniCard({ user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <UserUpdateModal show={showModal} setShow={setShowModal} user={user} />
      <div className="p-2">
        <div className="flex flex-row">
          <img
            src={ItemImg}
            alt={user.firstName}
            onClick={() => setShowModal(true)}
            className="w-32 h-32 cursor-pointer rounded-xl object-cover"
          />
          <div className="flex flex-col justify-start ml-4">
            <p>{`email: ${user?.email}`}</p>
            <p>{`Прізвище: ${user?.lastName}`}</p>
            <p>{`ім'я: ${user?.firstName}`}</p>
            <p>{`Роль: ${user?.role}`}</p>
            <button
              className="px-4 py-2 border rounded-lg border-black hover:bg-gray-900 hover:text-white self-start"
              onClick={() => setShowModal(true)}
            >
              Редагувати
            </button>
          </div>
        </div>
        <hr className="border-t border-gray-300 m-5" />
      </div>
    </>
  );
}
