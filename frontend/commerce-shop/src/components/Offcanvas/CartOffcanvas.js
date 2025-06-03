import { useContext, useState } from "react";
import { CartContext } from "../../context";
import Icon from "../Common/Icon";
import ItemImg from "../../assets/images/default-product-image.png";
import { useApi } from "../../hooks";
import { UserContext, AuthorizationContext } from "../../context";
import OrderModal from "../Modals/OrderModal/OrderModal";

export default function CartOffcanvas({ showCart, setShowCart }) {
  const { cart, cartDeleteItem, updateCartQuantity, cartToOrder, cartClear } =
    useContext(CartContext);
  const [resultType, setResultType] = useState("");
  const [showResult, setShowResult] = useState(false);
  const { authFetch } = useApi();
  const { user } = useContext(UserContext);
  const { showAuthModal } = useContext(AuthorizationContext);

  const handleOrderCreate = async () => {
    if (!user) {
      showAuthModal();
      return;
    }
    const body = cartToOrder();

    try {
      const result = await authFetch("orders", {
        method: "POST",
        body: JSON.stringify(body),
      });

      console.log("Order created:", result);
      cartClear();
      localStorage.removeItem("cart");
      setResultType("success");
      setShowResult(true);
      setShowCart(false);
    } catch (error) {
      setResultType("error");
      setShowCart(false);
      console.error("Failed to create order:", error);
    }
  };
  return (
    <>
      <OrderModal show={showResult} setShow={setShowResult} type={resultType} />

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Кошик</h2>
          <button
            onClick={() => setShowCart(false)}
            className="text-gray-500 hover:text-black text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-4rem)]">
          {cart.length === 0 ? (
            <p className="text-gray-500">Кошик пустий...</p>
          ) : (
            cart.map((entry, index) => (
              <div
                key={index}
                className="border rounded p-2 flex justify-between items-center"
              >
                <div>
                  <img
                    src={ItemImg}
                    alt={entry.item.name}
                    className="cursor-pointer rounded-xl w-20 h-20 object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{entry.item.name}</p>
                  <p className="text-sm text-gray-600">
                    {/* Кол-во: {entry.quantity} */}
                    {entry.item.price} ₴ за шт.
                  </p>
                  <div className="flex justify-between items-center">
                    <Icon
                      icon="minus"
                      className="text-2xl text-gray-500 rounded-xl border border-black hover:text-black hover:bg-gray-500 font-semibold"
                      onClick={() => {
                        updateCartQuantity(entry.item.id, entry.quantity - 1);
                      }}
                    />
                    <p className="">{entry.quantity}</p>
                    <Icon
                      icon="plus"
                      className="text-2xl text-gray-500 rounded-xl border border-black hover:text-black hover:bg-gray-500 font-semibold"
                      onClick={() => {
                        updateCartQuantity(entry.item.id, entry.quantity + 1);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon
                    icon="trash-can"
                    className="text-gray-500 hover:text-black font-semibold"
                    onClick={() => {
                      cartDeleteItem(entry.item.id);
                    }}
                  />
                  <p className="text-right font-semibold">
                    {entry.item.price} ₴
                  </p>
                </div>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <div className=" text-center p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">До сплати:</p>
                <p className="text-lg font-semibold">
                  {cart.reduce(
                    (sum, entry) => sum + entry.item.price * entry.quantity,
                    0
                  )}{" "}
                  ₴
                </p>
              </div>
              <div className="p-4 border-t">
                <button
                  onClick={handleOrderCreate}
                  className="w-full bg-white text-black py-2 rounded border border-black hover:bg-gray-800 hover:text-white transition"
                >
                  Оформити замовлення
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
