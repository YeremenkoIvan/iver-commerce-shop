import { useState } from "react";
import ItemUpdateModal from "../Modals/ItemUpdateModal/ItemUpdateModal";

import ItemImg from "../../assets/images/default-product-image.png";
export default function ItemMiniCard({ item }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ItemUpdateModal show={showModal} setShow={setShowModal} item={item} />
      <div className="p-2">
        <div className="flex flex-row">
          <img
            src={ItemImg}
            alt={item.firstName}
            onClick={() => setShowModal(true)}
            className="w-32 h-32 cursor-pointer rounded-xl object-cover"
          />
          <div className="flex flex-col justify-start ml-4">
            <p>{`Id: ${item?.id}`}</p>
            <p>{`Назва: ${item?.name}`}</p>
            <p>{`Ціна: ${item?.price}`}</p>
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
