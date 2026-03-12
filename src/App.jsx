import React, { useState } from "react";

// Error boundary for graceful error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-16 px-4 bg-rose-50 rounded-lg border border-rose-200 text-center">
          <p className="text-rose-800 font-semibold mb-2">Something went wrong</p>
          <p className="text-rose-700 text-sm">Please refresh the page or contact us at worralhouse@gmail.com</p>
        </div>
      );
    }

    return this.props.children;
  }
}

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
          Worral House
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
    <section
      id="home"
      className="relative text-white py-28 md:py-36 px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/hero-bg.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900/70 via-sky-800/50 to-sky-900/80" />
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-lg">Worral House</h1>
        <p className="text-lg text-sky-200 mb-8 drop-shadow">Bill and Bettye's beach house. Our family's place by the sea.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#book"
            className="inline-block bg-white text-sky-800 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-sky-50 transition-colors"
          >
            Request a Stay
          </a>
          <a
            href="#calendar"
            className="inline-block border-2 border-white/60 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/15 transition-colors backdrop-blur-sm"
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
        <p className="text-gray-500 mb-6">See who's staying when.</p>
        <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
          <ErrorBoundary>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=cd20d33a0eb209d4fdfc8fdba21bdf883e2f5bdb64973dab5014e7c868854cb3%40group.calendar.google.com&ctz=America%2FNew_York&mode=MONTH&showTitle=0&showNav=1&showPrint=0&showCalendars=0"
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
              title="Worral House Booking Calendar"
              className="w-full"
            />
          </ErrorBoundary>
          <noscript>
            <div className="p-6 bg-gray-50 text-center">
              <p className="text-gray-600">Calendar requires JavaScript to display. Please enable JavaScript or contact us.</p>
            </div>
          </noscript>
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  return (
    <section id="book" className="py-16 px-4 bg-sky-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Request a Stay</h2>
        <p className="text-gray-500 mb-6">
          Fill out the form below. If your requested dates are available, you'll automatically receive a confirmation email with check-in details.
        </p>
        <div className="relative rounded-xl overflow-hidden shadow-sm border border-sky-100 bg-white" style={{ minHeight: 900 }}>
          {/* Background message visible after form submission shrinks */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="text-4xl mb-4">&#127965;</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Request submitted!</h3>
            <p className="text-gray-500 max-w-md">
              Your booking will be automatically approved if the dates are available.
              Check your email for confirmation.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Questions? Reach out at worralhouse@gmail.com
            </p>
          </div>
          {/* Form iframe sits on top */}
          <ErrorBoundary>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSey71gR1yRyX7cNmjIgslR_DjVdZN5lnfP8KQMs5xWYNB7xCA/viewform?embedded=true"
              width="100%"
              height="900"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              scrolling="yes"
              title="Worral House Booking Form"
              className="relative w-full bg-white"
              style={{ zIndex: 1 }}
              onError={() => console.error("Form failed to load")}
            >
              <div className="p-6 text-center text-gray-600">
                <p>Booking form is temporarily unavailable.</p>
                <p>Please try refreshing the page or email worralhouse@gmail.com to request a stay.</p>
              </div>
            </iframe>
          </ErrorBoundary>
          <noscript>
            <div className="p-6 bg-gray-50 text-center">
              <p className="text-gray-600">Booking form requires JavaScript to display. Please enable JavaScript or email worralhouse@gmail.com.</p>
            </div>
          </noscript>
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

        <blockquote className="bg-gradient-to-r from-sky-50 to-amber-50 border-l-4 border-sky-400 rounded-r-xl pl-5 pr-6 py-5 mb-10 text-gray-600 italic shadow-sm">
          <span className="text-2xl leading-none mr-1">"</span>
          Worral is a family house. Enjoy each other's company. That is what your
          grandparents would want. Everyone is always welcome to use the beach, the yard,
          the facilities, but just be respectful of whomever is staying there.
          <span className="text-2xl leading-none ml-1">"</span>
          <span className="block mt-3 text-gray-500 not-italic text-sm font-medium">— Aunt Caroline</span>
        </blockquote>

        <div className="bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-200 rounded-xl px-6 py-6 text-center shadow-sm mb-10 space-y-3">
          <p className="text-gray-700 font-medium">
            Having a family beach house with no rental costs is an incredible opportunity.
          </p>
          <p className="text-gray-800 font-bold text-lg">
            There are no cleaners.
          </p>
          <p className="text-gray-700 font-medium">
            The house will only be as clean as the last person left it.
            It only works if we all do our part. Let's keep this sustainable for years to come.
          </p>
        </div>

        <div className="space-y-6">
          <RuleGroup emoji="📅" title="Booking" color="sky" items={[
            "Book through this website — your request isn't confirmed until you get an approval email.",
            "First come, first served. If dates overlap, we'll work it out directly.",
            "Signups begin April 1st.",
            "Typical stays are 1-2 weeks. Be mindful so everyone gets a turn.",
            <>If plans change, email <span className="font-semibold text-gray-800">worralhouse@gmail.com</span> ASAP so someone else can use those dates.</>,
          ]} />

          <RuleGroup emoji="🚗" title="Arriving & Leaving" color="emerald" items={[
            "Check-in: 3:00 PM (or as arranged with the previous guest).",
            "Check-out: 12:00 PM.",
            "Check-in details (keys, lockbox) will be in your confirmation email.",
            "There are no cleaners — please leave the house clean and ready for the next group.",
          ]} />

          <RuleGroup emoji="🏡" title="During Your Stay" color="amber" items={[
            "Treat the house like your grandmother still lives here.",
            "No smoking inside the house.",
            "Quiet hours: 10 PM - 8 AM (be considerate of Hamilton Beach neighbors).",
            "Wash your dishes or run the dishwasher.",
            "Clean the grill after use.",
            "Rinse sand off at the outdoor shower before coming inside.",
          ]} />

          <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-6 shadow-sm border border-sky-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="text-xl">✅</span> Checkout Checklist
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                { emoji: "🧹", text: "Clean the house (kitchen, bathrooms, etc.) — leave it ready for the next group" },
                { emoji: "🛏️", text: "Wash sheets, fold, and place on bed" },
                { emoji: "🧺", text: "Wash any used towels" },
                { emoji: "🍽️", text: "Run dishwasher / put away dishes" },
                { emoji: "🥡", text: "Take home perishable food items" },
                { emoji: "🗑️", text: "Take out all trash & recycling" },
                { emoji: "🔒", text: "Lock all windows & doors" },
                { emoji: "❄️", text: "Turn off AC, lights & fans" },
                { emoji: "🚿", text: "Make sure outdoor shower is off" },
                { emoji: "🔑", text: "Secure the key/lockbox" },
                { emoji: "📝", text: "Report anything broken" },
              ].map((item, i) => (
                <label key={i} className="flex items-center gap-2.5 text-gray-700 text-sm bg-white/70 rounded-lg px-3 py-2.5 cursor-pointer hover:bg-white transition-colors">
                  <input type="checkbox" className="w-4 h-4 accent-sky-600 shrink-0" />
                  <span className="shrink-0">{item.emoji}</span>
                  <span>{item.text}</span>
                </label>
              ))}
            </div>
          </div>

          <RuleGroup emoji="🔧" title="Maintenance & Issues" color="rose" items={[
            "Something broken? Text/call Uncle Jim or Aunt Caroline. Don't try to fix plumbing or electrical yourself.",
            "Emergency? Call 911 first. Then notify Uncle Jim or Aunt Caroline.",
            "Supplies running low? Replace what you can, or let someone know.",
          ]} />

          <RuleGroup emoji="💚" title="Costs" color="emerald" items={[
            "No rental fee — Grandpa wants you to enjoy the house.",
            "Please replace consumables you use (propane, cleaning supplies, etc.).",
            "If major maintenance comes up, we'll discuss contributions openly.",
          ]} />
        </div>
      </div>
    </section>
  );
}

