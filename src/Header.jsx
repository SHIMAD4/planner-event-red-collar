import logo from './shared/icons/logo.svg'

export default function Header() {
    return (
        <>
            <header className="header">
                <img className="header__logo" src={logo} alt="logo" width={53} height={31} />
                <p className="header__logo__title">red collar</p>
                <h1 className="header__logo__subtitle">
                    planner <span>event</span>
                </h1>
            </header>
        </>
    )
}
