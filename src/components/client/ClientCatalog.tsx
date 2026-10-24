import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory } from '../../types';

export const ClientCatalog: React.FC = () => {
  const {
    products,
    setSelectedProductForDetail,
    setActiveView,
    cartCount,
    cartTotal,
    showToast,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'todos' || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenDetail = (product: Product) => {
    setSelectedProductForDetail(product);
    setActiveView('client_detail');
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col relative pb-24">
      {/* Phone Header Status Bar */}
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
              onClick={() => showToast('Inicio del catálogo', 'info')}
              className="w-10 h-10 rounded-full bg-[#283044] text-[#eef0ff] shadow-sm flex items-center justify-center active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <span className="text-[18px] tracking-tight font-bold text-[#131b2e] truncate pl-1">
              Catalogo
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Notificaciones"
              onClick={() => showToast('Cocina abierta y tomando pedidos al instante', 'info')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#5a4138] hover:text-[#131b2e] transition-colors relative"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#a43700]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#a43700] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 pt-3 flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Friendly Brand Banner */}
        <div className="flex flex-col items-center justify-center text-center px-1 pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7cf994]/40 text-[#007230] text-[11px] font-bold shadow-sm mb-2 border border-[#7cf994]">
            <span className="w-2 h-2 rounded-full bg-[#006e2d] animate-pulse"></span>
            Cocina abierta • Envíos a tiempo
          </span>
          <h1 className="text-[22px] text-[#131b2e] font-extrabold tracking-tight">
            ¿Qué quieres comer?
          </h1>
          <p className="text-[13px] text-[#5a4138] mt-0.5">
            Crujiente, jugoso y preparado al instante
          </p>
        </div>

        {/* Quick Search Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar broaster, hamburguesas, cremas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-[#f2f3ff] text-[#131b2e] text-[13px] outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#a43700] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 -mx-4 px-4 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('todos')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold flex-shrink-0 active:scale-95 transition-all shadow-sm ${
              selectedCategory === 'todos'
                ? 'bg-[#a43700] text-white'
                : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">restaurant_menu</span>
            <span>Todo el Menú</span>
          </button>

          <button
            onClick={() => setSelectedCategory('broaster')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold flex-shrink-0 active:scale-95 transition-all shadow-sm ${
              selectedCategory === 'broaster'
                ? 'bg-[#a43700] text-white'
                : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#a43700]">
              local_fire_department
            </span>
            <span>Broaster</span>
          </button>

          <button
            onClick={() => setSelectedCategory('burgers')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold flex-shrink-0 active:scale-95 transition-all shadow-sm ${
              selectedCategory === 'burgers'
                ? 'bg-[#a43700] text-white'
                : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#a43700]">lunch_dining</span>
            <span>Burgers</span>
          </button>

          <button
            onClick={() => setSelectedCategory('combos')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold flex-shrink-0 active:scale-95 transition-all shadow-sm ${
              selectedCategory === 'combos'
                ? 'bg-[#a43700] text-white'
                : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#a43700]">local_cafe</span>
            <span>Combos & Bebidas</span>
          </button>
        </div>

        {/* Fast Food Product List */}
        <div className="flex flex-col gap-3.5 mt-1">
          {filteredProducts.map((prod) => {
            const badgeBg =
              prod.badgeColor === 'secondary'
                ? 'bg-[#7cf994] text-[#007230]'
                : prod.badgeColor === 'tertiary'
                ? 'bg-[#eaddff] text-[#25005a]'
                : 'bg-[#ffdbcf] text-[#380d00]';

            return (
              <article
                key={prod.id}
                className="flex items-center gap-3 p-3.5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-100 group"
              >
                <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {prod.badge && (
                    <span
                      className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${badgeBg}`}
                    >
                      {prod.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <h2 className="text-[17px] text-[#131b2e] font-bold truncate">
                        {prod.name}
                      </h2>
                      <span className="inline-flex items-center text-[#006e2d] text-xs font-bold gap-0.5">
                        <span className="material-symbols-outlined text-[14px]">star</span>
                        {prod.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#5a4138] line-clamp-1 mt-0.5">
                      {prod.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-2 pt-1">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Precio
                      </span>
                      <span className="text-[19px] text-[#a43700] font-extrabold leading-none">
                        S/. {prod.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenDetail(prod)}
                      className="px-3.5 py-2 rounded-full bg-[#a43700] text-white text-[12px] font-bold tracking-wide shadow-sm hover:bg-[#ce4700] active:scale-95 transition-all flex items-center gap-1"
                    >
                      <span>VER PRODUCTO</span>
                      <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Quick Payment & Delivery Assurance Badge */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f2f3ff] mt-1 border border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#712ae2]/15 text-[#712ae2] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
            </div>
            <div>
              <p className="text-[13px] text-[#131b2e] font-bold">Aceptamos Yape y Plin</p>
              <p className="text-[11px] text-[#5a4138]">Sin comisiones, confirmación al instante</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#006e2d] text-[22px]">verified</span>
        </div>

        {/* Cart Quick Bar if items present */}
        {cartCount > 0 && (
          <div className="sticky bottom-20 z-30 bg-[#283044] text-white p-3 rounded-2xl shadow-xl flex items-center justify-between animate-fade-in border border-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#a43700] flex items-center justify-center text-xs font-bold text-white">
                {cartCount}
              </span>
              <div>
                <p className="text-xs text-slate-300">Total en tu comanda</p>
                <p className="text-sm font-extrabold text-white">S/ {cartTotal.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveView('client_checkout')}
              className="px-4 py-2 rounded-full bg-[#a43700] hover:bg-[#ce4700] text-white font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
            >
              <span>IR A PAGAR</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        )}
      </main>

      {/* Fixed Bottom Navigation Tab */}
      <nav className="fixed bottom-0 inset-x-0 z-40 pb-2 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around h-15 px-4 max-w-md mx-auto">
          <button
            onClick={() => setActiveView('client_catalog')}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#ffdbcf] text-[#a43700] font-bold shadow-sm min-h-[42px]"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span className="text-[13px]">Inicio</span>
          </button>

          <button
            onClick={() => {
              if (products[2]) {
                setSelectedProductForDetail(products[2]);
                setActiveView('client_detail');
              }
            }}
            className="flex items-center gap-1 px-4 py-2 rounded-full text-[#5a4138] hover:text-[#131b2e] transition-all min-h-[42px]"
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
