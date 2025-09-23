import { useState } from "react";
import Grid from "../components/Grid";
import Search from "../components/Search";
import Wish from "../components/Wish";
import data from "../data/data.json";

function ShopppingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="size-8 "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}

function Landing() {
  const [search, setSearch] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const appTitle = "Jeux disponible maintenant";

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen grid grid-rows-[auto_1fr] gap-4">
      {/* Sticky Search + Title */}
      <div className="sticky top-0 z-20 border-b border-slate-600  bg-slate-900 ">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 text-center mb-4 tracking-tight">
          {appTitle}
        </h1>
        <div className="flex gap-2">
          <div />
          <Search
            games={data}
            setSearch={setSearch}
            setIsSearching={setIsSearching}
          />
          <div className="relative">
            {selected?.length > 0 && (
              <span className="bg-red-500 rounded-full absolute -right-2 -top-2 text-white text-xs px-2 py-1">
                {selected.length}
              </span>
            )}

            <ShopppingIcon />
          </div>
        </div>
      </div>
      {/* Responsive layout */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 h-full items-start mt-4">
        <div className="lg:h-[calc(100vh-160px)] lg:overflow-y-auto pt-2">
          <Grid
            games={data}
            search={search}
            selected={selected}
            setSelected={setSelected}
            isSearching={isSearching}
          />
        </div>
        {/* <div className="lg:sticky lg:block lg:top-[96px] self-start hidden">
          <Wish selected={selected} setSelected={setSelected} />
        </div> */}
      </section>
    </main>
  );
}

export default Landing;
