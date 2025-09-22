export default function Message({ data }) {
  const { direction, msg, imageUrl, name } = data;

  return (
    <div className={`w-full flex px-5 ${direction === 'right' ? "justify-end" : "justify-start"}`}>
      <div className="flex items-start gap-2.5">
        <img
          className={`w-8 h-8 rounded-full ${direction === 'right' ? "order-2" : ""}`}
          src={imageUrl}
          alt="Jese image"
        />
        <div className="flex flex-col gap-1 w-full max-w-[320px]">
          <div className={`flex items-center rtl:space-x-reverse ${direction === "right" ? "justify-end" : ""}`}>
            <span className={`text-sm px-2 font-semibold text-gray-900 dark:text-white ${direction === 'right' ? "order-2" : ""}`}>
              {name}
            </span>
          </div>
          <div className={`flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 ${
            direction === "right" ? "rounded-s-xl rounded-br-xl" : "rounded-e-xl rounded-bl-xl"
          }`}>
            <p className="text-sm font-normal text-gray-900">{msg}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
