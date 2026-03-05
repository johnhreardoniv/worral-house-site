import React, { useState } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "calendar", label: "Calendar" },
  { id: "book", label: "Book a Stay" },
  { id: "rules", label: "House Rules" },
  { id: "guide", label: "Guest Guide" },
  { id: "contact", label: "Contact" },
];

function NavBar({ activeSection }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-sky-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold text-sky-800 tracking-tight">
          Worrall House
        </a>
        <div className="hidden md:flex gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "bg-sky-100 text-sky-800"
                  : "text-gray-600 hover:text-sky-700 hover:bg-sky-50"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-600 hover:text-sky-700"
        aria-label="Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-800"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-sky-600 to-sky-800 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Worrall House</h1>
        <p className="text-xl md:text-2xl text-sky-100 mb-2">21 Worral St, Hamilton Beach, Wareham, MA</p>
        <p className="text-lg text-sky-200 mb-8">Grandpa's beach house. Our family's place by the sea.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#book"
            className="inline-block bg-white text-sky-800 font-semibold px-8 py-3 rounded-lg shadow hover:bg-sky-50 transition-colors"
          >
            Request a Stay
          </a>
          <a
            href="#calendar"
            className="inline-block border-2 border-white/50 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            View Calendar
          </a>
        </div>
      </div>
    </section>
  );
}

function CalendarSection() {
  return (
    <section id="calendar" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Calendar</h2>
        <p className="text-gray-500 mb-6">See who's staying when. Green = available, colored blocks = booked.</p>
        <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=cd20d33a0eb209d4fdfc8fdba21bdf883e2f5bdb64973dab5014e7c868854cb3%40group.calendar.google.com&ctz=America%2FNew_York&mode=MONTH&showTitle=0&showNav=1&showPrint=0&showCalendars=0"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            title="Worrall House Booking Calendar"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  return (
    <section id="book" className="py-16 px-4 bg-sky-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Request a Stay</h2>
        <p className="text-gray-500 mb-6">
          Fill out the form below. You'll get a confirmation email when your dates are approved.
          Your booking is not confirmed until it appears on the calendar.
        </p>
        <div className="rounded-xl overflow-hidden shadow-md bg-white">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdaQOEu-Y5C85HXkp7um3y0PGQfkb7pvmvdRF8iChBX5sq4bA/viewform?embedded=true"
            width="100%"
            height="900"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Worrall House Stay Request Form"
            className="w-full"
          >
            Loading...
          </iframe>
        </div>
      </div>
    </section>
  );
}

