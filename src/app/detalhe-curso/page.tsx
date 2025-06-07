"use client";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { courseService } from "../../services/courseService";
import { enrollmentService } from "../../services/enrollmentService";

const details = {
  title: "Introdução ao Turismo Cultural no Brasil",
  description:
    "Os participantes aprenderão sobre a importância da valorização da cultura local, técnicas de mediação cultural, e como oferecer experiências autênticas para visitantes. Ideal para quem atua como guia turístico, agente de turismo ou profissional de eventos culturais.",
  infos: [
    { icon: "flag", color: "bg-red-100 text-red-700", label: "8 Horas" },
    { icon: "assignment", color: "bg-blue-100 text-blue-700", label: "Exercícios ao final das aulas" },
    { icon: "category", color: "bg-yellow-100 text-yellow-700", label: "Turismo e Cultura" },
    { icon: "event", color: "bg-green-100 text-green-700", label: "Data de início: 15/05/2025" },
    { icon: "link", color: "bg-blue-100 text-blue-700", label: "Material de apoio: Link" },
  ],
  image: "/file.svg", // Substitua pelo caminho correto da imagem do curso
  teacher: {
    name: "Vako Shvili",
    desc: "Complete Web Design: from Figma to Webflow to Freelancing",
    avatar: "/file.svg", // Substitua pelo caminho correto do avatar
  },
};

export default function DetalheCurso() {
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aula1, setAula1] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [progresso, setProgresso] = useState("");
  const params = useParams();
  const courseId = Array.isArray(params?.id) ? params.id[0] : params?.id || ""; // Supondo rota /detalhe-curso/[id]
  const router = useRouter();

  useEffect(() => {
    async function fetchEnrollmentId() {
      if (!courseId) return;
      const res = await fetch('/api/enrollments', { method: 'GET' });
      const enrollments = await res.json();
      console.log('enrollments recebidos:', enrollments); // debug
      // Busca a inscrição do usuário para este curso
      const enrollment = enrollments.find((e: any) =>
        (e.course?.objectId === courseId) || (e.course?.id === courseId)
      );
      if (enrollment) {
        setEnrollmentId(enrollment.id || enrollment.objectId);
        setAula1(!!enrollment.aula1);
        setProgresso(enrollment.progresso || "");
      } else {
        setEnrollmentId(null);
      }
    }
    fetchEnrollmentId();
  }, [courseId]);

  async function handleEnroll() {
    setLoading(true);
    await courseService.enroll(courseId);
    setEnrolled(true);
    setLoading(false);
  }
  async function handleUnenroll() {
    setLoading(true);
    await courseService.unenroll(courseId);
    setEnrolled(false);
    setLoading(false);
  }
  async function handleAula1Change(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    setAula1(checked);
    if (enrollmentId) {
      await enrollmentService.updateAula1(enrollmentId, checked);
    }
  }
  async function handleFinalizar() {
    if (enrollmentId) {
      try {
        await enrollmentService.updateProgresso(enrollmentId, "Feito");
        setProgresso("Feito");
        alert("Parabéns! Você concluiu o curso.");
        router.push("/");
      } catch (err) {
        console.error("Erro ao finalizar curso:", err);
        alert("Erro ao finalizar curso: " + (err instanceof Error ? err.message : JSON.stringify(err)));
      }
    } else {
      alert("Nenhuma inscrição encontrada para este curso.");
      console.error("enrollmentId não encontrado para o curso", courseId);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#eae5e0]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userName="Paula" />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm p-8">
            <div className="h-8 rounded-t-xl mb-6 bg-gradient-to-r from-green-800 to-green-300" />
            <h2 className="text-2xl font-bold text-center mb-2 text-black">{details.title}</h2>
            <p className="text-center text-gray-700 mb-8">{details.description}</p>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex flex-col gap-3 w-full md:w-1/2">
                {details.infos.map((info, i) => (
                  <div key={i} className="flex items-center gap-2 border rounded px-3 py-2 bg-gray-50">
                    <span className={`material-icons ${info.color}`}>{info.icon}</span>
                    <span className="text-sm text-black">{info.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center w-full md:w-1/2">
                <img src={details.image} alt="Curso" className="rounded-lg w-56 h-40 object-cover mb-2" />
                <div className="text-center text-xs text-gray-700 mt-2">
                  Essa é a sua primeira aula <b className="text-black">{details.teacher.name}</b>!<br />
                  {details.teacher.desc}
                </div>
                <div className="mt-6 flex flex-col items-center">
                  <label className="flex items-center gap-2 text-black">
                    <input
                      type="checkbox"
                      checked={aula1}
                      onChange={handleAula1Change}
                      className="accent-green-600 w-5 h-5"
                    />
                    Aula 1
                  </label>
                  <button
                    className={`mt-4 px-8 py-2 rounded text-white font-semibold text-lg ${aula1 ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
                    disabled={!aula1 || progresso === "Feito"}
                    onClick={handleFinalizar}
                  >
                    {progresso === "Feito" ? "Curso Finalizado" : "Finalizar Curso"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
