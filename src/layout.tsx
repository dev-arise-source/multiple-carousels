function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen flex justify-center items-center">
      {/* background */}
      <div className="absolute z-[-1] top-0 left-0 right-0 bottom-0">
        <img
          className="w-full h-full object-cover"
          src="/win11.jpg"
          alt="background"
        />
      </div>

      {/* main Ui */}
      {children}
    </main>
  );
}

export default Layout;
