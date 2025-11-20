import { useState } from "react";

export default function useForm(initialValues = {}, onSubmit) {
  const [values, setValues] = useState(initialValues);

  // обработка на промяна в input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // обработка на submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(values);
    }
  };

  // reset на формата
  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    setValues,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
