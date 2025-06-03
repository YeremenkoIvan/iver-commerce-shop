import Icon from "../Common/Icon";
import ItemModal from "../Modals/ItemModal/ItemModal";
import ItemImg from "../../assets/images/default-product-image.png";
// import { truncPrice } from "../utils";
import { useContext, useState } from "react";
import { CartContext } from "../../context";

export default function ItemCard({ item }) {
  const { cartAddItem, cartIncludes } = useContext(CartContext);
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  return (
    <div className="bg-secondary text-dark rounded-xl shadow-md p-4">
      <div className="flex flex-col items-center gap-3">
        <img
          src={ItemImg}
          alt={item.name}
          onClick={showModal}
          className="cursor-pointer rounded-xl w-full object-cover"
        />

        <div className="flex flex-col w-full">
          <p
            title={item.name}
            className="m-0 text-sm font-semibold truncate cursor-pointer"
            onClick={showModal}
          >
            {item.name}
          </p>

          <div className="flex flex-row justify-between items-center mt-1">
            <p title={item.price} className="m-0 text-lg">
              {item.price}
            </p>

            {cartIncludes(item) ? (
              <Icon icon="circle-check" className="text-green-600 text-xl" />
            ) : (
              <Icon
                icon="plus"
                className="text-green-600 text-xl cursor-pointer"
                onClick={() => cartAddItem({ item: item, quantity: 1 })}
              />
            )}
          </div>
        </div>
      </div>

      <ItemModal show={show} setShow={setShow} item={item} />
    </div>
  );
}
