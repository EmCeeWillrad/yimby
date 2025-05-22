import { Link } from "wouter";

export default function MapSearch() {
  const popularCities = [
    "New York City", "Los Angeles", "Chicago", 
    "Houston", "Phoenix", "Philadelphia"
  ];

  return (
    <section className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-primary font-medium">Find What's Nearby</span>
            <h2 className="font-heading font-bold text-3xl mt-2 mb-4">Explore Affordable Housing On The Map</h2>
            <p className="text-gray-600 mb-6">Discover affordable housing options in your desired neighborhood with our interactive map. Filter by program type, price range, and amenities to find the perfect match.</p>
            
            <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
              <h3 className="font-heading font-semibold text-lg mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {popularCities.map((city) => (
                  <Link key={city} href={`/search?city=${encodeURIComponent(city)}`}>
                    <a className="bg-gray-100 hover:bg-primary hover:text-white px-3 py-2 rounded-lg text-sm transition-colors">
                      {city}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            
            <Link href="/map">
              <a className="inline-block bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-6 py-3 transition">
                Open Full Map View <i className="fas fa-map-marked-alt ml-2"></i>
              </a>
            </Link>
          </div>
          
          <div>
            <div className="bg-white p-2 rounded-xl shadow-md">
              <div className="bg-gray-200 rounded-lg aspect-[4/3] flex items-center justify-center">
                <div className="text-center p-4">
                  <i className="fas fa-map-marked-alt text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">Interactive Map View</p>
                  <p className="text-gray-500 text-sm">Shows affordable housing properties in selected area</p>
                  <div className="mt-4 bg-white p-2 rounded-lg inline-flex items-center">
                    <i className="fas fa-map-pin text-red-500 mr-2"></i>
                    <span className="text-sm">12 properties found in this area</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
