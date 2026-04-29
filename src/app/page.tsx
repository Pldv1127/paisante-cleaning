import ContactForm from "@/components/ContactForm";
import ReviewsSection from "@/components/ReviewsSection";

export const metadata = {
  title: "Paisante Cleaning Services | Pennsylvania",
  description:
    "With over 22 years of experience, Paisante Cleaning Services offers personalized residential and commercial cleaning across Pennsylvania.",
};

export default function Home() {
  return (
    <>
      {/* ── NAV ── */}
      <nav id="mainNav">
        <a href="/" className="nav-logo">
          <img
            src="/logo-horizontal.png"
            alt="Paisante Cleaning Services logo"
            className="nav-logo-img"
          />
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#standards">Standards</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact" className="nav-cta">Get a Quote</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-left">
          <div className="hero-badge">Pennsylvania's Trusted Cleaners</div>
          <h1 className="hero-title">
            A Cleaner Home,<br />A Calmer <em>Life.</em>
          </h1>
          <p className="hero-sub">
            Paisante Cleaning Services brings over 22 years of personalized,
            professional cleaning for homes and businesses across Pennsylvania.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Request a Quote</a>
            <a href="#services" className="btn-secondary">Our Services</a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">22+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div>
              <div className="stat-num">100%</div>
              <div className="stat-label">Personalized</div>
            </div>
            <div>
              <div className="stat-num">6</div>
              <div className="stat-label">Service Types</div>
            </div>
          </div>
        </div>
        <div className="hero-right">
  <div className="hero-pattern" />

  <div className="floating-images" aria-hidden="true">
    <img src="/cleaning1.jpg" className="nav-logo-img"/>
    <img src="/cleaning2.png" className="nav-logo-img"/>
    <img src="/cleaning3.png" className="nav-logo-img"/>
    <img src="/cleaning4.png" className="nav-logo-img"/>
  </div>

  <div className="hero-right-inner">
    <div className="hero-card">
      <p className="hero-card-quote">
        "We listen to every client's request and personalize our services to earn your trust."
      </p>
      <div className="hero-card-author">
        <div className="author-avatar">V</div>
        <div className="author-info">
          <p>Waldelania Paisante (Val)</p>
          <p>Founder &amp; Owner</p>
        </div>
      </div>
    </div>
    <div className="gold-leaf">✦</div>
  </div>
</div>
      </section>

      {/* ── HOW WE'RE BETTER ── */}
      <section id="better" className="section" style={{ background: "var(--warm-white)" }}>
        <div className="section-inner">
          <div className="better-grid reveal">
            <div className="better-left">
              <div className="section-tag">How We Are Better</div>
              <h2 className="section-title">Quality You Can Count On</h2>
              <div className="pillars">
                <div className="pillar">
                  <div className="pillar-num">01</div>
                  <div>
                    <div className="pillar-title">We Listen First</div>
                    <p className="pillar-text">Every client's needs are unique. We take time to understand your preferences and tailor every clean to match exactly what you want.</p>
                  </div>
                </div>
                <div className="pillar">
                  <div className="pillar-num">02</div>
                  <div>
                    <div className="pillar-title">Guaranteed Quality</div>
                    <p className="pillar-text">Our work isn't done until you're satisfied. We guarantee our quality on every visit — first time and every time.</p>
                  </div>
                </div>
                <div className="pillar">
                  <div className="pillar-num">03</div>
                  <div>
                    <div className="pillar-title">Earn Your Trust</div>
                    <p className="pillar-text">We understand the privilege of being welcomed into your home or business. We treat every space with the utmost care and respect.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="better-right reveal">
              <div className="mission-label">Our Mission</div>
              <p className="mission-text">"Make Your Life Easier — so you can focus on family, work, and the things that matter most to you."</p>
              <a href="#contact" className="mission-cta">Schedule a Clean</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT VAL ── */}
      <section id="about" className="section">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-photo-wrap reveal">
              <div className="about-photo">
                <div className="about-photo-placeholder">
                  <img
                    src="/val-portfolio.jpg"
                    alt="Val, founder of Paisante Cleaning Services"
                    className="about-photo-img"
                  />
                </div>
              </div>
              <div className="about-accent" />
              <div className="about-tag-box">
                <div className="num">22</div>
                <div className="label">Years of Care</div>
              </div>
            </div>
            <div className="about-content reveal">
              <div className="section-tag">Meet Val</div>
              <h2 className="section-title">The Heart Behind Every Clean</h2>
              <p className="about-body">Hello, I'm <strong>Waldelania Paisante (Val)</strong>. I established Paisante Cleaning Services after moving to the United States from Brazil in 2002.</p>
              <p className="about-body">As a <strong>mother of 4</strong>, I know firsthand how hard it is to keep up with house cleaning, organizing, and still making time for family, work, and yourself. That's why I'm passionate about offering a <strong>"personalized clean"</strong> — so you don't have to worry about keeping your home in top shape.</p>
              <p className="about-body">Having lived here for over 22 years, I've had the wonderful opportunity to absorb so much of the culture, language, and lifestyle from my clients — and I still enjoy learning every day.</p>
              <p className="about-body">I hope you'll trust me and allow me into your home or business.</p>
              <div className="about-signature">
                <div className="sig-line" />
                <div className="sig-text">— Val</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STANDARDS ── */}
      <section id="standards" className="section" style={{ background: "var(--forest)" }}>
        <div className="section-inner">
          <div className="reveal">
            <div className="section-tag">Our Standards</div>
            <h2 className="section-title">We Keep It Professional</h2>
            <p className="section-desc">Every visit is an opportunity to earn your trust. We hold ourselves to the highest professional standards.</p>
          </div>
          <div className="standards-grid reveal">
            <div className="standard-card">
              <div className="standard-icon">👔</div>
              <h3 className="standard-title">Proper Attire</h3>
              <p className="standard-text">Every time we visit your home or business, we are "auditioning" for the job and your trust. We arrive in proper attire — comfortable, professional, and ready to work.</p>
            </div>
            <div className="standard-card">
              <div className="standard-icon">⭐</div>
              <h3 className="standard-title">Skilled Workers</h3>
              <p className="standard-text">Our staff is completely trained and well versed in all cleaning tasks. We review every client's preferences and carefully follow all instructions given.</p>
            </div>
            <div className="standard-card">
              <div className="standard-icon">⚡</div>
              <h3 className="standard-title">Fast Service</h3>
              <p className="standard-text">We know your time is valuable. You've allowed us into your space, and we give 110% in the fastest time possible — without ever cutting corners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-tag">Our Services</div>
            <h2 className="section-title">We Work in Many Areas</h2>
            <p className="section-desc">Every client and every job is unique. We offer tailored cleaning programs designed around your specific requirements.</p>
          </div>
          <div className="services-grid reveal">
            {[
              { icon: "🏢", title: "Commercial Cleaning", text: "We treat your business like our own home — whether it's offices, restaurants, or healthcare facilities. Services include sweeping, mopping, dusting, disinfecting, trash removal, and restroom cleaning." },
              { icon: "🏗️", title: "Post Construction", text: "The final step in any construction project. We remove all traces of dirt and debris from every surface, ensuring no residue is left behind that could attract more dirt or degrade the project's quality." },
              { icon: "🏥", title: "Medical Offices", text: "Thorough cleaning and disinfecting of every space within medical facilities — waiting rooms, patient rooms, bathrooms, and examination areas — preventing the spread of germs, bacteria, and viruses." },
              { icon: "🏠", title: "Residential Cleaning", text: "Every residence has a unique service to complete. We ensure the right method — abrasives, acids, degreasers, or detergents — all customized for your home and your preferences." },
              { icon: "💼", title: "Office Cleaning", text: "Creating a workspace that is comfortable and conducive to productivity. Vacuuming, dusting, and disinfecting surfaces — typically performed during non-working hours to avoid interrupting operations." },
              { icon: "🧹", title: "Janitorial Services", text: "All the large and small cleaning activities necessary on a regular, even daily basis — sweeping floors, cleaning washrooms, sinks and toilets, removing trash, and dusting surfaces." },
            ].map((s) => (
              <div className="service-card" key={s.title}>
                <span className="service-icon">{s.icon}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULING ── */}
      <section id="schedule" className="section" style={{ background: "var(--warm-white)" }}>
        <div className="section-inner">
          <div className="schedule-inner">
            <div className="schedule-visual reveal">
              <h3 className="schedule-title">Cleaning Programs Tailored Around Your Schedule</h3>
              <ul className="schedule-list">
                <li>One-time deep cleans for any occasion</li>
                <li>Weekly or bi-weekly recurring service</li>
                <li>Monthly maintenance programs</li>
                <li>After-event or post-construction clean-up</li>
                <li>Flexible scheduling around your hours</li>
                <li>Commercial after-hours service available</li>
              </ul>
            </div>
            <div className="reveal">
              <div className="section-tag">When We Work</div>
              <h2 className="section-title">Flexible Scheduling, Built for You</h2>
              <p className="section-desc" style={{ marginBottom: "36px" }}>
                We prefer to review your objectives and establish a proper routine and process tailored specifically for you. Every client and every job is unique.
              </p>
              <p className="section-desc">
                Whether you need a one-time deep clean or ongoing service, we'll build a program that fits seamlessly into your life — on your schedule, at your pace.
              </p>
              <a href="#contact" className="btn-primary" style={{ marginTop: "40px", display: "inline-block" }}>
                Let's Talk About Your Needs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS (dynamic component) ── */}
      <ReviewsSection />

      {/* ── FAQ ── */}
      <section id="faq" className="section">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-tag">FAQ</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-sidebar reveal">
              <h3 className="faq-sidebar-title">Still have a question?</h3>
              <p className="faq-sidebar-text">We're happy to answer anything not covered here. Every job is different and we love learning about your unique needs.</p>
              <div className="faq-contact-nudge">
                <p>Reach out directly and Val will personally get back to you as soon as possible.</p>
                <a href="#contact">Send us a message</a>
              </div>
            </div>
            <div className="faq-list reveal" id="faqList">
              {[
                { q: "Do I need to be home during the cleaning?", a: "Not at all! Many of our clients provide us with a key or door code and go about their day. We're fully trustworthy and treat every home with the utmost care and respect. If you prefer to be present your first visit, that's always welcome too." },
                { q: "Do you bring your own cleaning supplies and equipment?", a: "Yes — we arrive fully equipped with professional-grade cleaning products and tools. If you have a preference for specific products (for example, eco-friendly or fragrance-free), just let us know and we'll accommodate whenever possible." },
                { q: "How do I get a price quote?", a: "Every home and business is unique, so we don't offer one-size-fits-all pricing. Fill out our contact form or give us a call and we'll schedule a quick consultation to understand your space and give you a personalized, no-obligation quote." },
                { q: "How often should I schedule cleaning services?", a: "It depends on your lifestyle, family size, and preferences. Many clients choose weekly or bi-weekly for homes, while others prefer monthly deep cleans. For commercial spaces, we often recommend weekly or daily janitorial service." },
                { q: "Are your staff trained and trustworthy?", a: "Absolutely. Our team is fully trained, professional, and held to the highest standards. Val personally oversees all operations and ensures every team member respects your space and follows your specific instructions." },
                { q: "Do you offer one-time cleans or only recurring service?", a: "Both! We offer one-time deep cleans for move-ins, move-outs, post-construction, special events, or just when you need a fresh start. We also offer flexible recurring programs — weekly, bi-weekly, or monthly." },
                { q: "What areas of Pennsylvania do you serve?", a: "We serve homes and businesses throughout the Pennsylvania area. Not sure if we cover your location? Reach out and we'll let you know — we're always happy to discuss your needs." },
                { q: "What if I'm not satisfied with the cleaning?", a: "Your satisfaction is our priority. If something doesn't meet your expectations, let us know and we will make it right — no questions asked. We stand behind our work 100% and are committed to earning your trust every single visit." },
              ].map((item) => (
                <div className="faq-item" key={item.q}>
                  <button className="faq-question" aria-expanded="false">
                    {item.q}
                    <span className="faq-icon">+</span>
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section" style={{ background: "var(--warm-white)" }}>
        <div className="section-inner">
          <div className="reveal">
            <div className="section-tag">Get in Touch</div>
            <h2 className="section-title">Ready for a Cleaner Space?</h2>
            <p className="section-desc">We'd love to learn about your home or business and how we can help. Reach out for a free consultation and custom quote.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info reveal">
              <div className="contact-item">
                <div className="contact-item-label">Location</div>
                <div className="contact-item-value">Serving Pennsylvania<br />and surrounding areas</div>
              </div>
              <div className="contact-item">
                <div className="contact-item-label">Phone</div>
                <div className="contact-item-value">
                  <a href="tel:+12674956269">(267) 495-6269</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-label">Email</div>
                <div className="contact-item-value">
                  <a href="mailto:info@paisantecleaning.com">info@paisantecleaning.com</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-label">Hours</div>
                <div className="contact-item-value">Monday – Saturday<br />By Appointment</div>
              </div>
            </div>
            <div className="reveal">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-brand-name">Paisante <span>Cleaning Services</span></div>
              <p className="footer-tagline">Personalized, professional cleaning for homes and businesses across Pennsylvania. Over 22 years of trusted service.</p>
            </div>
            <div>
              <div className="footer-col-title">Services</div>
              <ul className="footer-links">
                <li><a href="#services">Residential Cleaning</a></li>
                <li><a href="#services">Commercial Cleaning</a></li>
                <li><a href="#services">Office Cleaning</a></li>
                <li><a href="#services">Medical Offices</a></li>
                <li><a href="#services">Post Construction</a></li>
                <li><a href="#services">Janitorial Services</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><a href="#about">About Val</a></li>
                <li><a href="#standards">Our Standards</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#contact">Get a Quote</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© {new Date().getFullYear()} Paisante Cleaning Services. All rights reserved.</p>
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <p className="footer-pa">Pennsylvania, USA</p>
              <a href="/privacy-policy" style={{ fontSize: "0.78rem", color: "var(--mid-gray)", textDecoration: "underline" }}>Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}