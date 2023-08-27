import express, { response } from 'express';
import cors from 'cors';
import booksData from './data/books.json';
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
// const port = process.env.PORT || 9090;
const app = express();
// const listEndpoints = require('express-list-endpoints')
// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Middleware to handle 404 errors
const notFound = (req, res, next) => {
  res.status(404).send("Not found");
};

// Start defining your routes here. Adding path parameters.
// app.get("/", (req, res) => {
//   res.send("Hello Technigo!");
//   // res.json(listEndpoints(app))
// });

// DRY 
app.get("/books", (request, response) => {
    res.json(booksData);
});
// app.get("/", (req, res) => {
//   res.send("Find a new world!");
// });
  const books = booksData;
  if (books) {
    response.status(200).json({
      success: true,
      message: "ok",
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

app.get("/books/:id", (request, response) => { // Always treated as a string.
// app.get('/books/title/:title', (request, response) => { // Always treated as a string.  nu object
  // endpointen hämtar info från data. 
// return book._title === request.params.id
    const { id } = request.params;
    const singleBook = booksData.find((book) => {
      return book.bookID === Number(id); // making id from parameter a number.
    });
    // const { title } = request.query;
    // let books = booksData;

    if (singleBook) {
      response.status(200).json({
            success: true,
            message: "OK",
            body: {
              book: singleBook
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

      

      // app.get("/books/:id", (request, response) => {
      app.get("/books/authors/:authors", (request, response) => {
        // const { id } = request.params;
        const { author } = request.params;
        // const singleBook = booksData.find((book) => {
        const authorName = booksData.find((book) => {
        //   return book.bookID === Number(id);
        // });
          return book.authors === Number(author);
        });
        // if (singleBook) {
        if (authorName) {
          // response.status(200).json({
          //   success: true,
          //   message: "OK",
          //   body: {
          //     book: singleBook
          //   }
          // });
          response.status(200).json({
            success: true,
            message: "OK",
            body: {
              book: authorName
            }
          });
        } else {
      //     response.status(404).json({
      //       success: false,
      //       message: "Book not found",
      //       body: {}
      //     });
      //   }
      // });
          response.status(404).json({
            success: false,
            message: "Author not found",
            body: {}
          });
        }
      });

  //   books = booksData.filter((singleBook) => {
  //     return singleBook.title.toLowerCase() === title.LowerCase();
  //   });
  // }

  // if (books) {
  //   response.status(200).json({
  //     success: true,
  //     message: "OK",
  //     body: {
  //       booksData: books
  //     }
  //   });
  // } else {
  //   response.status(500).json({
  //   success: false,
  //     message: "Something went wrong",
  //     body: {}
  //   });
  // }
    // console.log("id: ", title)
    // const singleBook = booksData.find((book) => {
    // return book._title == id; // weak comp. not checking type.
    // return book._title.toString() === id;
    // return book._id === +id;
//   });
//   if (singleBook) {
//     response.status(200).json({
//       success: true,
//       message: "OK",
//       body: {
//         booksData: singleBook
//       }
//     })
//   } else {
//     response.status(404).json({
//     success: false,
//       message: "Book not found",
//       body: {}
//     });
//   }
// });

// get all technigo members
// app.get("/members", (req, res) => {
//   res.json(technigoMembers);
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
