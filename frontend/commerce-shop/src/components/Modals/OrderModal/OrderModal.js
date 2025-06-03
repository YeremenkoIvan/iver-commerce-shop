import Icon from "../../Common/Icon";
export default function OrderModal({ show, setShow, type }) {
  if (!show) return null;

  const bodyTypes = {
    success: (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-green-600 mb-2">Успішно!</h2>
        <p className="text-gray-700">Ваше замовлення оформлено.</p>
      </div>
    ),
    error: (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Помилка</h2>
        <p className="text-gray-700">Спробуйте пізніше...</p>
      </div>
    ),
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
        <Icon
          icon="xmark"
          className="absolute top-2 right-2 text-gray-500 hover:text-black font-bold"
          onClick={() => {
            setShow(false);
          }}
        />
        {bodyTypes[type]}
      </div>
    </div>
  );
}
