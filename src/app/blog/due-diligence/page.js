"use client";
import React from "react";
import Link from "next/link";

export default function BlogDueDiligencePage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-lime-500 selection:text-black">
      
      {/* 🌐 NAVBAR */}
      <header className="px-6 py-6 max-w-7xl mx-auto flex items-center justify-between border-b border-gray-900/80">
        <Link href="/" className="flex items-center gap-3">
  <img src="/logo.png" alt="Footpryx Logo" className="w-8 h-8 rounded-lg object-cover border border-gray-800" />
  <span className="text-xl font-extrabold tracking-wider text-white">footpryx</span>
</Link>
        
        <Link href="/" className="text-xs text-gray-400 hover:text-white transition">
          ← Back to site
        </Link>
      </header>

      {/* 📖 BLOG CONTENT CONTAINER */}
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-12 text-gray-300 text-sm leading-relaxed">
        
        {/* Header Badge & Title */}
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-md bg-lime-950/60 border border-lime-500/30 text-lime-400 text-[10px] font-bold uppercase tracking-widest">
            INVESTIGATION
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            OSINT para Due Diligence: Checklist Completo de Investigação
          </h1>
          <p className="text-xs text-gray-500 font-mono">Published in May 2026 · 15 min read</p>
        </div>

        {/* Intro */}
        <p className="text-base text-gray-300">
          A análise de Due Diligence é fundamental para mitigar riscos reputacionais, regulatórios e financeiros. A inteligência de fontes abertas (OSINT) permite verificar a veracidade de informações corporativas, histórico de sócios e conexões ocultas.
        </p>

        {/* Highlight Box (PONTOS CHAVE) */}
        <div className="bg-gray-950/90 border-l-4 border-lime-500 p-6 rounded-r-2xl space-y-3">
          <h4 className="text-xs font-bold text-lime-400 uppercase tracking-wider">PONTOS CHAVE</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-lime-400 font-bold">•</span>
              <span>A validação do CNPJ deve se estender à estrutura societária (QSA) e beneficiários finais.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400 font-bold">•</span>
              <span>Cruzamento de CPFs de executivos revela conflitos de interesse e empresas ocultas.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400 font-bold">•</span>
              <span>Uso do <strong>footpryx</strong> automatiza o dossiê com mapas de vínculos e relatórios auditáveis.</span>
            </li>
          </ul>
        </div>

        {/* Section 1: Introduction to Due Diligence */}
        <div className="space-y-4 pt-6 border-t border-gray-900">
          <h2 className="text-2xl font-bold text-white">Por que fazer Due Diligence com OSINT?</h2>
          <p>
            Processos tradicionais de due diligence dependem apenas de certidões públicas e registros cartorários. O OSINT vai além, analisando a pegada digital completa da empresa e de seus executivos nas redes sociais, bases de vazamentos, domínios e registros globais.
          </p>
        </div>

        {/* Horizontal Bar Chart Section */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-bold text-lime-400 uppercase tracking-widest text-center">
            REDUÇÃO DE RISCO COM COMPLIANCE OSINT
          </h3>
          
          <div className="space-y-3 pt-2 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Fraudes Societárias Detectadas</span>
                <span className="text-lime-400 font-mono">92%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden">
                <div className="bg-lime-500 h-full rounded-full w-[92%]"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Conflitos de Interesse Revelados</span>
                <span className="text-lime-400 font-mono">78%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden">
                <div className="bg-lime-500 h-full rounded-full w-[78%]"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Economia de Tempo Operacional</span>
                <span className="text-lime-400 font-mono">85%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden">
                <div className="bg-lime-500 h-full rounded-full w-[85%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Checklist Items */}
        <div className="space-y-6 pt-6 border-t border-gray-900">
          <h2 className="text-2xl font-bold text-white">Checklist de 12 Pontos de Verificação</h2>
          
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-gray-950 border border-gray-800/80 rounded-2xl space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-mono">01.</span> Validação de Registro CNPJ / Cadastral
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Verifique a situação cadastral ativa, endereço fiscal real e código de atividade econômica principal (CNAE).
              </p>
            </div>

            <div className="p-4 bg-gray-950 border border-gray-800/80 rounded-2xl space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-mono">02.</span> Mapeamento de Quadro Societário (QSA)
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Cruze os CPFs dos sócios para identificar participações em outras empresas do mesmo setor ou empresas-fantasma.
              </p>
            </div>

            <div className="p-4 bg-gray-950 border border-gray-800/80 rounded-2xl space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-mono">03.</span> Auditoria de Domínio e Infraestrutura Web
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Analise histórico Whois, data de criação do site, certificados SSL e subdomínios expostos.
              </p>
            </div>

            <div className="p-4 bg-gray-950 border border-gray-800/80 rounded-2xl space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-mono">04.</span> Verificação de E-mails Corporativos em Vazamentos
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Identifique se senhas e e-mails institucionais foram expostos em vazamentos de dados conhecidos.
              </p>
            </div>
          </div>
        </div>

        {/* Circular Donut Graphic Section */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 text-center space-y-6">
          <h3 className="text-sm font-bold text-white">Cobertura de Análise de Risco Corporativo</h3>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-36 h-36 rounded-full border-8 border-lime-500 border-t-gray-800 flex items-center justify-center relative shadow-lg shadow-lime-500/10">
              <div className="text-center">
                <span className="text-2xl font-extrabold text-lime-400 font-mono">100%</span>
                <p className="text-[9px] text-gray-400 uppercase">Auditável</p>
              </div>
            </div>

            <div className="text-xs text-gray-400 max-w-sm">
              Cada evidência coletada pelo footpryx possui timestamp, URL de origem e hash para garantia de integridade em processos judiciais.
            </div>
          </div>
        </div>

        {/* Section 3: FAQ Block */}
        <div className="space-y-4 pt-6 border-t border-gray-900">
          <h2 className="text-2xl font-bold text-white">Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-3 text-xs">
            <details className="bg-gray-950 border border-gray-800 p-4 rounded-xl cursor-pointer">
              <summary className="font-bold text-white">É legal utilizar OSINT em investigações de Due Diligence?</summary>
              <p className="mt-2 text-gray-400 leading-relaxed">
                Sim, o OSINT utiliza exclusivamente fontes públicas e dados abertos, em total conformidade com a LGPD e normas de compliance corporativo.
              </p>
            </details>

            <details className="bg-gray-950 border border-gray-800 p-4 rounded-xl cursor-pointer">
              <summary className="font-bold text-white">Como exportar relatórios para apresentação a diretores?</summary>
              <p className="mt-2 text-gray-400 leading-relaxed">
                O footpryx permite exportar relatórios em PDF com resumo executivo, gráficos de vínculo e lista detalhada de evidências.
              </p>
            </details>
          </div>
        </div>

        {/* Conclusion Callout (Bottom Green Box) */}
        <div className="bg-gradient-to-b from-gray-950 to-black border border-lime-500/40 rounded-3xl p-8 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Pronto para automatizar seus relatórios de Due Diligence?</h3>
            <p className="text-xs text-gray-400">
              Gere dossiês completos com marcação de tempo e vínculo de fontes em segundos com o <strong>footpryx</strong>.
            </p>
          </div>

          <div className="pt-2">
            <Link href="/auth/register">
              <button className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-8 py-3.5 rounded-xl text-xs transition shadow-lg shadow-lime-500/20">
                Iniciar Investigação Agora ➔
              </button>
            </Link>
          </div>
        </div>

      </main>

      {/* 🌐 FOOTER */}
      <footer className="border-t border-gray-900/80 py-8 text-center text-[10px] text-gray-600">
        © 2026 footpryx. All rights reserved.
      </footer>

    </div>
  );
}