const FormInput = ({ label, name, value, onChange, required = false }) => {
  const isStatusField = label.toLowerCase() === 'status';

  return (
    <div style={{marginBottom: '13px'}}>
      <label className="form-label">{label.toUpperCase()}</label>
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
          className="form-control background-color-red"
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  )
}

export default FormInput;
