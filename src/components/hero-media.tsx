export function HeroMedia() {
  return (
    <>
      <img
        src="/media/hero.jpg"
        alt="Luxury estate at dusk"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/media/hero.jpg"
        aria-hidden="true"
      >
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>
    </>
  );
}
