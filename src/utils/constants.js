import yellowstone from "../images/yellowstone.jpg";
import forest from "../images/forest.jpg";
import city from "../images/city.jpg";
import space from "../images/space.jpg";
import technology from "../images/technology.jpg";
import festival from "../images/festival.jpg";

// Stand-in for the `articles` array from News API GET /v2/everything.
// Local images stand in for the remote `urlToImage` URLs.
const newsArticles = [
  {
    source: { id: null, name: "Treehugger" },
    author: "Morgan Ellis",
    title: "Everyone Needs a Special Sit Spot in Nature",
    description:
      "Ever since I read Richard Louv's book, \"Last Child in the Woods,\" the idea of having a special place to sit in nature has stuck with me. This place is more than a view. It is where the latest week outside starts to feel familiar.",
    url: "https://example.com/articles/sit-spot",
    urlToImage: forest,
    publishedAt: "2020-11-04T12:00:00Z",
    content:
      "Ever since I read Richard Louv's book, \"Last Child in the Woods,\" the idea of having a special place to sit in nature has stuck with me. [+128 chars]",
  },
  {
    source: { id: "national-geographic", name: "National Geographic" },
    author: "Alex Rivera",
    title: "Nature makes you better",
    description:
      "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way a park holds the latest light of the day.",
    url: "https://example.com/articles/nature-makes-you-better",
    urlToImage: yellowstone,
    publishedAt: "2020-02-19T12:00:00Z",
    content:
      "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest. [+78 chars]",
  },
  {
    source: { id: "national-geographic", name: "National Geographic" },
    author: "Alex Rivera",
    title: "Grand Teton National Park",
    description:
      "Grand Teton National Park saves one of the most dramatic mountain landscapes in North America. The latest trails open onto lakes, wildlife, and the quiet people look for in nature.",
    url: "https://example.com/articles/grand-teton",
    urlToImage: yellowstone,
    publishedAt: "2020-10-12T12:00:00Z",
    content:
      "Grand Teton National Park saves one of the most dramatic mountain landscapes in North America. The latest trails open onto lakes. [+92 chars]",
  },
  {
    source: { id: "associated-press", name: "Associated Press" },
    author: "Jordan Hale",
    title: "Las Vegas Is Where Electric Cars Go to Recharge",
    description:
      "The latest charging stations in the desert city are turning a long drive into a short stop. Reporters followed the cars, the lines, and the people waiting between them.",
    url: "https://example.com/articles/las-vegas-electric",
    urlToImage: city,
    publishedAt: "2020-08-03T12:00:00Z",
    content:
      "The latest charging stations in the desert city are turning a long drive into a short stop. Reporters followed the cars. [+74 chars]",
  },
  {
    source: { id: null, name: "Science Daily" },
    author: "Priya Shah",
    title: "A New Telescope Opens the Week in the Sky",
    description:
      "Astronomers published the latest images from a telescope built to watch faint galaxies. The report reads like a field notebook from a place no one can visit.",
    url: "https://example.com/articles/new-telescope",
    urlToImage: space,
    publishedAt: "2020-06-21T12:00:00Z",
    content:
      "Astronomers published the latest images from a telescope built to watch faint galaxies. The report reads like a field notebook. [+48 chars]",
  },
  {
    source: { id: "the-verge", name: "The Verge" },
    author: "Casey Nguyen",
    title: "What a Kitchen Robot Can Learn in a Week",
    description:
      "Engineers spent the latest week teaching a robot to chop, stir, and wait. The technology is ordinary until it has to share a counter with a person.",
    url: "https://example.com/articles/kitchen-robot",
    urlToImage: technology,
    publishedAt: "2020-09-15T12:00:00Z",
    content:
      "Engineers spent the latest week teaching a robot to chop, stir, and wait. The technology is ordinary until it has to share a counter. [+22 chars]",
  },
  {
    source: { id: "the-guardian", name: "The Guardian" },
    author: null,
    title: "Street Festivals Return to the Calendar",
    description:
      "Cities posted the latest weekend lineups, and the streets filled in again. Food, music, and a crowd that had been waiting for a reason to stay out.",
    url: "https://example.com/articles/street-festivals",
    urlToImage: festival,
    publishedAt: "2020-07-08T12:00:00Z",
    content:
      "Cities posted the latest weekend lineups, and the streets filled in again. Food, music, and a crowd that had been waiting. [+36 chars]",
  },
];

export default newsArticles;
