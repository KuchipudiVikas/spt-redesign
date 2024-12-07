export type Product = {
  title: string;
  price: number;
  og_price: number;
  category: ProductCategory;
  description: string;
  buy_url: string;
  preview_url: string;
  thumb_url: string;
};

export const Categories = [
  "Education",
  "Book Education Tools",
  "Research Tools",
  "Book Listing Tools",
  "Design Tools",
  "General KDP Tools",
  "Training Tools",
];

export const allProducts: Product[] = [
  {
    title: "Titans Pro Amazon",
    price: 149,
    og_price: 200,
    category: "Research Tools",
    description: "Amazon suggestions, search volume, search results & more",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/titans%20pro%20web%20app%20.png",
  },
  {
    title: "Titans Deep view",
    price: 149,
    og_price: 200,
    category: "Research Tools",
    description:
      "Analyze 100 Products At Once, Niche Metrics, Sales Est., Key Metrics, Excel Download All Data",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/deep%20view.png",
  },
  {
    title: "7 backend keywords",
    price: 199,
    og_price: 200,
    category: "Research Tools",
    description: "Keyword research tool. The fast and easy way",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/7%20backend%20keywords.png",
  },
  {
    title: "Basic Plus Bundle",
    price: 298,
    og_price: 400,
    category: "Research Tools",
    description: "Titans Pro + Titans Deep View",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/7%20backend%20keywords.png",
  },
  {
    title: "Puzzle Tools",
    price: 89,
    og_price: 200,
    category: "Book Creation Tools",
    description: `The following tools are included with lifetime access and unlimited use:

Sudoku, Word Search, Crossword, Letter Maze, Shape Maze, Nonogram, Word Snake, Number Search, Word Scramble, Pontoon Grid, Kakuro, Cryptogram, Link Janitor, Hidato, Wordoku, Drawgrid, Letter Tracing, Bingo Card, Equation Solver, Cryptomaths, Cross Sums`,
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/puzzle3.png",
  },
  {
    title: "Creative Bundle",
    price: 547,
    og_price: 700,
    category: "Book Creation Tools",
    description: "Coloring Book Maker + All Puzzle Tools Bundle",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/7%20backend%20keywords.png",
  },
  {
    title: "Titans Retro view",
    price: 299,
    og_price: 350,
    category: "Research Tools",
    description: "This is a description",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/retro%20view.png",
  },
  {
    title: "Mega Bundle",
    price: 1810,
    og_price: 2000,
    category: "Research Tools",
    description: "This is a description",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/7%20backend%20keywords.png",
  },
  {
    title: "Book Listing Tools",
    price: 1029,
    og_price: 1200,
    category: "Research Tools",
    description: "The 7 New Author Tools Bundle Tool. The fast and easy way.",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/7%20backend%20keywords.png",
  },
  {
    title: "Mega Max Bundle",
    price: 3620,
    og_price: 4000,
    category: "Research Tools",
    description: "This is a description",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/7%20backend%20keywords.png",
  },
  {
    title: "KDP Title Creator",
    price: 100,
    og_price: 200,
    category: "Book Listing Tools",
    description: "KDP Title Creator Tool. The fast and easy way.",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/title%20creator.png",
  },
  {
    title: "Book Description Generator",
    price: 100,
    og_price: 200,
    category: "Book Listing Tools",
    description: "KDP Book Description Generator Tool. The fast and easy way.",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/7%20backend%20keywords.png",
  },
  {
    title: "Book Price Suggestion tool",
    price: 100,
    og_price: 200,
    category: "Book Listing Tools",
    description: "Book Price Suggestion Tool. The fast and easy way.",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/price%20checker.png",
  },
  {
    title: "Trademark Checker",
    price: 100,
    og_price: 200,
    category: "Book Listing Tools",
    description: "KDP Trademark Checker Tool. The fast and easy way.",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/trademark%20checker.png",
  },
  {
    title: "KDP Guidelines Checker",
    price: 100,
    og_price: 200,
    category: "Book Listing Tools",
    description: "KDP Guidelines Checker Tool. The fast and easy way.",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/7%20backend%20keywords.png",
  },
  {
    title: "Book Data Translator",
    price: 100,
    og_price: 200,
    category: "Book Listing Tools",
    description: "KDP Book Data Translator Tool. The fast and easy way.",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/7%20backend%20keywords.png",
  },
  {
    title: "Book Data Grammar Checker",
    price: 100,
    og_price: 200,
    category: "Book Listing Tools",
    description: "Grammar and Spell Checker Tool. The fast and easy way.",
    buy_url: "https://google.com",
    preview_url: "https://google.com",
    thumb_url:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/Screenshots/7%20backend%20keywords.png",
  },
];

export type ProductCategory = (typeof Categories)[number];
