// Central place to swap placeholder photography for your own uploaded images.
// Replace any import below with your own file in src/assets/.
import hero from "@/assets/hero.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";

export const HERO_IMAGE = hero;

export const GALLERY_IMAGES = [
  { src: gallery1, alt: "Editorial portrait in cream linen on a warm backdrop" },
  { src: gallery2, alt: "Brand lifestyle session at a warm minimalist workspace" },
  { src: gallery3, alt: "Couple laughing in golden hour light" },
  { src: gallery4, alt: "Editorial portrait in a tailored suit" },
  { src: gallery5, alt: "Dancer in flowing ivory fabric, creative session" },
  { src: gallery6, alt: "Elegant portrait with gold jewellery" },
  { src: gallery7, alt: "Candlelit celebration dinner, event photography" },
  { src: gallery8, alt: "Beauty close-up portrait on warm ivory" },
] as const;
