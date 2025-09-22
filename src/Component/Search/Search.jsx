import Link from "next/link";

export default function SearchBox({ data }) {
  const { name, price } = data ?? { name: "Null", price: 0 };

  return (
    <Link
      href={`/${name}`}
      className="w-full flex justify-between items-center px-5 h-[50px] border border-gray-300 hover:bg-gray-200"
    >
      <h1 className="font-bold text-lg text-orange-700">{name}</h1>
      <p className="font-bold text-emerald-700 text-lg">₹ {price}</p>
    </Link>
  );
}
