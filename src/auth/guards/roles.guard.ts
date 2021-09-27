import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExtractJwt } from 'passport-jwt';
import { IPayload } from '../interfaces/payload.interface';
import jwt_decode from 'jwt-decode';
import { UserPermissionsEnum } from '../enums/permission.enum';
import { UserType } from 'src/common/enums/general.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    const payload: IPayload = jwt_decode(token);
    const roles: UserType[] = this.reflector.get<UserType[]>(
      'roles',
      context.getHandler(),
    );
    const permissions = this.reflector.get<UserPermissionsEnum[]>(
      'permissions',
      context.getHandler(),
    );
    const user = request.user;

    // ─── CHECK SOME CONDITIONS ───────────────────────────────────────
    // if (payload.type === UserType.ADMIN && user.isSuperuser) return true;

    if (!user.active) throw new ForbiddenException('You account is not active');

    if (!roles.includes(payload.role))
      throw new ForbiddenException('You cant access this role');

    let hasPermission = false;
    if (payload.role === UserType.USER) {
      for (const permission of permissions) {
        if (user.permissions.includes(permission)) hasPermission = true;
      }
    }

    if (!hasPermission)
      throw new ForbiddenException('You cant access this permission');

    // ─── RETURN CAN ACTIVATE OR NOT ──────────────────────────────────
    return true;
  }
}
