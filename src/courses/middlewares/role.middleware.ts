import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class RoleMiddleware implements NestMiddleware {
    use(req:Request, res:Response, next: NextFunction){
        let headers = req.headers;
        // req.headers.username = 'admin';
        if(!headers.username || headers.username !== 'admin'){
            throw new UnauthorizedException();
        }
        
        return next();
        // throw new UnauthorizedException();
    }
}