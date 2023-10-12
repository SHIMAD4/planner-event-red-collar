import { useState } from "react"
import clearError from "../shared/icons/clear-alt.svg"
import clear from "../shared/icons/clear.svg"
import eyeClose from "../shared/icons/eye-icon-close.svg"
import eyeOpen from "../shared/icons/eye-icon-open.svg"
import "../shared/scss/Input/Input.scss"

export function Input({
  className,
  type,
  id,
  title,
  func,
  errorSymbols,
  errorEquality,
  errorRequired,
  onChange,
  required,
  number,
}) {
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const clearInput = () => {
    setInputValue("")
    func("")
  }

  const togglePassView = (e) => {
    setPasswordVisible(!isPasswordVisible)
    const input = e.target.parentNode.querySelector("input")

    if (!isPasswordVisible) {
      input.type = `text`
    } else {
      input.type = `password`
    }
  }

  return (
    <div className={className + "-block block"}>
      <input
        className={className}
        type={type}
        id={id}
        name={id}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          onChange ? onChange(e) : null
        }}
        autoComplete="true"
        required={required ? true : false}
      />
      <label htmlFor={id}>{title}</label>
      {id === "password" || id === "password2" ? (
        <img
          className={id === "password" ? "eye-close1" : id === "password2" ? "eye-close2" : null}
          src={isPasswordVisible ? eyeOpen : eyeClose}
          alt=""
          onClick={(e) => togglePassView(e)}
        />
      ) : (
        <>
          <img className="icon clear-icon" src={clear} alt="" onClick={() => clearInput()} />
          <img className="icon clear-icon-alt hide" src={clearError} alt="" onClick={() => clearInput()} />
        </>
      )}
      {errorSymbols ? (
        <p className="valid-error valid-error-symbols hide">{errorSymbols ? errorSymbols : ""}</p>
      ) : null}
      {errorEquality ? (
        <p className="valid-error valid-error-equality hide">{errorEquality ? errorEquality : ""}</p>
      ) : null}
      {errorRequired ? (
        <p className={"valid-error valid-error-required valid-error-required-" + number + " hide"}>
          {errorRequired ? errorRequired : ""}
        </p>
      ) : null}
    </div>
  )
}