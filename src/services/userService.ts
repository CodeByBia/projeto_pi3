// src/services/userService.ts
// Serviço para manipulação do usuário fixo
import { parseClient } from './parseClient';

export type User = {
  id: string;
  name: string;
  email: string;
};

export const userService = {
  async getUser(): Promise<User> {
    const res = await fetch('/api/user', { method: 'GET' });
    if (!res.ok) {
      console.error('Erro ao buscar usuário:', res.status, await res.text());
      return { id: '', name: '', email: '' };
    }
    return await res.json();
  },
  async updateUser(data: Partial<User>) {
    const res = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Erro ao atualizar usuário:', res.status, err);
      throw new Error('Erro ao atualizar usuário: ' + err);
    }
    return await res.json();
  },
};
