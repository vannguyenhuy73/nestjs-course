import { NextFunction, Request, Response } from "express";

export function RoleSwaggerMiddleware(req:Request, res:Response, next:NextFunction){
    req.headers.username = 'admin';
    return next();
}