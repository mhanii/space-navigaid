import { NavLink } from 'react-router-dom';
import { MessageSquare, FileText, Search, Network } from 'lucide-react';

const leftNavItems = [
  { path: '/documents', label: 'Docs', icon: FileText },
  { path: '/chat', label: 'AI Chat', icon: MessageSquare },
];

const rightNavItems = [
  { path: '/search', label: 'Search', icon: Search },
  { path: '/graph', label: 'Graph', icon: Network },
];

export const Navigation = () => {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Documents, AI Chat */}
          <div className="flex items-center space-x-0.5 md:space-x-1">
            {leftNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 rounded-full transition-colors ${
                    isActive
                      ? 'bg-primary text-[#fff]'
                      : 'text-muted-foreground hover:bg-[#BDD1FF] hover:text-[#020919]'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="md:text-sm text-xs font-medium inline">{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Center Section: NASA Bio Explorer */}
          <NavLink
            to="/"
            className="text-xs md:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            <span className="hidden md:inline">NASA Bio Explorer</span>
            <span className="md:hidden text-medium">NASA Bio</span>
          </NavLink>

          {/* Right Section: Search, Graph, Info */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-0.5 md:space-x-1">
              {rightNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 rounded-full transition-colors ${
                      isActive
                        ? 'bg-primary text-[#fff]'
                        : 'text-muted-foreground hover:bg-[#BDD1FF] hover:text-[#020919]'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium hidden md:inline">{item.label}</span>
                </NavLink>
              ))}
            </div>
            <div className="text-xs text-muted-foreground border-l border-border pl-2 md:pl-4 hidden md:block">
              608 papers • 1,247 authors
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
