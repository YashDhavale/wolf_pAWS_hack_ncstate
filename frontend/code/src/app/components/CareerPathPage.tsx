import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { Network, Code, Layout, Server, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CareerRole {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  projects: {
    id: string;
    title: string;
    skills: string[];
    order: number;
  }[];
}

const careerPaths: CareerRole[] = [
  {
    id: 'network',
    title: 'Network Engineer',
    icon: <Network size={40} />,
    description: 'Design, implement, and maintain computer networks',
    projects: [
      { id: '1', title: 'Build a Network Topology Simulator', skills: ['Networking Basics', 'TCP/IP', 'Routing'], order: 1 },
      { id: '2', title: 'Configure VLANs and Subnetting', skills: ['VLAN', 'Subnetting', 'Switch Configuration'], order: 2 },
      { id: '3', title: 'Implement Network Security with Firewalls', skills: ['Firewall', 'ACL', 'Network Security'], order: 3 },
      { id: '4', title: 'Set Up VPN Infrastructure', skills: ['VPN', 'IPSec', 'Remote Access'], order: 4 },
      { id: '5', title: 'Monitor Network with SNMP Tools', skills: ['SNMP', 'Network Monitoring', 'Troubleshooting'], order: 5 }
    ]
  },
  {
    id: 'software',
    title: 'Software Engineer',
    icon: <Code size={40} />,
    description: 'Design and develop software applications and systems',
    projects: [
      { id: '1', title: 'Build a Task Management CLI Tool', skills: ['Python/Java', 'Data Structures', 'File I/O'], order: 1 },
      { id: '2', title: 'Create a RESTful API Service', skills: ['REST API', 'HTTP', 'Backend Framework'], order: 2 },
      { id: '3', title: 'Develop a Database-Driven Application', skills: ['SQL', 'Database Design', 'ORM'], order: 3 },
      { id: '4', title: 'Implement Design Patterns in a Project', skills: ['Design Patterns', 'OOP', 'Architecture'], order: 4 },
      { id: '5', title: 'Build Microservices Architecture', skills: ['Microservices', 'Docker', 'API Gateway'], order: 5 }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Engineer',
    icon: <Layout size={40} />,
    description: 'Create responsive and interactive user interfaces',
    projects: [
      { id: '1', title: 'Build a Responsive Portfolio Website', skills: ['HTML', 'CSS', 'Responsive Design'], order: 1 },
      { id: '2', title: 'Create an Interactive Dashboard with React', skills: ['React', 'Components', 'State Management'], order: 2 },
      { id: '3', title: 'Implement Advanced Animations', skills: ['CSS Animations', 'Transitions', 'Motion'], order: 3 },
      { id: '4', title: 'Build a SPA with Routing', skills: ['React Router', 'SPA', 'Navigation'], order: 4 },
      { id: '5', title: 'Optimize Performance and Accessibility', skills: ['Performance', 'A11y', 'SEO'], order: 5 }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    icon: <Server size={40} />,
    description: 'Automate and optimize software deployment and infrastructure',
    projects: [
      { id: '1', title: 'Set Up Version Control Workflow', skills: ['Git', 'GitHub', 'Branching Strategy'], order: 1 },
      { id: '2', title: 'Containerize an Application', skills: ['Docker', 'Containers', 'Docker Compose'], order: 2 },
      { id: '3', title: 'Build CI/CD Pipeline', skills: ['Jenkins', 'GitHub Actions', 'CI/CD'], order: 3 },
      { id: '4', title: 'Deploy to Cloud Platform', skills: ['AWS/Azure', 'Cloud Deploy', 'Infrastructure'], order: 4 },
      { id: '5', title: 'Implement Infrastructure as Code', skills: ['Terraform', 'IaC', 'Automation'], order: 5 }
    ]
  }
];

export function CareerPathPage() {
  const [selectedPath, setSelectedPath] = useState<CareerRole | null>(null);

  return (
    <Container fluid>
      {!selectedPath ? (
        <>
          <h3 className="mb-4">Choose Your Career Path</h3>
          <p className="text-muted mb-4">
            Select a career path to see a structured learning roadmap with hands-on projects
          </p>
          <Row>
            {careerPaths.map((path) => (
              <Col lg={6} xl={3} className="mb-4" key={path.id}>
                <Card
                  className="h-100 shadow-sm"
                  style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                  onClick={() => setSelectedPath(path)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Card.Body className="text-center">
                    <div className="text-primary mb-3">{path.icon}</div>
                    <Card.Title>{path.title}</Card.Title>
                    <Card.Text className="text-muted small">
                      {path.description}
                    </Card.Text>
                    <Badge bg="primary" className="mt-2">
                      {path.projects.length} Projects
                    </Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <Button variant="outline-secondary" onClick={() => setSelectedPath(null)} className="mb-2">
                ← Back to Career Paths
              </Button>
              <h3 className="mb-1">{selectedPath.title} Career Path</h3>
              <p className="text-muted mb-0">{selectedPath.description}</p>
            </div>
          </div>

          <Row>
            <Col lg={8}>
              <Card>
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">Project Roadmap</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <ListGroup variant="flush">
                    {selectedPath.projects.map((project, index) => (
                      <ListGroup.Item key={project.id} className="py-3">
                        <div className="d-flex align-items-start">
                          <div
                            className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle me-3"
                            style={{ width: '36px', height: '36px', minWidth: '36px' }}
                          >
                            {project.order}
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-2">{project.title}</h6>
                            <div className="d-flex flex-wrap gap-1">
                              {project.skills.map((skill, idx) => (
                                <Badge key={idx} bg="light" text="dark" className="fw-normal">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button variant="outline-primary" size="sm">
                            Start <ArrowRight size={14} />
                          </Button>
                        </div>
                        {index < selectedPath.projects.length - 1 && (
                          <div
                            className="ms-3 mt-2"
                            style={{
                              width: '2px',
                              height: '20px',
                              background: '#ddd',
                              marginLeft: '17px'
                            }}
                          />
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <h6 className="mb-3">Path Overview</h6>
                  <div className="d-flex align-items-center mb-2">
                    <CheckCircle2 size={18} className="text-success me-2" />
                    <span>{selectedPath.projects.length} hands-on projects</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <CheckCircle2 size={18} className="text-success me-2" />
                    <span>Beginner to Advanced progression</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <CheckCircle2 size={18} className="text-success me-2" />
                    <span>Industry-relevant skills</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <CheckCircle2 size={18} className="text-success me-2" />
                    <span>Portfolio-ready projects</span>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <h6 className="mb-3">Recommended Timeline</h6>
                  <p className="small text-muted mb-2">
                    Complete this path at your own pace. Here's a suggested timeline:
                  </p>
                  <ListGroup variant="flush" className="small">
                    <ListGroup.Item className="px-0 py-2">
                      <strong>Weeks 1-3:</strong> Projects 1-2
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 py-2">
                      <strong>Weeks 4-6:</strong> Project 3
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 py-2">
                      <strong>Weeks 7-10:</strong> Projects 4-5
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
