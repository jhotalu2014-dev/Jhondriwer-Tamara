import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface TopNavigationProps {
  isMobileSimulator: boolean;
  setIsMobileSimulator: (val: boolean) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  isMobileSimulator,
  setIsMobileSimulator,
}) => {
  const {
    currentUserRole,
    setCurrentUserRole,
    activeView,
    setActiveView,
    isMfaVerified,
    securityLogs,
    orders,
  } = useApp();

  const pendingYapeCount = orders.filter((o) => o.status === 'pago_pendiente').length;
  const inKitchenCount = orders.filter((o) => o.status === 'en_cocina').length;

  return (
    <div className="bg-[#131b2e] text-[#faf8ff] border-b border-slate-700/60 px-3 py-2 z-50 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Brand & Security Badge */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#ce4700] flex items-center justify-center font-bold text-white text-[11px] shadow-sm">
            M
          </div>
          <span className="font-bold tracking-tight text-white text-sm">MORDISCO YA</span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-700/50 text-[10px] font-semibold">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
            Seguridad Activa • TLS & Anti-Fraude
          </span>
        </div>

        {/* View / Role Switcher Quick Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {/* Client Experience Button */}
          <button
            onClick={() => {
              setCurrentUserRole('cliente');
              setActiveView('client_catalog');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
              currentUserRole === 'cliente'
                ? 'bg-[#a43700] text-white shadow-sm font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">phone_iphone</span>
            <span>App Cliente</span>
          </button>

          {/* Admin Dashboard */}
          <button
            onClick={() => {
              setCurrentUserRole('admin');
              setActiveView('admin_dashboard');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
              currentUserRole === 'admin' && activeView === 'admin_dashboard'
                ? 'bg-[#a43700] text-white shadow-sm font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">dashboard</span>
            <span>Dashboard</span>
          </button>

          {/* Cashier Yape Validation */}
          <button
            onClick={() => {
              setCurrentUserRole('cajero');
              setActiveView('admin_yape');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
              activeView === 'admin_yape'
                ? 'bg-[#712ae2] text-white shadow-sm font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">qr_code_scanner</span>
            <span>Validar Yape</span>
            {pendingYapeCount > 0 && (
              <span className="bg-purple-400 text-purple-950 font-extrabold px-1.5 py-0.2 rounded-full text-[10px]">
                {pendingYapeCount}
              </span>
            )}
          </button>

          {/* Kitchen KDS */}
          <button
            onClick={() => {
              setCurrentUserRole('cocina');
              setActiveView('admin_kitchen');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
              activeView === 'admin_kitchen'
                ? 'bg-[#006e2d] text-white shadow-sm font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">skillet</span>
            <span>Cocina</span>
            {inKitchenCount > 0 && (
              <span className="bg-emerald-400 text-emerald-950 font-extrabold px-1.5 py-0.2 rounded-full text-[10px]">
                {inKitchenCount}
              </span>
            )}
          </button>

          {/* Security & Audit Logs */}
          <button
            onClick={() => {
              setActiveView('admin_security');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
              activeView === 'admin_security'
                ? 'bg-amber-600 text-white shadow-sm font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            <span>Auditoría & MFA</span>
            <span className="text-[10px] text-amber-300">({securityLogs.length})</span>
          </button>
        </div>

        {/* View Frame Toggle & MFA status */}
        <div className="flex items-center gap-2">
          {currentUserRole === 'cliente' && (
            <button
              onClick={() => setIsMobileSimulator(!isMobileSimulator)}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 text-[11px]"
              title="Cambiar formato móvil / pantalla completa"
            >
              <span className="material-symbols-outlined text-[14px]">
                {isMobileSimulator ? 'fullscreen' : 'stay_current_portrait'}
              </span>
              <span className="hidden md:inline">
                {isMobileSimulator ? 'Pantalla Completa' : 'Marco Móvil'}
              </span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1 text-slate-400">
            <span className="material-symbols-outlined text-emerald-400 text-[14px]">lock</span>
            <span className="text-[11px]">MFA: {isMfaVerified ? 'Activo' : 'Pendiente'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
