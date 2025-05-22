export default function MobileAppSection() {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="relative mx-auto max-w-xs md:max-w-sm">
              <div className="bg-gray-200 rounded-3xl shadow-xl p-3 relative z-10">
                <div className="bg-white rounded-2xl overflow-hidden">
                  {/* Mobile app interface showing property search screen */}
                  <img src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=750" alt="AffordableHomes Mobile App" className="w-full" />
                </div>
              </div>
              <div className="absolute top-12 -right-8 bg-primary/10 w-28 h-28 rounded-full"></div>
              <div className="absolute bottom-12 -left-8 bg-secondary/10 w-24 h-24 rounded-full"></div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <span className="text-primary font-medium">Mobile Experience</span>
            <h2 className="font-heading font-bold text-3xl mt-2 mb-4">Find Your Next Home From Anywhere</h2>
            <p className="text-gray-600 mb-6">Our mobile app makes it easy to search, save, and apply for affordable housing on the go. Get instant notifications when new properties matching your criteria become available.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3 mt-1">
                  <i className="fas fa-bell text-primary"></i>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1">Instant Alerts</h3>
                  <p className="text-gray-600 text-sm">Get notified when new affordable homes match your search.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3 mt-1">
                  <i className="fas fa-heart text-primary"></i>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1">Save Favorites</h3>
                  <p className="text-gray-600 text-sm">Create a list of properties you're interested in.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3 mt-1">
                  <i className="fas fa-file-signature text-primary"></i>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1">Easy Applications</h3>
                  <p className="text-gray-600 text-sm">Apply directly through the app with all required documents.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3 mt-1">
                  <i className="fas fa-hand-holding-usd text-primary"></i>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1">Eligibility Check</h3>
                  <p className="text-gray-600 text-sm">Quickly see if you qualify for specific programs.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a href="#" className="flex items-center bg-black text-white px-5 py-3 rounded-lg hover:bg-black/80 transition">
                <i className="fab fa-apple text-2xl mr-3"></i>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="font-medium">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center bg-black text-white px-5 py-3 rounded-lg hover:bg-black/80 transition">
                <i className="fab fa-google-play text-2xl mr-3"></i>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="font-medium">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
