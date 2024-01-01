import { useState } from 'react'
import { Icons } from '../index'
import './styles.scss'

export const Input = ({
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
    isPasswordVisible,
    togglePasswordVisibility,
}) => {
    const [inputValue, setInputValue] = useState('')

    const clearInput = () => {
        setInputValue('')
        if (func) {
            func('')
        }
    }

    return (
        <div className={className + '-block block'}>
            <input
                className={className}
                type={type}
                id={id}
                name={id}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value)
                    if (func) {
                        func(e.target.value)
                    }
                    onChange ? onChange(e) : null
                }}
                autoComplete="true"
                required={!!required}
            />
            <label htmlFor={id}>{title}</label>
            {id === 'password' || id === 'password2' ? (
                <div onClick={() => togglePasswordVisibility()}>
                    {id === 'password' ? (
                        isPasswordVisible ? (
                            <Icons.EyeOpen className="eye-close1" />
                        ) : (
                            <Icons.EyeClose className="eye-close1" />
                        )
                    ) : null}
                    {id === 'password2' ? (
                        isPasswordVisible ? (
                            <Icons.EyeOpen className="eye-close2" />
                        ) : (
                            <Icons.EyeClose className="eye-close2" />
                        )
                    ) : null}
                </div>) : (
                <>
                    <Icons.Clear className="icon clear-icon" onClick={() => clearInput()} />
                    <Icons.ClearError className="icon clear-icon-alt hide" onClick={() => clearInput()} />
                </>
            )}
            {errorSymbols ? (
                <p className="valid-error valid-error-symbols hide">{errorSymbols ? errorSymbols : ''}</p>
            ) : null}
            {errorEquality ? (
                <p className="valid-error valid-error-equality hide">{errorEquality ? errorEquality : ''}</p>
            ) : null}
            {errorRequired ? (
                <p className={'valid-error valid-error-required valid-error-required-' + number + ' hide'}>
                    {errorRequired ? errorRequired : ''}
                </p>
            ) : null}
        </div>
    )
}
