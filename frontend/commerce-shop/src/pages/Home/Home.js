import { useState } from "react";
import SearchSection from "./SearchSection";
import ItemsSection from "./ItemsSection";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <SearchSection />
      <ItemsSection />
    </div>
  );
}
