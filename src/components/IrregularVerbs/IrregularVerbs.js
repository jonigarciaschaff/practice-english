import { useEffect, useRef, useState } from "react";
import { irregularVerbs } from "./utils";
import "./IrregularVerbs.css";
import { useLanguage } from "state/currentPage";

const IrregularVerbs = () => {
  const language = useLanguage();
  const [irregularVerb, setIrregularVerb] = useState({});
  const [irregularVerb2, setIrregularVerb2] = useState(null);
  const [irregularVerb3, setIrregularVerb3] = useState(null);
  const [irregularVerbMeaning, setIrregularVerbMeaning] = useState(null);
  const [irregularVerbError, setIrregularVerbError] = useState(false);
  const [irregularVerbSuccess, setIrregularVerbSuccess] = useState(false);
  const secondColumn = useRef();
  const thirdColumn = useRef();
  const meaning = useRef();

  const getIrregularVerb = () => {
    const randomIndex = Math.floor(Math.random() * irregularVerbs.length);
    const result = irregularVerbs[randomIndex];
    setIrregularVerb(result);
  };

  const handleGetVerb = () => {
    if (irregularVerbSuccess) {
      return;
    }

    const meaning =
      language === "spanish"
        ? irregularVerb["meaning"]
        : irregularVerb["meaningPR"];

    if (
      irregularVerb2.toLowerCase() !== irregularVerb[2] ||
      irregularVerb3.toLowerCase() !== irregularVerb[3] ||
      irregularVerbMeaning.toLowerCase() !== meaning
    ) {
      setIrregularVerbError(true);
      return;
    }
    setIrregularVerbSuccess(true);
    setIrregularVerbError(false);
    setTimeout(() => {
      setIrregularVerbSuccess(false);
    }, 2000);
    getIrregularVerb();
  };

  const handleShowResult = () => {
    secondColumn.current.value = irregularVerb[2];
    thirdColumn.current.value = irregularVerb[3];
    const meaningValue =
      language === "spanish"
        ? irregularVerb["meaning"]
        : irregularVerb["meaningPR"];
    meaning.current.value = meaningValue;
  };

  useEffect(() => {
    getIrregularVerb();
  }, []);

  return (
    <div className="flex justify-center flex-col">
      <h1 className="text-center text-4xl font-bold mb-2">Irregular verbs:</h1>
      <form className="Form">
        <b className="Title">{irregularVerb.verb || "Verb"}</b>
        <input
          className="Input mb-2"
          type="text"
          placeholder="2th"
          onChange={(e) => setIrregularVerb2(e.target.value)}
          ref={secondColumn}
        />
        <input
          className="Input mb-2"
          type="text"
          placeholder="3th"
          onChange={(e) => setIrregularVerb3(e.target.value)}
          ref={thirdColumn}
        />
        <input
          className="Input mb-2"
          type="text"
          placeholder="Meaning"
          onChange={(e) => setIrregularVerbMeaning(e.target.value)}
          ref={meaning}
        />
        <div className="Buttons">
          <button
            type="reset"
            className={`Button ${irregularVerbError && "ButtonError"} ${
              irregularVerbSuccess && "ButtonSuccess"
            }`}
            onClick={handleGetVerb}
          >
            Submit
          </button>
          <button className="Button" type="button" onClick={handleShowResult}>
            Show result
          </button>
        </div>
      </form>
    </div>
  );
};

export default IrregularVerbs;
