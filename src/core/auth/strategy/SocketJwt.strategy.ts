import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

export class SocketJwtStrategy extends PassportStrategy(Strategy) {
    
}