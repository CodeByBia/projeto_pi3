// src/services/enrollmentService.ts
export type Enrollment = {
  id: string;
  courseId: string;
  usersId: string;
  aula1: boolean;
  progresso: string;
};

export const enrollmentService = {
  async updateAula1(enrollmentId: string, aula1: boolean) {
    const res = await fetch(`/api/enrollments/${enrollmentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aula1 }),
    });
    if (!res.ok) throw new Error('Erro ao atualizar aula1');
    return true;
  },
  async updateProgresso(enrollmentId: string, progresso: string) {
    const res = await fetch(`/api/enrollments/${enrollmentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progresso }),
    });
    if (!res.ok) throw new Error('Erro ao atualizar progresso');
    return true;
  },
};
