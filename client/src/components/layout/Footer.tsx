import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-12 pb-20 md:pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-home text-2xl text-primary mr-2"></i>
              <span className="font-heading font-bold text-xl">AffordableHomes</span>
            </div>
            <p className="text-gray-400 mb-6">Helping families find affordable housing solutions nationwide.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/housing-programs">
                  <a className="text-gray-400 hover:text-white transition-colors">Section 8 Housing</a>
                </Link>
              </li>
              <li>
                <Link href="/housing-programs">
                  <a className="text-gray-400 hover:text-white transition-colors">Low-Income Housing</a>
                </Link>
              </li>
              <li>
                <Link href="/housing-programs">
                  <a className="text-gray-400 hover:text-white transition-colors">Senior Housing</a>
                </Link>
              </li>
              <li>
                <Link href="/housing-programs">
                  <a className="text-gray-400 hover:text-white transition-colors">Family Housing</a>
                </Link>
              </li>
              <li>
                <Link href="/housing-programs">
                  <a className="text-gray-400 hover:text-white transition-colors">Housing Assistance</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources/eligibility">
                  <a className="text-gray-400 hover:text-white transition-colors">Eligibility Calculator</a>
                </Link>
              </li>
              <li>
                <Link href="/resources/income-guidelines">
                  <a className="text-gray-400 hover:text-white transition-colors">Income Guidelines</a>
                </Link>
              </li>
              <li>
                <Link href="/resources/application-guide">
                  <a className="text-gray-400 hover:text-white transition-colors">Application Guide</a>
                </Link>
              </li>
              <li>
                <Link href="/resources/rental-assistance">
                  <a className="text-gray-400 hover:text-white transition-colors">Rental Assistance</a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="text-gray-400 hover:text-white transition-colors">FAQ</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white transition-colors">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a className="text-gray-400 hover:text-white transition-colors">Careers</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} AffordableHomes. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy">
              <a className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            </Link>
            <Link href="/terms">
              <a className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            </Link>
            <Link href="/accessibility">
              <a className="text-gray-500 hover:text-white text-sm transition-colors">Accessibility</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
