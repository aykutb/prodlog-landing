/**
 * The Prodlog logomark: a verbatim copy of prodlog2 src/brand/definition.ts,
 * the one definition every instance renders from. Edit it there, then copy
 * it here; `npm test` fails while the two differ (when prodlog2 is checked
 * out next to this repo) and whenever public/logomark.svg no longer draws
 * these strips.
 *
 * The reference is the login page's mark: three hand-drawn strips, mauve on
 * top, sage in the middle (the widest), mustard at the bottom, with no tile.
 * The files in public/ (logomark.svg, favicon.svg, brand/logo.svg, the PNG
 * icons) are generated in prodlog2 by `npm run brand:assets` and copied here.
 * Colors are token names, resolved from app/globals.css.
 */

/** The strips' own box, as drawn. The mark is wider than it is tall. */
export const LOGOMARK_WIDTH = 475;
export const LOGOMARK_HEIGHT = 421;

/** Token names from src/index.css. */
export type BrandColor = "ink" | "mauve" | "sage" | "mustard";

export interface Strip {
  color: BrandColor;
  /** SVG path data in the LOGOMARK_WIDTH x LOGOMARK_HEIGHT box. */
  d: string;
}

/** In paint order: sage (the middle strip), mustard (bottom), mauve (top). */
export const LOGOMARK_STRIPS: readonly Strip[] = [
  {
    color: "sage",
    d: "M414.685 133.269C430.34 133.143 447.933 129.608 460.535 141.549C464.556 145.359 469.548 154.311 470.497 159.821C474.154 181.54 473.721 204.328 474.883 226.33C475.426 236.541 472.545 246.037 465.251 253.415C451.989 266.838 425.266 265.04 407.219 266.066C382.717 267.478 358.2 268.743 333.677 269.86L140.701 280.327C125.169 281.052 109.643 281.859 94.1205 282.749C88.6562 283.07 75.4535 283.585 70.8844 284.872C65.9261 284.4 50.7791 284.694 46.034 286.026C25.6984 285.03 7.89903 281.783 3.66884 257.045C0.901656 240.867 2.18108 223.725 0.67064 207.289C-0.51186 194.42 -0.981426 179.341 6.76876 168.296C18.712 152.098 41.5769 153.564 59.509 152.653L109.924 150.142L315.506 139.128L371.703 136.081C381.039 135.513 391.62 135.238 400.715 133.695C402.393 133.9 412.403 133.361 414.685 133.269Z",
  },
  {
    color: "mustard",
    d: "M46.0339 286.026C50.779 284.694 65.926 284.4 70.8843 284.872L305.311 298.184L365.103 301.48C383.129 302.408 411.44 300.786 424.049 314.987C427.287 318.607 429.707 322.888 431.137 327.535C435.675 342.549 433.007 367.21 432.856 383.146C432.718 398.247 417.772 412.875 402.956 414.675C388.622 416.415 373.923 416.47 359.348 416.969C332.116 418.042 304.878 418.787 277.632 419.202C226.31 420.108 175.374 421.508 123.999 420.367C106.39 419.976 88.5159 420.045 70.9173 419.337C59.8485 418.892 45.4557 412.061 38.1015 403.391C23.8998 386.064 23.64 362.227 22.5462 340.944C22.1722 333.674 21.9439 326.074 22.4575 318.909C23.653 302.219 31.0615 292.48 46.0339 286.026Z",
  },
  {
    color: "mauve",
    d: "M414.447 133.816C409.716 135.189 394.58 135.614 389.62 135.185L155.208 123.897L95.4202 121.116C77.3958 120.344 49.1142 122.211 36.3898 108.119C33.1222 104.527 30.6666 100.267 29.1973 95.6331C24.5327 80.6579 26.986 55.9753 26.9997 40.0391C27.0068 24.9369 41.8187 10.1801 56.6107 8.25294C70.9222 6.38906 85.6123 6.20716 100.175 5.5822C127.383 4.2739 154.6 3.29423 181.827 2.64446C233.113 1.29529 284.009 -0.544898 335.366 0.152942C352.968 0.392149 370.832 0.169098 388.427 0.724659C399.494 1.07395 413.937 7.78029 421.362 16.3873C435.706 33.5912 436.171 57.4249 437.448 78.6973C437.885 85.964 438.178 93.5613 437.727 100.731C436.676 117.43 429.355 127.233 414.447 133.816Z",
  },
];

/**
 * Each strip's own box in the mark's coordinates, in LOGOMARK_STRIPS order.
 * The week stack on the Next up tile draws single strips stretched to a
 * small bar, so a stack of them reads like the mark.
 */
export const STRIP_BOXES: readonly string[] = ["0 133 475 154", "22 284 412 137", "26 0 412 134"];

