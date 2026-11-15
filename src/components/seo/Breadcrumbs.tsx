import { Link } from "react-router-dom";
import type { Crumb } from "../../content/seo";

export function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  if (items.length < 2) return null;
  return (
    <nav className="breadcrumbs" aria-label={label}>
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path}>
              {last ? <span aria-current="page">{item.name}</span> : <Link to={item.path}>{item.name}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function ContentRequired({ detail }: { detail: string }) {
  return (
    <p className="content-required">
      <strong>CONTENT REQUIRED FROM ARTIST</strong>
      <span>{detail}</span>
    </p>
  );
}
