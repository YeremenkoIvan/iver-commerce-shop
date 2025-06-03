import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.removeItem("cart");
    setCart([]);
  }, []);

  const cartAddItem = (item) => {
    const newCart = [...cart, item];

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const cartIncludes = (item) => {
    return Object.values(cart).some((_item) => _item.item.id == item.id);
  };

  const cartDeleteItem = (item_id) => {
    const new_cart = cart.filter((entry) => entry.item.id !== item_id);
    setCart(new_cart);
    localStorage.setItem("cart", JSON.stringify(new_cart));
  };
  const updateCartQuantity = (itemId, newQty) => {
    if (newQty < 0) return; // Защита от отрицательных значений

    let updatedCart;

    if (newQty === 0) {
      // Удаляем товар из корзины
      updatedCart = cart.filter((entry) => entry.item.id !== itemId);
    } else {
      // Обновляем количество
      updatedCart = cart.map((entry) =>
        entry.item.id === itemId ? { ...entry, quantity: newQty } : entry
      );
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const cartToOrder = () => {
    return {
      items: cart.map((obj) => {
        return {
          productId: obj.item.id,
          quantity: obj.quantity,
        };
      }),
    };
  };

  const cartClear = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAddItem,
        cartIncludes,
        cartDeleteItem,
        updateCartQuantity,
        cartToOrder,
        cartClear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
