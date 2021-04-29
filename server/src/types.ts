import { Request, Response } from "express";

export type MyContext = {
    user: {
        id: String,
        role: String[]
    },
    req: Request,
    res: Response,
}

