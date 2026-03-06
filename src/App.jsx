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
    <section
      id="home"
      className="relative text-white py-28 md:py-36 px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/hero-bg.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900/70 via-sky-800/50 to-sky-900/80" />
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-lg">Worrall House</h1>
        <p className="text-xl md:text-2xl text-sky-100 mb-2 drop-shadow">21 Worral St, Hamilton Beach, Wareham, MA</p>
        <p className="text-lg text-sky-200 mb-8 drop-shadow">Grandpa's beach house. Our family's place by the sea.</p>
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

const FORM_ID = "1FAIpQLSdaQOEu-Y5C85HXkp7um3y0PGQfkb7pvmvdRF8iChBX5sq4bA";
const FORM_URL =
  "https://docs.google.com/forms/d/e/" + FORM_ID + "/formResponse";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  startDate: "",
  endDate: "",
  guests: "",
  notes: "",
  agreeRules: false,
};

function BookingSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [honeypot, setHoneypot] = useState("");

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot) {
      setStatus("success");
      return;
    }

    if (form.endDate && form.startDate && form.endDate < form.startDate) {
      alert("End date must be on or after the start date.");
      return;
    }

    setStatus("submitting");

    const [startYear, startMonth, startDay] = form.startDate.split("-");
    const [endYear, endMonth, endDay] = form.endDate.split("-");

    const params = {
      "entry.1455743435": form.fullName,
      emailAddress: form.email,
      "entry.1123350866_year": startYear,
      "entry.1123350866_month": startMonth,
      "entry.1123350866_day": startDay,
      "entry.22115542_year": endYear,
      "entry.22115542_month": endMonth,
      "entry.22115542_day": endDay,
      "entry.1482608023": form.guests,
      "entry.1219318801": form.notes,
      "entry.1548826254":
        "I agree to follow the house rules and leave the house clean for the next guest.",
      fvv: "1",
      partialResponse: "[null,null,null,null]",
      pageHistory: "0",
      fbzx: String(Date.now()),
    };

    try {
      // Submit via hidden iframe to avoid CORS issues
      const iframe = document.createElement("iframe");
      iframe.name = "hidden_iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const hiddenForm = document.createElement("form");
      hiddenForm.method = "POST";
      hiddenForm.action = FORM_URL;
      hiddenForm.target = "hidden_iframe";

      Object.entries(params).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        hiddenForm.appendChild(input);
      });

      document.body.appendChild(hiddenForm);
      hiddenForm.submit();

      // Clean up and show success after a short delay
      setTimeout(() => {
        hiddenForm.remove();
        iframe.remove();
      }, 2000);

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="book" className="py-16 px-4 bg-sky-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 shadow-sm">
            <span className="text-4xl mb-4 block">&#10003;</span>
            <h2 className="text-2xl font-bold text-emerald-800 mb-2">
              Request Submitted!
            </h2>
            <p className="text-emerald-700 mb-6">
              You'll receive a confirmation email once your dates are approved.
              Your booking is not confirmed until it appears on the calendar.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-sky-600 font-medium hover:underline"
            >
              Submit another request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="py-16 px-4 bg-sky-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Request a Stay
        </h2>
        <p className="text-gray-500 mb-6">
          Fill out the form below. You'll get a confirmation email when your
          dates are approved.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-sky-100 p-6 md:p-8 space-y-5"
        >
          {/* Honeypot — hidden from humans, bots fill it in */}
          <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
            <label>
              Phone
              <input
                type="text"
                name="phone"
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
              />
            </label>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Full Name <span className="text-rose-400">*</span>
              </span>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Jane Reardon"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Email <span className="text-rose-400">*</span>
              </span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="jane@example.com"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none"
              />
            </label>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Start Date <span className="text-rose-400">*</span>
              </span>
              <input
                type="date"
                required
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                End Date <span className="text-rose-400">*</span>
              </span>
              <input
                type="date"
                required
                value={form.endDate}
                min={form.startDate || undefined}
                onChange={(e) => update("endDate", e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none"
              />
            </label>
          </div>

          {/* Guests */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              How many people are staying?{" "}
              <span className="text-rose-400">*</span>
            </span>
            <select
              required
              value={form.guests}
              onChange={(e) => update("guests", e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none bg-white"
            >
              <option value="" disabled>
                Select...
              </option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          {/* Notes */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Notes{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </span>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={3}
              placeholder="Flexible on dates, bringing the dog, etc."
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none resize-y"
            />
          </label>

          {/* Agreement */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={form.agreeRules}
              onChange={(e) => update("agreeRules", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-400"
            />
            <span className="text-sm text-gray-600">
              I agree to follow the{" "}
              <a
                href="#rules"
                className="text-sky-600 underline hover:text-sky-800"
              >
                house rules
              </a>{" "}
              and leave the house clean for the next guest.{" "}
              <span className="text-rose-400">*</span>
            </span>
          </label>

          {/* Submit */}
          {status === "error" && (
            <p className="text-sm text-rose-600">
              Something went wrong. Please try again or email
              worralhouse@gmail.com.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Submitting..." : "Submit Request"}
          </button>
        </form>
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
          21 Worral is a family house. Enjoy each other's company. That is what your
          grandparents would want. Everyone is always welcome to use the beach, the yard,
          the facilities, but just be respectful of whomever is staying there.
          <span className="text-2xl leading-none ml-1">"</span>
          <span className="block mt-3 text-gray-500 not-italic text-sm font-medium">— Aunt Caroline</span>
        </blockquote>

        <div className="space-y-6">
          <RuleGroup emoji="📅" title="Booking" color="sky" items={[
            "Book through this website — your request isn't confirmed until you get an approval email.",
            "First come, first served. If dates overlap, we'll work it out directly.",
            "Signups begin April 1st.",
            "Typical stays are 1-2 weeks. Be mindful so everyone gets a turn.",
            "If plans change, email worralhouse@gmail.com ASAP so someone else can use those dates.",
          ]} />

          <RuleGroup emoji="🚗" title="Arriving & Leaving" color="emerald" items={[
            "Check-in: 3:00 PM (or as arranged with the previous guest).",
            "Check-out: 12:00 PM.",
            "Check-in details (keys, lockbox) will be in your confirmation email.",
          ]} />

          <RuleGroup emoji="🏡" title="During Your Stay" color="amber" items={[
            "Treat the house like Grandpa's house — because it is.",
            "No smoking inside the house.",
            "Quiet hours: 10 PM - 8 AM (be considerate of Hamilton Beach neighbors).",
            "Wash your dishes or run the dishwasher.",
            "Clean the grill after use.",
            "Rinse sand off at the outdoor shower before coming inside.",
            "Family and close friends welcome to visit during the day.",
            "Overnight guests count toward your booking headcount.",
          ]} />

          <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-6 shadow-sm border border-sky-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="text-xl">✅</span> Checkout Checklist
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                { emoji: "🛏️", text: "Strip beds & start laundry" },
                { emoji: "🍽️", text: "Run dishwasher / put away dishes" },
                { emoji: "🗑️", text: "Take out all trash & recycling" },
                { emoji: "🧹", text: "Sweep sand from floors" },
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
