import { useEffect, useRef, useState } from "react";
import { irregularVerbs } from "./utils";
import "./IrregularVerbs.css";
import { useLanguage } from "state/currentPage";

const IrregularVerbs = () => {
  const language = useLanguage();
  const [irregularVerb, setIrregularVerb] = useState({});
  const [irregularVerbError, setIrregularVerbError] = useState(false);
  const [irregularVerbSuccess, setIrregularVerbSuccess] = useState(false);
  const [showedResult, setShowedResult] = useState(false);
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

    if (showedResult) {
      cleanForm();
      secondColumn.current.focus();
      setShowedResult(false);
      return;
    }

    const meaningResult =
      language === "spanish"
        ? irregularVerb["meaning"]
        : irregularVerb["meaningPR"];

    let error = false;

    if (meaning.current.value.toLowerCase() !== meaningResult) {
      meaning.current.value = null;
      meaning.current.focus();
      error = true;
    }

    if (thirdColumn.current.value.toLowerCase() !== irregularVerb[3]) {
      thirdColumn.current.value = null;
      thirdColumn.current.focus();
      error = true;
    }

    if (secondColumn.current.value.toLowerCase() !== irregularVerb[2]) {
      secondColumn.current.value = null;
      secondColumn.current.focus();
      error = true;
    }

    if (error) {
      setIrregularVerbError(true);
      return;
    }

    cleanForm();
    secondColumn.current.focus();

    setIrregularVerbSuccess(true);
    setIrregularVerbError(false);
    setTimeout(() => {
      setIrregularVerbSuccess(false);
    }, 2000);
    getIrregularVerb();
  };

  const cleanForm = () => {
    secondColumn.current.value = null;
    thirdColumn.current.value = null;
    meaning.current.value = null;
  };

  const handleShowResult = () => {
    setShowedResult((value) => !value);
    if (showedResult) {
      cleanForm();
      secondColumn.current.focus();
      return;
    }

    secondColumn.current.value = irregularVerb[2];
    thirdColumn.current.value = irregularVerb[3];
    const meaningValue =
      language === "spanish"
        ? irregularVerb["meaning"]
        : irregularVerb["meaningPR"];
    meaning.current.value = meaningValue;
  };

  const handleKeyUp = (e, input) => {
    const { keyCode } = e;
    if (keyCode !== 13) {
      return;
    }

    if (input === 2) {
      thirdColumn.current.focus();
      return;
    }

    if (input === 3) {
      meaning.current.focus();
      return;
    }

    if (input === "meaning") {
      handleGetVerb();
      return;
    }
  };

  const handleFocus = () => {
    if (showedResult) {
      cleanForm();
      setShowedResult(false);
    }
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
          onKeyUp={(e) => handleKeyUp(e, 2)}
          onFocus={handleFocus}
          ref={secondColumn}
        />
        <input
          className="Input mb-2"
          type="text"
          placeholder="3th"
          ref={thirdColumn}
          onKeyUp={(e) => handleKeyUp(e, 3)}
          onFocus={handleFocus}
        />
        <input
          className="Input mb-2"
          type="text"
          placeholder="Meaning"
          ref={meaning}
          onKeyUp={(e) => handleKeyUp(e, "meaning")}
          onFocus={handleFocus}
        />
        <div className="Buttons">
          <button
            type="button"
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