/**
 * `strips`: the mark alone, the reference and the default.
 * `square`: the mark centered in a square box, for the favicon.
 * `tile`: an ink square with the mark centered, for app icons (apple-touch,
 * the manifest). Full bleed: the operating system rounds the corners.
 */
export type LogomarkVariant = "strips" | "square" | "tile";

export const TILE = {
  color: "ink" as BrandColor,
  /** The mark's width as a share of the tile's side. Keeps the mark inside a maskable icon's safe zone. */
  markWidth: 0.6,
};

/** The mark's height in px at each size. `lg` is the login page's. */
export const LOGOMARK_SIZES = { sm: 20, md: 24, lg: 28, xl: 64 } as const;
export type LogomarkSize = keyof typeof LOGOMARK_SIZES;

/** Never smaller than this, in px. */
export const LOGOMARK_MIN_SIZE = 16;

/**
 * The lockup, from the login page (a 28px mark, a 6px gap, the wordmark at
 * 24px): the wordmark's font size and the gap as shares of the mark's height.
 */
export const LOCKUP = {
  wordmark: "Prodlog",
  fontSize: 24 / 28,
  gap: 6 / 28,
};

/**
 * The wordmark as outlines, for files that cannot rely on the font (the
 * email logo, other repos): "Prodlog" in Outfit 400 with the lockup's
 * -0.07em letter-spacing, extracted once from the font (OFL). Units are
 * 1/1000 em; the baseline sits at y = ASCENDER, y grows downward. The DOM
 * lockup (`Logo`) sets the same word as live text in `font-wordmark`.
 */
export const WORDMARK_OUTLINE = {
  unitsPerEm: 1000,
  ascender: 1000,
  descender: -260,
  /** The ink's right edge; the CSS box ends 4 units earlier, after the trailing letter-spacing. */
  width: 3021,
  d: "M340 730L145 730L145 648L334 648Q373 648 403.50 632Q434 616 451.50 587Q469 558 469 518Q469 478 451.50 449Q434 420 403.50 404Q373 388 334 388L145 388L145 306L340 306Q404 306 454.50 332Q505 358 534.50 405.50Q564 453 564 518Q564 582 534.50 629.50Q505 677 454.50 703.50Q404 730 340 730M176 1000L82 1000L82 306L176 306M692 1000L602 1000L602 525L692 525L692 1000M692 729L658 714Q658 623 700 569Q742 515 821 515Q857 515 886 527.50Q915 540 940 569L881 630Q866 614 848 607Q830 600 806 600Q756 600 724 632Q692 664 692 729M1135 1010Q1065 1010 1009 977Q953 944 920 887.50Q887 831 887 761Q887 692 920 636.50Q953 581 1009 548Q1065 515 1135 515Q1204 515 1260.50 547.50Q1317 580 1350 636Q1383 692 1383 761Q1383 831 1350 887.50Q1317 944 1260.50 977Q1204 1010 1135 1010M1135 923Q1180 923 1215 902Q1250 881 1270 844.50Q1290 808 1290 761Q1290 715 1269.50 679Q1249 643 1214.50 622.50Q1180 602 1135 602Q1090 602 1055 622.50Q1020 643 1000 679Q980 715 980 761Q980 808 1000 844.50Q1020 881 1055 902Q1090 923 1135 923M1615 1010Q1549 1010 1497 977.50Q1445 945 1414.50 889Q1384 833 1384 763Q1384 693 1414.50 637Q1445 581 1497 548Q1549 515 1615 515Q1668 515 1711 537.50Q1754 560 1780.50 599.50Q1807 639 1810 691L1810 834Q1807 885 1781 925Q1755 965 1712 987.50Q1669 1010 1615 1010M1630 925Q1675 925 1708.50 904Q1742 883 1761 846.50Q1780 810 1780 763Q1780 714 1760.50 678Q1741 642 1707.50 621Q1674 600 1629 600Q1584 600 1550 621Q1516 642 1496.50 678.50Q1477 715 1477 762Q1477 810 1496.50 846.50Q1516 883 1550.50 904Q1585 925 1630 925M1865 286L1865 1000L1774 1000L1774 872L1791 756L1774 641L1774 286M2016 1000L1926 1000L1926 286L2016 286M2295 1010Q2225 1010 2169 977Q2113 944 2080 887.50Q2047 831 2047 761Q2047 692 2080 636.50Q2113 581 2169 548Q2225 515 2295 515Q2364 515 2420.50 547.50Q2477 580 2510 636Q2543 692 2543 761Q2543 831 2510 887.50Q2477 944 2420.50 977Q2364 1010 2295 1010M2295 923Q2340 923 2375 902Q2410 881 2430 844.50Q2450 808 2450 761Q2450 715 2429.50 679Q2409 643 2374.50 622.50Q2340 602 2295 602Q2250 602 2215 622.50Q2180 643 2160 679Q2140 715 2140 761Q2140 808 2160 844.50Q2180 881 2215 902Q2250 923 2295 923M2771 1209Q2698 1209 2641.50 1182Q2585 1155 2551 1106L2609 1047Q2638 1084 2678 1103.50Q2718 1123 2773 1123Q2846 1123 2888.50 1084.50Q2931 1046 2931 981L2931 863L2947 756L2931 650L2931 525L3021 525L3021 981Q3021 1049 2989.50 1100Q2958 1151 2901.50 1180Q2845 1209 2771 1209M2771 992Q2706 992 2654.50 961Q2603 930 2573 875.50Q2543 821 2543 753Q2543 685 2573 631.50Q2603 578 2654.50 546.50Q2706 515 2771 515Q2827 515 2870 537Q2913 559 2938.50 598.50Q2964 638 2966 691L2966 817Q2963 869 2937.50 908.50Q2912 948 2869 970Q2826 992 2771 992M2789 907Q2833 907 2866.50 888Q2900 869 2918 834.50Q2936 800 2936 754Q2936 708 2917.50 673.50Q2899 639 2866 619.50Q2833 600 2788 600Q2743 600 2709 619.50Q2675 639 2655.50 673.50Q2636 708 2636 753Q2636 798 2655.50 833Q2675 868 2709.50 887.50Q2744 907 2789 907",
};

