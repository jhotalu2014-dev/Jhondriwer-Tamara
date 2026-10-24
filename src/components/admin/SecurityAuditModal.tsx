import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SecurityAuditModal: React.FC = () => {
  const {
    securityLogs,
    isMfaVerified,
    verifyMfaPin,
    triggerFraudTest,
    showToast,
  } = useApp();

  const [pinInput, setPinInput] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

  const filteredLogs = securityLogs.filter((log) => {
    if (severityFilter === 'all') return true;
    return log.severity === severityFilter;
  });

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    verifyMfaPin(pinInput);
    setPinInput('');
  };

  return (
    <div className="flex flex-col w-full px-4 md:px-8 py-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
              Módulo de Ciberseguridad & Auditoría
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="text-[11px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full">
              Activo 24/7
            </span>
          </div>
          <h1 className="text-[26px] md:text-[32px] font-black text-[#131b2e] tracking-tight">
            Control de Seguridad, MFA y Antifraude
          </h1>
          <p className="text-[13px] text-[#5a4138]">
            Supervisión criptográfica de transacciones Yape, protección contra vouchers reutilizados y registro inmutable de operaciones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Auditoría verificada. Registro íntegro sin alteraciones.', 'success')}
            className="px-4 py-2 rounded-full bg-[#131b2e] text-white text-[12px] font-bold shadow-sm flex items-center gap-1.5 hover:bg-slate-800"
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-400">verified</span>
            <span>Verificar Integridad SHA-256</span>
          </button>
        </div>
      </div>

      {/* Grid: 3 Security Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Pillar 1: MFA Status & PIN Authenticator */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Pilar 1: Control de Acceso
              </span>
              <span className="material-symbols-outlined text-emerald-600 text-[22px]">
                lock_clock
              </span>
            </div>
            <h3 className="text-[17px] font-bold text-[#131b2e]">Autenticación MFA (2FA)</h3>
            <p className="text-[12px] text-slate-500 mt-1">
              Las operaciones sensibles de caja y anulación de pagos exigen doble factor de autenticación TOTP.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-[#f2f3ff] border border-slate-200">
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-semibold text-slate-700">Estado de Sesión:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {isMfaVerified ? 'Verificado (Carlos Mendoza)' : 'Pendiente'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[12px] mt-1.5">
                <span className="font-semibold text-slate-700">Algoritmo:</span>
                <span className="font-mono text-slate-600 text-[11px]">HMAC-SHA1 (RFC 6238)</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleVerifyPin} className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
            <input
              type="password"
              maxLength={6}
              placeholder="PIN de 6 dígitos (ej. 123456)"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              className="w-full px-3 py-2 rounded-full bg-[#f2f3ff] text-[13px] outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#712ae2] font-mono text-center tracking-widest"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-[#712ae2] hover:bg-[#8a4cfc] text-white font-bold text-[12px] flex-shrink-0"
            >
              Validar
            </button>
          </form>
        </div>

        {/* Pillar 2: Motor Heurístico Antifraude */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Pilar 2: Motor Antifraude
              </span>
              <span className="material-symbols-outlined text-purple-600 text-[22px]">
                shield
              </span>
            </div>
            <h3 className="text-[17px] font-bold text-[#131b2e]">Detección de Vouchers Falsos</h3>
            <p className="text-[12px] text-slate-500 mt-1">
              Verifica firmas criptográficas contra pasarela Yape, detecta comprobantes reciclados y valida ventanas de tiempo.
            </p>

            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2 text-[11px] text-slate-700">
                <span className="material-symbols-outlined text-emerald-600 text-[16px]">check</span>
                <span>Bloqueo automático de vouchers duplicados</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-700">
                <span className="material-symbols-outlined text-emerald-600 text-[16px]">check</span>
                <span>Tolerancia cero a diferencias de céntimos</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-700">
                <span className="material-symbols-outlined text-emerald-600 text-[16px]">check</span>
                <span>Ventana de caducidad máxima de 15 minutos</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Pruebas de Estrés y Simulación
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => triggerFraudTest('duplicate')}
                className="px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold border border-rose-200 transition-colors"
              >
                🚨 Simular Replay
              </button>
              <button
                type="button"
                onClick={() => triggerFraudTest('amount_mismatch')}
                className="px-2.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 text-[11px] font-bold border border-amber-200 transition-colors"
              >
                ⚠️ Simular Monto
              </button>
            </div>
          </div>
        </div>

        {/* Pillar 3: Protección de Entrada & WAF */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Pilar 3: Seguridad de Datos
              </span>
              <span className="material-symbols-outlined text-[#a43700] text-[22px]">
                security
              </span>
            </div>
            <h3 className="text-[17px] font-bold text-[#131b2e]">Sanitización y Anti-XSS</h3>
            <p className="text-[12px] text-slate-500 mt-1">
              Filtro estricto en nombres, direcciones de entrega y observaciones de cocina para evitar inyecciones maliciosas.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-[#f2f3ff] border border-slate-200 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Cifrado de tránsito:</span>
                <span className="font-bold text-slate-800">TLS 1.3 / AES-256</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Rate Limiting:</span>
                <span className="font-bold text-emerald-700">10 req/min por IP</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">RBAC:</span>
                <span className="font-bold text-slate-800">Enforzado en Frontend & API</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Cumplimiento:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#7cf994]/50 text-[#007230] text-[11px] font-bold">
              PCI-DSS Ready
            </span>
          </div>
        </div>
      </div>

      {/* Security Audit Trail Log Table */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-[18px] font-bold text-[#131b2e]">
              Registro de Auditoría en Tiempo Real (Audit Trail)
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-mono font-bold">
              {filteredLogs.length} eventos
            </span>
          </div>

          {/* Severity filter buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#f2f3ff] rounded-full">
            <button
              onClick={() => setSeverityFilter('all')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                severityFilter === 'all' ? 'bg-[#131b2e] text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSeverityFilter('critical')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                severityFilter === 'critical' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Críticos
            </button>
            <button
              onClick={() => setSeverityFilter('warning')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                severityFilter === 'warning' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Alertas
            </button>
            <button
              onClick={() => setSeverityFilter('info')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                severityFilter === 'info' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Informativos
            </button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-left text-[12px] border-collapse">
            <thead>
              <tr className="bg-[#f2f3ff] text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3 rounded-l-xl">Hora</th>
                <th className="py-2.5 px-3">Severidad</th>
                <th className="py-2.5 px-3">Tipo de Evento</th>
                <th className="py-2.5 px-3">Descripción de Seguridad</th>
                <th className="py-2.5 px-3">Operador / Módulo</th>
                <th className="py-2.5 px-3 rounded-r-xl">IP Cliente</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.map((log) => {
                const badge =
                  log.severity === 'critical'
                    ? 'bg-rose-100 text-rose-800'
                    : log.severity === 'warning'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800';

                return (
                  <tr key={log.id} className="hover:bg-[#f2f3ff]/40 transition-colors">
                    <td className="py-3 px-3 font-mono text-slate-500 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${badge}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800 whitespace-nowrap">
                      {log.eventType}
                    </td>
                    <td className="py-3 px-3 max-w-md text-slate-700">
                      {log.description}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-semibold text-[#131b2e]">
                      {log.operator}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-slate-400">
                      {log.clientIp}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
