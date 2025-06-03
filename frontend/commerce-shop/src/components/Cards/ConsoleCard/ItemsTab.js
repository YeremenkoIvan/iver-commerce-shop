import ItemMiniCard from "../ItemMiniCard";
import { useApi } from "../../../hooks";
import { useContext, useEffect, useState } from "react";
import Icon from "../../Common/Icon";
// import { AlertContext } from "../../../context";
import ItemCreateModal from "../../Modals/ItemCreateModal/ItemCreateModal";

export default function ItemsTab() {
  const { authFetch } = useApi();
  //   const { showAlert } = useContext(AlertContext);
  const [items, setItems] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    authFetch("items/", {
      method: "GET",
    })
      .then((data) => setItems(data))
      .catch((error) => {
        console.log(error);
      });
    //   .catch((error) => showAlert(error.toString()));
  }, []);

  return (
    <>
      <ItemCreateModal show={showModal} setShow={setShowModal} />
      <div className="max-h-[550px] overflow-y-auto ">
        <div>
          <Icon
            icon="plus"
            className="px-2 py-2 mr-8 text-2xl rounded-full hover:bg-gray-300"
            onClick={() => setShowModal(true)}
          />
          <div className="flex flex-col p-0">
            {items &&
              items.map((item) => <ItemMiniCard key={item.id} item={item} />)}
          </div>
        </div>
      </div>
    </>
  );
}
