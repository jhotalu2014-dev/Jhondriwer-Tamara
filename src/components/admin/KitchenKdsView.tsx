import React from 'react';
import { useApp } from '../../context/AppContext';

export const KitchenKdsView: React.FC = () => {
  const { orders, updateOrderStatus, showToast } = useApp();

  const cookingOrders = orders.filter((o) => o.status === 'en_cocina' || o.status === 'pago_validado');
  const readyOrders = orders.filter((o) => o.status === 'listo_entrega');

  const handleMarkReady = (orderId: string) => {
    updateOrderStatus(orderId, 'listo_entrega', 'Plato empacado y listo para despacho en mostrador');
    showToast(`Pedido ${orderId} marcado como LISTO para entrega`, 'success');
  };

  const handleDispatch = (orderId: string) => {
    updateOrderStatus(orderId, 'entregado', 'Entregado al cliente o motorizado');
    showToast(`Pedido ${orderId} despachado con éxito`, 'success');
  };

  return (
    <div className="flex flex-col w-full px-4 md:px-8 py-6 pb-20">
      {/* KDS Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#006e2d]">
              Módulo de Producción KDS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="text-[11px] text-[#006e2d] font-bold bg-[#7cf994]/40 px-2 py-0.5 rounded-full">
              Cocina en Vivo
            </span>
          </div>
          <h1 className="text-[26px] md:text-[32px] font-black text-[#131b2e] tracking-tight">
            Despacho y Comandas de Cocina
          </h1>
          <p className="text-[13px] text-[#5a4138]">
            Monitoreo en tiempo real para freidoras, plancha y armado de bandejas térmicas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#7cf994]/50 text-[#002109] font-bold text-[12px] border border-[#7cf994]">
            <span className="material-symbols-outlined text-[18px] text-[#006e2d]">skillet</span>
            <span>
              {cookingOrders.length} en marcha • {readyOrders.length} listas para retiro
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Kitchen Tickets */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {cookingOrders.map((ord) => (
          <article
            key={ord.id}
            className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 relative overflow-hidden flex flex-col justify-between space-y-3"
          >
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#ce4700]"></div>

            {/* Ticket Header */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] font-black text-[#131b2e] tracking-tight">
                      #{ord.id}
                    </span>
                    <span className="bg-[#ffdbcf] text-[#380d00] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">
                        {ord.deliveryType === 'delivery'
                          ? 'moped'
                          : ord.deliveryType === 'recojo'
                          ? 'shopping_bag'
                          : 'dinner_dining'}
                      </span>
                      {ord.tableNumber || (ord.deliveryType === 'delivery' ? 'Delivery' : 'Para Llevar')}
                    </span>
                  </div>

                  <span className="text-[12px] font-semibold text-slate-600 flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">person</span>
                    {ord.clientName} {ord.tableNumber ? `• ${ord.tableNumber}` : ''}
                  </span>
                </div>

                <span className="bg-[#ffdbcf] text-[#812900] text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] animate-spin" style={{ animationDuration: '3s' }}>
                    local_fire_department
                  </span>
                  En Preparación
                </span>
              </div>

              {/* Items Breakdown */}
              <div className="bg-[#f2f3ff] p-3 rounded-xl space-y-2 mt-3">
                {ord.items.map((it) => (
                  <div key={it.cartItemId} className="border-b border-slate-200/60 pb-1.5 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <p className="text-[13px] font-bold text-[#131b2e]">
                        {it.quantity}x {it.productName}
                      </p>
                      {ord.urgent && (
                        <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-bold">
                          Urgente
                        </span>
                      )}
                    </div>
                    {it.selectedSauces.length > 0 && (
                      <p className="text-[11px] text-slate-600 pl-2 mt-0.5">
                        • Salsas: {it.selectedSauces.join(', ')}
                      </p>
                    )}
                    {it.specialNotes && (
                      <p className="text-[11px] text-[#a43700] font-semibold pl-2 mt-0.5">
                        • Nota: "{it.specialNotes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => handleMarkReady(ord.id)}
              className="w-full h-11 rounded-full bg-[#a43700] hover:bg-[#ce4700] text-white text-[13px] font-bold tracking-wide shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>MARCAR PEDIDO LISTO</span>
            </button>
          </article>
        ))}

        {/* Ready Orders section */}
        {readyOrders.map((ord) => (
          <article
            key={ord.id}
            className="w-full bg-white rounded-2xl p-5 shadow-sm border border-emerald-200/80 relative overflow-hidden flex flex-col justify-between space-y-3"
          >
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#006e2d]"></div>

            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] font-black text-[#131b2e] tracking-tight">
                      #{ord.id}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Listo en Barra
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold text-slate-600 mt-1 block">
                    {ord.clientName}
                  </span>
                </div>

                <span className="bg-[#7cf994] text-[#007230] text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">done_all</span>
                  Empacado
                </span>
              </div>

              <div className="bg-emerald-50/60 p-3 rounded-xl space-y-1.5 mt-3 text-[12px]">
                {ord.items.map((it) => (
                  <p key={it.cartItemId} className="font-semibold text-slate-700">
                    {it.quantity}x {it.productName}
                  </p>
                ))}
                <span className="text-[11px] text-[#006e2d] font-bold block pt-1">
                  Salsas y servilletas incluidas en empaque térmico
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDispatch(ord.id)}
              className="w-full h-11 rounded-full bg-[#006e2d] hover:bg-[#005320] text-white text-[13px] font-bold tracking-wide shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">sports_motorsports</span>
              <span>ENTREGAR / DESPACHAR</span>
            </button>
          </article>
        ))}

        {cookingOrders.length === 0 && readyOrders.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl p-8 text-center border border-slate-200">
            <span className="material-symbols-outlined text-slate-300 text-[48px] mb-2">
              task_alt
            </span>
            <h3 className="text-lg font-bold text-[#131b2e]">¡Cocina al día!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              No hay pedidos pendientes en freidoras. Los nuevos pedidos validados aparecerán aquí
              automáticamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
