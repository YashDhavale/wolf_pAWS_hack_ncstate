import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Form, Button, ProgressBar } from 'react-bootstrap';
import { TrendingUp, Briefcase, BookOpen, Star, RefreshCw } from 'lucide-react';

interface TrendingSkill {
  id: string;
  name: string;
  category: string;
  demand: number;
  growth: number;
  avgSalary: string;
  jobPostings: number;
  description: string;
  relatedRoles: string[];
  learningResources: string[];
}

interface Recommendation {
  id: string;
  title: string;
  reason: string;
  priority: string;
  timeToLearn: string;
}

export function TrendingSkillsPage() {
  const [loading, setLoading] = useState(true);
  const [trendingSkills, setTrendingSkills] = useState<TrendingSkill[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userInterest, setUserInterest] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Simulate fetching trending skills from scraped job data
    const fetchTrendingSkills = async () => {
      setLoading(true);
      
      // Mock data - in real app, this would scrape job sites
      setTimeout(() => {
        const mockSkills: TrendingSkill[] = [
          {
            id: '1',
            name: 'Artificial Intelligence & Machine Learning',
            category: 'Technology',
            demand: 95,
            growth: 87,
            avgSalary: '$120,000 - $180,000',
            jobPostings: 45230,
            description: 'AI/ML skills are in extremely high demand across industries for automation, prediction, and intelligent systems.',
            relatedRoles: ['ML Engineer', 'Data Scientist', 'AI Researcher'],
            learningResources: ['Coursera ML', 'Fast.ai', 'TensorFlow Docs']
          },
          {
            id: '2',
            name: 'Cloud Computing (AWS, Azure, GCP)',
            category: 'Infrastructure',
            demand: 92,
            growth: 78,
            avgSalary: '$110,000 - $160,000',
            jobPostings: 38450,
            description: 'Cloud platforms are essential for modern software deployment and scalability.',
            relatedRoles: ['Cloud Architect', 'DevOps Engineer', 'Solutions Architect'],
            learningResources: ['AWS Training', 'Azure Learn', 'GCP Docs']
          },
          {
            id: '3',
            name: 'Cybersecurity',
            category: 'Security',
            demand: 90,
            growth: 82,
            avgSalary: '$105,000 - $165,000',
            jobPostings: 32100,
            description: 'With increasing cyber threats, security skills are critical for all organizations.',
            relatedRoles: ['Security Analyst', 'Penetration Tester', 'Security Engineer'],
            learningResources: ['CompTIA Security+', 'CISSP', 'Hack The Box']
          },
          {
            id: '4',
            name: 'React & Modern Frontend',
            category: 'Frontend',
            demand: 88,
            growth: 65,
            avgSalary: '$95,000 - $145,000',
            jobPostings: 42800,
            description: 'React remains the most popular frontend framework for building modern web applications.',
            relatedRoles: ['Frontend Developer', 'Full-Stack Developer', 'UI Engineer'],
            learningResources: ['React Docs', 'Frontend Masters', 'Scrimba']
          },
          {
            id: '5',
            name: 'DevOps & CI/CD',
            category: 'Infrastructure',
            demand: 85,
            growth: 73,
            avgSalary: '$100,000 - $155,000',
            jobPostings: 28900,
            description: 'Automation and continuous delivery are essential for modern software development.',
            relatedRoles: ['DevOps Engineer', 'Site Reliability Engineer', 'Platform Engineer'],
            learningResources: ['Docker Docs', 'Kubernetes', 'Jenkins']
          },
          {
            id: '6',
            name: 'Data Science & Analytics',
            category: 'Data',
            demand: 87,
            growth: 70,
            avgSalary: '$105,000 - $160,000',
            jobPostings: 34200,
            description: 'Data-driven decision making requires strong analytical and statistical skills.',
            relatedRoles: ['Data Analyst', 'Data Scientist', 'Business Intelligence'],
            learningResources: ['Kaggle', 'DataCamp', 'Tableau Training']
          }
        ];

        setTrendingSkills(mockSkills);
        setLoading(false);
      }, 1200);
    };

    fetchTrendingSkills();
  }, []);

  const generateRecommendations = () => {
    if (!userInterest.trim()) return;

    // Mock personalized recommendations
    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        title: 'Learn Kubernetes for Container Orchestration',
        reason: 'Based on your interest in cloud and infrastructure, Kubernetes is essential for managing containerized applications at scale.',
        priority: 'High',
        timeToLearn: '4-6 weeks'
      },
      {
        id: '2',
        title: 'Master Python for Data Science',
        reason: 'Python is the most popular language for data analysis and machine learning, perfect for your interests.',
        priority: 'High',
        timeToLearn: '8-10 weeks'
      },
      {
        id: '3',
        title: 'Get AWS Certified',
        reason: 'AWS certification will validate your cloud skills and increase your market value significantly.',
        priority: 'Medium',
        timeToLearn: '6-8 weeks'
      },
      {
        id: '4',
        title: 'Explore Terraform for Infrastructure as Code',
        reason: 'IaC is a must-have skill for modern DevOps practices and infrastructure management.',
        priority: 'Medium',
        timeToLearn: '3-4 weeks'
      }
    ];

    setRecommendations(mockRecommendations);
  };

  const filteredSkills = selectedCategory === 'all' 
    ? trendingSkills 
    : trendingSkills.filter(skill => skill.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(trendingSkills.map(s => s.category)))];

  const getPriorityVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center mb-2">
            <TrendingUp size={28} className="text-primary me-2" />
            <h3 className="mb-0">Trending Skills in 2026</h3>
          </div>
          <p className="text-muted">
            Based on latest job market data scraped from top job boards and industry reports
          </p>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Analyzing latest job market trends...</p>
        </div>
      ) : (
        <>
          <Row className="mb-4">
            <Col>
              <Form.Select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-auto"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-5">
            {filteredSkills.map((skill) => (
              <Col lg={6} className="mb-4" key={skill.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="mb-1">{skill.name}</h5>
                        <Badge bg="primary">{skill.category}</Badge>
                      </div>
                      <div className="text-end">
                        <div className="text-success fw-bold">+{skill.growth}%</div>
                        <small className="text-muted">growth</small>
                      </div>
                    </div>

                    <p className="text-muted small mb-3">{skill.description}</p>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <small>Market Demand</small>
                        <small className="fw-bold">{skill.demand}%</small>
                      </div>
                      <ProgressBar now={skill.demand} variant="success" />
                    </div>

                    <Row className="mb-3">
                      <Col xs={6}>
                        <div className="d-flex align-items-center">
                          <Briefcase size={16} className="text-primary me-2" />
                          <div>
                            <small className="text-muted d-block">Job Postings</small>
                            <strong>{skill.jobPostings.toLocaleString()}</strong>
                          </div>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="d-flex align-items-center">
                          <Star size={16} className="text-warning me-2" />
                          <div>
                            <small className="text-muted d-block">Avg Salary</small>
                            <strong className="small">{skill.avgSalary}</strong>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className="mb-2">
                      <small className="text-muted d-block mb-1">Related Roles:</small>
                      <div className="d-flex flex-wrap gap-1">
                        {skill.relatedRoles.map((role, idx) => (
                          <Badge key={idx} bg="light" text="dark" className="fw-normal">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Card className="mb-4 bg-light">
            <Card.Body>
              <h5 className="mb-3">
                <BookOpen size={24} className="me-2" />
                Get Personalized Recommendations
              </h5>
              <p className="text-muted mb-3">
                Tell us about your interests and career goals to receive tailored learning recommendations
              </p>
              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="E.g., I'm interested in cloud computing and want to transition from frontend development..."
                      value={userInterest}
                      onChange={(e) => setUserInterest(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-start">
                  <Button 
                    variant="primary" 
                    className="w-100"
                    onClick={generateRecommendations}
                    disabled={!userInterest.trim()}
                  >
                    <RefreshCw size={16} className="me-2" />
                    Generate Recommendations
                  </Button>
                </Col>
              </Row>

              {recommendations.length > 0 && (
                <div className="mt-4">
                  <h6 className="mb-3">Your Personalized Learning Path</h6>
                  <Row>
                    {recommendations.map((rec) => (
                      <Col md={6} className="mb-3" key={rec.id}>
                        <Card>
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="mb-0">{rec.title}</h6>
                              <Badge bg={getPriorityVariant(rec.priority)}>
                                {rec.priority}
                              </Badge>
                            </div>
                            <p className="text-muted small mb-2">{rec.reason}</p>
                            <small className="text-muted">
                              ⏱️ Estimated time: {rec.timeToLearn}
                            </small>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}
