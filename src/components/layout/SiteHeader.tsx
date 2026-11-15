import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { artistName } from "../../content/entity";
import { moreLabel, primaryNav, showAccount, utilityNav, type NavItem } from "../../content/navigation";
import { pathFor, translatePath } from "../../content/paths";
import { track } from "../../lib/analytics";
import { useLocale } from "../../app/locale";
import "./SiteHeader.css";

export interface SiteHeaderProps {
  cartCount?: number;
}

function AccountIcon() {
  return (
    <svg className="site-header__icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="9.2" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M5.8 18.4c1.55-2.35 3.7-3.55 6.2-3.55s4.65 1.2 6.2 3.55"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="site-header__icon site-header__icon--bag" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.5 8.5h11l-.7 11.2a1.5 1.5 0 0 1-1.5 1.4H8.7a1.5 1.5 0 0 1-1.5-1.4L6.5 8.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5V7a3 3 0 0 1 6 0v1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const go = (next: "en" | "bg") => {
    if (next !== locale) track({ name: "language_select", locale: next });
  };
  return (
    <nav className={`site-header__lang${compact ? " site-header__lang--compact" : ""}`} aria-label={locale === "bg" ? "Език" : "Language"}>
      <Link to={translatePath(pathname, "en")} hrefLang="en" lang="en" aria-current={locale === "en" ? "page" : undefined} onClick={() => go("en")}>
        EN
      </Link>
      <span aria-hidden="true">/</span>
      <Link to={translatePath(pathname, "bg")} hrefLang="bg" lang="bg" aria-current={locale === "bg" ? "page" : undefined} onClick={() => go("bg")}>
        BG
      </Link>
    </nav>
  );
}

function DesktopMenu({
  label,
  href,
  items,
  className,
  active = false,
}: {
  label: string;
  href?: string;
  items: NavItem[];
  className?: string;
  active?: boolean;
}) {
  const { locale } = useLocale();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`site-header__dropdown${className ? ` ${className}` : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !rootRef.current?.contains(next)) setOpen(false);
      }}
    >
      {href ? (
        <Link
          to={href}
          className={active ? "is-active" : undefined}
          aria-current={active ? "page" : undefined}
          aria-expanded={open}
          aria-haspopup="true"
        >
          {label}
        </Link>
      ) : (
        <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(true)}>
          {label}
        </button>
      )}
      <ul className="site-header__submenu" hidden={!open}>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={pathFor(locale, item.route)}>{item.label[locale]}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileLinks({ open }: { open: boolean }) {
  const { locale } = useLocale();
  const links: ReactNode[] = [];

  const { pathname } = useLocation();
  for (const item of primaryNav) {
    const href = pathFor(locale, item.route);
    const active = pathname === href || (item.id === "work" && pathname.startsWith(`${href}/`));
    links.push(
      <Link key={item.id} className={active ? "is-active" : undefined} to={href} tabIndex={open ? 0 : -1} aria-current={active ? "page" : undefined}>
        {item.label[locale]}
      </Link>,
    );
    for (const child of item.children ?? []) {
      links.push(
        <Link key={child.id} className="mobile-menu__child" to={pathFor(locale, child.route)} tabIndex={open ? 0 : -1}>
          {child.label[locale]}
        </Link>,
      );
    }
  }

  return <>{links}</>;
}

export function SiteHeader({ cartCount = 0 }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { locale } = useLocale();
  const account = utilityNav.find((item) => item.id === "account");
  const cart = utilityNav.find((item) => item.id === "cart");
  const secondary = primaryNav.filter((item) => item.secondary);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {locale === "bg" ? "Към съдържанието" : "Skip to content"}
      </a>

      <div className="site-header__inner">
        <Link className="site-header__wordmark" to={pathFor(locale, "home")}>
          {artistName(locale)}
        </Link>

        <nav className="site-header__desktop" aria-label={locale === "bg" ? "Основна навигация" : "Main navigation"}>
          {primaryNav.map((item) => {
            const href = pathFor(locale, item.route);
            const active = location.pathname === href || (item.id === "work" && location.pathname.startsWith(`${href}/`));
            return item.children ? (
              <DesktopMenu
                key={item.id}
                className="site-header__item--primary"
                label={item.label[locale]}
                href={href}
                items={item.children}
                active={active}
              />
            ) : (
              <Link
                key={item.id}
                className={[item.secondary ? "site-header__item--secondary" : "", active ? "is-active" : ""].filter(Boolean).join(" ") || undefined}
                to={href}
                aria-current={active ? "page" : undefined}
              >
                {item.label[locale]}
              </Link>
            );
          })}
          <DesktopMenu className="site-header__more" label={moreLabel[locale]} items={secondary} />
        </nav>

        <div className="site-header__utilities">
          <LanguageSwitcher />
          {showAccount && account && (
            <Link className="site-header__login" to={pathFor(locale, account.route)}>
              <AccountIcon />
              <span>{account.label[locale]}</span>
            </Link>
          )}
          {cart && (
            <Link className="site-header__cart" to={pathFor(locale, cart.route)} aria-label={`${cart.label[locale]}, ${cartCount}`}>
              <CartIcon />
              <span className="site-header__cart-count">{cartCount}</span>
            </Link>
          )}
        </div>

        <div className="site-header__mobile-actions">
          {cart && (
            <Link className="site-header__cart" to={pathFor(locale, cart.route)} aria-label={`${cart.label[locale]}, ${cartCount}`}>
              <CartIcon />
              <span className="site-header__cart-count">{cartCount}</span>
            </Link>
          )}
          <button
            className="site-header__menu"
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {locale === "bg" ? "Меню" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? " mobile-menu--open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-menu__top">
          <Link to={pathFor(locale, "home")} className="site-header__wordmark">
            {artistName(locale)}
          </Link>
          <div className="mobile-menu__tools">
            <LanguageSwitcher compact />
            <button type="button" onClick={() => setOpen(false)} aria-label={locale === "bg" ? "Затвори менюто" : "Close menu"}>
              {locale === "bg" ? "Затвори" : "Close"}
            </button>
          </div>
        </div>
        <nav aria-label={locale === "bg" ? "Мобилна навигация" : "Mobile navigation"}>
          <MobileLinks open={open} />
          {showAccount && account && (
            <Link to={pathFor(locale, account.route)} tabIndex={open ? 0 : -1}>
              {account.label[locale]}
            </Link>
          )}
          {cart && (
            <Link to={pathFor(locale, cart.route)} tabIndex={open ? 0 : -1}>
              {cart.label[locale]} ({cartCount})
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
