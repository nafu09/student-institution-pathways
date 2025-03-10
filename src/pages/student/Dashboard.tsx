
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/ui/page-transition";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, GraduationCap, FileText, Clock } from "lucide-react";

// Mock data
const recentCourses = [
  { id: 1, name: "Computer Science", level: "BSc", institution: "MIT", viewed: "2 days ago" },
  { id: 2, name: "Data Science", level: "MS", institution: "Stanford University", viewed: "4 days ago" },
  { id: 3, name: "Artificial Intelligence", level: "PhD", institution: "Oxford University", viewed: "1 week ago" },
];

const applications = [
  { id: 1, course: "Computer Science", level: "BSc", institution: "MIT", status: "Pending", submitted: "2023-06-15" },
  { id: 2, course: "Economics", level: "MS", institution: "Harvard", status: "Accepted", submitted: "2023-05-10" },
];

export default function StudentDashboard() {
  const { user, userType } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in as student
  useEffect(() => {
    if (!user || userType !== "student") {
      navigate("/student/login");
    }
  }, [user, userType, navigate]);

  if (!user || userType !== "student") return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageTransition>
        <main className="flex-grow pt-20">
          <Container className="py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm text-muted-foreground">Welcome back,</p>
                <h1 className="text-3xl font-bold">{user.name}</h1>
              </div>
              <Button asChild>
                <Link to="/student/courses">Browse All Courses</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-secondary rounded-lg p-6 flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Courses Viewed</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-6 flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-6 flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accepted Offers</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Recently Viewed Courses</h2>
                  <Button variant="link" asChild className="text-sm p-0 h-auto">
                    <Link to="/student/courses">View All</Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-3 rounded-md border hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{course.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {course.level} • {course.institution}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.viewed}
                      </div>
                    </div>
                  ))}
                  {recentCourses.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      <p>No courses viewed yet</p>
                      <Button
                        variant="link"
                        asChild
                        className="mt-2"
                      >
                        <Link to="/student/courses">Browse courses</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Your Applications</h2>
                  <Button variant="link" asChild className="text-sm p-0 h-auto">
                    <Link to="/student/applications">View All</Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div
                      key={application.id}
                      className="p-3 rounded-md border hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{application.course}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          application.status === "Accepted" 
                            ? "bg-green-100 text-green-800"
                            : application.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {application.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <p>{application.level} • {application.institution}</p>
                        <p>Submitted: {new Date(application.submitted).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      <p>No applications yet</p>
                      <Button
                        variant="link"
                        asChild
                        className="mt-2"
                      >
                        <Link to="/student/courses">Apply for courses</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}
