import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    orders,
    setActiveView,
    updateOrderStatus,
    showToast,
  } = useApp();

  const [tableFilter, setTableFilter] = useState<'todos' | 'validar' | 'cocina' | 'listos'>('todos');
  const [searchCode, setSearchCode] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const pendingPaymentsCount = orders.filter((o) => o.status === 'pago_pendiente').length;
  const inKitchenCount = orders.filter((o) => o.status === 'en_cocina').length;
  const readyCount = orders.filter((o) => o.status === 'listo_entrega').length;

  const filteredOrders = orders.filter((order) => {
    if (tableFilter === 'validar' && order.status !== 'pago_pendiente') return false;
    if (tableFilter === 'cocina' && order.status !== 'en_cocina') return false;
    if (tableFilter === 'listos' && order.status !== 'listo_entrega') return false;

    if (searchCode) {
      const q = searchCode.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.clientName.toLowerCase().includes(q) ||
        order.clientPhone.includes(q)
      );
    }
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast('Actualizando métricas de ventas y comandas en tiempo real', 'info');
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Datos sincronizados con éxito', 'success');
    }, 600);
  };

  const handleExport = () => {
    showToast('Generando reporte encriptado de tesorería y arqueo de caja...', 'info');
    setTimeout(() => {
      showToast('Reporte diario exportado en formato CSV/PDF auditado', 'success');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Top Bar for Desktop */}
      <div className="h-[70px] bg-white/90 backdrop-blur-xl border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="relative w-72 lg:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar pedido por código (ej. MYA-0001)..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full pl-10 pr-12 py-2 rounded-full bg-[#f2f3ff] text-[#131b2e] text-[13px] outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#a43700]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 text-[10px] font-bold">
              ⌘K
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7cf994]/40 text-[#007230] text-[12px] font-bold border border-[#7cf994]">
            <span className="h-2 w-2 rounded-full bg-[#006e2d] animate-pulse"></span>
            <span className="hidden lg:inline">Caja Principal -</span>
            <span>Abierta</span>
          </div>

          <button
            onClick={() => showToast('Sin alertas críticas de seguridad', 'info')}
            className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#a43700]"></span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-[#a43700] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-[13px] text-[#131b2e] font-bold leading-tight">
                Carlos Mendoza
              </span>
              <span className="text-[11px] text-slate-500">Administrador / Cajero</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Canvas */}
      <div className="px-4 md:px-8 pt-6">
        {/* Encabezado de Operaciones y Control Rápido */}
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-[28px] md:text-[32px] font-black text-[#131b2e] tracking-tight">
                ¡Hola, Carlos! 👋
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#131b2e] text-[11px] font-bold">
                <span className="h-2 w-2 rounded-full bg-[#006e2d] animate-ping"></span>
                Turno Mañana / Tarde Activo
              </span>
            </div>
            <p className="text-[13px] text-[#5a4138] flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              <span>Lunes, 12 de Octubre 2026</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#131b2e] font-semibold">Caja Principal 01</span>
            </p>
          </div>

          {/* Barra de Herramientas y CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center bg-white shadow-sm rounded-full p-1 gap-1 border border-slate-200">
              <button
                onClick={handleRefresh}
                className="px-4 py-1.5 rounded-full bg-[#e2e7ff] text-[#131b2e] text-[12px] font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px] text-[#a43700]">schedule</span>
                Hoy (En tiempo real)
              </button>
              <button
                onClick={handleRefresh}
                className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 transition-colors"
                title="Actualizar Datos"
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isRefreshing ? 'animate-spin' : ''
                  }`}
                >
                  refresh
                </span>
              </button>
            </div>

            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#131b2e] text-[13px] font-bold shadow-sm hover:bg-slate-50 transition-all border border-slate-200"
            >
              <span className="material-symbols-outlined text-[18px] text-slate-500">download</span>
              Exportar Reporte
            </button>

            <button
              onClick={() => setActiveView('client_catalog')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#a43700] hover:bg-[#ce4700] text-white text-[13px] font-bold shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Nuevo Pedido Manual
            </button>
          </div>
        </header>

        {/* Fila 1: Tarjetas KPI de Desempeño (4 Columnas) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {/* KPI 1: Ventas del Día */}
          <div className="relative bg-white rounded-2xl p-5 shadow-sm border border-slate-100 overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#a43700]"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#5a4138] font-bold">
                  Ventas del Día
                </span>
                <h2 className="text-[26px] font-black text-[#131b2e] mt-1">S/ 3,450.00</h2>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#ffdbcf] flex items-center justify-center text-[#a43700]">
                <span className="material-symbols-outlined text-[24px]">payments</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-100">
              <div className="inline-flex items-center gap-1 text-[#006e2d] text-[12px] font-bold bg-[#7cf994]/30 px-2.5 py-1 rounded-full">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                +18.4%
              </div>
              <span className="text-[11px] text-slate-500">vs ayer (S/ 2,912.00)</span>
            </div>
          </div>

          {/* KPI 2: Pedidos Activos */}
          <div className="relative bg-white rounded-2xl p-5 shadow-sm border border-slate-100 overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#a43700]"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#5a4138] font-bold">
                  Pedidos Activos
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <h2 className="text-[26px] font-black text-[#131b2e]">24</h2>
                  <span className="text-[12px] text-slate-500 font-medium">órdenes vivas</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#e2e7ff] flex items-center justify-center text-[#131b2e]">
                <span className="material-symbols-outlined text-[24px]">skillet</span>
              </div>
            </div>
            <div className="mt-4 pt-3 grid grid-cols-3 gap-1.5 text-center border-t border-slate-100">
              <div className="p-1 rounded-lg bg-[#f2f3ff]">
                <span className="block text-[11px] font-bold text-[#131b2e]">{inKitchenCount}</span>
                <span className="text-[10px] text-slate-500 truncate block">Cocina</span>
              </div>
              <div className="p-1 rounded-lg bg-[#f2f3ff]">
                <span className="block text-[11px] font-bold text-[#006e2d]">{readyCount}</span>
                <span className="text-[10px] text-slate-500 truncate block">Listos</span>
              </div>
              <div className="p-1 rounded-lg bg-[#f2f3ff]">
                <span className="block text-[11px] font-bold text-[#712ae2]">4</span>
                <span className="text-[10px] text-slate-500 truncate block">Ruta</span>
              </div>
            </div>
          </div>

          {/* KPI 3: Pagos por Validar (Yape) */}
          <div className="relative bg-white rounded-2xl p-5 shadow-sm border border-slate-100 overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#712ae2]"></div>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#5a4138] font-bold">
                    Pagos por Validar
                  </span>
                  <span className="animate-pulse flex h-2 w-2 rounded-full bg-[#712ae2]"></span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <h2 className="text-[26px] font-black text-[#712ae2]">
                    {pendingPaymentsCount}
                  </h2>
                  <span className="text-[12px] text-slate-500 font-medium">Yape pendientes</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#eaddff] flex items-center justify-center text-[#712ae2]">
                <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-100">
              <span className="text-[12px] font-bold text-[#712ae2] bg-[#eaddff]/60 px-2.5 py-0.5 rounded-full">
                Total: S/ 148.00
              </span>
              <button
                onClick={() => setActiveView('admin_yape')}
                className="inline-flex items-center gap-1 text-[11px] text-[#712ae2] font-bold hover:underline"
              >
                Revisar <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* KPI 4: Pedidos Entregados */}
          <div className="relative bg-white rounded-2xl p-5 shadow-sm border border-slate-100 overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#006e2d]"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#5a4138] font-bold">
                  Pedidos Entregados
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <h2 className="text-[26px] font-black text-[#006e2d]">86</h2>
                  <span className="text-[12px] text-slate-500 font-medium">completados</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#7cf994]/40 flex items-center justify-center text-[#006e2d]">
                <span className="material-symbols-outlined text-[24px]">check_circle</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-100">
              <div className="inline-flex items-center gap-1 text-[#006e2d] text-[12px] font-bold">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                98.2% efectividad
              </div>
              <span className="text-[11px] text-slate-500">0 cancelados hoy</span>
            </div>
          </div>
        </section>

        {/* Fila 2: Análisis Gráfico (8 cols) y Top Productos (4 cols) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
          {/* Columna Izquierda: Afluencia de Pedidos y Ventas Horarias */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
                <div>
                  <h3 className="text-[18px] font-bold text-[#131b2e]">
                    Ventas por Hora y Afluencia
                  </h3>
                  <p className="text-[12px] text-[#5a4138]">
                    Monitoreo de flujo transaccional de 11:00 AM a 11:00 PM
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">
                      Ticket Promedio
                    </span>
                    <span className="text-[16px] text-[#a43700] font-black">S/ 38.50</span>
                  </div>
                  <div className="flex p-1 bg-[#f2f3ff] rounded-full">
                    <button className="px-3 py-1 rounded-full bg-white text-[#131b2e] shadow-sm text-[11px] font-bold">
                      Hoy
                    </button>
                    <button
                      onClick={() => showToast('Visualización semanal disponible en reporte')}
                      className="px-3 py-1 rounded-full text-slate-500 hover:text-slate-800 text-[11px] transition-colors"
                    >
                      Esta Semana
                    </button>
                  </div>
                </div>
              </div>

              {/* Métricas Rápidas Secundarias */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#f2f3ff] mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#a43700] flex-shrink-0"></span>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold">
                      HORA PICO ALMUERZO
                    </span>
                    <span className="text-[12px] text-[#131b2e] font-extrabold">
                      1:00 PM - 2:30 PM
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#712ae2] flex-shrink-0"></span>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold">
                      HORA PICO CENA
                    </span>
                    <span className="text-[12px] text-[#131b2e] font-extrabold">
                      8:00 PM - 9:30 PM
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#006e2d] flex-shrink-0"></span>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold">
                      ORDEN MÁS GRANDE
                    </span>
                    <span className="text-[12px] text-[#131b2e] font-extrabold">
                      S/ 245.00 (MYA-0018)
                    </span>
                  </div>
                </div>
              </div>

              {/* Gráfico SVG Interactivo con Curva y Columnas de Volumen */}
              <div className="w-full h-56 relative mt-1">
                <svg
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 760 200"
                >
                  <defs>
                    <linearGradient id="gradient-area" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#ce4700" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ce4700" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="bar-grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#eaedff" />
                      <stop offset="100%" stopColor="#dae2fd" />
                    </linearGradient>
                  </defs>

                  {/* Líneas de Guía */}
                  <line stroke="#eaedff" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="760" y1="20" y2="20" />
                  <line stroke="#eaedff" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="760" y1="70" y2="70" />
                  <line stroke="#eaedff" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="760" y1="120" y2="120" />
                  <line stroke="#eaedff" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="760" y1="170" y2="170" />

                  {/* Barras de volumen */}
                  <rect fill="url(#bar-grad)" height="30" rx="4" width="22" x="25" y="140" />
                  <rect fill="url(#bar-grad)" height="70" rx="4" width="22" x="85" y="100" />
                  <rect fill="#ffdbcf" height="135" rx="4" width="22" x="145" y="35" />
                  <rect fill="url(#bar-grad)" height="110" rx="4" width="22" x="205" y="60" />
                  <rect fill="url(#bar-grad)" height="45" rx="4" width="22" x="265" y="125" />
                  <rect fill="url(#bar-grad)" height="35" rx="4" width="22" x="325" y="135" />
                  <rect fill="url(#bar-grad)" height="55" rx="4" width="22" x="385" y="115" />
                  <rect fill="url(#bar-grad)" height="90" rx="4" width="22" x="445" y="80" />
                  <rect fill="url(#bar-grad)" height="125" rx="4" width="22" x="505" y="45" />
                  <rect fill="#ffb59a" height="145" rx="4" width="22" x="565" y="25" />
                  <rect fill="url(#bar-grad)" height="100" rx="4" width="22" x="625" y="70" />
                  <rect fill="url(#bar-grad)" height="50" rx="4" width="22" x="685" y="120" />

                  {/* Curva Spline */}
                  <path
                    d="M 36 145 C 90 90, 130 30, 156 30 C 180 30, 220 75, 276 130 C 330 145, 380 100, 456 75 C 520 40, 550 20, 576 20 C 610 20, 650 80, 696 125 L 696 170 L 36 170 Z"
                    fill="url(#gradient-area)"
                  />
                  <path
                    d="M 36 145 C 90 90, 130 30, 156 30 C 180 30, 220 75, 276 130 C 330 145, 380 100, 456 75 C 520 40, 550 20, 576 20 C 610 20, 650 80, 696 125"
                    fill="none"
                    stroke="#ce4700"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                  <circle cx="156" cy="30" fill="#faf8ff" r="5" stroke="#ce4700" strokeWidth="3" />
                  <circle cx="576" cy="20" fill="#ce4700" r="6" stroke="#faf8ff" strokeWidth="2" />
                </svg>
              </div>

              {/* Time labels */}
              <div className="grid grid-cols-12 text-center text-[10px] text-slate-500 pt-1 font-semibold">
                <span>11 AM</span>
                <span>12 PM</span>
                <span className="font-bold text-[#a43700]">1 PM</span>
                <span>2 PM</span>
                <span>3 PM</span>
                <span>4 PM</span>
                <span>5 PM</span>
                <span>6 PM</span>
                <span>7 PM</span>
                <span className="font-bold text-[#a43700]">8 PM</span>
                <span>9 PM</span>
                <span>10 PM</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#a43700]"></span> Curva de Facturación
                <span className="h-2.5 w-2.5 rounded-full bg-[#dae2fd] ml-3"></span> Volumen de Pedidos
              </span>
              <span className="text-[#131b2e] font-bold">Proyección de cierre: S/ 4,800.00</span>
            </div>
          </div>

          {/* Columna Derecha: Ranking de Productos Más Vendidos */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#a43700] text-[22px]">stars</span>
                  <h3 className="text-[17px] font-bold text-[#131b2e]">Más Vendidos</h3>
                </div>
                <span className="text-[11px] bg-[#f2f3ff] text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
                  Hoy
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Item 1 */}
                <div className="flex flex-col gap-1 p-2 rounded-xl bg-[#f2f3ff]/60">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-[#ce4700] text-white text-[10px] font-bold flex items-center justify-center">
                        #1
                      </span>
                      <div className="min-w-0">
                        <span className="text-[13px] text-[#131b2e] font-bold block truncate">
                          Hamburguesa Clásica
                        </span>
                        <span className="text-[11px] text-slate-500 truncate block">
                          Papas doradas + ensalada
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[12px] text-[#a43700] font-bold">S/ 1,420.00</span>
                      <span className="block text-[10px] text-slate-400">142 pedidos</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#e2e7ff] h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-[#a43700] h-full rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col gap-1 p-2 rounded-xl hover:bg-[#f2f3ff]/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                        #2
                      </span>
                      <div className="min-w-0">
                        <span className="text-[13px] text-[#131b2e] font-bold block truncate">
                          Broaster Especial
                        </span>
                        <span className="text-[11px] text-slate-500 truncate block">
                          Papas crocantes + ensalada
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[12px] text-[#131b2e] font-bold">S/ 1,176.00</span>
                      <span className="block text-[10px] text-slate-400">98 pedidos</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#e2e7ff] h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-[#ce4700] h-full rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col gap-1 p-2 rounded-xl hover:bg-[#f2f3ff]/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                        #3
                      </span>
                      <div className="min-w-0">
                        <span className="text-[13px] text-[#131b2e] font-bold block truncate">
                          Broaster + Arroz Blanco
                        </span>
                        <span className="text-[11px] text-slate-500 truncate block">
                          Porción familiar con cremas
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[12px] text-[#131b2e] font-bold">S/ 960.00</span>
                      <span className="block text-[10px] text-slate-400">64 pedidos</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#e2e7ff] h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-[#ffb59a] h-full rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex flex-col gap-1 p-2 rounded-xl hover:bg-[#f2f3ff]/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                        #4
                      </span>
                      <div className="min-w-0">
                        <span className="text-[13px] text-[#131b2e] font-bold block truncate">
                          Inka Cola 500ml
                        </span>
                        <span className="text-[11px] text-slate-500 truncate block">
                          Helada / Sin helar
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[12px] text-[#131b2e] font-bold">S/ 260.00</span>
                      <span className="block text-[10px] text-slate-400">52 unidades</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#e2e7ff] h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-[#62df7d] h-full rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setActiveView('client_catalog')}
                className="w-full py-2.5 rounded-full bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] font-bold text-[12px] flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Ver Menú Completo e Inventario</span>
                <span className="material-symbols-outlined text-[16px]">restaurant_menu</span>
              </button>
            </div>
          </div>
        </section>

        {/* Fila 3: Últimos Pedidos en Tiempo Real (Tabla) */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold text-[#131b2e]">
                  Últimos Pedidos en Tiempo Real
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#7cf994]/40 text-[#007230] text-[11px] font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#006e2d] animate-pulse"></span>
                  En vivo
                </span>
              </div>
              <span className="text-[12px] text-slate-500 mt-0.5">
                Actualizado continuamente • Conexión WebSocket POS activa
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setTableFilter('todos')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm transition-all ${
                  tableFilter === 'todos'
                    ? 'bg-[#131b2e] text-white'
                    : 'bg-[#f2f3ff] text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos ({orders.length})
              </button>
              <button
                onClick={() => setTableFilter('validar')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm transition-all flex items-center gap-1.5 ${
                  tableFilter === 'validar'
                    ? 'bg-[#712ae2] text-white'
                    : 'bg-[#f2f3ff] text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-[#712ae2]"></span>
                Por Validar ({pendingPaymentsCount})
              </button>
              <button
                onClick={() => setTableFilter('cocina')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm transition-all flex items-center gap-1.5 ${
                  tableFilter === 'cocina'
                    ? 'bg-[#a43700] text-white'
                    : 'bg-[#f2f3ff] text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-[#a43700]"></span>
                En Cocina ({inKitchenCount})
              </button>
              <button
                onClick={() => setTableFilter('listos')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm transition-all flex items-center gap-1.5 ${
                  tableFilter === 'listos'
                    ? 'bg-[#006e2d] text-white'
                    : 'bg-[#f2f3ff] text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-[#006e2d]"></span>
                Listos ({readyCount})
              </button>
            </div>
          </div>

          {/* Tabla Operativa */}
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#f2f3ff] text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                  <th className="py-3 px-3.5 rounded-l-xl">Código</th>
                  <th className="py-3 px-3">Hora</th>
                  <th className="py-3 px-3">Cliente</th>
                  <th className="py-3 px-3">Detalle de Items</th>
                  <th className="py-3 px-3">Tipo</th>
                  <th className="py-3 px-3 text-right">Total</th>
                  <th className="py-3 px-3 text-center">Método</th>
                  <th className="py-3 px-3">Estado</th>
                  <th className="py-3 px-3.5 text-right rounded-r-xl">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredOrders.map((ord) => {
                  const isPending = ord.status === 'pago_pendiente';
                  const isCooking = ord.status === 'en_cocina';
                  const isReady = ord.status === 'listo_entrega';

                  return (
                    <tr key={ord.id} className="hover:bg-[#f2f3ff]/50 transition-colors">
                      <td className="py-3.5 px-3.5 font-bold text-[#a43700] whitespace-nowrap">
                        {ord.id}
                      </td>
                      <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap text-[12px]">
                        {ord.createdAt}{' '}
                        <span className="text-[10px] text-slate-400">({ord.timeAgo})</span>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="font-bold text-[#131b2e] block">{ord.clientName}</span>
                        <span className="text-[11px] text-slate-500">{ord.clientPhone}</span>
                      </td>
                      <td className="py-3.5 px-3 max-w-xs">
                        <div className="truncate text-[#131b2e] font-semibold">
                          {ord.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                        </div>
                        {ord.items[0]?.specialNotes && (
                          <div className="text-[11px] text-slate-500 truncate">
                            {ord.items[0].specialNotes}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#131b2e] text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[15px] text-[#a43700]">
                            {ord.deliveryType === 'delivery'
                              ? 'moped'
                              : ord.deliveryType === 'recojo'
                              ? 'shopping_bag'
                              : 'table_restaurant'}
                          </span>
                          <span className="capitalize">{ord.deliveryType}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-black text-[#131b2e] whitespace-nowrap">
                        S/ {ord.total.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#712ae2] text-white text-[11px] font-bold shadow-xs">
                          <span className="material-symbols-outlined text-[13px]">smartphone</span>
                          Yape
                        </span>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eaddff] text-[#5a00c6] text-[11px] font-bold">
                            <span className="material-symbols-outlined text-[14px] animate-spin">
                              sync
                            </span>
                            Pago por validar
                          </span>
                        )}
                        {isCooking && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdbcf] text-[#812900] text-[11px] font-bold">
                            <span className="material-symbols-outlined text-[14px]">skillet</span>
                            En cocina
                          </span>
                        )}
                        {isReady && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7cf994] text-[#007230] text-[11px] font-bold">
                            <span className="material-symbols-outlined text-[14px]">done_all</span>
                            Listo para entrega
                          </span>
                        )}
                        {ord.status === 'entregado' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold">
                            <span className="material-symbols-outlined text-[14px]">check</span>
                            Entregado
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3.5 text-right whitespace-nowrap">
                        {isPending && (
                          <button
                            onClick={() => setActiveView('admin_yape')}
                            className="px-3 py-1 rounded-full bg-[#712ae2] hover:bg-[#8a4cfc] text-white text-[11px] font-bold transition-all shadow-xs inline-flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            Ver Yape
                          </button>
                        )}
                        {isCooking && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'listo_entrega')}
                            className="px-3 py-1 rounded-full bg-[#a43700] hover:bg-[#ce4700] text-white text-[11px] font-bold transition-all shadow-xs inline-flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">check</span>
                            Listo
                          </button>
                        )}
                        {isReady && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'entregado')}
                            className="px-3 py-1 rounded-full bg-[#006e2d] hover:bg-[#005320] text-white text-[11px] font-bold transition-all shadow-xs inline-flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                            Despachar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
