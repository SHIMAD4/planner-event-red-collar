import logo from './assets/logo.svg'

export default function Header() {
  return (
    <>
    <header className="header">
        <img className='header__logo' src={logo} alt="logo" width={53} height={31}/>
        <p className='header__alt'>red collar</p>
        <h1 className='header__heading'>planner <span>event</span></h1>
    </header>
    </>
  )
}