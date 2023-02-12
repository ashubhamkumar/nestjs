import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

interface IUser {
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAllUser() {
    return this.prisma.user.findMany();
  }

  findUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async createuser(user: IUser) {
    const email = await this.findUserByEmail(user.email);

    if (email) {
      return {
        msg: 'Email already exists',
      };
    }

    return this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
  }

  async updateUser(email: string, data: IUser) {
    const user = await this.findUserByEmail(email);

    if (!user) {
      return {
        msg: 'No user found with the email provided',
      };
    }

    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        name: data.name,
      },
    });
  }
}
