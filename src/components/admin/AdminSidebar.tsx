import React from 'react';
import { useApp } from '../../context/AppContext';

export const AdminSidebar: React.FC = () => {
  const { activeView, setActiveView, orders, isMfaVerified, setCurrentUserRole } = useApp();

  const pendingPaymentsCount = orders.filter((o) => o.status === 'pago_pendiente').length;
  const inKitchenCount = orders.filter((o) => o.status === 'en_cocina').length;

  return (
    <aside className="fixed left-0 top-0 h-full w-[72px] md:w-[260px] bg-white z-40 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-slate-200/80 transition-all duration-300">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-[70px] flex items-center px-4 md:px-5 gap-2.5 border-b border-slate-100">
          <div className="w-9 h-9 rounded-full bg-[#ce4700] flex items-center justify-center text-white font-black text-sm shadow-sm flex-shrink-0">
            M
          </div>
          <div className="hidden md:flex flex-col">
            <span className="font-extrabold text-[17px] text-[#a43700] tracking-tight leading-none">
              MORDISCO YA
            </span>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
              Operaciones & POS
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1.5 px-2 md:px-3 mt-4">
          {/* Dashboard */}
          <button
            onClick={() => setActiveView('admin_dashboard')}
            className={`flex items-center justify-center md:justify-start gap-3 px-3.5 py-3 rounded-full transition-colors text-left w-full ${
              activeView === 'admin_dashboard'
                ? 'bg-[#ce4700] text-white shadow-sm font-bold'
                : 'text-slate-700 hover:bg-[#eaedff] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="hidden md:inline text-[14px]">Dashboard</span>
          </button>

          {/* Validación de Pagos */}
          <button
            onClick={() => setActiveView('admin_yape')}
            className={`flex items-center justify-between px-3.5 py-3 rounded-full transition-colors text-left w-full ${
              activeView === 'admin_yape'
                ? 'bg-[#712ae2] text-white shadow-sm font-bold'
                : 'text-slate-700 hover:bg-[#eaedff] hover:text-[#131b2e]'
            }`}
          >
            <div className="flex items-center gap-3 justify-center md:justify-start w-full md:w-auto">
              <span className="material-symbols-outlined text-[22px]">receipt_long</span>
              <span className="hidden md:inline text-[14px]">Validación de pagos</span>
            </div>
            {pendingPaymentsCount > 0 && (
              <span
                className={`hidden md:inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  activeView === 'admin_yape'
                    ? 'bg-purple-200 text-purple-900'
                    : 'bg-[#712ae2] text-white'
                }`}
              >
                {pendingPaymentsCount}
              </span>
            )}
          </button>

          {/* Despacho Cocina */}
          <button
            onClick={() => setActiveView('admin_kitchen')}
            className={`flex items-center justify-between px-3.5 py-3 rounded-full transition-colors text-left w-full ${
              activeView === 'admin_kitchen'
                ? 'bg-[#006e2d] text-white shadow-sm font-bold'
                : 'text-slate-700 hover:bg-[#eaedff] hover:text-[#131b2e]'
            }`}
          >
            <div className="flex items-center gap-3 justify-center md:justify-start w-full md:w-auto">
              <span className="material-symbols-outlined text-[22px]">local_shipping</span>
              <span className="hidden md:inline text-[14px]">Despacho</span>
            </div>
            {inKitchenCount > 0 && (
              <span
                className={`hidden md:inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  activeView === 'admin_kitchen'
                    ? 'bg-emerald-200 text-emerald-950'
                    : 'bg-[#a43700] text-white'
                }`}
              >
                {inKitchenCount}
              </span>
            )}
          </button>

          {/* Auditoría & MFA */}
          <button
            onClick={() => setActiveView('admin_security')}
            className={`flex items-center justify-center md:justify-start gap-3 px-3.5 py-3 rounded-full transition-colors text-left w-full ${
              activeView === 'admin_security'
                ? 'bg-amber-600 text-white shadow-sm font-bold'
                : 'text-slate-700 hover:bg-[#eaedff] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">verified_user</span>
            <span className="hidden md:inline text-[14px]">Auditoría & MFA</span>
          </button>

          {/* Catálogo Cliente */}
          <button
            onClick={() => {
              setCurrentUserRole('cliente');
              setActiveView('client_catalog');
            }}
            className="flex items-center justify-center md:justify-start gap-3 px-3.5 py-3 rounded-full text-slate-700 hover:bg-[#eaedff] transition-colors text-left w-full"
          >
            <span className="material-symbols-outlined text-[22px]">fastfood</span>
            <span className="hidden md:inline text-[14px]">Vista Cliente</span>
          </button>
        </nav>
      </div>

      {/* Footer Security Badge */}
      <div className="p-3 md:p-4 flex flex-col gap-2 border-t border-slate-100">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#7cf994]/30 text-[#007230]">
          <span className="material-symbols-outlined text-[#006e2d] text-[18px]">lock</span>
          <span className="text-[11px] font-bold">
            {isMfaVerified ? 'Sesión protegida con MFA' : 'MFA requerido'}
          </span>
        </div>

        <button
          onClick={() => {
            setCurrentUserRole('cliente');
            setActiveView('client_catalog');
          }}
          className="flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-full text-rose-600 hover:bg-rose-50 transition-colors text-[13px] font-semibold w-full"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span className="hidden md:inline">Cerrar sesión POS</span>
        </button>
      </div>
    </aside>
  );
};
