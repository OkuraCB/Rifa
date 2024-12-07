import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtLoader from 'src/config/loaders/jwtLoader';

export interface JwtPayload {
  sub: number;
  username: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtLoader().jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const { sub, username, email, role } = payload;
    return { userId: sub, username, email, role };
  }
}
