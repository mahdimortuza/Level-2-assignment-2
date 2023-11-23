"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import cors from "cors";
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
//parsers
app.use(express_1.default.json());
// app.use(cors());
const userRouter = express_1.default.Router();
// retrieve a list of all users
app.get("/api/users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(something);
    }
    catch (error) {
        next(error);
    }
}));
// global error handler
app.use((error, req, res, next) => {
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
app.get("/api/users/:userId", (req, res) => {
    console.log(req.params);
    res.json("got single user");
});
// create a new user
app.post("/api/users", (req, res) => {
    console.log(req.body);
    res.json({ message: "created successfully" });
});
exports.default = app;
