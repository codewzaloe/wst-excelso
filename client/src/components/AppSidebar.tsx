import { Utensils, Users, ClipboardList } from 'lucide-react';
import {
    Sidebar, SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from '@/shadcn/components/ui/sidebar';

interface AppSidebarProps {
    activeTab: 'customer' | 'order';
    setActiveTab: (tab: 'customer' | 'order') => void;
}

export default function AppSidebar({ activeTab, setActiveTab }: AppSidebarProps) {
    const navItems = [
        {
            id: 'customer' as const,
            label: 'Customer',
            icon: Users,
        },
        {
            id: 'order' as const,
            label: 'Order',
            icon: ClipboardList,
        },
    ];

    return (
        <Sidebar className="border-r border-sidebar-border select-none">
            {/* Sidebar Branding Header */}
            <SidebarHeader className="p-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-accent-foreground shadow-md transition-all duration-300 hover:rotate-12">
                        <Utensils className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm tracking-wider text-sidebar-foreground whitespace-nowrap">
                            WARUNG KULINER
                        </span>
                        <span className="text-[10px] uppercase font-semibold tracking-widest text-accent/80 -mt-1">
                            Mini CRM
                        </span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3 py-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-3 text-[10px] uppercase font-bold tracking-widest text-sidebar-foreground/40 mb-2">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1.5">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.id;
                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`
                                                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                                ${isActive
                                                    ? 'bg-accent text-accent-foreground font-semibold shadow-sm'
                                                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                                }
                                            `}
                                        >
                                            <Icon className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover/menu-button:scale-110'}`} />
                                            <span>{item.label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