const RULE_COLORS = {
  sky: { bg: "bg-sky-50", border: "border-sky-200", dot: "text-sky-400" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", dot: "text-emerald-400" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", dot: "text-amber-400" },
  rose: { bg: "bg-rose-50", border: "border-rose-200", dot: "text-rose-400" },
};

function RuleGroup({ emoji, title, color = "sky", items }) {
  const c = RULE_COLORS[color] || RULE_COLORS.sky;
  return (
    <div className={`${c.bg} rounded-xl p-6 shadow-sm border ${c.border}`}>
      <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <span className="text-xl">{emoji}</span> {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm">
            <span className={`${c.dot} mt-0.5 shrink-0 text-lg leading-none`}>•</span>
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
              "Address will be sent in your confirmation email",
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
              "Check-out: 12:00 PM",
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
              "House decisions/emergencies: Uncle Jim or Aunt Caroline",
              "Life-threatening emergency: Call 911",
              "Something broken? Don't DIY — call Uncle Jim or Aunt Caroline",
              "Booking questions: email worralhouse@gmail.com",
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
          For anything booking or website related, reach out to Johnny at
        </p>
        <p className="text-lg font-semibold text-gray-800">worralhouse@gmail.com</p>
        <p className="text-sm text-gray-400 mt-8">
          For urgent house matters or emergencies, contact Uncle Jim or Aunt Caroline directly.
        </p>
      </div>
    </section>
  );
}

function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Privacy & Terms</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Privacy Policy</h3>
            <div className="text-gray-600 space-y-3 text-sm">
              <p>
                <strong>Family-Only Site:</strong> This website is intended for family members only. We collect minimal personal information: names, email addresses, and requested dates through the Google Form.
              </p>
              <p>
                <strong>Data Storage:</strong> Booking requests are stored in a Google Sheet restricted to the owner. Google handles all data processing under their privacy policies. We do not share your information with third parties.
              </p>
              <p>
                <strong>Calendar Data:</strong> The shared Google Calendar displays booking availability and is publicly visible. For privacy, calendar events use initials + dates only (e.g., "JR - Mar 15-22"). Phone numbers and full names appear only in your confirmation email.
              </p>
              <p>
                <strong>Email Communications:</strong> We only email confirmations and house information. Your email will not be added to mailing lists or shared.
              </p>
              <p>
                <strong>Questions:</strong> Contact worralhouse@gmail.com with privacy concerns.
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Terms of Use</h3>
            <div className="text-gray-600 space-y-3 text-sm">
              <p>
                <strong>Booking Process:</strong> Requests are approved automatically if dates are available. Approval confirmations are sent via email with check-in details and address.
              </p>
              <p>
                <strong>Cancellations:</strong> If plans change, email worralhouse@gmail.com immediately so others can book those dates.
              </p>
              <p>
                <strong>House Rules:</strong> All guests agree to follow the house rules outlined in the House Rules section. These cover cleanliness, quiet hours, maintenance, and guest conduct.
              </p>
              <p>
                <strong>Liability:</strong> Guests use the house at their own risk. Report all damage or safety issues immediately. Accidents should be reported to Uncle Jim or Aunt Caroline.
              </p>
              <p>
                <strong>Lockbox Code:</strong> Codes are provided via email. Do not share the code outside the family. Do not photograph or record the code.
              </p>
              <p>
                <strong>Disputes:</strong> Any booking conflicts or rule violations will be resolved by family discussion and consensus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ onOpenPrivacy }) {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 px-4">
      <div className="max-w-5xl mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Worral House Family Site</p>
        <p className="mt-3">
          <button
            onClick={onOpenPrivacy}
            className="text-sky-400 hover:text-sky-300 transition-colors underline"
          >
            Privacy & Terms
          </button>
        </p>
        <p className="text-xs text-gray-500 mt-2">Hero image by <a href="https://unsplash.com/@sebsch" className="text-sky-400 hover:text-sky-300">Sebastian Scheuer</a> on <a href="https://unsplash.com" className="text-sky-400 hover:text-sky-300">Unsplash</a></p>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

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
      <Footer onOpenPrivacy={() => setPrivacyModalOpen(true)} />
      <PrivacyModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
    </div>
  );
}
