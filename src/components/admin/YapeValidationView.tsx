import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';

export const YapeValidationView: React.FC = () => {
  const {
    orders,
    validateYapePayment,
    rejectYapePayment,
    showToast,
    isMfaVerified,
  } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState<'pendientes' | 'todos' | 'aprobados' | 'rechazados'>('pendientes');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderForInspect, setSelectedOrderForInspect] = useState<Order | null>(
    orders.find((o) => o.status === 'pago_pendiente') || orders[0]
  );
  const [rejectModalOrder, setRejectModalOrder] = useState<Order | null>(null);
  const [rejectReason, setRejectReason] = useState('Comprobante ilegible o monto incompleto');

  const pendingOrders = orders.filter((o) => o.status === 'pago_pendiente');
  const approvedOrders = orders.filter((o) => o.status !== 'pago_pendiente' && o.status !== 'rechazado');
  const rejectedOrders = orders.filter((o) => o.status === 'rechazado');

  const totalPendingAmount = pendingOrders.reduce((acc, o) => acc + o.total, 0);

  const displayedOrders = orders.filter((ord) => {
    if (activeTabFilter === 'pendientes' && ord.status !== 'pago_pendiente') return false;
    if (activeTabFilter === 'aprobados' && (ord.status === 'pago_pendiente' || ord.status === 'rechazado')) return false;
    if (activeTabFilter === 'rechazados' && ord.status !== 'rechazado') return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        ord.id.toLowerCase().includes(q) ||
        ord.clientName.toLowerCase().includes(q) ||
        ord.clientPhone.includes(q) ||
        (ord.yapeVoucher?.operationCode || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const inspectedOrder = selectedOrderForInspect || pendingOrders[0] || orders[0];
  const voucher = inspectedOrder?.yapeVoucher;

  const handleApprove = (orderId: string, opCode: string) => {
    const res = validateYapePayment(orderId, opCode);
    if (res.success) {
      // Pick next pending order for inspection if any
      const next = pendingOrders.find((o) => o.id !== orderId);
      if (next) setSelectedOrderForInspect(next);
    }
  };

  const handleRejectConfirm = () => {
    if (rejectModalOrder) {
      rejectYapePayment(rejectModalOrder.id, rejectReason);
      setRejectModalOrder(null);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 md:px-8 py-6 pb-20">
      {/* Header Info */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#712ae2]">
                Módulo de Tesorería POS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006e2d]">
                  verified_user
                </span>
                MFA Activo • ID Caja: 01
              </span>
            </div>
            <h1 className="text-[26px] md:text-[32px] font-black text-[#131b2e] tracking-tight">
              Validación de Pagos y Comprobantes Yape
            </h1>
            <p className="text-[13px] text-[#5a4138] max-w-2xl">
              Revisa las transferencias por código QR/número antes de enviar pedidos a cocina.
              Verificación en tiempo real contra pasarela Yape.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#712ae2] text-white shadow-sm font-bold text-[13px]">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>{pendingOrders.length} comprobantes pendientes</span>
              <span className="px-2 py-0.5 rounded-full bg-[#8a4cfc] text-white text-[11px]">
                S/ {totalPendingAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => showToast('Pasarela Yape sincronizada (0 discrepancias)', 'success')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#131b2e] hover:bg-slate-50 transition-colors text-[13px] font-bold shadow-sm border border-slate-200"
            >
              <span className="material-symbols-outlined text-[18px] text-[#a43700]">sync</span>
              <span>Refrescar Yape</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-white p-2.5 rounded-2xl shadow-sm border border-slate-200/80">
          <div className="md:col-span-5 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar por pedido (MYA-0004), cliente o celular..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#f2f3ff] text-[#131b2e] text-[13px] outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#712ae2]"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-1 p-1 bg-[#f2f3ff] rounded-full">
            <button
              onClick={() => setActiveTabFilter('todos')}
              className={`flex-1 py-1 px-2.5 rounded-full text-center text-[11px] font-bold transition-all ${
                activeTabFilter === 'todos' ? 'bg-[#131b2e] text-white' : 'text-slate-600'
              }`}
            >
              Todos ({orders.length})
            </button>
            <button
              onClick={() => setActiveTabFilter('pendientes')}
              className={`flex-1 py-1 px-2.5 rounded-full text-center text-[11px] font-bold transition-all ${
                activeTabFilter === 'pendientes'
                  ? 'bg-[#712ae2] text-white shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              Pendientes ({pendingOrders.length})
            </button>
            <button
              onClick={() => setActiveTabFilter('aprobados')}
              className={`flex-1 py-1 px-2.5 rounded-full text-center text-[11px] font-bold transition-all ${
                activeTabFilter === 'aprobados' ? 'bg-[#006e2d] text-white' : 'text-slate-600'
              }`}
            >
              Aprobados
            </button>
            <button
              onClick={() => setActiveTabFilter('rechazados')}
              className={`flex-1 py-1 px-2.5 rounded-full text-center text-[11px] font-bold transition-all ${
                activeTabFilter === 'rechazados' ? 'bg-rose-600 text-white' : 'text-slate-600'
              }`}
            >
              Rechazados
            </button>
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f2f3ff] text-[#131b2e] text-[12px] font-bold">
              <span className="material-symbols-outlined text-[16px] text-[#a43700]">
                calendar_today
              </span>
              <span>Hoy, 12 Octubre</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Left Queue (7 cols) + Right Inspector (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Cola de Aprobación Inmediata */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-[17px] font-bold text-[#131b2e]">
              Cola de Aprobación Inmediata
            </span>
            <span className="text-[12px] text-slate-500 font-medium">
              {displayedOrders.length} órdenes en lista
            </span>
          </div>

          <div className="flex flex-col gap-3.5">
            {displayedOrders.map((ord) => {
              const isSelected = inspectedOrder?.id === ord.id;
              const isPending = ord.status === 'pago_pendiente';

              return (
                <div
                  key={ord.id}
                  className={`relative bg-white p-4 rounded-2xl shadow-sm border transition-all ${
                    isSelected
                      ? 'border-[#712ae2] ring-2 ring-[#712ae2]/30 shadow-md'
                      : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[16px] font-black text-[#131b2e] tracking-tight">
                        #{ord.id}
                      </span>

                      {isPending ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] text-[11px] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
                          Yape Pendiente
                        </span>
                      ) : ord.status === 'rechazado' ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">cancel</span>
                          Rechazado
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#7cf994] text-[#007230] text-[11px] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">verified</span>
                          Aprobado
                        </span>
                      )}

                      <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-slate-600 text-[11px] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          {ord.deliveryType === 'delivery' ? 'moped' : 'storefront'}
                        </span>
                        <span className="capitalize">{ord.deliveryType}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                      <span className="material-symbols-outlined text-[15px] text-[#a43700]">
                        schedule
                      </span>
                      <span>{ord.createdAt}</span>
                      <span className="text-[#a43700] font-bold">({ord.timeAgo})</span>
                    </div>
                  </div>

                  {/* Customer and Order items */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        Cliente
                      </span>
                      <span className="text-[14px] text-[#131b2e] font-bold">
                        {ord.clientName}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[13px]">call</span>
                        {ord.clientPhone}
                      </span>
                    </div>

                    <div className="flex flex-col sm:col-span-2">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        Detalle del Pedido
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {ord.items.map((it) => (
                          <span
                            key={it.cartItemId}
                            className="px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#131b2e] text-[11px] font-medium"
                          >
                            {it.quantity}x {it.productName}
                          </span>
                        ))}
                      </div>
                      {ord.items[0]?.specialNotes && (
                        <span className="text-[11px] text-slate-500 mt-1 italic">
                          Notas: {ord.items[0].specialNotes}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subtotal & Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 bg-[#f2f3ff]/50 p-3 rounded-xl border border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">
                        Monto a cobrar
                      </span>
                      <span className="text-[22px] text-[#a43700] font-black leading-none mt-0.5">
                        S/ {ord.total.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setSelectedOrderForInspect(ord)}
                        className={`px-4 py-2 rounded-full text-[12px] font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 ${
                          isSelected
                            ? 'bg-[#712ae2] text-white'
                            : 'bg-white text-[#712ae2] hover:bg-purple-50 border border-purple-200'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">receipt</span>
                        <span>Ver Yape</span>
                      </button>

                      {isPending && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              handleApprove(
                                ord.id,
                                ord.yapeVoucher?.operationCode || '8492'
                              )
                            }
                            className="px-4 py-2 rounded-full bg-[#006e2d] hover:bg-[#005320] text-white text-[12px] font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                          >
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            <span>Confirmar Pago</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setRejectModalOrder(ord)}
                            className="w-9 h-9 rounded-full bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 flex items-center justify-center transition-colors"
                            title="Rechazar comprobante"
                          >
                            <span className="material-symbols-outlined text-[16px]">block</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Footer Security Signature */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-slate-500 text-[11px]">
                    <span className="flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px] text-[#006e2d]">
                        security
                      </span>
                      Cajero asignado: Carlos M. (MFA activo)
                    </span>
                    <span className="text-[#712ae2] font-mono font-bold">
                      {ord.yapeVoucher?.voucherCode || '#YAP-9284'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sticky Voucher Inspector (Visual Yape Receipt & Anti-fraud Engine) */}
        <div className="lg:col-span-5 flex flex-col gap-4 sticky top-20">
          <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
            {/* Inspector Header */}
            <div className="bg-[#712ae2] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white text-[#712ae2] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] leading-tight text-purple-200 uppercase font-semibold">
                    Inspección de Voucher
                  </span>
                  <span className="text-[17px] font-black text-white">
                    Pedido #{inspectedOrder?.id || 'MYA-0004'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
                  Anti-Fraude TLS
                </span>
              </div>
            </div>

            {/* Voucher Simulation Box */}
            <div className="p-5 flex flex-col items-center bg-[#faf8ff]">
              <div className="w-full max-w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-200/80 flex flex-col relative">
                {/* Purple Top Banner of Yape */}
                <div className="bg-[#712ae2] p-4 flex flex-col items-center text-white">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[10px] tracking-wider uppercase opacity-90 font-bold">
                      CONSTANCIA DE PAGO
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1">
                    <span className="material-symbols-outlined text-white text-[28px]">check</span>
                  </div>
                  <span className="text-[18px] font-extrabold text-white">¡Yapeaste!</span>
                  <div className="flex items-baseline gap-1 my-1">
                    <span className="text-[28px] font-black text-white tracking-tight">
                      S/ {inspectedOrder?.total.toFixed(2) || '37.00'}
                    </span>
                  </div>
                  <span className="text-[11px] text-white/80">
                    {voucher?.timestamp || '12 Oct 2026 - 19:41 h'}
                  </span>
                </div>

                {/* White Body Details */}
                <div className="p-4 flex flex-col gap-2.5 bg-white text-[#131b2e] text-[12px]">
                  <div className="flex flex-col pb-2 border-b border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Destino</span>
                    <span className="text-[13px] font-bold text-[#131b2e]">MORDISCO YA S.A.C.</span>
                    <span className="text-[11px] text-slate-500 font-mono">RUC: 20608912401</span>
                  </div>

                  <div className="flex flex-col pb-2 border-b border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Remitente</span>
                    <span className="text-[13px] font-semibold text-[#131b2e]">
                      {voucher?.senderName || inspectedOrder?.clientName || 'Juan Pérez Mendoza'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {voucher?.senderPhone || '*** *** 123'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      N° Operación
                    </span>
                    <span className="font-mono text-[#712ae2] font-black text-[13px]">
                      {voucher?.operationCode || 'OP-84920419'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Canal</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#eaddff] text-[#25005a] font-bold">
                      QR Dinámico POS
                    </span>
                  </div>
                </div>

                <div className="h-1.5 bg-gradient-to-r from-[#712ae2] via-[#8a4cfc] to-[#712ae2]"></div>
              </div>

              {/* MOTOR DE VALIDACIÓN AUTOMÁTICA */}
              <div className="w-full mt-4 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Motor de Validación Automática
                </span>

                <div className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-1.5 text-[#131b2e] font-medium">
                    <span className="material-symbols-outlined text-[#006e2d] text-[16px]">
                      check_circle
                    </span>
                    Monto exacto registrado
                  </span>
                  <span className="font-bold text-[#006e2d] text-[11px]">
                    COINCIDE (S/ {inspectedOrder?.total.toFixed(2)})
                  </span>
                </div>

                <div className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-1.5 text-[#131b2e] font-medium">
                    <span className="material-symbols-outlined text-[#006e2d] text-[16px]">
                      check_circle
                    </span>
                    Ventana de tiempo válida
                  </span>
                  <span className="font-bold text-[#006e2d] text-[11px]">HACE 3 MINUTOS</span>
                </div>

                <div className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-1.5 text-[#131b2e] font-medium">
                    <span className="material-symbols-outlined text-[#006e2d] text-[16px]">
                      check_circle
                    </span>
                    Comprobante no reutilizado
                  </span>
                  <span className="font-bold text-[#006e2d] text-[11px]">ÚNICO EN SISTEMA</span>
                </div>
              </div>

              {/* Action Buttons in Panel */}
              <div className="w-full mt-4 flex flex-col gap-2">
                {inspectedOrder?.status === 'pago_pendiente' ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleApprove(
                          inspectedOrder.id,
                          voucher?.operationCode || '8492'
                        )
                      }
                      className="w-full py-3 rounded-full bg-[#006e2d] hover:bg-[#005320] text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                    >
                      <span className="material-symbols-outlined text-[18px]">soup_kitchen</span>
                      <span>Confirmar Pago y Enviar a Cocina</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() =>
                          showToast('SMS / WhatsApp enviado al cliente solicitando reenvío', 'info')
                        }
                        className="py-2 px-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[11px] flex items-center justify-center gap-1 border border-slate-200 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">sms</span>
                        <span>Solicitar Reenvío</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRejectModalOrder(inspectedOrder)}
                        className="py-2 px-3 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-[11px] flex items-center justify-center gap-1 border border-rose-200 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">report_problem</span>
                        <span>Observar / Rechazar</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="w-full p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-[12px] font-bold text-emerald-800 flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      Comprobante Verificado y Derivado a Cocina
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Total Turn Balance Card */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7cf994]/50 flex items-center justify-center text-[#006e2d]">
                <span className="material-symbols-outlined text-[22px]">payments</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-[#131b2e] font-bold">
                  Total Yape Hoy en Turno
                </span>
                <span className="text-[11px] text-slate-500">
                  {approvedOrders.length + 18} transferencias aprobadas
                </span>
              </div>
            </div>
            <span className="text-[22px] font-black text-[#006e2d]">
              S/ {(684.50 + (approvedOrders.length * 15)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-rose-600">
              <span className="material-symbols-outlined text-[24px]">warning</span>
              <h3 className="text-[16px] font-bold">Observar Comprobante Yape</h3>
            </div>
            <p className="text-[12px] text-slate-600">
              Ingresa el motivo del rechazo para la orden {rejectModalOrder.id}:
            </p>

            <select
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#f2f3ff] text-[13px] border border-slate-200 outline-none"
            >
              <option value="Comprobante ilegible o monto incompleto">
                Comprobante ilegible o monto incompleto
              </option>
              <option value="Código de operación no encontrado en pasarela">
                Código de operación no encontrado en pasarela
              </option>
              <option value="Comprobante reciclado o ya cobrado">
                Comprobante reciclado o ya cobrado
              </option>
              <option value="Transferencia enviada a número equivocado">
                Transferencia enviada a número equivocado
              </option>
            </select>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => setRejectModalOrder(null)}
                className="py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[12px] font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={handleRejectConfirm}
                className="py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-[12px] font-bold"
              >
                Confirmar Rechazo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
