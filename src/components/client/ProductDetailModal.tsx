import React, { useState } from 'react';
import { useApp, sanitizeInput } from '../../context/AppContext';
import { CartItem } from '../../types';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    products,
    setActiveView,
    addToCart,
    cartCount,
    showToast,
  } = useApp();

  const product = selectedProductForDetail || products[2] || products[0];

  const [quantity, setQuantity] = useState<number>(1);
  const [isChaufa, setIsChaufa] = useState<boolean>(false);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([
    'Mayonesa artesanal',
    'Ketchup',
    'Ají pollero casero',
  ]);
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const chaufaExtra = isChaufa ? 2.0 : 0;
  const unitPrice = product.price + chaufaExtra;
  const calculatedTotal = unitPrice * quantity;

  const toggleSauce = (sauceName: string) => {
    setSelectedSauces((prev) =>
      prev.includes(sauceName)
        ? prev.filter((s) => s !== sauceName)
        : [...prev, sauceName]
    );
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const clean = sanitizeInput(e.target.value.slice(0, 120));
    setSpecialNotes(clean);
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    const newItem: CartItem = {
      cartItemId: `item-${Date.now()}`,
      productId: product.id,
      productName: isChaufa ? `${product.name} + Chaufa` : product.name,
      basePrice: product.price,
      quantity,
      isChaufa,
      selectedSauces: [...selectedSauces],
      specialNotes: specialNotes.trim(),
      itemTotal: calculatedTotal,
      image: product.image,
    };

    addToCart(newItem);

    setTimeout(() => {
      setIsAdding(false);
      setActiveView('client_checkout');
    }, 600);
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col relative pb-28">
      {/* Header bar */}
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
              Menu Detallado
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Notificaciones"
              onClick={() => showToast('Producto con stock garantizado', 'info')}
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

      {/* Main product configuration container */}
      <main className="flex-1 px-4 pt-3 flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Banner Visual & Header del Producto Seleccionado */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-[#a43700] via-[#ce4700] to-[#a83900] p-5 text-white">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
          <div className="flex items-start justify-between gap-2 relative z-10">
            <div className="flex-1 pr-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 text-white text-[11px] font-bold mb-2 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                <span>Especialidad de la casa</span>
              </div>
              <h1 className="text-[22px] font-extrabold tracking-tight text-white drop-shadow-sm">
                {product.name}
              </h1>
              <p className="text-[12px] text-white/90 mt-1 leading-snug">
                {product.description}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-white/80 uppercase tracking-wider font-semibold">
                Precio
              </span>
              <span className="text-[24px] font-black text-white whitespace-nowrap">
                S/. {product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Fotografía Destacada del Plato */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm bg-slate-100 border border-slate-200/60">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm flex items-center gap-1 text-[#a43700]">
            <span className="material-symbols-outlined text-[15px]">star</span>
            <span className="text-[12px] font-bold text-[#131b2e]">
              {product.rating.toFixed(1)} ({product.reviewCount}+ reseñas)
            </span>
          </div>
        </div>

        {/* Controlador de Cantidad */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[16px] font-bold text-[#131b2e] block">Cantidad</span>
            <span className="text-[12px] text-[#5a4138]">Selecciona las porciones</span>
          </div>
          <div className="flex items-center gap-3 bg-[#f2f3ff] px-2 py-1.5 rounded-full">
            <button
              type="button"
              aria-label="Disminuir porción"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-full bg-white text-[#131b2e] shadow-sm flex items-center justify-center active:scale-90 transition-transform font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="text-[17px] font-black text-[#a43700] min-w-[28px] text-center select-none">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Aumentar porción"
              onClick={() => setQuantity((q) => Math.min(15, q + 1))}
              className="w-9 h-9 rounded-full bg-[#a43700] text-white shadow-sm flex items-center justify-center active:scale-90 transition-transform font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>
        </div>

        {/* Sección Adicionales y Cremas */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3 pb-1">
            <div>
              <h2 className="text-[16px] font-bold text-[#131b2e]">¿Deseas agregar algo?</h2>
              <p className="text-[12px] text-[#5a4138]">Personaliza tus cremas y acompañamientos</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#7cf994]/40 text-[#007230] text-[11px] font-bold">
              Opcional
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {/* Arroz blanco / Arroz Chaufa (if applicable) */}
            {product.allowsChaufaOption && (
              <>
                <label
                  onClick={() => setIsChaufa(false)}
                  className={`group relative flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                    !isChaufa
                      ? 'bg-[#eaedff] border-[#a43700]/30'
                      : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors shadow-inner ${
                        !isChaufa ? 'bg-[#a43700] text-white' : 'bg-slate-300'
                      }`}
                    >
                      {!isChaufa && (
                        <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                      )}
                    </div>
                    <span className="text-[13px] font-semibold text-[#131b2e]">Arroz blanco</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold">Incluido</span>
                </label>

                <label
                  onClick={() => setIsChaufa(true)}
                  className={`group relative flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                    isChaufa
                      ? 'bg-[#eaedff] border-[#a43700]/30'
                      : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors shadow-inner ${
                        isChaufa ? 'bg-[#a43700] text-white' : 'bg-slate-300'
                      }`}
                    >
                      {isChaufa && (
                        <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                      )}
                    </div>
                    <div>
                      <span className="text-[13px] font-semibold text-[#131b2e] block">
                        Cambio a Arroz chaufa
                      </span>
                      <span className="text-[11px] text-[#5a4138]">Estilo chifa al wok</span>
                    </div>
                  </div>
                  <span className="text-[12px] font-bold text-[#a43700]">+ S/. 2.00</span>
                </label>
              </>
            )}

            {/* Salsas peruanas */}
            {[
              { id: 'Mayonesa artesanal', name: 'Mayonesa artesanal' },
              { id: 'Ketchup', name: 'Ketchup' },
              { id: 'Mostaza clásica', name: 'Mostaza clásica' },
              { id: 'Ocopa arequipeña', name: 'Ocopa arequipeña', icon: 'eco', iconColor: 'text-[#006e2d]' },
              { id: 'Ají pollero casero', name: 'Ají pollero casero', icon: 'whatshot', iconColor: 'text-[#a43700]' },
            ].map((sauce) => {
              const checked = selectedSauces.includes(sauce.id);
              return (
                <label
                  key={sauce.id}
                  onClick={() => toggleSauce(sauce.id)}
                  className={`group relative flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                    checked
                      ? 'bg-[#eaedff] border-[#a43700]/30'
                      : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors shadow-inner ${
                        checked ? 'bg-[#a43700] text-white' : 'bg-slate-300'
                      }`}
                    >
                      {checked && (
                        <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-semibold text-[#131b2e]">{sauce.name}</span>
                      {sauce.icon && (
                        <span className={`material-symbols-outlined text-[16px] ${sauce.iconColor}`}>
                          {sauce.icon}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] text-[#006e2d] font-bold">Gratis</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Campo Observaciones con Sanitización */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <label className="flex items-center gap-1.5 mb-2" htmlFor="order-notes">
            <span className="material-symbols-outlined text-[#a43700] text-[20px]">edit_note</span>
            <span className="text-[15px] font-bold text-[#131b2e]">Observaciones especiales</span>
          </label>
          <div className="relative">
            <textarea
              id="order-notes"
              value={specialNotes}
              onChange={handleNotesChange}
              placeholder="Ej: cremas aparte, sin ensalada, presa pierna bien frita..."
              rows={3}
              className="w-full p-3 bg-[#f2f3ff] rounded-xl text-[#131b2e] text-[13px] placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#a43700] transition-all resize-none"
            />
            <div className="flex items-center justify-between mt-1 text-slate-500 text-[11px] px-1">
              <span>Instrucciones seguras para cocina</span>
              <span>{specialNotes.length}/120</span>
            </div>
          </div>
        </div>

        {/* Resumen de Costo y Botón Continuar Pedido */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-md border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between text-[#5a4138] text-[14px] pb-1 border-b border-slate-100">
            <span>Subtotal del plato:</span>
            <span className="font-extrabold text-[#a43700] text-[18px]">
              S/. {calculatedTotal.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            disabled={isAdding}
            onClick={handleAddToCart}
            className={`w-full h-12 text-white rounded-full shadow-lg flex items-center justify-center gap-2 font-bold text-[14px] tracking-wide active:scale-95 transition-all ${
              isAdding ? 'bg-[#006e2d]' : 'bg-[#a43700] hover:bg-[#ce4700]'
            }`}
          >
            {isAdding ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check</span>
                <span>¡AGREGADO A TU ORDEN!</span>
              </>
            ) : (
              <>
                <span>CONTINUAR PEDIDO</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </main>

      {/* Fixed Bottom Navigation Tab */}
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
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#ffdbcf] text-[#a43700] font-bold shadow-sm min-h-[42px]"
          >
            <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
            <span className="text-[13px]">Menú</span>
          </button>

          <button
            onClick={() => setActiveView('client_checkout')}
            className="flex items-center gap-1 px-4 py-2 rounded-full text-[#5a4138] hover:text-[#131b2e] transition-all min-h-[42px] relative"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span className="text-[13px]">Pedido</span>
            {cartCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#a43700] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};
