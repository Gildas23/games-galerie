import { useState } from "react";

function Wish({ selected, setSelected }) {
  const [isOrdering, setIsOrdering] = useState(false);

  const handleOrder = () => {
    setIsOrdering(true);

    const phone = import.meta.env.VITE_GAME_CONTACT;
    const message = selected.map((g, i) => `${i + 1}. ${g.title}`).join("\n");
    const encoded = encodeURIComponent(
      `Salutation, J'aimerais commander un jailbreak et ces quelque jeux pour ma console:\n\n${message}`
    );
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, "_blank");

    setIsOrdering(false);
  };

  const handleRemove = (id) => {
    setSelected(selected.filter((game) => game.id !== id));
  };

  const handleReset = () => {
    setSelected([]);
  };

  return (
    <aside className="w-full lg:w-[400px] h-[500px] rounded-xl p-4 border shadow-md border-slate-400 flex flex-col">
      <h2 className="text-base font-semibold text-indigo-400 mb-3 text-center">
        Your Wishlist
      </h2>

      {selected.length === 0 ? (
        <p className="text-slate-400 italic text-center flex-1 text-sm">
          No games selected yet.
        </p>
      ) : (
        <ul className="flex-1 overflow-y-auto scroll-smooth space-y-3 pr-1">
          {selected.map((game) => (
            <li
              key={game.id}
              className="flex items-center gap-3 rounded-md px-2 py-2 border border-slate-600"
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-10 h-10 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-xs font-medium text-slate-200 truncate">
                  {game.title}
                </h3>
              </div>
              <button
                onClick={() => handleRemove(game.id)}
                className="text-xs text-red-400 hover:text-red-300 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex">
        <button
          onClick={handleOrder}
          disabled={isOrdering || selected.length === 0}
          className={`mt-3 w-full py-1.5 rounded-md text-sm font-semibold transition ${
            isOrdering || selected.length === 0
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          }`}
        >
          {isOrdering ? "Ordering..." : "Order Now"}
        </button>

        <button
          onClick={handleReset}
          disabled={selected.length === 0}
          className={`mt-2 w-full py-1.5 rounded-md text-sm font-medium transition ${
            selected.length === 0
              ? "text-slate-400 cursor-not-allowed"
              : "text-indigo-500 hover:text-indigo-600"
          }`}
        >
          Empty
        </button>
      </div>
    </aside>
  );
}

export default Wish;
