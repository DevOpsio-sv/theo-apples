import { AboutStatement } from "../components/home/AboutStatement";
import { CollectionRange } from "../components/home/CollectionRange";
import { CraftStatement } from "../components/home/CraftStatement";
import { FeaturedCreations } from "../components/home/FeaturedCreations";
import { HeroCollage } from "../components/home/HeroCollage";
import { HomeChapters } from "../components/home/HomeChapters";
import { HomeContact } from "../components/home/HomeContact";
import { LimitedEditionFeature } from "../components/home/LimitedEditionFeature";
import { SplitArtworkSpread } from "../components/home/SplitArtworkSpread";
export function HomePage() {
  return (
    <>
      <HeroCollage />
      <CraftStatement />
      <AboutStatement />
      <SplitArtworkSpread />
      <CollectionRange />
      <FeaturedCreations />
      <HomeChapters />
      <LimitedEditionFeature />
      <HomeContact />
    </>
  );
}
