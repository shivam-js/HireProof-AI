const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;