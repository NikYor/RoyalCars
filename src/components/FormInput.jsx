const FormInput = ({ label, name, value, onChange, required = false }) => {
  const isStatusField = label.toLowerCase() === 'status';

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      {isStatusField ? (
        <select
          name={name}
          className="form-select ml-5"
          value={value || 'free'}
          onChange={onChange}
          required={required}
        >
          <option value="free">free</option>
          <option value="in use">in use</option>
        </select>
      ) : (
        <input
          type="text"
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  )
}

export default FormInput;
