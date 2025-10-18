import React from "react";

export default function WorrallHouseApp() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="text-center px-4 py-10">
        <h1 className="text-5xl font-extrabold text-sky-800 mb-2 tracking-tight">Worral House</h1>
        <p className="text-xl text-gray-600">Plan your stay by the sea 🏖️</p>
      </header>

      {/* Navigation Links */}
      <nav className="flex justify-center gap-6 mb-10 text-lg">
        <a href="#calendar" className="bg-sky-600 text-white px-5 py-2 rounded-full hover:bg-sky-700 transition shadow">📅 Calendar</a>
        <a href="#form" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition shadow">📝 Request Stay</a>
      </nav>

      {/* Calendar Section */}
      <section
        id="calendar"
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-12 border border-sky-100"
      >
        <h2 className="text-2xl font-bold text-sky-800 mb-4">📅 Family Booking Calendar</h2>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=cd20d33a0eb209d4fdfc8fdba21bdf883e2f5bdb64973dab5014e7c868854cb3%40group.calendar.google.com&ctz=America%2FNew_York"
          style={{ border: 0 }}
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          title="Worral House Booking Calendar"
          className="rounded-md shadow"
        ></iframe>
      </section>

      {/* Form Section */}
      <section
        id="form"
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-20 border border-green-100"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-4">📝 Request a Stay at Worral House</h2>
        <p className="mb-6 text-gray-600">
          Fill out the form below to request your visit. You’ll receive confirmation by email once your request is approved.
        </p>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdaQOEu-Y5C85HXkp7um3y0PGQfkb7pvmvdRF8iChBX5sq4bA/viewform?embedded=true"
          width="100%"
          height="800"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Worral House Stay Request Form"
          className="rounded-md shadow"
        >
          Loading…
        </iframe>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        <p>&copy; {currentYear} The Reardon Family &middot; Built with 🧡 for summer memories</p>
        <p className="mt-1">
          <a
            href="mailto:your@email.com"
            className="text-sky-600 hover:underline"
          >
            Contact the house coordinator
          </a>
        </p>
      </footer>
    </div>
  );
}