export interface LogomarkLayout {
  /** The SVG viewBox. */
  viewBox: string;
  width: number;
  height: number;
  /** Present for the tile: the square behind the mark, in viewBox units. */
  tile: { size: number; color: BrandColor } | null;
  /** Places the strips (drawn in the LOGOMARK_WIDTH box) inside the viewBox. */
  transform: string | null;
}

const round = (n: number) => Math.round(n * 1000) / 1000;

export interface LockupLayout {
  viewBox: string;
  width: number;
  height: number;
  /** Places WORDMARK_OUTLINE beside the strips. */
  wordmarkTransform: string;
}

/**
 * The lockup in the strips' units (the mark LOGOMARK_HEIGHT tall), laid out
 * the way the DOM does it: the wordmark at LOCKUP.fontSize with
 * line-height 1, centered on the mark, LOCKUP.gap after it.
 */
export function lockupLayout(): LockupLayout {
  const fontSize = LOGOMARK_HEIGHT * LOCKUP.fontSize;
  const scale = fontSize / WORDMARK_OUTLINE.unitsPerEm;
  const x = LOGOMARK_WIDTH + LOGOMARK_HEIGHT * LOCKUP.gap;
  const content = (WORDMARK_OUTLINE.ascender - WORDMARK_OUTLINE.descender) * scale;
  const y = (LOGOMARK_HEIGHT - fontSize) / 2 + (fontSize - content) / 2;
  const width = Math.ceil(x + WORDMARK_OUTLINE.width * scale);
  return {
    viewBox: `0 0 ${width} ${LOGOMARK_HEIGHT}`,
    width,
    height: LOGOMARK_HEIGHT,
    wordmarkTransform: `translate(${round(x)} ${round(y)}) scale(${round(scale)})`,
  };
}

/** Where the strips sit for a variant. Every renderer, DOM, PDF and static file, uses this. */
export function logomarkLayout(variant: LogomarkVariant): LogomarkLayout {
  if (variant === "strips") {
    return { viewBox: `0 0 ${LOGOMARK_WIDTH} ${LOGOMARK_HEIGHT}`, width: LOGOMARK_WIDTH, height: LOGOMARK_HEIGHT, tile: null, transform: null };
  }
  if (variant === "square") {
    const offset = round((LOGOMARK_WIDTH - LOGOMARK_HEIGHT) / 2);
    return {
      viewBox: `0 0 ${LOGOMARK_WIDTH} ${LOGOMARK_WIDTH}`,
      width: LOGOMARK_WIDTH,
      height: LOGOMARK_WIDTH,
      tile: null,
      transform: `translate(0 ${offset})`,
    };
  }
  const side = 1000;
  const scale = (side * TILE.markWidth) / LOGOMARK_WIDTH;
  const x = round((side - LOGOMARK_WIDTH * scale) / 2);
  const y = round((side - LOGOMARK_HEIGHT * scale) / 2);
  return {
    viewBox: `0 0 ${side} ${side}`,
    width: side,
    height: side,
    tile: { size: side, color: TILE.color },
    transform: `translate(${x} ${y}) scale(${round(scale)})`,
  };
}
