import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy, JwtStrategy],
  imports: [UserModule, PassportModule,     
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'), 
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService], 
    }),
  ]
})
export class AuthModule {}
