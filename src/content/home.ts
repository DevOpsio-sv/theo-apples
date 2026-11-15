export type FloatSlot = "left-top" | "left-middle" | "left-bottom" | "right-top" | "right-middle" | "right-bottom";

export interface MediaImage {
  src: string;
  width: number;
  height: number;
  slot?: FloatSlot;
}

/** Photographs already in the studio archive. Alt text is translated in copy. */
export const homeMedia = {
  heroMain: {
    src: "/images/source/wix-demo/a86e04_45f4e85b685447f187be20f3641df932_mv2.jpg",
    width: 736,
    height: 1078,
  },
  floats: [
    { src: "/images/source/wix-demo/a86e04_42bb86db954f497c91fb2db7d429d700_mv2.png", width: 800, height: 800, slot: "left-top" },
    { src: "/images/hero/wix-hero-4.png", width: 800, height: 800, slot: "left-middle" },
    { src: "/images/source/wix-demo/a86e04_7dc3b8a62b84428ebc9e79a550b117e3_mv2.png", width: 800, height: 800, slot: "left-bottom" },
    { src: "/images/source/wix-demo/a86e04_2709e444968b4780b1d0e8b25b52ba43_mv2.png", width: 800, height: 800, slot: "right-top" },
    { src: "/images/source/wix-demo/a86e04_e13f741286f3440b87db2ccbf50c3926_mv2.jpg", width: 800, height: 800, slot: "right-middle" },
    { src: "/images/source/wix-demo/a86e04_a6a4e81ec3494e8ebceeb65a83455d5e_mv2.jpg", width: 800, height: 800, slot: "right-bottom" },
  ] as const satisfies readonly MediaImage[],
  splitLeft: { src: "/images/source/teodordukov-com/front-second.jpg", width: 900, height: 622 },
  splitRight: { src: "/images/source/teodordukov-com/dance-front-second.jpg", width: 858, height: 860 },
  portrait: { src: "/images/contact/artist-portrait-gallery.png", width: 1200, height: 1500 },
  limited: { src: "/images/limited/sculpture-group-plinths.png", width: 1920, height: 1080 },
};
