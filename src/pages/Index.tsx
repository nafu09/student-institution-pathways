
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/ui/page-transition";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Building } from "lucide-react";

export default function Index() {
  const { user, userType } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageTransition>
        <main className="flex-grow pt-16 md:pt-20">
          {/* Hero Section */}
          <section className="py-20 md:py-32 relative overflow-hidden">
            <Container className="relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  Find Your Perfect Educational Path
                </motion.h1>
                <motion.p 
                  className="text-xl text-muted-foreground mb-8 md:mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  CareerCompass connects students with world-class institutions for a
                  seamless educational journey from BSc to PhD.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {user ? (
                    <Button size="lg" asChild>
                      <Link to={
                        userType === "student" 
                          ? "/student/dashboard" 
                          : "/institution/dashboard"
                      }>
                        Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button size="lg" className="group relative overflow-hidden" asChild>
                        <Link to="/student/login">
                          <span className="relative z-10 flex items-center">
                            I'm a Student 
                            <GraduationCap className="ml-2 h-5 w-5" />
                          </span>
                          <span className="absolute inset-0 bg-primary/10 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" className="group relative overflow-hidden" asChild>
                        <Link to="/institution/login">
                          <span className="relative z-10 flex items-center">
                            I'm an Institution
                            <Building className="ml-2 h-5 w-5" />
                          </span>
                          <span className="absolute inset-0 bg-secondary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </>
                  )}
                </motion.div>
              </div>
            </Container>
            <div className="absolute inset-0 md:-inset-x-80 top-1/3 bg-gradient-to-b from-secondary/50 to-transparent -z-10 pointer-events-none"></div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-secondary/30">
            <Container>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CareerCompass</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A seamless platform connecting students and institutions to create better educational outcomes.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "For Students",
                    description:
                      "Browse accredited courses from BSc to PhD and apply directly to your dream institutions.",
                    icon: GraduationCap,
                    link: "/student/register"
                  },
                  {
                    title: "For Institutions",
                    description:
                      "Showcase your educational offerings and connect with qualified applicants from around the world.",
                    icon: Building,
                    link: "/institution/register"
                  },
                  {
                    title: "Seamless Process",
                    description:
                      "Our streamlined application process makes it easy to manage educational journeys from start to finish.",
                    icon: ArrowRight,
                    link: "/"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                    <p className="text-muted-foreground text-center mb-4">{feature.description}</p>
                    <div className="text-center">
                      <Button variant="link" asChild className="no-underline">
                        <Link to={feature.link}>
                          Learn more <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Container>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <Container>
              <div className="bg-primary rounded-xl overflow-hidden">
                <div className="px-6 py-12 md:p-12 text-center text-primary-foreground">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
                  <p className="max-w-2xl mx-auto mb-8">
                    Whether you're a student looking for the perfect course or an institution wanting
                    to connect with qualified applicants, CareerCompass is your ideal platform.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" variant="secondary" asChild>
                      <Link to="/student/register">Register as Student</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-primary-foreground hover:bg-primary-foreground/10" asChild>
                      <Link to="/institution/register">Register as Institution</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}
