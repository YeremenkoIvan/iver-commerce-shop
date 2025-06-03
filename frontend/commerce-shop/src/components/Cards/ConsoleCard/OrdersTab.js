import { useContext, useEffect, useState } from "react";
import { useApi } from "../../../hooks";

export default function OrdersTab() {
  const { authFetch } = useApi();
  const [orders, setOrders] = useState();

  useEffect(() => {
    authFetch("profile/orders", {
      method: "GET",
    })
      .then((data) => setOrders(data.orders))
      .catch((error) => console.log(error));
    // .catch((error) => showAlert(error.toString()));
  }, []);
}
