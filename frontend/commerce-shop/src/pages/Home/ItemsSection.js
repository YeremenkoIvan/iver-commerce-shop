import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { ObjPagination, ItemCard } from "../../components";
import qs from "qs";

export default function ItemsSection() {
  const { publicFetch } = useApi();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [search, setSearch] = useState("");

  // const fetchItems = async () => {
  // check if search is updated
  //  if (searchRef.current != search) {
  //    searchRef.current = search;

  //    // update page if it's not first
  //    if (page != 1) {
  //      setPage(1);
  //      return;
  //    }
  //  }

  //  const params = qs.stringify({
  //    page: page,
  //    "q[name_cont]": search,
  //    per_page: "10",
  //  });

  //   await publicFetch(`items`, {
  //     method: "GET",
  //   })
  //     .then((data) => {
  //       console.log(data);
  //       setItems(data);
  //     })
  //     .catch((error) => {
  //       //  showAlert(error);
  //       console.log(error);
  //     });
  // };

  const fetchItems = async () => {
    const params = qs.stringify({
      page,
      search,
      per_page: itemsPerPage,
    });

    try {
      const data = await publicFetch(`items?${params}`, { method: "GET" });
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [search]);

  const paginatedItems = items.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="bg-primary flex justify-center w-full">
      <div className="w-full max-w-screen-xl px-0 sm:px-3 py-3 sm:py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {paginatedItems.map((item) => (
            <div key={item.id} className="p-3 flex justify-center">
              <ItemCard item={item} />
            </div>
          ))}
        </div>

        {items && (
          <div className="flex justify-center mt-6">
            <ObjPagination
              currentPage={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
