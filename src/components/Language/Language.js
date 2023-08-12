import { useEffect, useRef } from "react";
import { setLanguage, useLanguage } from "state/currentPage";

const Language = () => {
  const language = useLanguage();
  const ref = useRef();

  useEffect(() => {
    ref.current.value = language;
  }, []);

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };
  return (
    <div className="mb-10">
      <span className="mr-2">Language:</span>
      <select ref={ref} onChange={handleChange}>
        <option value="SP">Spanish</option>
        <option value="PR">Portuguese</option>
        <option value="CH">Chinese</option>
      </select>
    </div>
  );
};

export default Language;
