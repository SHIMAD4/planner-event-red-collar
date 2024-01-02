import { Icons } from '@/shared/ui';

export const Header = () => (
    <header className="header">
        <Icons.Logo className="header__logo" size={53} />
        <p className="header__logo__title">red collar</p>
        <h1 className="header__logo__subtitle">
            planner <span>event</span>
        </h1>
    </header>
);
