import { Icons } from '../icons'
export default function Index() {
    return (
        <>
            <header className="header">
                <Icons.Logo className="header__logo" size={53}/>
                <p className="header__logo__title">red collar</p>
                <h1 className="header__logo__subtitle">
                    planner <span>event</span>
                </h1>
            </header>
        </>
    )
}
