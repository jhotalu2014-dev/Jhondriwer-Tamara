import React, { useState } from 'react';
import { useApp, sanitizeInput } from '../../context/AppContext';

export const ClientCheckout: React.FC = () => {
  const {
    cart,
    cartTotal,
    updateCartItemQuantity,
    removeFromCart,
    createOrder,
    setActiveView,
    showToast,
  } = useApp();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'recojo'>('delivery');
  const [clientName, setClientName] = useState('Carlos Méndez');
  const [clientPhone, setClientPhone] = useState('999 458 123');
  const [clientAddress, setClientAddress] = useState('Av. Angélica Gamarra 1420 - Los Olivos');
  const [yapeCode, setYapeCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Fallback items if cart is empty so user can experience full checkout
  const effectiveTotal = cartTotal > 0 ? cartTotal : 37.00;

  const handleCopyPhone = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('999999999').catch(() => {});
    }
    setCopiedPhone(true);
    showToast('Número 999 999 999 copiado al portapapeles', 'success');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleConfirmPayment = () => {
    const cleanCode = sanitizeInput(yapeCode).trim();
    if (cleanCode.length < 4) {
      showToast('Ingresa los 4 dígitos del comprobante Yape', 'error');
      return;
    }

    setIsSubmitting(true);
    showToast('Validando formato de comprobante bancario...', 'info');

    setTimeout(() => {
      const created = createOrder({
        clientName,
        clientPhone,
        deliveryType,
        address: clientAddress,
        paymentCode: cleanCode,
      });

      setIsSubmitting(false);
      showToast(`¡Pago Yape registrado para la orden ${created.id}!`, 'success');
      setActiveView('client_tracking');
    }, 900);
  };

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
              Checkout Pedido
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Notificaciones"
              onClick={() => showToast('Pasarela Yape en línea y cifrada', 'info')}
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

      {/* Main Checkout Body */}
      <main className="flex-1 px-4 pt-3 flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#a43700] text-white text-[11px] font-bold shadow-sm">
              1
            </span>
            <span className="text-[14px] font-bold text-[#131b2e]">Revisión</span>
            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#712ae2] text-white text-[11px] font-bold shadow-sm">
              2
            </span>
            <span className="text-[14px] font-bold text-[#712ae2]">Pago Yape</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-[#7cf994]/40 text-[#007230] text-[11px] font-bold flex items-center gap-1 shadow-sm border border-[#7cf994]">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            <span>{cart.length > 0 ? `${cart.length} Platos` : '3 Platos'}</span>
          </div>
        </div>

        {/* Card 1: Items del Pedido */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-[#131b2e] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#a43700] text-[18px]">restaurant</span>
              Resumen de tu Orden
            </h2>
            <span className="text-[11px] text-[#5a4138] font-medium">Mordisco Ya #0084</span>
          </div>

          {/* List of items */}
          <div className="space-y-2.5">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-[#f2f3ff] rounded-xl p-3 flex items-start justify-between gap-3 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#a43700]"></div>
                  <div className="flex-1 min-w-0 pl-1">
                    <p className="text-[14px] text-[#131b2e] font-bold truncate">
                      {item.productName}
                    </p>
                    {item.specialNotes && (
                      <p className="text-[11px] text-[#5a4138] italic">"{item.specialNotes}"</p>
                    )}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#131b2e] text-[10px] font-bold">
                        x{item.quantity}
                      </span>
                      {item.selectedSauces.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-full bg-white text-slate-700 text-[10px] border border-slate-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[14px] font-black text-[#a43700]">
                      S/ {item.itemTotal.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1 bg-white rounded-full p-0.5 border border-slate-200">
                      <button
                        onClick={() => updateCartItemQuantity(item.cartItemId, -1)}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-slate-600 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItemQuantity(item.cartItemId, 1)}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-slate-600 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Default representative items matching UI mock
              <>
                <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-start justify-between gap-3 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#a43700]"></div>
                  <div className="flex-1 min-w-0 pl-1">
                    <p className="text-[14px] text-[#131b2e] font-bold truncate">Hamburguesa Especial</p>
                    <p className="text-[11px] text-[#5a4138]">Con papas artesanales y ensalada fresca</p>
                    <div className="flex gap-1.5 mt-1">
                      <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#131b2e] text-[10px] font-bold">x1</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#131b2e] text-[10px]">Todas las cremas</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[11px] text-slate-400 line-through block">S/ 12.00</span>
                    <span className="text-[14px] font-bold text-[#a43700]">S/ 10.00</span>
                  </div>
                </div>

                <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-start justify-between gap-3 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#a43700]"></div>
                  <div className="flex-1 min-w-0 pl-1">
                    <p className="text-[14px] text-[#131b2e] font-bold truncate">Pollo Broaster Clásico</p>
                    <p className="text-[11px] text-[#5a4138]">Con papas fritas crocantes y ensalada</p>
                    <div className="flex gap-1.5 mt-1">
                      <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#131b2e] text-[10px] font-bold">x1</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#7cf994]/40 text-[#007230] text-[10px] font-bold">Pierna crocante</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[14px] font-bold text-[#a43700]">S/ 12.00</span>
                  </div>
                </div>

                <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-start justify-between gap-3 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#a43700]"></div>
                  <div className="flex-1 min-w-0 pl-1">
                    <p className="text-[14px] text-[#131b2e] font-bold truncate">Broaster + Arroz Blanco</p>
                    <p className="text-[11px] text-[#5a4138]">Porción generosa de arroz, papas y ensalada</p>
                    <div className="flex gap-1.5 mt-1">
                      <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#131b2e] text-[10px] font-bold">x1</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#131b2e] text-[10px]">Ají extra</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[14px] font-bold text-[#a43700]">S/ 15.00</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Price breakdown */}
          <div className="pt-2 flex flex-col gap-1.5 border-t border-slate-100">
            <div className="flex justify-between text-[12px] text-[#5a4138]">
              <span>Subtotal productos</span>
              <span>S/ {effectiveTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[12px] text-[#5a4138]">
              <span>Envío express</span>
              <span className="text-[#006e2d] font-bold">GRATIS</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-[16px] font-bold text-[#131b2e]">Total a Pagar</span>
              <span className="text-[26px] font-black text-[#a43700] tracking-tight">
                S/ {effectiveTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Datos de Entrega */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-[#131b2e] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#a43700] text-[18px]">local_shipping</span>
              Datos de Entrega
            </h2>
            <span className="text-[11px] text-[#006e2d] font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">schedule</span> 25-35 min
            </span>
          </div>

          {/* Toggle Delivery / Recojo */}
          <div className="grid grid-cols-2 p-1 bg-[#f2f3ff] rounded-full">
            <button
              type="button"
              onClick={() => setDeliveryType('delivery')}
              className={`py-2 px-3 rounded-full text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                deliveryType === 'delivery'
                  ? 'bg-[#a43700] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">moped</span>
              <span>Delivery</span>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryType('recojo')}
              className={`py-2 px-3 rounded-full text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                deliveryType === 'recojo'
                  ? 'bg-[#a43700] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">storefront</span>
              <span>Recojo en tienda</span>
            </button>
          </div>

          {/* Form Inputs with Sanitization */}
          <div className="flex flex-col gap-2.5">
            <div>
              <label className="block text-[11px] text-slate-500 mb-1 font-semibold" htmlFor="client-name">
                Nombre del titular
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px]">
                  person
                </span>
                <input
                  id="client-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(sanitizeInput(e.target.value))}
                  className="w-full h-11 pl-10 pr-3 rounded-full bg-[#f2f3ff] text-[#131b2e] text-[13px] outline-none focus:bg-white focus:ring-2 focus:ring-[#a43700] transition-all"
                />
              </div>
            </div>

            {deliveryType === 'delivery' && (
              <div>
                <label className="block text-[11px] text-slate-500 mb-1 font-semibold" htmlFor="client-address">
                  Dirección de entrega
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px]">
                    location_on
                  </span>
                  <input
                    id="client-address"
                    type="text"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(sanitizeInput(e.target.value))}
                    className="w-full h-11 pl-10 pr-3 rounded-full bg-[#f2f3ff] text-[#131b2e] text-[13px] outline-none focus:bg-white focus:ring-2 focus:ring-[#a43700] transition-all"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Pago Rápido con Yape (Hero Payment Module) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#eaddff] opacity-60 blur-2xl pointer-events-none"></div>

          {/* Badge Header */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaddff] text-[#25005a] text-[11px] font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[15px]">qr_code_scanner</span>
            <span>Paga al instante con Yape</span>
          </div>
          <p className="text-[12px] text-[#5a4138] max-w-xs mb-3">
            Escanea el QR oficial desde tu app Yape o transfiere directamente al número registrado:
          </p>

          {/* QR Frame Visual */}
          <div className="relative bg-white p-3.5 rounded-2xl shadow-md border border-purple-100 flex flex-col items-center mb-3">
            <div className="w-44 h-44 bg-white rounded-xl flex items-center justify-center p-1.5">
              <svg
                aria-label="Código QR para Yapear"
                className="w-full h-full text-[#131b2e]"
                fill="currentColor"
                viewBox="0 0 160 160"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect fill="#131B2E" height="40" rx="6" width="40" x="10" y="10" />
                <rect fill="#ffffff" height="24" rx="3" width="24" x="18" y="18" />
                <rect fill="#712AE2" height="14" rx="2" width="14" x="23" y="23" />
                <rect fill="#131B2E" height="40" rx="6" width="40" x="110" y="10" />
                <rect fill="#ffffff" height="24" rx="3" width="24" x="118" y="18" />
                <rect fill="#712AE2" height="14" rx="2" width="14" x="123" y="23" />
                <rect fill="#131B2E" height="40" rx="6" width="40" x="10" y="110" />
                <rect fill="#ffffff" height="24" rx="3" width="24" x="18" y="118" />
                <rect fill="#712AE2" height="14" rx="2" width="14" x="23" y="123" />
                <rect fill="#131B2E" height="8" rx="1" width="8" x="60" y="14" />
                <rect fill="#131B2E" height="8" rx="1" width="8" x="74" y="14" />
                <rect fill="#712AE2" height="8" rx="1" width="8" x="88" y="14" />
                <rect fill="#131B2E" height="8" rx="1" width="8" x="58" y="28" />
                <rect fill="#131B2E" height="8" rx="1" width="16" x="76" y="28" />
                <rect fill="#712AE2" height="8" rx="1" width="12" x="60" y="42" />
                <rect fill="#131B2E" height="8" rx="1" width="8" x="80" y="42" />
                <rect fill="#131B2E" height="8" rx="1" width="8" x="14" y="60" />
                <rect fill="#131B2E" height="8" rx="1" width="16" x="28" y="60" />
                <rect fill="#131B2E" height="8" rx="1" width="8" x="52" y="60" />
                <rect fill="#712AE2" height="8" rx="1" width="24" x="68" y="60" />
                <rect fill="#131B2E" height="8" rx="1" width="12" x="100" y="60" />
                <rect fill="#131B2E" height="8" rx="1" width="8" x="120" y="60" />
                <rect fill="#131B2E" height="8" rx="1" width="12" x="136" y="60" />
                {/* Center Brand Emblem */}
                <rect fill="#712AE2" height="36" rx="8" width="36" x="62" y="62" />
                <circle cx="80" cy="80" fill="#ffffff" r="13" />
                <path d="M76 74 L80 81 L84 74 H87 L81.5 83 V87 H78.5 V83 L73 74 Z" fill="#712AE2" />
                <rect fill="#131B2E" height="8" rx="1" width="14" x="14" y="74" />
                <rect fill="#131B2E" height="8" rx="1" width="8" x="36" y="74" />
                <rect fill="#131B2E" height="8" rx="1" width="18" x="110" y="74" />
                <rect fill="#712AE2" height="8" rx="1" width="8" x="136" y="74" />
                <rect fill="#712AE2" height="8" rx="1" width="8" x="14" y="88" />
                <rect fill="#131B2E" height="8" rx="1" width="12" x="30" y="88" />
                <rect fill="#131B2E" height="8" rx="1" width="8" x="48" y="88" />
                <rect fill="#131B2E" height="8" rx="1" width="8" x="106" y="88" />
                <rect fill="#131B2E" height="8" rx="1" width="22" x="122" y="88" />
                <rect fill="#131B2E" height="8" rx="1" width="12" x="60" y="112" />
                <rect fill="#712AE2" height="8" rx="1" width="18" x="80" y="112" />
                <rect fill="#131B2E" height="8" rx="1" width="8" x="106" y="112" />
                <rect fill="#131B2E" height="8" rx="1" width="16" x="122" y="112" />
                <rect fill="#131B2E" height="8" rx="1" width="20" x="62" y="126" />
                <rect fill="#131B2E" height="8" rx="1" width="12" x="90" y="126" />
                <rect fill="#712AE2" height="8" rx="1" width="18" x="110" y="126" />
                <rect fill="#131B2E" height="8" rx="1" width="8" x="136" y="126" />
                <rect fill="#712AE2" height="8" rx="1" width="8" x="60" y="140" />
                <rect fill="#131B2E" height="8" rx="1" width="24" x="76" y="140" />
                <rect fill="#131B2E" height="8" rx="1" width="12" x="108" y="140" />
                <rect fill="#131B2E" height="8" rx="1" width="16" x="128" y="140" />
              </svg>
            </div>
            <span className="mt-2 text-[11px] text-[#712ae2] font-extrabold tracking-wide">
              MORDISCO YA POS OFICIAL
            </span>
          </div>

          {/* Phone Number Copy Pill */}
          <div
            onClick={handleCopyPhone}
            className="flex items-center gap-2 bg-[#f2f3ff] px-4 py-2 rounded-full mb-3 cursor-pointer active:scale-95 transition-transform hover:bg-[#eaedff]"
          >
            <span className="material-symbols-outlined text-[#712ae2] text-[18px]">smartphone</span>
            <span className="text-[15px] font-black text-[#131b2e] tracking-wider">999 999 999</span>
            <button
              type="button"
              className="w-6 h-6 rounded-full bg-[#eaddff] text-[#25005a] flex items-center justify-center hover:opacity-80 ml-1"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copiedPhone ? 'done' : 'content_copy'}
              </span>
            </button>
          </div>

          {/* Exact amount reminder */}
          <div className="bg-[#dae2fd] px-4 py-2.5 rounded-xl w-full mb-4 text-left flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-600 block">Monto exacto a transferir:</span>
              <span className="text-[18px] font-black text-[#712ae2]">
                S/ {effectiveTotal.toFixed(2)}
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#7cf994] text-[#007230] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
          </div>

          {/* Reference Code Input */}
          <div className="w-full text-left mb-4">
            <label className="block text-[11px] text-slate-600 mb-1 font-semibold" htmlFor="yape-code">
              Código de Aprobación Yape (4 últimos dígitos)
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[#712ae2] text-[18px]">
                receipt_long
              </span>
              <input
                id="yape-code"
                type="text"
                maxLength={8}
                placeholder="Ej. 8492"
                value={yapeCode}
                onChange={(e) => setYapeCode(sanitizeInput(e.target.value.toUpperCase()))}
                className="w-full h-11 pl-10 pr-3 rounded-full bg-[#f2f3ff] text-[#131b2e] text-[14px] outline-none focus:bg-white focus:ring-2 focus:ring-[#712ae2] transition-all font-mono font-bold tracking-widest uppercase"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 pl-2">
              Validación contra duplicidad y fecha en tiempo real.
            </p>
          </div>

          {/* Primary Yape Confirmation Button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirmPayment}
            className={`w-full h-12 rounded-full text-white font-bold text-[14px] tracking-wide flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all ${
              isSubmitting
                ? 'bg-purple-700 opacity-90'
                : 'bg-[#712ae2] hover:bg-[#8a4cfc]'
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">
                  autorenew
                </span>
                <span>PROCESANDO VALIDACIÓN...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>CONFIRMAR PAGO YAPE</span>
              </>
            )}
          </button>
        </div>

        {/* Security & Guarantee Badge */}
        <div className="flex items-center justify-center gap-2 text-slate-500 text-[11px] pb-4">
          <span className="material-symbols-outlined text-[#006e2d] text-[16px]">lock</span>
          <span>Transacción protegida por confirmación bancaria inmediata</span>
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
            onClick={() => setActiveView('client_checkout')}
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
