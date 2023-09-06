function App() {
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
      <section className="w-full max-w-2xl mx-auto min-h-[500px] bg-white p-5"></section>
    </main>
  );
}

export default App;
