interface AboutSectionProps {
  scrollY: number;
}

export const AboutSection = ({ scrollY }: AboutSectionProps) => {
  const sectionStart = window.innerHeight * 0.8;
  const parallaxOffset = Math.max((scrollY - sectionStart) * 0.3, 0);
  const fadeInProgress = Math.max(0, Math.min(1, (scrollY - sectionStart) / (window.innerHeight * 0.5)));

  return (
    <section className="min-h-screen relative bg-background flex items-center justify-center px-8 py-32">
      <div 
        className="max-w-4xl mx-auto text-center"
        style={{
          transform: `translateY(${-parallaxOffset}px)`,
          opacity: fadeInProgress
        }}
      >
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-12 drop-shadow-lg">
          Masha's Innovation Lab
        </h2>
        <div className="grid md:grid-cols-2 gap-24 mt-24">
          <div 
            className="space-y-8 group cursor-pointer"
            style={{
              transform: `translateY(${Math.max((scrollY - sectionStart - 200) * -0.1, -20)}px)`,
              opacity: Math.max(0, Math.min(1, (scrollY - sectionStart - 100) / 300))
            }}
          >
            <h3 className="text-2xl font-light tracking-widest text-muted-foreground uppercase transition-all duration-500 group-hover:text-primary group-hover:tracking-[0.3em]">
              Professional
            </h3>
            <div className="relative overflow-hidden">
              <p className="text-lg leading-relaxed text-foreground/80 transition-all duration-700 group-hover:text-foreground group-hover:translate-x-2">
                My treehouse has a little workshop — a place where I test ideas. Sometimes that means building strategies, sometimes working on fashion-tech projects, and sometimes just trying things out to see if they work. The workshop isn't perfect or polished, but it's where I learn how to turn curious thoughts into real things.
              </p>
              <div className="absolute -right-4 top-0 w-1 h-full bg-primary/20 transform scale-y-0 origin-top transition-transform duration-700 group-hover:scale-y-100" />
            </div>
          </div>
          
          <div 
            className="space-y-8 group cursor-pointer"
            style={{
              transform: `translateY(${Math.max((scrollY - sectionStart - 400) * -0.1, -20)}px)`,
              opacity: Math.max(0, Math.min(1, (scrollY - sectionStart - 300) / 300))
            }}
          >
            <h3 className="text-2xl font-light tracking-widest text-muted-foreground uppercase transition-all duration-500 group-hover:text-primary group-hover:tracking-[0.3em]">
              Personal
            </h3>
            <div className="relative overflow-hidden">
              <p className="text-lg leading-relaxed text-foreground/80 transition-all duration-700 group-hover:text-foreground group-hover:translate-x-2">
                The roots of the treehouse stretch back to Ukraine and to moving to the U.S. for high school, and the pillars grew stronger at NYU. The branches reach into psychology, philosophy, and everyday experiments in creativity. The leaves are small but growing — side projects, stories, and pieces of myself I share along the way.
              </p>
              <div className="absolute -right-4 top-0 w-1 h-full bg-primary/20 transform scale-y-0 origin-top transition-transform duration-700 group-hover:scale-y-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};