import type { Locale } from "./paths";

export type WorkCategory = "sculpture" | "furniture" | "painting" | "project" | "theo-apples";

export interface WorkSource {
  src: string;
  width: number;
}

export interface WorkStill {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
  title: Record<Locale, string>;
  category: WorkCategory;
  fit: "contain" | "cover";
  avif: WorkSource[];
  webp: WorkSource[];
  /** Present when an artwork page exists. */
  slug?: string;
  year?: number;
}

const media = (id: string, avif: number[], webp: number[]) => ({
  avif: avif.map((width) => ({ src: `/images/work/${id}-${width}.avif`, width })),
  webp: webp.map((width) => ({ src: `/images/work/${id}-${width}.webp`, width })),
});

export const workShareImage = {
  src: "/images/source/teodordukov-com/Piligrim_205.jpg",
  alt: {
    en: "Tall painted wooden figure by Teodor Dukov",
    bg: "Висока рисувана дървена фигура от Теодор Дуков",
  },
};

export const workStills = {
  pilgrim: {
    id: "pilgrim",
    src: "/images/source/teodordukov-com/Piligrim_205.jpg",
    width: 586,
    height: 860,
    fit: "contain",
    category: "sculpture",
    title: { en: "Pilgrim", bg: "Пилгрим" },
    alt: {
      en: "Tall painted wooden figure by Teodor Dukov, standing on a white plinth",
      bg: "Висока рисувана дървена фигура от Теодор Дуков върху бял постамент",
    },
    ...media("pilgrim", [480, 586], [480, 586]),
  },
  dance: {
    id: "dance",
    src: "/images/source/teodordukov-com/dance-front-second.jpg",
    width: 858,
    height: 860,
    fit: "contain",
    category: "sculpture",
    title: { en: "Dance", bg: "Танц" },
    alt: {
      en: "Carved and painted wooden figure by Teodor Dukov",
      bg: "Издълбана и рисувана дървена фигура от Теодор Дуков",
    },
    ...media("dance", [480, 800], [480, 800, 858]),
  },
  humility: {
    id: "humility",
    src: "/images/source/teodordukov-com/Smirenie-2.JPG",
    width: 900,
    height: 672,
    fit: "contain",
    category: "sculpture",
    title: { en: "Humility", bg: "Смирение" },
    alt: {
      en: "Painted wooden head sculpture by Teodor Dukov",
      bg: "Рисувана дървена скулптура на глава от Теодор Дуков",
    },
    ...media("humility", [480, 800, 900], [480, 800, 900]),
  },
  hitrusha: {
    id: "hitrusha",
    src: "/images/source/teodordukov-com/Hitrusha.JPG",
    width: 535,
    height: 400,
    fit: "contain",
    category: "sculpture",
    title: { en: "Hitrusha", bg: "Хитруша" },
    alt: {
      en: "Painted wooden bust by Teodor Dukov",
      bg: "Рисуван дървен бюст от Теодор Дуков",
    },
    ...media("hitrusha", [480], [480, 535]),
  },
  fish: {
    id: "fish",
    src: "/images/source/teodordukov-com/front-second.jpg",
    width: 900,
    height: 622,
    fit: "contain",
    category: "sculpture",
    title: { en: "Fish", bg: "Риба" },
    alt: {
      en: "Colourful carved fish sculpture by Teodor Dukov",
      bg: "Цветна издълбана скулптура на риба от Теодор Дуков",
    },
    ...media("fish", [480, 800, 900], [480, 800, 900]),
  },
  pearTable: {
    id: "pear-table",
    src: "/images/featured/table-pear.jpg",
    width: 257,
    height: 470,
    fit: "contain",
    category: "furniture",
    title: { en: "Pear Table", bg: "Маса с круша" },
    alt: {
      en: "Painted wooden table by Teodor Dukov, with a pear sculpture on top",
      bg: "Рисувана дървена маса от Теодор Дуков със скулптура на круша отгоре",
    },
    ...media("pear-table", [257], [257]),
  },
  carvedLegs: {
    id: "carved-legs",
    src: "/images/source/teodordukov-com/3.jpg",
    width: 599,
    height: 400,
    fit: "cover",
    category: "furniture",
    title: { en: "Carved legs", bg: "Издълбани крака" },
    alt: {
      en: "Close view of carved and painted legs on a wooden table sculpture by Teodor Dukov",
      bg: "Близък кадър на издълбани и рисувани крака на дървена маса-скулптура от Теодор Дуков",
    },
    ...media("carved-legs", [480, 599], [480, 599]),
  },
  greenEyes: {
    id: "green-eyes",
    src: "/images/source/teodordukov-com/girl-with-green-eyes-drawings-2.jpg",
    width: 900,
    height: 813,
    fit: "contain",
    category: "painting",
    title: { en: "Girl with Green Eyes", bg: "Момиче със зелени очи" },
    alt: {
      en: "Painting of two figures with green eyes by Teodor Dukov",
      bg: "Картина на две фигури със зелени очи от Теодор Дуков",
    },
    ...media("green-eyes", [480, 800, 900], [480, 800, 900]),
  },
  sisters: {
    id: "sisters",
    src: "/images/source/teodordukov-com/sisters-drawing.jpg",
    width: 400,
    height: 549,
    fit: "contain",
    category: "painting",
    title: { en: "Sisters", bg: "Сестри" },
    alt: {
      en: "Painting Sisters by Teodor Dukov",
      bg: "Картината „Сестри“ от Теодор Дуков",
    },
    ...media("sisters", [400], [400]),
  },
  girlWithCoke: {
    id: "girl-with-coke",
    src: "/images/source/teodordukov-com/girl-with-coke-drawing-2.jpg",
    width: 400,
    height: 660,
    fit: "contain",
    category: "painting",
    title: { en: "Girl with Coke", bg: "Момиче с кока-кола" },
    alt: {
      en: "Painting of a seated figure by Teodor Dukov",
      bg: "Картина на седяща фигура от Теодор Дуков",
    },
    ...media("girl-with-coke", [400], [400]),
  },
  exhibition: {
    id: "exhibition",
    src: "/images/split/teodor-5.JPG",
    width: 1480,
    height: 511,
    fit: "contain",
    category: "project",
    title: { en: "Exhibition installation", bg: "Изложбена инсталация" },
    alt: {
      en: "Sculptures and paintings by Teodor Dukov installed in a gallery",
      bg: "Скулптури и картини на Теодор Дуков, поставени в галерия",
    },
    ...media("exhibition", [480, 800, 1200, 1480], [480, 800, 1200, 1480]),
  },
  gilded: {
    id: "gilded",
    src: "/images/artworks/teodor-dukov-gilded-concave-apple-wood-sculpture.png",
    width: 699,
    height: 1024,
    fit: "contain",
    category: "theo-apples",
    slug: "gilded-concave-apple",
    title: { en: "Gilded Concave Apple", bg: "Gilded Concave Apple" },
    alt: {
      en: "Gilded wooden apple sculpture with two concave openings by Teodor Dukov",
      bg: "Позлатена дървена ябълка с два вдлъбнати отвора от Теодор Дуков",
    },
    ...media("gilded", [480, 699], [480, 699]),
  },
  verdant: {
    id: "verdant",
    src: "/images/artworks/teodor-dukov-verdant-leaf-apple-wood-sculpture.png",
    width: 600,
    height: 600,
    fit: "contain",
    category: "theo-apples",
    slug: "verdant-leaf-apple",
    title: { en: "Verdant Leaf Apple", bg: "Verdant Leaf Apple" },
    alt: {
      en: "Green wooden apple sculpture with leaves by Teodor Dukov",
      bg: "Зелена дървена ябълка с листа от Теодор Дуков",
    },
    ...media("verdant", [480, 600], [480, 600]),
  },
  crimson: {
    id: "crimson",
    src: "/images/artworks/teodor-dukov-crimson-gala-apple-wood-sculpture.png",
    width: 600,
    height: 831,
    fit: "contain",
    category: "theo-apples",
    slug: "crimson-gala-apple",
    title: { en: "Crimson Gala Apple", bg: "Crimson Gala Apple" },
    alt: {
      en: "Crimson and gold wooden apple sculpture by Teodor Dukov",
      bg: "Пурпурна и златна дървена ябълка от Теодор Дуков",
    },
    ...media("crimson", [480, 600], [480, 600]),
  },
  striped: {
    id: "striped-apple",
    src: "/images/split/gallery-4.jpg",
    width: 660,
    height: 561,
    fit: "contain",
    category: "theo-apples",
    title: { en: "Striped Apple", bg: "Раирана ябълка" },
    alt: {
      en: "Striped wooden apple sculpture by Teodor Dukov beside a painted box",
      bg: "Раирана дървена ябълка от Теодор Дуков до рисувана кутия",
    },
    ...media("striped-apple", [480, 660], [480, 660]),
  },
  surface: {
    id: "surface",
    src: "/images/source/teodordukov-com/6.jpg",
    width: 599,
    height: 400,
    fit: "cover",
    category: "sculpture",
    title: { en: "Painted surface", bg: "Рисувана повърхност" },
    alt: {
      en: "Close view of painted wood and a carved hand on a sculpture by Teodor Dukov",
      bg: "Близък кадър на рисувано дърво и издълбана ръка върху скулптура от Теодор Дуков",
    },
    ...media("surface", [480, 599], [480, 599]),
  },
  portrait: {
    id: "portrait",
    src: "/images/contact/artist-portrait-gallery.png",
    width: 765,
    height: 1024,
    fit: "cover",
    category: "sculpture",
    title: { en: "Teodor Dukov", bg: "Теодор Дуков" },
    alt: {
      en: "Teodor Dukov standing beside a large sculptural bust in a gallery",
      bg: "Теодор Дуков до голям скулптурен бюст в галерия",
    },
    ...media("portrait", [480, 765], [480, 765]),
  },
} as const satisfies Record<string, WorkStill>;

