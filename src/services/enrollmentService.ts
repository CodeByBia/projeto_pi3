// src/services/enrollmentService.ts
export interface Enrollment {
  id: string;
  course: { id: string; objectId?: string };
  aula1?: boolean;
  progresso?: string;
}

export const enrollmentService = {
  async updateAula1(enrollmentId: string, aula1: boolean): Promise<void> {
    await fetch(`/api/enrollments/${enrollmentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aula1 }),
    });
  },
  async updateProgresso(enrollmentId: string, progresso: string): Promise<void> {
    await fetch(`/api/enrollments/${enrollmentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progresso }),
    });
  },
//   async getEnrollment(enrollmentId: string): Promise<Enrollment> {
//     const res = await fetch(`/api/enrollments/${enrollmentId}`, { method: 'GET' });
//     if (!res.ok) throw new Error('Erro ao buscar inscrição');
//     return res.json();
//   },
// };
