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
        <h2 className="text-4xl md:text-6xl font-light tracking-wide mb-12 text-foreground">
          Where Innovation
          <br />
          Meets <span className="italic">Curiosity</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-16 mt-24">
          <div className="space-y-6">
            <h3 className="text-xl font-light tracking-widest text-muted-foreground uppercase">
              Professional
            </h3>
            <p className="text-lg leading-relaxed text-foreground/80">
              At the intersection of psychology, technology, and business strategy, 
              I create solutions that understand both human nature and digital innovation.
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-light tracking-widest text-muted-foreground uppercase">
              Personal
            </h3>
            <p className="text-lg leading-relaxed text-foreground/80">
              Exploring philosophical questions through interactive experiences, 
              building digital spaces that invite reflection and connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};