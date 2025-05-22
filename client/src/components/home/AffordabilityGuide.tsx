export default function AffordabilityGuide() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium">Why Choose Us</span>
          <h2 className="font-heading font-bold text-3xl mt-2 mb-4">Your Guide to Affordable Housing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We've helped millions of families find affordable homes through government-subsidized programs and low-income housing options.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-light rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-search-dollar text-primary text-2xl"></i>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Find Affordable Options</h3>
            <p className="text-gray-600">Easily search through thousands of income-restricted and subsidized housing properties nationwide.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-light rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-file-contract text-primary text-2xl"></i>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Program Eligibility</h3>
            <p className="text-gray-600">Learn about different housing assistance programs and check if you qualify for subsidies.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-light rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-mobile-alt text-primary text-2xl"></i>
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3">Apply On-The-Go</h3>
            <p className="text-gray-600">Use our mobile app to discover, save and apply for affordable housing opportunities anywhere.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
