
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/ui/page-transition";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Search, Filter, MapPin } from "lucide-react";

// Mock course data
const coursesData = [
  {
    id: 1,
    name: "Computer Science",
    level: "BSc",
    institution: "Massachusetts Institute of Technology",
    location: "Cambridge, USA",
    duration: "3 years",
    deadline: "2023-12-15",
    description: "A comprehensive program covering algorithms, data structures, and software engineering principles."
  },
  {
    id: 2,
    name: "Data Science",
    level: "MS",
    institution: "Stanford University",
    location: "Stanford, USA",
    duration: "2 years",
    deadline: "2023-11-30",
    description: "Advanced study of statistical methods, machine learning, and data visualization techniques."
  },
  {
    id: 3,
    name: "Artificial Intelligence",
    level: "PhD",
    institution: "University of Oxford",
    location: "Oxford, UK",
    duration: "4 years",
    deadline: "2023-10-25",
    description: "Research-focused program exploring cutting-edge AI technologies and their applications."
  },
  // Add more courses as needed
];

export default function CourseList() {
  const { user, userType } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [filteredCourses, setFilteredCourses] = useState(coursesData);

  // Redirect if not logged in as student
  useEffect(() => {
    if (!user || userType !== "student") {
      navigate("/student/login");
    }
  }, [user, userType, navigate]);

  // Filter courses based on search term and selected level
  useEffect(() => {
    let filtered = coursesData;

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.institution.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLevel) {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedLevel]);

  if (!user || userType !== "student") return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageTransition>
        <main className="flex-grow pt-20">
          <Container className="py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Browse Courses</h1>
                <p className="text-muted-foreground">
                  Discover programs from top institutions worldwide
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["BSc", "MS", "PhD"].map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? "default" : "outline"}
                    onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                    className="min-w-[80px]"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses or institutions..."
                  className="w-full pl-10 pr-4 py-2 h-11 rounded-md border bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Course List */}
            <div className="space-y-4">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg border p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {course.level}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Deadline: {new Date(course.deadline).toLocaleDateString()}
                          </span>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
                        <div className="flex items-center text-muted-foreground mb-4">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span className="text-sm">{course.institution}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{course.location}</span>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {course.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Duration: {course.duration}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 md:w-48">
                        <Button asChild>
                          <Link to={`/student/courses/${course.id}`}>View Details</Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to={`/student/courses/${course.id}/apply`}>Apply Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No courses found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedLevel(null);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </Container>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}
