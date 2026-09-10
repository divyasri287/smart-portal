const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:px-6 lg:px-8">
        <p>© {year} Smart Procurement Portal</p>
        <p>Farmers • Procurement • Transparency</p>
      </div>
    </footer>
  );
};

export default Footer;
