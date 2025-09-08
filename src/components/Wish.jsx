import { useState } from "react";

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="red"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

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
        Mes jeux
      </h2>

      {selected.length === 0 ? (
        <p className="text-slate-400 italic text-center flex-1 text-sm">
          Aucun jeux selectionez
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
                <MinusIcon />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between">
        <button
          onClick={handleOrder}
          disabled={isOrdering || selected.length === 0}
          className={`mt-3 w-full py-1.5 rounded-md text-sm font-semibold transition ${
            isOrdering || selected.length === 0
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          }`}
        >
          {isOrdering ? "Un instant..." : "Obtenir"}
        </button>

        <button
          onClick={handleReset}
          disabled={selected.length === 0}
          className={`mt-2 w-full py-1.5 rounded-md text-sm font-medium transition flex justify-around ${
            selected.length === 0
              ? "text-slate-400 cursor-not-allowed"
              : "text-indigo-500 hover:text-indigo-600"
          }`}
        >
          <TrashIcon />
        </button>
      </div>
    </aside>
  );
}

export default Wish;
