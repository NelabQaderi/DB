// jwt.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your own secret key
      // signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  exports: [JwtModule],
})
export class JwtAuthModule {}
