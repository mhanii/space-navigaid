import { NavLink } from 'react-router-dom';
import { MessageSquare, FileText, Search, Network } from 'lucide-react';

const leftNavItems = [
  { path: '/documents', label: 'Documents', icon: FileText },
  { path: '/chat', label: 'AI Chat', icon: MessageSquare },
];

const rightNavItems = [
  { path: '/search', label: 'Search', icon: Search },
  { path: '/graph', label: 'Graph', icon: Network },
];

export const Navigation = () => {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Documents, AI Chat */}
          <div className="flex items-center space-x-1">
            {leftNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary text-[#3E79FF]'
                      : 'text-muted-foreground hover:bg-[#93B4FF] hover:text-[#020919]'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Center Section: NASA Bio Explorer */}
          <NavLink
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            NASA Bio Explorer
          </NavLink>

          {/* Right Section: Search, Graph, Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {rightNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary text-[#3E79FF]'
                        : 'text-muted-foreground hover:bg-[#93B4FF] hover:text-[#020919]'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
            <div className="text-xs text-muted-foreground border-l border-border pl-4">
              608 papers • 1,247 authors
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
