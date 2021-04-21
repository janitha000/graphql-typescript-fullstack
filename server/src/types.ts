import { Request, Response } from "express";

export type MyContext = {
    auth: String,
    req: Request,
    res: Response
}