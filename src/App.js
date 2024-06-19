import { useState } from "react";
import "./App.css";
import Swal from "sweetalert2";

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState();

  function onChangePasswordLength(e) {
    const value = e.target.value;
    if (value === "") {
      setPasswordLength("");
    } else {
      setPasswordLength(Number(value));
    }
  }
  

  function onClickGeneratePassword() {
    let passwordCharacters = "";

    if (passwordLength > 5) {
      if (
        includeUpperCase ||
        includeLowerCase ||
        includeNumber ||
        includeSymbol
      ) {
        if (includeUpperCase)
          passwordCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeLowerCase)
          passwordCharacters += "abcdefghijklmnopqrstuvwxyz";
        if (includeNumber) passwordCharacters += "1234567890";
        if (includeSymbol) passwordCharacters += "`~!@#$%^&*()_+-=/<>,.";

        let generatedPassword = "";

        for (let i = 0; i < passwordLength; i++) {
          let randomIndex = Math.floor(
            Math.random() * passwordCharacters.length
          );
          generatedPassword += passwordCharacters[randomIndex];
          console.log(generatedPassword);
        }

        setGeneratedPassword(generatedPassword);
      } else {
        Swal.fire({
          title: "Please select atleast one check-box",
          width: "400px",
        });
      }
    } else {
      Swal.fire({
        title: "Password Length must greater than five",
        width: "400px",
      });
    }
  }

  function copyToClipBoard(){

    if(generatedPassword){
      navigator.clipboard.writeText(generatedPassword)
      Swal.fire("Password Copied")
    }
    
  }

  return (
    <div className="container">
      <div className="d-flex vh-100 align-items-center justify-content-center">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-primary mb-5">
              Strong Password Generator
            </h2>
            <label htmlFor="passwordLength" className="form-label fw-bold">
              Password Length :
            </label>
            <input
              type="number"
              id="passwordLength"
              value={passwordLength}
              onChange={onChangePasswordLength}
              className="form-control"
            />

            <div className="mt-3 mb-4">
              <div className="form-check">
                <input
                  id="includeUpperCase"
                  type="checkbox"
                  className="form-check-input"
                  checked={includeUpperCase}
                  onChange={(e) => setIncludeUpperCase(e.target.checked)}
                ></input>
                <label htmlFor="includeUpperCase" className="form-check-label">
                  Include UpperCase
                </label>
              </div>

              <div className="form-check">
                <input
                  id="includeLowerCase"
                  type="checkbox"
                  className="form-check-input"
                  checked={includeLowerCase}
                  onChange={(e) => setIncludeLowerCase(e.target.checked)}
                ></input>
                <label htmlFor="includeLowerCase" className="form-check-label">
                  Include LowerCase
                </label>
              </div>

              <div className="form-check">
                <input
                  id="includeNumber"
                  type="checkbox"
                  className="form-check-input"
                  checked={includeNumber}
                  onChange={(e) => setIncludeNumber(e.target.checked)}
                ></input>
                <label htmlFor="includeNumber" className="form-check-label">
                  Include Number
                </label>
              </div>

              <div className="form-check">
                <input
                  id="includeSymbol"
                  type="checkbox"
                  className="form-check-input"
                  checked={includeSymbol}
                  onChange={(e) => setIncludeSymbol(e.target.checked)}
                ></input>
                <label htmlFor="includeSymbol" className="form-check-label">
                  Include Symbol
                </label>
              </div>
            </div>

            <button
              onClick={onClickGeneratePassword}
              className="btn btn-primary mb-4"
            >
              Generate Password
            </button>

            <div className="input-group">
              <input
                value={generatedPassword}
                type="text"
                className="form-control"
              ></input>
              <button className="btn btn-secondary" onClick={copyToClipBoard}>Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
