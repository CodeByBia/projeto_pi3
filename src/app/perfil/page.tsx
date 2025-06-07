"use client";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { userService } from "../../services/userService";

export default function PerfilPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("********");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getUser().then(user => {
      setNome(user.name);
      setEmail(user.email);
      setLoading(false);
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await userService.updateUser({ name: nome, email });
    setLoading(false);
    alert("Perfil salvo!");
  }

  function handleLogout() {
    alert("Logout realizado!");
  }

  return (
    <div className="min-h-screen flex bg-[#eae5e0]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userName="Alexa Rawles" />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          {loading ? (
            <div>Carregando...</div>
          ) : (
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm p-8">
              <div className="h-8 rounded-t-xl mb-6 bg-gradient-to-r from-green-800 to-green-300" />
              <h2 className="text-2xl font-bold mb-1 text-black">Esse é o seu Perfil</h2>
              <p className="text-gray-700 text-sm mb-8">Aqui você pode gerenciar suas informações.</p>
              <form onSubmit={handleSave} className="flex flex-col gap-8">
                <div className="flex items-center gap-6 mb-4">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-lg text-black">{nome}</div>
                    <div className="text-gray-700 text-sm">{email}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-sm font-medium text-black">Nome Completo</label>
                  <input
                    className="rounded-md border border-gray-300 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder="Nome Completo"
                  />
                  <label className="text-sm font-medium text-black">Email</label>
                  <input
                    className="rounded-md border border-gray-300 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                  />
                  <label className="text-sm font-medium text-black">Senha</label>
                  <input
                    className="rounded-md border border-gray-300 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    placeholder="Senha"
                    type="password"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-black">Salvar</button>
                </div>
              </form>
              <div className="flex items-center gap-2 mt-8">
                <button onClick={handleLogout} className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black">
                  <span className="material-icons">logout</span>
                </button>
                <span className="text-sm font-medium text-black">Sair</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
