const Welcome = () => {
  const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
    return(
      <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Amount (ETH)" name="amount" type="number" />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
      </div>
    );
}

export default Welcome; 