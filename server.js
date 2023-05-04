import express from "express";
// import cors from "cors";
import booksData from "./data/books.json";
// import technigoMembers from "./data/technigo-members.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
// app.use(cors());
app.use(express.json());

// Start defining your routes here. Adding path parameters.
app.get("/books", (request, response) => {
  const { title } = request.query;
  let books = booksData;

  if (title) {
    books = booksData.filter((singleBook) => {
      return singleBook.title.toLowerCase() === title.LowerCase();
    });
  }

  if (books) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        booksData: books
      }
    });
  } else {
    response.status(500).json({
    success: false,
      message: "Something went wrong",
      body: {}
    });
  }
});

// DRY 
app.get("/books/:id", (request, response) => { // Always treated as a string.
    // return book._title === request.params.id
    const { id } = request.params;
    console.log("id: ", title)
    const singleBook = booksData.find((book) => {
    // return book._title == id; // weak comp. not checking type.
    return book._title === Number(id); // making id from parameter a number.
    // return book._title.toString() === id;
    // return book._id === +id;
  });
  if (singleBook) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        booksData: singleBook
      }
    });
  } else {
    response.status(404).json({
    success: false,
      message: "Book not found",
      body: {}
    });
  }
});

// get all technigo members
// app.get("/members", (req, res) => {
//   res.json(technigoMembers);
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
