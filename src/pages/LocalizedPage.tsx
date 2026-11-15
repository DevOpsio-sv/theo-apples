import { Navigate, useLocation } from "react-router-dom";
import { LocaleProvider } from "../app/locale";
import { PageFrame } from "../components/layout/PageFrame";
import { resolveRedirect } from "../content/redirects";
import { matchLocalizedPath } from "../content/paths";
import { HomePage } from "./HomePage";
import {
  ArticlePage,
  ArtistPage,
  ArtworkView,
  AvailableWorksPage,
  BlogPage,
  CommissionsPage,
  ContactPage,
  ExhibitionDetail,
  ExhibitionsPage,
  FaqPage,
  FurniturePage,
  NotFoundPage,
  PaintingsPage,
  PolicyView,
  PressPage,
  ProcessPage,
  ProjectDetail,
  ProjectsPage,
  SculpturePage,
  TheoApplesPage,
  UtilityPage,
  WorkPage,
} from "./SitePages";

export function LocalizedApp() {
  const location = useLocation();
  const target = resolveRedirect(location.pathname);
  if (target) return <Navigate to={`${target}${location.search}${location.hash}`} replace />;

  const match = matchLocalizedPath(location.pathname);
  const locale = match.locale ?? "en";

  let page = <NotFoundPage />;
  if (match.kind === "route") {
    switch (match.id) {
      case "home":
        page = <HomePage />;
        break;
      case "work":
        page = <WorkPage />;
        break;
      case "sculpture":
        page = <SculpturePage />;
        break;
      case "furniture":
        page = <FurniturePage />;
        break;
      case "paintings":
        page = <PaintingsPage />;
        break;
      case "projects":
        page = <ProjectsPage />;
        break;
      case "theo-apples":
        page = <TheoApplesPage />;
        break;
      case "available-works":
        page = <AvailableWorksPage />;
        break;
      case "artist":
        page = <ArtistPage />;
        break;
      case "exhibitions":
        page = <ExhibitionsPage />;
        break;
      case "process":
        page = <ProcessPage />;
        break;
      case "blog":
        page = <BlogPage />;
        break;
      case "contact":
        page = <ContactPage />;
        break;
      case "commissions":
        page = <CommissionsPage />;
        break;
      case "press":
        page = <PressPage />;
        break;
      case "faq":
        page = <FaqPage />;
        break;
      case "cart":
        page = <UtilityPage kind="cart" />;
        break;
      case "account":
        page = <UtilityPage kind="account" />;
        break;
      case "checkout-success":
        page = <UtilityPage kind="thanks" />;
        break;
      case "checkout-cancel":
        page = <UtilityPage kind="cancel" />;
        break;
      case "privacy":
      case "terms":
      case "shipping":
      case "refunds":
      case "accessibility":
        page = <PolicyView id={match.id} />;
        break;
      default:
        page = <NotFoundPage />;
    }
  } else if (match.kind === "artwork") {
    page = <ArtworkView slug={match.slug} parent={match.parent} />;
  } else if (match.kind === "article") {
    page = <ArticlePage slug={match.slug} />;
  } else if (match.kind === "project") {
    page = <ProjectDetail slug={match.slug} />;
  } else if (match.kind === "exhibition") {
    page = <ExhibitionDetail slug={match.slug} />;
  }

  return (
    <LocaleProvider locale={locale}>
      <PageFrame>{page}</PageFrame>
    </LocaleProvider>
  );
}
