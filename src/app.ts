// import cors from "cors";
import express, { Request, Response } from "express";
const app = express();

const port = 3000;

//parsers
app.use(express.json());
// app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ message: "received successfully" });
});

export default app;
