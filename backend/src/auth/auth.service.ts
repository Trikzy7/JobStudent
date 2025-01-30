import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, @InjectModel(User.name) private userModel: Model<User>) {}

  // Fonction pour valider l'utilisateur
  async validateUser(email: string, password: string): Promise<any> {
    // Exemple : recherche de l'utilisateur en base de données
    
    const existingUser = await this.userModel.findOne({ email: email });
    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    } 

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (existingUser && isPasswordValid) {
      const { password, ...result } = existingUser; // Exclut le mot de passe du résultat
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // Fonction pour générer un token JWT
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
