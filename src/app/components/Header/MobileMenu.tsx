interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const menuItems = [
    { label: "GitHub", href: "https://github.com/khalid-tourhzaoui" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/khalid-tourhzaoui/" },
    { label: "Portfolio", href: "https://khalid-tourhzaoui.vercel.app/" },
  ];

  return (
    <nav className={`fixed top-[72px] sm:top-[84px] left-3 right-3 max-w-[1200px] mx-auto bg-white rounded-2xl border-4 border-zinc-800 shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px,rgba(0,0,0,0.35)_0px_12px_20px_-8px] transition-all duration-300 ease-in-out z-40 md:hidden ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
      <ul className="flex flex-col py-3">
        {menuItems.map((item) => (
          <li key={item.label}>
            <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClose} className="group flex items-center gap-4 px-6 py-3.5 text-base font-medium text-zinc-600 hover:text-zinc-900 hover:bg-purple-50 transition-all duration-300 rounded-lg mx-2">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-zinc-800 bg-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-purple-600">
                {item.label === "GitHub" && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>}
                {item.label === "LinkedIn" && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>}
                {item.label === "Portfolio" && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
              <svg className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;