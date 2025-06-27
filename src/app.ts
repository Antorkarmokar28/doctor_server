import express, { Request, Response } from "express";
const app = express();

const testServer = async (req: Request, res: Response) => {
  res.send({ status: true, message: "Server is running" });
};

app.get("/", testServer);

export default app;
