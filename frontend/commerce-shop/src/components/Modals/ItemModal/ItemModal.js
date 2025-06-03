import { useContext } from "react";
import { CartContext } from "../../../context";
import Icon from "../../Common/Icon";
import ItemImg from "../../../assets/images/default-product-image.png";
import { truncPrice } from "../../utils";

export default function ItemModal({ show, setShow, item }) {
  const { cartAddItem, cartIncludes } = useContext(CartContext);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={() => setShow(false)}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 p-4">
          <img
            src={ItemImg}
            alt={item.name}
            className="rounded-lg w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="flex justify-center text-3xl font-bold mb-2">
              {item.name}
            </h2>
            <p className="text-gray-600 text-lg">{item.description}</p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-2xl font-semibold">
              Ціна: {truncPrice(item.price)}
            </p>

            {cartIncludes(item) ? (
              <Icon icon="circle-check" className="text-green-500 text-3xl" />
            ) : (
              <button
                onClick={() => cartAddItem({ item: item, quantity: 1 })}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-700 transition"
              >
                <Icon icon="cart-shopping" className="inline mr-2" />
                Придбати
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
