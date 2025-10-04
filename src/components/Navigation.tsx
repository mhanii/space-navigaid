import { NavLink } from 'react-router-dom';
import { BarChart3, MessageSquare, FileText, Search, Network } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: BarChart3 },
  { path: '/chat', label: 'AI Chat', icon: MessageSquare },
  { path: '/documents', label: 'Documents', icon: FileText },
  { path: '/search', label: 'Search', icon: Search },
  { path: '/graph', label: 'Graph', icon: Network },
];

export const Navigation = () => {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NASA Bio Explorer
            </h1>
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            608 papers • 1,247 authors
          </div>
        </div>
      </div>
    </nav>
  );
};
