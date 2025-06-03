import { useState } from "react";
import TabTitle from "./TabTitle";
// import OrdersTab from "./OrdersTab";
import UsersTab from "./UsersTab";
import ItemsTab from "./ItemsTab";

const tabsDataUser = [
  {
    id: "1",
    title: <TabTitle icon="rectangle-list" text="Замовлення" />,
    // content: <OrdersTab />,
    content: <UsersTab />,
  },
];

const tabsDataAdmin = [
  {
    id: "1",
    title: <TabTitle icon="rectangle-list" text="Замовлення" />,
    // content: <OrdersTab />,
  },
  {
    id: "2",
    title: <TabTitle icon="user" text="Користувачі" />,
    content: <UsersTab />,
  },
  {
    id: "3",
    title: <TabTitle icon="cart-shopping" text="Товари" />,
    content: <ItemsTab />,
  },
];

function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div className="flex space-x-4 border-b border-gray-300 mb-4">
        {tabs.map(({ id, title }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 font-semibold rounded-t-md
              ${
                activeTab === id
                  ? "bg-white border border-b-0 border-gray-300 text-black"
                  : "text-gray-600 hover:text-black"
              }
            `}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="p-4   bg-white">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export const UserTabs = () => {
  return <Tabs tabs={tabsDataUser} />;
};

export const AdminTabs = () => {
  return <Tabs tabs={tabsDataAdmin} />;
};
