import { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';
import AppSidebar from './components/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from './shadcn/components/ui/sidebar';
import { TooltipProvider } from './shadcn/components/ui/tooltip';
import { Button } from './shadcn/components/ui/button';

const API = 'http://localhost:3001';

function Dashboard() {
  const { setCustomers, setOrders } = useApp();
  const [activeTab, setActiveTab] = useState<'customer' | 'order'>('customer');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${API}/customers`).then(r => setCustomers(r.data));
    axios.get(`${API}/orders`).then(r => setOrders(r.data));
  }, [setCustomers, setOrders]);

  return (
    <SidebarProvider>
      <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <SidebarInset className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card/85 backdrop-blur-md px-6 select-none transition-all duration-300">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="h-4 w-[1px] bg-border" />
            <h1 className="text-lg font-extrabold text-foreground tracking-tight transition-all duration-200">
              {activeTab === 'customer' ? 'Daftar Customer' : 'Daftar Order'}
            </h1>
          </div>

          <div>
            {activeTab === 'customer' && (
              <Button
                onClick={() => setIsCustomerModalOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs tracking-wide gap-1.5 h-9 rounded-lg shadow-sm active:scale-95 transition-transform"
              >
                <Plus className="w-4 h-4" />
                Add Customer
              </Button>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {activeTab === 'customer' ? <CustomerList /> : <OrderList />}
        </main>
      </SidebarInset>

      <CustomerForm open={isCustomerModalOpen} onOpenChange={setIsCustomerModalOpen} />
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <TooltipProvider>
      <AppProvider>
        <Dashboard />
      </AppProvider>
    </TooltipProvider>
  );
}