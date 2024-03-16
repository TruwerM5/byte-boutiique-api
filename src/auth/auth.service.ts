import { Injectable, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        ) {}

    async validateUser(username: string, rawpass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        
        if(!user) {
            return null;
        }
        const isMatchPass = await bcrypt.compare(rawpass, user.hash);
        
        if(isMatchPass) {
            const {hash, ...result} = user;
            return result;
        }

        return null;
    }

    async login(user: any): Promise<any> {
        console.log(user);
        const payload = {username: user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
