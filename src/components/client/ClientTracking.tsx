import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ClientTracking: React.FC = () => {
  const { currentOrder, setActiveView, showToast, updateOrderStatus } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const order = currentOrder;

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast('Sincronizando estado con el despachador de cocina...', 'info');

    // If order is still 'pago_pendiente', advance it to simulate live kitchen confirmation
    setTimeout(() => {
      if (order && order.status === 'pago_pendiente') {
        updateOrderStatus(order.id, 'en_cocina', 'El chef está friendo tu pedido con papas doradas.');
      } else if (order && order.status === 'en_cocina') {
        updateOrderStatus(order.id, 'listo_entrega', 'Empacado térmicamente con salsas.');
      }
      setIsRefreshing(false);
      showToast('¡Estado actualizado en tiempo real!', 'success');
    }, 800);
  };

  const isStep1Done = true;
  const isStep2Done = Boolean(order && order.status !== 'pago_pendiente');
  const isStep3Active = Boolean(order && (order.status === 'en_cocina' || order.status === 'pago_validado'));
  const isStep3Done = Boolean(order && (order.status === 'listo_entrega' || order.status === 'entregado'));
  const isStep4Active = Boolean(order && order.status === 'listo_entrega');
  const isStep4Done = Boolean(order && order.status === 'entregado');
  const isStep5Done = Boolean(order && order.status === 'entregado');

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col relative pb-28">
      {/* Top Header */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-2 border-b border-slate-100">
        <div className="px-4 py-1 flex items-center justify-between text-[#131b2e]">
          <span className="text-[12px] font-semibold tracking-tight">7:30</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[14px]">wifi</span>
            <span className="material-symbols-outlined text-[14px]">battery_full</span>
          </div>
        </div>

        <div className="h-14 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              aria-label="Volver"
              onClick={() => setActiveView('client_catalog')}
              className="w-10 h-10 rounded-full bg-[#283044] text-[#eef0ff] shadow-sm flex items-center justify-center active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <span className="text-[18px] tracking-tight font-bold text-[#131b2e] truncate pl-1">
              Confirmacion Seguimiento
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Notificaciones"
              onClick={() => showToast('Notificaciones activas de tu orden', 'info')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#5a4138] hover:text-[#131b2e] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#a43700] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Tracking Content */}
      <main className="flex-1 px-4 pt-3 flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Card Principal: Estado de Confirmación Instantáneo */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#7cf994]/30 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#ffdbcf]/40 rounded-full blur-xl pointer-events-none"></div>

          {/* Círculo de Éxito con Pulso */}
          <div className="relative mb-3">
            <div className="absolute -inset-1.5 rounded-full bg-[#006e2d]/15 animate-ping opacity-60"></div>
            <div className="relative w-20 h-20 rounded-full bg-[#006e2d] flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-[44px]">check</span>
            </div>
          </div>

          <h2 className="text-[24px] text-[#131b2e] font-extrabold tracking-tight mb-1">
            ¡Pedido recibido!
          </h2>

          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffdbcf] text-[#380d00] mb-2 font-bold text-[14px]">
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            <span>{order ? order.id : 'MYA-0001'}</span>
          </div>

          <p className="text-[13px] text-[#5a4138] max-w-xs leading-snug">
            Tu pedido ha sido registrado correctamente y la cocina ya tiene tus detalles.
          </p>

          {/* Resumen rápido de Entrega estimada */}
          <div className="mt-4 w-full grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
            <div className="bg-[#eaedff] rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">
                Tiempo estimado
              </span>
              <span className="text-[14px] text-[#131b2e] font-bold">20 - 30 min</span>
            </div>
            <div className="bg-[#eaedff] rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">
                Método Pago
              </span>
              <div className="flex items-center gap-1 text-[#712ae2] font-bold text-[13px]">
                <span className="material-symbols-outlined text-[15px]">qr_code_2</span>
                <span>Yape S/. {order ? order.total.toFixed(2) : '37.00'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Panel Central: Línea de Tiempo de Seguimiento en Vivo (Stepper) */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4 pb-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006e2d] animate-pulse"></span>
              <h3 className="text-[16px] font-bold text-[#131b2e]">Seguimiento en vivo</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#7ffc97] text-[#002109] text-[11px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">sync</span>
              <span>Actualizado</span>
            </span>
          </div>

          {/* Stepper Steps */}
          <div className="relative pl-2 pr-1 py-1 space-y-6">
            {/* Paso 1: Pedido recibido */}
            <div className="relative flex items-start gap-3">
              <div className="absolute left-4 top-8 -bottom-6 w-0.5 bg-[#006e2d]"></div>
              <div className="relative z-10 w-8 h-8 rounded-full bg-[#006e2d] text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[14px] font-bold text-[#131b2e]">Pedido recibido</h4>
                  <span className="text-[12px] text-slate-500 font-medium">
                    {order ? order.createdAt : '19:32'}
                  </span>
                </div>
                <p className="text-[12px] text-slate-500">Comanda recibida y asignada al mostrador.</p>
              </div>
            </div>

            {/* Paso 2: Pago confirmado */}
            <div className="relative flex items-start gap-3">
              <div
                className={`absolute left-4 top-8 -bottom-6 w-0.5 ${
                  isStep2Done ? 'bg-[#006e2d]' : 'bg-slate-200'
                }`}
              ></div>
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                  isStep2Done ? 'bg-[#006e2d] text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isStep2Done ? 'check' : 'hourglass_top'}
                </span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[14px] font-bold text-[#131b2e]">Pago confirmado</h4>
                  <span className="text-[12px] text-slate-500 font-medium">
                    {isStep2Done ? 'Verificado' : 'En cola'}
                  </span>
                </div>
                <p
                  className={`text-[12px] font-medium flex items-center gap-1 ${
                    isStep2Done ? 'text-[#006e2d]' : 'text-slate-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  {isStep2Done
                    ? 'Yape verificado con éxito'
                    : 'Esperando validación de tesorería'}
                </p>
              </div>
            </div>

            {/* Paso 3: Preparando pedido (En proceso) */}
            <div className="relative flex items-start gap-3">
              <div
                className={`absolute left-4 top-8 -bottom-6 w-0.5 ${
                  isStep3Done ? 'bg-[#006e2d]' : 'bg-slate-200'
                }`}
              ></div>
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                  isStep3Done
                    ? 'bg-[#006e2d] text-white'
                    : isStep3Active
                    ? 'bg-[#a43700] text-white ring-4 ring-[#ffdbcf]'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isStep3Active ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '3s' }}
                >
                  skillet
                </span>
              </div>
              <div
                className={`flex-1 min-w-0 pt-0.5 p-2 rounded-xl ${
                  isStep3Active ? 'bg-[#ffdbcf]/40 border border-[#ffdbcf]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-[14px] font-bold ${
                      isStep3Active ? 'text-[#a43700]' : 'text-[#131b2e]'
                    }`}
                  >
                    En preparación
                  </h4>
                  {isStep3Active && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#a43700] text-white font-bold">
                      Ahora
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-slate-600 mt-0.5">
                  El chef está crujiendo tu broaster con papas doradas.
                </p>
              </div>
            </div>

            {/* Paso 4: Listo para entrega */}
            <div
              className={`relative flex items-start gap-3 transition-opacity ${
                isStep4Active || isStep4Done ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div
                className={`absolute left-4 top-8 -bottom-6 w-0.5 ${
                  isStep4Done ? 'bg-[#006e2d]' : 'bg-slate-200'
                }`}
              ></div>
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                  isStep4Done
                    ? 'bg-[#006e2d] text-white'
                    : isStep4Active
                    ? 'bg-[#006e2d] text-white ring-4 ring-emerald-200'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">takeout_dining</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[14px] font-semibold text-[#131b2e]">Listo para entrega</h4>
                  <span className="text-[12px] text-slate-500">
                    {isStep4Active ? '¡Listo!' : '--:--'}
                  </span>
                </div>
                <p className="text-[12px] text-slate-500">
                  Empacado térmicamente con salsas extra.
                </p>
              </div>
            </div>

            {/* Paso 5: Entregado */}
            <div
              className={`relative flex items-start gap-3 transition-opacity ${
                isStep5Done ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                  isStep5Done ? 'bg-[#006e2d] text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">sports_motorsports</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[14px] font-semibold text-[#131b2e]">Entregado al cliente</h4>
                  <span className="text-[12px] text-slate-500">
                    {isStep5Done ? 'Completado' : '--:--'}
                  </span>
                </div>
                <p className="text-[12px] text-slate-500">
                  Entrega directa en mostrador o motorizado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detalle del Pedido "Tu Orden Calientita" */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-[#131b2e]">
              <span className="material-symbols-outlined text-[#a43700] text-[20px]">
                restaurant
              </span>
              <h4 className="text-[14px] font-bold">Tu Orden Calientita</h4>
            </div>
            <span className="text-[11px] text-[#5a4138] font-semibold">
              {order ? `${order.items.length} ítems` : '2 ítems'}
            </span>
          </div>

          {/* List of items */}
          <div className="space-y-2">
            {order && order.items.length > 0 ? (
              order.items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center gap-3 p-2 rounded-xl bg-[#f2f3ff]"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#131b2e] font-semibold truncate">
                      {item.productName}
                    </p>
                    <p className="text-[11px] text-[#5a4138] truncate">
                      {item.selectedSauces.join(', ') || 'Con cremas clásicas'}
                    </p>
                  </div>
                  <span className="text-[14px] text-[#131b2e] font-bold whitespace-nowrap">
                    S/. {item.itemTotal.toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3 p-2 rounded-xl bg-[#f2f3ff]">
                <div className="w-14 h-14 rounded-lg bg-orange-100 flex items-center justify-center text-[#a43700]">
                  <span className="material-symbols-outlined text-[24px]">fastfood</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[#131b2e] font-semibold">Broaster + Arroz Chaufa</p>
                  <p className="text-[11px] text-[#5a4138]">+ Mayonesa, ají pollero</p>
                </div>
                <span className="text-[14px] font-bold">S/. 15.00</span>
              </div>
            )}
          </div>

          {/* Total & Delivery Address */}
          <div className="mt-4 pt-3 flex items-center justify-between text-[#131b2e] border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-[#5a4138]">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <span className="text-[12px] truncate max-w-[170px]">
                {order?.address || 'Av. Angélica Gamarra - Los Olivos'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block font-medium">Total Pagado</span>
              <span className="text-[18px] font-extrabold text-[#a43700]">
                S/. {order ? order.total.toFixed(2) : '37.00'}
              </span>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-1">
          <button
            type="button"
            disabled={isRefreshing}
            onClick={handleRefresh}
            className="w-full h-12 rounded-full bg-[#a43700] hover:bg-[#ce4700] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            >
              {isRefreshing ? 'refresh' : 'explore'}
            </span>
            <span>{isRefreshing ? 'SINCRONIZANDO...' : 'SEGUIMIENTO EN VIVO'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => showToast('Conectando con la cocina de Mordisco Ya... (+51 999 999 999)', 'info')}
              className="w-full h-11 rounded-full bg-[#eaedff] text-[#131b2e] font-semibold text-[13px] flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:bg-[#dae2fd]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#a43700]">call</span>
              <span>Llamar cocina</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Centro de Soporte WhatsApp: +51 984 219 042', 'info')}
              className="w-full h-11 rounded-full bg-[#eaedff] text-[#131b2e] font-semibold text-[13px] flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:bg-[#dae2fd]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#006e2d]">
                help_outline
              </span>
              <span>¿Necesitas ayuda?</span>
            </button>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 z-40 pb-2 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around h-15 px-4 max-w-md mx-auto">
          <button
            onClick={() => setActiveView('client_catalog')}
            className="flex items-center gap-1 px-4 py-2 rounded-full text-[#5a4138] hover:text-[#131b2e] transition-all min-h-[42px]"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span className="text-[13px]">Inicio</span>
          </button>

          <button
            onClick={() => setActiveView('client_catalog')}
            className="flex items-center gap-1 px-4 py-2 rounded-full text-[#5a4138] hover:text-[#131b2e] transition-all min-h-[42px]"
          >
            <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
            <span className="text-[13px]">Menú</span>
          </button>

          <button
            onClick={() => setActiveView('client_tracking')}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#ffdbcf] text-[#a43700] font-bold shadow-sm min-h-[42px]"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span className="text-[13px]">Pedido</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