function RulesSection() {
  return (
    <section id="rules" className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">House Rules</h2>

        <blockquote className="border-l-4 border-sky-400 pl-4 mb-8 text-gray-600 italic">
          "21 Worral is a family house. Enjoy each other's company. That is what your
          grandparents would want. Everyone is always welcome to use the beach, the yard,
          the facilities, but just be respectful of whomever is staying there."
          <span className="block mt-2 text-gray-500 not-italic text-sm">— Aunt Caroline</span>
        </blockquote>

        <div className="space-y-8">
          <RuleGroup title="Booking" items={[
            "Book through this website — your request isn't confirmed until you get an approval email.",
            "First come, first served. If dates overlap, we'll work it out directly.",
            "Book early for July & August. Try to have summer dates in by April.",
            "Typical stays are 1-2 weeks. Be mindful so everyone gets a turn.",
            "If plans change, let Johnny know ASAP so someone else can use those dates.",
          ]} />

          <RuleGroup title="Arriving & Leaving" items={[
            "Check-in: 3:00 PM (or as arranged with the previous guest).",
            "Check-out: 11:00 AM.",
            "Check-in details (keys, lockbox) will be in your confirmation email.",
          ]} />

          <RuleGroup title="During Your Stay" items={[
            "No smoking inside the house.",
            "Ask before bringing pets — we need to keep it allergen-friendly.",
            "Quiet hours: 10 PM - 8 AM (be considerate of Hamilton Beach neighbors).",
            "Rinse sand off at the outdoor shower before coming inside.",
            "Wash your dishes or run the dishwasher.",
            "Clean the grill after use.",
            "Family and close friends welcome to visit during the day.",
            "Overnight guests count toward your booking headcount.",
          ]} />

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Checkout Checklist</h3>
            <div className="bg-sky-50 rounded-lg p-4 space-y-2">
              {[
                "Strip the beds and start laundry (or leave sheets in hamper)",
                "Run the dishwasher / put away clean dishes",
                "Take out all trash and recycling",
                "Sweep sand from floors (especially entryway and bathroom)",
                "Lock all windows and doors",
                "Turn off AC, lights, and fans",
                "Make sure outdoor shower is off",
                "Secure the key/lockbox",
                "Report anything broken or needing attention",
              ].map((item, i) => (
                <label key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                  <input type="checkbox" className="mt-1 accent-sky-600" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <RuleGroup title="Costs" items={[
            "No rental fee — Grandpa and Uncle Jim want you to enjoy the house.",
            "Please replace consumables you use (propane, cleaning supplies, etc.).",
            "If major maintenance comes up, we'll discuss contributions openly.",
          ]} />
        </div>
      </div>
    </section>
  );
}

function RuleGroup({ title, items }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
            <span className="text-sky-500 mt-0.5 shrink-0">&#8226;</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GuideSection() {
  return (
    <section id="guide" className="py-16 px-4 bg-sky-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Guest Guide</h2>
        <p className="text-gray-500 mb-8">Everything you need to know for your stay.</p>

        <div className="grid gap-6 md:grid-cols-2">
          <InfoCard
            icon="📍"
            title="Getting There"
            lines={[
              "21 Worral St, Wareham, MA 02571",
              "Hamilton Beach neighborhood",
              "~60 min from Boston via MA-3 S",
              "~45 min from Providence via I-195 E",
            ]}
          />
          <InfoCard
            icon="🔑"
            title="Access"
            lines={[
              "Lockbox code sent in confirmation email",
              "Check-in: 3:00 PM",
              "Check-out: 11:00 AM",
              "Please don't share the code outside family",
            ]}
          />
          <InfoCard
            icon="🏖️"
            title="Beach & Outdoors"
            lines={[
              "Beach is steps from the house",
              "Hamilton Beach is a private/resident beach",
              "Outdoor shower — rinse off before going inside",
              "Beach chairs & gear in the shed",
            ]}
          />
          <InfoCard
            icon="🏠"
            title="The House"
            lines={[
              "Washer and dryer available",
              "Full kitchen with cooking essentials",
              "Grill available (clean after use)",
              "WiFi info posted inside the house",
            ]}
          />
          <InfoCard
            icon="🗑️"
            title="Trash & Recycling"
            lines={[
              "Bag all trash — don't leave outside overnight",
              "Recycling and trash bins on-site",
              "Check trash day schedule posted in kitchen",
            ]}
          />
          <InfoCard
            icon="📞"
            title="Need Help?"
            lines={[
              "Booking/house issues: Text Johnny",
              "House decisions/emergencies: Uncle Jim",
              "Life-threatening emergency: Call 911",
              "Something broken? Don't DIY plumbing/electrical — text Johnny",
            ]}
          />
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-sky-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Local Favorites</h3>
          <div className="grid gap-2 text-sm text-gray-600 md:grid-cols-2">
            <div>&#127965; Onset Beach & Village — nearby</div>
            <div>&#128692; Cape Cod Canal bike path</div>
            <div>&#127754; Wellfleet — great day trip</div>
            <div>&#127960; Plymouth — history & waterfront</div>
            <div>&#9875; Buzzards Bay — dining & shopping</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, lines }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-sky-100">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
      <ul className="space-y-1">
        {lines.map((line, i) => (
          <li key={i} className="text-sm text-gray-600">{line}</li>
        ))}
      </ul>
    </div>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Questions?</h2>
        <p className="text-gray-500 mb-6">
          For booking questions, house issues, or anything else — reach out to Johnny.
        </p>
        <a
          href="mailto:johnhreardoniv@gmail.com"
          className="inline-block bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-sky-700 transition-colors"
        >
          Email Johnny
        </a>
        <p className="text-sm text-gray-400 mt-8">
          For urgent house matters or emergencies, contact Uncle Jim directly.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 px-4">
      <div className="max-w-5xl mx-auto text-center text-sm">
        <p className="mb-1">&copy; {new Date().getFullYear()} Worrall House Family Site</p>
        <p>21 Worral St, Hamilton Beach, Wareham, MA</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      })).filter((s) => s.el);

      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].el.getBoundingClientRect();
        if (rect.top <= 100) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-sky-50 text-gray-800">
      <NavBar activeSection={activeSection} />
      <HeroSection />
      <CalendarSection />
      <BookingSection />
      <RulesSection />
      <GuideSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
