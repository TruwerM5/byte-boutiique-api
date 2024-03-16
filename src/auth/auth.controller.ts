import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SignUpUserDto } from 'src/users/dto/user-signup.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/role.enum';
import { RolesGuard } from 'src/users/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    @HttpCode(200)
    async login(@Request() req): Promise<any> {
        console.log("User: ", req.user);
        return this.authService.login(req.user);
    }


    @Post("signup")
    async signUp(@Body() body: SignUpUserDto):Promise<any> {
        const user = await this.usersService.signUp(body);
        if(user) {
            return this.authService.login(user);
        }
        
    }

    
    @Post("admin")
    @Roles(Role.Admin)
    @UseGuards(LocalAuthGuard,RolesGuard)
    create(@Body() body, @Req() req) {
        return 'user is created';
    }
}
