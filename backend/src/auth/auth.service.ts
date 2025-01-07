import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Fonction pour valider l'utilisateur
  async validateUser(username: string, password: string): Promise<any> {
    // Exemple : recherche de l'utilisateur en base de données
    const user = { id: 1, username: 'user', password: await bcrypt.hash('password', 10) }; // Simulez un utilisateur
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      const { password, ...result } = user; // Exclut le mot de passe du résultat
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // Fonction pour générer un token JWT
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
