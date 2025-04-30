import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Import the User entity
import { UserService } from './user.service'; // Import the UserService

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User entity with TypeORM
  providers: [UserService], // Register the UserService
  exports: [UserService], // Export UserService to be used in other modules
})
export class UserModule {}
