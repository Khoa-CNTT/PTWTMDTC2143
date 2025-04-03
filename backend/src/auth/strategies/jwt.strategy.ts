import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { Payload } from '../interfaces/payload.interface';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtConfiguration: ConfigType<typeof jwtConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  validate(payload: Payload) {
    return payload;
  }
}
