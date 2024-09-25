import React from 'react';

const InputMultipleSelect = ({ name, options, value, onChange, multiple }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      multiple={multiple}
      className="bg-gray-200 border-0"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default InputMultipleSelect;
