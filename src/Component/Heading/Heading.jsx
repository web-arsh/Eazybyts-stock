export default function Heading({ companyData }) {
  const { name, marketCap, price } = companyData;

  return (
    <div className="size-full gap-0 md:gap-5 flex flex-col justify-center items-center md:flex-col">
      <h1 className="text-3xl flex justify-center items-center text-amber-600 text-center w-full">
        {name}
      </h1>
      <h2 className="text-4xl font-bold flex justify-center items-center text-emerald-700 w-full">
        ₹ {price}
      </h2>
      <p className="text-sm flex justify-center items-center w-full text-gray-500">
        ₹{marketCap} Cr
      </p>
    </div>
  );
}
