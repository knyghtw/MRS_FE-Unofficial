export default function InputSelect({
  name,
  options,
  selectedName,
  selectedValue,
  value,
  onChange,
  className,
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`select select-bordered border-black w-full my-2 ${className}`}
    >
      <option value={selectedValue}>{selectedName}</option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
}
