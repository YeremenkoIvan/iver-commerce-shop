import Icon from "./Icon";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <form
      className="relative w-full max-w-2xl "
      onSubmit={(e) => {
        e.preventDefault(); // чтобы страница не перезагружалась
        if (onSearch) onSearch(query); // вызываем пропс onSearch и передаем query
      }}
    >
      <div className="flex items-center border h-12 m-4 border-gray-300 rounded-lg overflow-hidden">
        <input
          type="search"
          value={query} // Значение берется из состояния
          onChange={(e) => setQuery(e.target.value)} // Обновляем состояние при вводе
          placeholder="Введіть назву товару..."
          required
          className="w-full p-4 pl-10 text-2xl focus:outline-none"
        />
        <div className="h-full w-px bg-gray-300"></div>
        <button
          type="submit"
          className="p-3 hover:bg-blue-100 transition-colors duration-300 rounded-r-lg"
        >
          <Icon icon="magnifying-glass" className="text-2xl text-gray-600" />
        </button>
      </div>
    </form>
  );
}
