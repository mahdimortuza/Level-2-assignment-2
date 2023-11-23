// import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
const app = express();

const port = 3000;

//parsers
app.use(express.json());
// app.use(cors());

const userRouter = express.Router();

// retrieve a list of all users
app.get(
  "/api/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(something);
    } catch (error) {
      next(error);
    }
  }
);

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
});

// not found route
// app.all("*", (req: Request, res: Response) => {
//   res.status(400).json({
//     success: false,
//     message: "route not found",
//   });
// });

// retrieve a specific user by ID
app.get("/api/users/:userId", (req: Request, res: Response) => {
  console.log(req.params);
  res.json("got single user");
});

// create a new user
app.post("/api/users", (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ message: "created successfully" });
});

export default app;
