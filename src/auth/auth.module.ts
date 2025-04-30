import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module'; // Import UserModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Register User entity with TypeORM
    PassportModule.register({ defaultStrategy: 'jwt' }), // Register Passport with JWT strategy
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret', // Use environment variable for secret
      signOptions: { expiresIn: '7d' }, // Set token expiration to 7 days
    }),
    UserModule, // Make sure UserModule is available to manage users if needed
  ],
  providers: [
    AuthService, // The service that handles authentication logic
    AuthResolver, // GraphQL resolver for authentication
    JwtStrategy, // Strategy for JWT authentication
  ],
  exports: [JwtStrategy], // Export JwtStrategy to use in other modules if needed
})
export class AuthModule {}
