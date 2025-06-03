import { useContext, useEffect, useState } from "react";
import { useApi } from "../../../hooks";
// import { AlertContext } from "../../../context";
import ItemUpdateForm from "../../Forms/ItemUpdateForm/ItemUpdateForm";

export default function ItemUpdateModal({ show, setShow, item }) {
  const { authFetch } = useApi();
  //   const { showAlert } = useContext(AlertContext);
  if (!show) return null;

  const handleSave = (values) => {
    const body = {
      item: {
        name: values.name,
        price: values.price,
        description: values.description,
      },
    };

    authFetch(`items/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    })
      .then(() => setShow(false))
      .catch((error) => {
        console.log(error);
        // showAlert(error.toString());
      });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => setShow(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-96 max-w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setShow(false)}
          aria-label="Close"
        >
          &#10005;
        </button>

        <h1 className="text-center text-xl font-semibold mb-4 break-words">
          Редагування товару
        </h1>

        <ItemUpdateForm profile={item} onSubmit={handleSave} />
      </div>
    </div>
  );
}
