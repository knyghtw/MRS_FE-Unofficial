export default function Input({
    type,
    placeholder,
    name,
    svg,
    accept,
    value,
    onChange,
    onBlur,
    required,
    onRight,
    className,
  }) {
    return (
      <label className={`input input-bordered flex items-center gap-2 my-2 ${className}`}>
        {onRight ? (
          <>
            <input
              type={type}
              className='grow'
              value={value}
              placeholder={placeholder}
              name={name}
              accept={accept}
              onChange={onChange}
              onBlur={onBlur}
              {...(required && { required: true })}
            />
            {svg}
          </>
        ) : (
          <>
            {svg}
            <input
              type={type}
              className='grow '
              value={value}
              placeholder={placeholder}
              name={name}
              accept={accept}
              onChange={onChange}
              {...(required && { required: true })}
            />
          </>
        )}
      </label>
    );
  }
  