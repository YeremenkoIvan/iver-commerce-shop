import React, { useState, useContext } from "react";
import { Icon, AuthorizationModal, CartOffcanvas } from "../../components";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { user, setUser } = useContext(UserContext);

  return (
    <nav class="bg-white">
      <CartOffcanvas showCart={showCart} setShowCart={setShowCart} />
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex-shrink-0">
            <Link to="/" className="text-2xl font-medium">
              Shop
            </Link>
          </div>
          <div className="flex items-center">
            <Icon
              icon="cart-shopping"
              className="px-2 py-2 mr-8 text-2xl rounded-full hover:bg-gray-300"
              onClick={() => setShowCart((prev) => !prev)}
            />
            {user ? (
              <Link to="/profile" className="flex items-center">
                <Icon
                  icon="user"
                  className="px-2 py-2 mr-2 text-2xl rounded-full hover:bg-gray-300"
                />
              </Link>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-black text-xl px-4 py-2 hover:underline transition-all duration-300"
              >
                Увійти
              </button>
            )}
          </div>
        </div>
      </div>
      <AuthorizationModal show={isModalOpen} setShow={setIsModalOpen} />
    </nav>
  );
}
