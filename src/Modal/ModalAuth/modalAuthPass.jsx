export function ModalAuthPass({ checkPass, setPassToCheck }) {
  return (
    <>
      <div className="modal-auth__input-block">
        <input
          className="modal-auth__input"
          type="password"
          id="password"
          name="password"
          autoComplete="true"
          onChange={(e) => setPassToCheck(e.target.value)}
          required
        />
        <label htmlFor="password">Пароль</label>
      </div>
      <button
        type="submit"
        className="modal-auth__button"
        onClick={(e) => {
          checkPass(e)
        }}>
        Вход
      </button>
    </>
  )
}
