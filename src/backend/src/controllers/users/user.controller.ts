import { Controller, Route, Post, Body, Get, Tags, Security } from "tsoa";
import { User } from "./user.type";
import jwt from 'jsonwebtoken';
import { user } from "../../data.fake";

@Tags("Users")
@Route('/users')
export class UserController extends Controller {
    @Post('/signup')
    public async signup(@Body() body: {
        email: string,
        password: string,
        firstName: string,
        lastName: string,
    }): Promise<User> {
        return jwt.sign(
            user, 'secret', { expiresIn: '1h' }
        )
    }

    @Post('/login')
    public async login(
        @Body() body: {
            email: string,
            password: string,
        }
    ): Promise<string> {
        return jwt.sign(
            user, 'secret', { expiresIn: '1h' }
        )
    }
}