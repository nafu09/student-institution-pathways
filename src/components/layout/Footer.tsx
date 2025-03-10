
import { Container } from "@/components/ui/container";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t py-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">CareerCompass</h3>
            <p className="text-muted-foreground text-sm">
              Connecting students with the right educational institutions around
              the world. Your future starts here.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">Students</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/student/login" className="hover:text-primary transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/student/register" className="hover:text-primary transition-colors">
                  Register as Student
                </Link>
              </li>
              <li>
                <Link to="/student/courses" className="hover:text-primary transition-colors">
                  Browse Courses
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">Institutions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/institution/login" className="hover:text-primary transition-colors">
                  Institution Login
                </Link>
              </li>
              <li>
                <Link to="/institution/register" className="hover:text-primary transition-colors">
                  Register Institution
                </Link>
              </li>
              <li>
                <Link to="/institution/dashboard" className="hover:text-primary transition-colors">
                  Manage Courses
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} CareerCompass. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
