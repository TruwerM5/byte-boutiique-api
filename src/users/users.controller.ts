import { Body, Controller, Get, Param, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':email')
    async findByEmail(@Param() params: any, @Res() res: Response): Promise<Response> {
        console.log("Email: ", params.email);
        const user = await this.usersService.findOne(params.email);
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.json(user);
    }
    
}
