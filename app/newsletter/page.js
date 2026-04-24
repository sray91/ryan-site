import Header from "../components/Header";

export const metadata = {
  title: "Newsletter - Ryan Cahalane",
  description: "Join Ryan's weekly newsletter for manufacturing insights and updates",
};

export default function Newsletter() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f3f4f6' }}>
      <Header variant="light" />

      <div className="flex-1 px-4 sm:px-8 lg:px-16 py-8 max-w-2xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
            Join my newsletter!
          </h1>
        </div>

        <iframe
          src="https://embeds.beehiiv.com/6578c794-7b30-4330-aa9c-f2d57e32a0a0"
          data-test-id="beehiiv-embed"
          width="100%"
          height="320"
          style={{
            margin: 0,
            border: 0,
            borderRadius: '4px',
            backgroundColor: 'transparent'
          }}
        />
      </div>
    </div>
  );
}
