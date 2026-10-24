import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopNavigation } from './components/common/TopNavigation';
import { ClientCatalog } from './components/client/ClientCatalog';
import { ProductDetailModal } from './components/client/ProductDetailModal';
import { ClientCheckout } from './components/client/ClientCheckout';
import { ClientTracking } from './components/client/ClientTracking';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { YapeValidationView } from './components/admin/YapeValidationView';
import { KitchenKdsView } from './components/admin/KitchenKdsView';
import { SecurityAuditModal } from './components/admin/SecurityAuditModal';

const MainLayout: React.FC = () => {
  const { activeView, toast } = useApp();
  const [isMobileSimulator, setIsMobileSimulator] = useState<boolean>(true);

  const isClientView =
    activeView === 'client_catalog' ||
    activeView === 'client_detail' ||
    activeView === 'client_checkout' ||
    activeView === 'client_tracking';

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans selection:bg-[#ffdbcf]">
      {/* Top Global Role & Environment Switcher Bar */}
      <TopNavigation
        isMobileSimulator={isMobileSimulator}
        setIsMobileSimulator={setIsMobileSimulator}
      />

      {/* Main Body Area */}
      <div className="flex-1 flex flex-col w-full relative">
        {isClientView ? (
          // Client Mobile Mode or Fullscreen Mode
          <div className="flex-1 flex justify-center items-start py-0 md:py-6 bg-slate-100/70">
            {isMobileSimulator ? (
              <div className="w-full max-w-[430px] min-h-[100dvh] md:min-h-[880px] bg-[#faf8ff] md:rounded-[40px] shadow-2xl md:ring-12 md:ring-slate-900/90 overflow-hidden relative border border-slate-300/40">
                {/* Dynamic Screen Component */}
                {activeView === 'client_catalog' && <ClientCatalog />}
                {activeView === 'client_detail' && <ProductDetailModal />}
                {activeView === 'client_checkout' && <ClientCheckout />}
                {activeView === 'client_tracking' && <ClientTracking />}
              </div>
            ) : (
              <div className="w-full max-w-2xl bg-[#faf8ff] min-h-screen shadow-md">
                {activeView === 'client_catalog' && <ClientCatalog />}
                {activeView === 'client_detail' && <ProductDetailModal />}
                {activeView === 'client_checkout' && <ClientCheckout />}
                {activeView === 'client_tracking' && <ClientTracking />}
              </div>
            )}
          </div>
        ) : (
          // Admin / POS / Kitchen Workspace
          <div className="min-h-screen bg-[#faf8ff] flex">
            <AdminSidebar />
            <div className="flex-1 pl-[72px] md:pl-[260px] min-h-screen">
              {activeView === 'admin_dashboard' && <AdminDashboard />}
              {activeView === 'admin_yape' && <YapeValidationView />}
              {activeView === 'admin_kitchen' && <KitchenKdsView />}
              {activeView === 'admin_security' && <SecurityAuditModal />}
            </div>
          </div>
        )}
      </div>

      {/* Global Interactive Notification Toast */}
      {toast.visible && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full shadow-2xl text-[13px] font-bold flex items-center gap-2 backdrop-blur-md transition-all animate-bounce">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              toast.type === 'error'
                ? 'bg-rose-600 text-white'
                : toast.type === 'info'
                ? 'bg-[#712ae2] text-white'
                : 'bg-[#006e2d] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {toast.type === 'error'
                ? 'error'
                : toast.type === 'info'
                ? 'info'
                : 'check_circle'}
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
