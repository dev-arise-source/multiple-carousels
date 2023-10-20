function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{ backgroundImage: `url(/win11.jpg)` }}
      className="relative min-h-screen flex justify-center items-center bg-center bg-cover bg-fixed"
    >
      {/* main Ui */}
      <div className="mx-auto w-full max-w-screen-2xl">{children}</div>
    </main>
  );
}

export default Layout;
