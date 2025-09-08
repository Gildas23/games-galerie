import { useEffect, useState } from "react";

function Search({ games, setSearch, setIsSearching }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    setSearch(() =>
      trimmed === ""
        ? []
        : games.filter((game) => game.title.toLowerCase().includes(trimmed))
    );
    trimmed === "" ? setIsSearching(false) : setIsSearching(true);
  }, [query, games, setSearch, setIsSearching]);

  return (
    <div className="w-full max-w-md mx-auto ">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search for a game..."
        className="w-full px-4 py-2 rounded-md border border-slate-600 text-slate-200 placeholder-slate-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>
  );
}

export default Search;
