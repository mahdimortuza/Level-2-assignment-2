"use strict";
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
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.post("/", (req, res) => {
    console.log(req.body);
    res.json({ message: "received successfully" });
});
exports.default = app;
