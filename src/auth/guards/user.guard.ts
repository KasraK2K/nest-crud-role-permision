import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyName } from '../enums/strategy.enum';

@Injectable()
export class UserGuard extends AuthGuard(StrategyName.USER) {}