export const workCopy = {
  title: { en: "Work", bg: "Работа" },
  lede: {
    en: "Selected sculpture, furniture, paintings and projects by Teodor Dukov.",
    bg: "Избрани скулптури, мебели, картини и проекти на Теодор Дуков.",
  },
  intro: {
    en: [
      "Teodor’s practice moves between sculpture, functional objects, furniture and works on surface. Wood, form, material and the way a piece is finished connect these bodies of work.",
      "What follows is that range: freestanding sculpture, furniture, paintings and projects made for a place.",
    ],
    bg: [
      "Практиката на Теодор се движи между скулптура, функционални предмети, мебели и творби върху повърхност. Дървото, формата, материалът и начинът на завършек свързват тези тела от работа.",
      "По-надолу е този обхват: свободно стояща скулптура, мебели, картини и проекти за конкретно място.",
    ],
  },
  sculpture: {
    en: "Teodor Dukov’s sculptural work explores volume, material, surface and physical presence through wood and other materials.",
    bg: "Скулптурната работа на Теодор Дуков изследва обем, материал, повърхност и физическо присъствие чрез дърво и други материали.",
  },
  furniture: {
    en: "These objects are the point where construction, function and sculpture meet. A table is considered as volume, structure and surface, and it occupies a room with the presence of a freestanding work.",
    bg: "Тези предмети са мястото, където конструкция, функция и скулптура се срещат. Масата е мислена като обем, структура и повърхност и заема стаята с присъствието на свободно стояща творба.",
  },
  furnitureAside: { en: "Functional sculpture", bg: "Функционална скулптура" },
  paintings: {
    en: "These works extend Teodor’s exploration of colour, surface and composition. Each picture keeps its own proportion.",
    bg: "Тези творби продължават изследването на Теодор върху цвят, повърхност и композиция. Всяка картина запазва собствената си пропорция.",
  },
  projects: {
    en: "Projects bring Teodor’s work into architectural, exhibition or site-specific contexts. This photograph shows sculptures and paintings installed together in a gallery.",
    bg: "Проектите въвеждат работата на Теодор в архитектурна, изложбена или свързана с място среда. Тази снимка показва скулптури и картини, поставени заедно в галерия.",
  },
  signatureLabel: { en: "Signature collection", bg: "Емблематична колекция" },
  signature: {
    en: "A recurring sculptural form transformed through wood, pigment, polish and precious-metal leaf.",
    bg: "Повтаряща се скулптурна форма, преобразена чрез дърво, пигмент, полировка и варак от скъпоценен метал.",
  },
  signatureNote: {
    en: "Theo Apples is the signature collection inside the practice. Each apple is an individual sculpture.",
    bg: "Theo Apples е емблематичната колекция вътре в практиката. Всяка ябълка е отделна скулптура.",
  },
  material: {
    en: "Paint follows a carved edge. Polish opens the grain. A metallic surface changes how a volume holds the light. Across sculpture, furniture and Theo Apples, the finish is decided with the form.",
    bg: "Боята следва издълбания ръб. Полировката отваря жилката на дървото. Металната повърхност променя начина, по който обемът държи светлината. При скулптурата, мебелите и Theo Apples завършекът се решава заедно с формата.",
  },
  availableNote: {
    en: "A short selection from the archive. Enquire to confirm what the studio can offer.",
    bg: "Кратък избор от архива. Запитването потвърждава какво ателието може да предложи.",
  },
  onEnquiry: { en: "On enquiry", bg: "По запитване" },
  artist: {
    en: "Teodor Dukov is a Bulgarian artist. The work is made principally in wood and moves between freestanding sculpture, furniture, paintings and projects for a particular place. Wood, form and the finish of a surface hold these bodies of work together. Theo Apples, carved apples completed in colour or in gold, silver and palladium, is the signature collection inside that practice. Figure, object and picture share an interest in volume, contour and how a surface meets the light. The studio is where the pieces are shaped and finished.",
    bg: "Теодор Дуков е български художник. Работата е правена предимно от дърво и се движи между свободно стояща скулптура, мебели, картини и проекти за конкретно място. Дървото, формата и завършекът на повърхността държат тези тела от работа заедно. Theo Apples — издълбани ябълки, завършени в цвят или в злато, сребро и паладий — е емблематичната колекция вътре в тази практика. Фигура, предмет и картина споделят интерес към обем, контур и към това как повърхността среща светлината. Ателието е мястото, където творбите се оформят и завършват.",
  },
  close: {
    en: "For available works, private commissions, exhibitions and professional collaborations.",
    bg: "За налични творби, частни поръчки, изложби и професионални сътрудничества.",
  },
  cta: {
    sculpture: { en: "View sculpture", bg: "Виж скулптурата" },
    furniture: { en: "View furniture", bg: "Виж мебелите" },
    paintings: { en: "View paintings", bg: "Виж картините" },
    projects: { en: "View projects", bg: "Виж проектите" },
    theo: { en: "Explore Theo Apples", bg: "Към Theo Apples" },
    process: { en: "Discover the process", bg: "Към процеса" },
    available: { en: "View all available works", bg: "Всички налични творби" },
    enquire: { en: "Enquire", bg: "Запитване" },
    artist: { en: "About the artist", bg: "За художника" },
    contact: { en: "Contact the studio", bg: "Към ателието" },
    viewWork: { en: "View work", bg: "Виж творбата" },
  },
  headings: {
    sculpture: { en: "Sculpture", bg: "Скулптура" },
    furniture: { en: "Furniture", bg: "Мебели" },
    paintings: { en: "Paintings", bg: "Картини" },
    projects: { en: "Projects", bg: "Проекти" },
    theo: { en: "Theo Apples", bg: "Theo Apples" },
    selected: { en: "Selected works", bg: "Избрани творби" },
    material: { en: "Material / Surface", bg: "Материал / Повърхност" },
    available: { en: "Available now", bg: "Налични сега" },
    artist: { en: "Teodor Dukov", bg: "Теодор Дуков" },
    close: { en: "Collect\nCommission\nCollaborate", bg: "Колекционирай\nПоръчай\nСътрудничи" },
  },
  facts: {
    year: { en: "Year", bg: "Година" },
    material: { en: "Material", bg: "Материал" },
    dimensions: { en: "Dimensions", bg: "Размери" },
    availability: { en: "Availability", bg: "Наличност" },
  },
  categories: {
    sculpture: { en: "Sculpture", bg: "Скулптура" },
    furniture: { en: "Furniture", bg: "Мебели" },
    painting: { en: "Painting", bg: "Картина" },
    project: { en: "Project", bg: "Проект" },
    "theo-apples": { en: "Theo Apples", bg: "Theo Apples" },
  },
} as const;
