import SearchBar from "../../components/Common/SearchBar";
import { useState } from "react";

export default function SearchSection() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col items-center justify-center h-32 mt-10">
      <div className="text-4xl font-semibold mb-4">Пошук товару</div>
      <SearchBar
        onSearch={(q) => {
          setPage(1); // сброс на первую страницу при поиске
          setSearch(q);
        }}
      ></SearchBar>
    </div>
  );
}
