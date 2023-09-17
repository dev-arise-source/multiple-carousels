import CarouselsCard from "./components/CarouselsCard";
import carouselList from "./asset";

function Home() {
  return (
    <section>
      <h2 className="pt-10 italic text-cyan-700 font-bold text-center text-xl">
        Carousels
      </h2>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto w-full px-3 py-10 max">
        {carouselList.map((c, i) => (
          <CarouselsCard carousel={c} key={i} />
        ))}
      </div>
    </section>
  );
}

export default Home;
