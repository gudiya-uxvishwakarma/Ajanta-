import SEOHead from "../components/SEOHead";

export default function AboutBrand() {
  return (
    <div className="w-full bg-white min-h-screen">
      <SEOHead
        title="About Ajanta Associates | Our Story & Legacy"
        description="Learn about Ajanta Associates – Bangalore's trusted Ajanta dealer since 1971. Discover our commitment to quality clocks, fans, LED lights and home appliances."
        keywords="about Ajanta Associates, Ajanta history, Ajanta Bangalore, Ajanta clock dealer"
        canonical="https://ajantaworld.in/about"
      />

      {/* HERO BANNER */}
      <section className="relative w-full h-[90vh] overflow-hidden">
        <img src="/image copy 2.png" alt="About Ajanta" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-24">
          <h1 className="text-white text-[48px] md:text-[64px] font-bold mb-8 tracking-tight">About Us</h1>
          <p className="text-white/85 text-[14px] md:text-[15px] leading-[1.9] max-w-3xl">
            "Brands are shaped by what the organization does, not by what it says regarding itself." Ajanta
            remains at the zenith of accomplishment and, without a doubt, offers the best products among
            its friends in the business. At the heart of Ajanta are its well-established values, which serve to
            convey the fundamental and, as a result, massively increase consumer loyalty. Since its origin,
            Ajanta Watch Company has been focused on delivering the best-suited style to every individual.
            Our serious evaluation and on-time delivery have given us an edge in the worldwide market.
            We stay focused on sending off items that are paired with the steadily developing patterns,
            and our cutting-edge plans have engaged a more extensive crowd. The organization stays focused
            on acquiring consumer loyalty and to brace it, we have fostered our appropriation network
            across India with sellers all through the country. Our objective is to deliver high-quality products
            at a low price so that everyone may wear trendy and feel luxurious.
          </p>
        </div>
      </section>

      {/* STEP 1 — Green Environment | text left, image right */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="flex flex-col justify-center px-12 md:px-20 py-20 bg-white">
          <p className="text-[11px] text-gray-400 tracking-[0.25em] uppercase mb-5">Green Environment —</p>
          <h2 className="text-[28px] md:text-[36px] font-black text-[#1a1a1a] leading-[1.2] mb-7 uppercase">
            "Without Mother Earth,<br />We Are Nothing"
          </h2>
          <p className="text-gray-500 text-[14px] leading-[1.85] max-w-[480px]">
            Rapid industrialization has taken a toll on the once beautiful town of Morbi. Hundreds of ceramic
            units dot this small town and this has resulted in it being affected by pollution. Ajanta India Limited
            has taken the initiative of contributing to a greener environment by planting saplings in and around
            the vicinity of its premises. We care and we want to ensure that the people of Morbi get clean air
            for these are the ones who have welcomed and helped us to be what we are today.
          </p>
        </div>
        <div className="w-full h-[500px] md:h-auto overflow-hidden">
          <img src="/image copy 3.png" alt="Green Environment" className="w-full h-full object-cover object-center" />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gray-100" />

      {/* STEP 2 — Women Empowerment | image left, text right */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="w-full h-[500px] md:h-auto overflow-hidden order-2 md:order-1">
          <img src="/image copy 2.png" alt="Women Empowerment" className="w-full h-full object-cover object-center" />
        </div>
        <div className="flex flex-col justify-center px-12 md:px-20 py-20 bg-white order-1 md:order-2">
          <p className="text-[11px] text-gray-400 tracking-[0.25em] uppercase mb-5">Women Empowerment —</p>
          <h2 className="text-[28px] md:text-[36px] font-black text-[#1a1a1a] leading-[1.2] mb-7 uppercase">
            "Success Is When You<br />Empower The Women<br />Around You"
          </h2>
          <p className="text-gray-500 text-[14px] leading-[1.85] max-w-[480px]">
            We take pride in the fact that our major workforce constitutes women whose selfless dedication
            has always kept our morale strong and high. In order to facilitate education for women from
            remote and rural areas, we have built schools and hostels here, where there are arrangements
            for their study as well as stay for free or at nominal rates.
          </p>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gray-100" />

      {/* STEP 3 — Contribution to Orphanages | text left, image right */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="flex flex-col justify-center px-12 md:px-20 py-20 bg-white">
          <p className="text-[11px] text-gray-400 tracking-[0.25em] uppercase mb-5">Contribution to Orphanages —</p>
          <h2 className="text-[28px] md:text-[36px] font-black text-[#1a1a1a] leading-[1.2] mb-7 uppercase">
            "Not All Of Us Can Do<br />Great Things. But We Can<br />Do Small Things With<br />Great Love"
          </h2>
          <p className="text-gray-500 text-[14px] leading-[1.85] max-w-[480px]">
            At Ajanta, we have learned that contribution or donation is the way of making a difference.
            Aid helps the less privileged in making their lives better. Following this philosophy, Ajanta makes
            generous contributions for the welfare of the underprivileged at orphanages. In keeping with
            the motto of a clean green environment, we have planted trees at the orphanage yard so that
            the residents get to breathe pure and fresh air always.
          </p>
        </div>
        <div className="w-full h-[500px] md:h-auto overflow-hidden">
          <img src="/image copy 6.png" alt="Orphanage Contribution" className="w-full h-full object-cover object-center" />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gray-100" />

      {/* STEP 4 — Quality Craftsmanship | image left, text right */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="w-full h-[500px] md:h-auto overflow-hidden order-2 md:order-1">
          <img src="/image copy 25.png" alt="Quality Craftsmanship" className="w-full h-full object-cover object-center" />
        </div>
        <div className="flex flex-col justify-center px-12 md:px-20 py-20 bg-white order-1 md:order-2">
          <p className="text-[11px] text-gray-400 tracking-[0.25em] uppercase mb-5">Quality Craftsmanship —</p>
          <h2 className="text-[28px] md:text-[36px] font-black text-[#1a1a1a] leading-[1.2] mb-7 uppercase">
            "Precision In Every<br />Second, Elegance In<br />Every Detail"
          </h2>
          <p className="text-gray-500 text-[14px] leading-[1.85] max-w-[480px]">
            Every Ajanta watch is a result of meticulous craftsmanship and rigorous quality checks. From
            the selection of raw materials to the final assembly, each step is carried out with utmost care.
            Our state-of-the-art manufacturing facility ensures that every timepiece meets the highest
            standards of precision and durability, making Ajanta a name you can trust on your wrist.
          </p>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gray-100" />

      {/* STEP 5 — Our Legacy | full-width dark banner */}
      <section className="relative w-full h-[650px] md:h-[780px] overflow-hidden">
        <img src="/image copy 24.png" alt="Our Legacy" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-24">
          <p className="text-white/60 text-[11px] tracking-[0.25em] uppercase mb-4">Est. 1971</p>
          <h2 className="text-white text-[32px] md:text-[48px] font-black leading-tight mb-5 uppercase">
            50+ Years of Timeless Legacy
          </h2>
          <p className="text-white/75 text-[14px] leading-relaxed max-w-2xl">
            From a small workshop in Mumbai to India's most trusted watch brand — Ajanta's journey is a
            testament to passion, perseverance, and the pursuit of perfection.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="w-full py-16 px-6 md:px-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto text-center">
          {[
            
          ].map(s => (
            <div key={s.label}>
              <p className="text-[44px] md:text-[56px] font-black text-[#cc0000] leading-none">{s.val}</p>
              <p className="text-white/55 text-[13px] mt-3 tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 px-6 text-center bg-white">
        <p className="text-[11px] text-gray-400 tracking-[0.25em] uppercase mb-3">Ajanta Quartz</p>
        <h2 className="text-[28px] md:text-[38px] font-black text-[#1a1a1a] mb-4">Wear the Legacy</h2>
        <p className="text-gray-400 text-[14px] mb-10 max-w-md mx-auto leading-relaxed">
          Explore our latest collections and find the watch that tells your story.
        </p>
        <a href="/shop" className="inline-block bg-[#1a1a1a] text-white py-4 px-12 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#cc0000] transition-colors duration-300">
          SHOP NOW
        </a>
      </section>

    </div>
  );
}
