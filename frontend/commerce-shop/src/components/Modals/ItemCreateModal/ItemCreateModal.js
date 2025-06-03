import { useApi } from "../../../hooks";
import ItemUpdateForm from "../../Forms/ItemUpdateForm/ItemUpdateForm";

export default function ItemCreateModal({ show, setShow, item }) {
  const { authFetch } = useApi();

  const handleCreate = (values) => {
    console.log("Values is:", values);
    const body = {
      item: {
        name: values.name,
        price: values.price,
        description: values.description,
      },
    };

    authFetch("items/", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(() => setShow(false))
      .catch((error) => {
        console.log(error);
      });
    // .catch((error) => showAlert(error.toString()));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm relative p-6 animate-fadeIn">
        {/* Кнопка закрытия */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Заголовок */}
        <h1 className="text-xl font-semibold text-center break-words mb-4">
          Створення товару
        </h1>

        {/* Форма */}
        <div className="flex flex-col gap-3">
          <ItemUpdateForm onSubmit={handleCreate} profile={item} />
        </div>
      </div>
    </div>
  );
}
