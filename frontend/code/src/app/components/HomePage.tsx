import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Upload, FileText } from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: string;
  duration: string;
}

export function HomePage() {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const jobFileRef = useRef<HTMLInputElement>(null);
  const resumeFileRef = useRef<HTMLInputElement>(null);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
      }

      return fullText;
    } catch (error) {
      console.error('Error extracting PDF text:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  const handleJobPDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    try {
      setError('');
      const text = await extractTextFromPDF(file);
      setJobDescription(text);
    } catch (err) {
      setError('Failed to extract text from PDF. Please try again.');
    }
  };

  const handleResumePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    try {
      setError('');
      const text = await extractTextFromPDF(file);
      setResume(text);
    } catch (err) {
      setError('Failed to extract text from PDF. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!jobDescription.trim() || !resume.trim()) {
      setError('Please provide both job description and resume');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call to backend
    setTimeout(() => {
      // Mock response with projects
      const mockProjects: Project[] = [
        {
          id: '1',
          title: 'Full-Stack E-Commerce Platform',
          description: 'Build a complete e-commerce platform with React frontend, Node.js backend, and MongoDB database. Implement user authentication, product catalog, shopping cart, and payment integration.',
          skills: ['React', 'Node.js', 'MongoDB', 'Express', 'REST API', 'Authentication'],
          difficulty: 'Advanced',
          duration: '8-10 weeks'
        },
        {
          id: '2',
          title: 'Real-Time Chat Application',
          description: 'Create a real-time chat application using WebSocket technology. Features include private messaging, group chats, file sharing, and online status indicators.',
          skills: ['Socket.io', 'React', 'Node.js', 'WebRTC', 'Redis'],
          difficulty: 'Intermediate',
          duration: '4-6 weeks'
        },
        {
          id: '3',
          title: 'Data Visualization Dashboard',
          description: 'Develop an interactive dashboard for visualizing complex datasets. Include charts, graphs, filters, and export functionality.',
          skills: ['React', 'D3.js', 'TypeScript', 'Data Analysis', 'Charts'],
          difficulty: 'Intermediate',
          duration: '3-5 weeks'
        },
        {
          id: '4',
          title: 'CI/CD Pipeline Setup',
          description: 'Set up automated testing and deployment pipeline using GitHub Actions, Docker, and cloud platforms. Implement code quality checks and automated deployments.',
          skills: ['Docker', 'GitHub Actions', 'Jenkins', 'AWS', 'DevOps'],
          difficulty: 'Advanced',
          duration: '2-4 weeks'
        },
        {
          id: '5',
          title: 'Mobile-First Progressive Web App',
          description: 'Build a progressive web app with offline capabilities, push notifications, and mobile-first responsive design.',
          skills: ['PWA', 'Service Workers', 'React', 'IndexedDB', 'Responsive Design'],
          difficulty: 'Intermediate',
          duration: '5-7 weeks'
        }
      ];

      setProjects(mockProjects);
      setLoading(false);
    }, 1500);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  return (
    <Container fluid>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Row className="mb-4">
        <Col lg={6} className="mb-4">
          <Card className="h-100">
            <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
              <span>Job Description</span>
              <div>
                <input
                  type="file"
                  ref={jobFileRef}
                  accept=".pdf"
                  onChange={handleJobPDFUpload}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => jobFileRef.current?.click()}
                >
                  <Upload size={16} className="me-1" />
                  Upload PDF
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={15}
                  placeholder="Paste the job description here or upload a PDF..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="h-100">
            <Card.Header className="d-flex justify-content-between align-items-center bg-success text-white">
              <span>Resume</span>
              <div>
                <input
                  type="file"
                  ref={resumeFileRef}
                  accept=".pdf"
                  onChange={handleResumePDFUpload}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => resumeFileRef.current?.click()}
                >
                  <Upload size={16} className="me-1" />
                  Upload PDF
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={15}
                  placeholder="Paste your resume here or upload a PDF..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={loading || !jobDescription.trim() || !resume.trim()}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Analyzing...
              </>
            ) : (
              'Submit & Get Project Recommendations'
            )}
          </Button>
        </Col>
      </Row>

      {projects.length > 0 && (
        <Row>
          <Col>
            <h4 className="mb-3">Recommended Projects to Build Your Skills</h4>
            <Row>
              {projects.map((project) => (
                <Col lg={4} md={6} className="mb-3" key={project.id}>
                  <Card
                    className="h-100 shadow-sm"
                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onClick={() => handleProjectClick(project)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Card.Body>
                      <div className="d-flex align-items-start mb-2">
                        <FileText size={24} className="text-primary me-2" />
                        <div>
                          <Card.Title className="mb-1">{project.title}</Card.Title>
                          <small className="text-muted">{project.difficulty} • {project.duration}</small>
                        </div>
                      </div>
                      <Card.Text className="text-muted small">
                        {project.description.substring(0, 100)}...
                      </Card.Text>
                      <div className="d-flex flex-wrap gap-1">
                        {project.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="badge bg-secondary">{skill}</span>
                        ))}
                        {project.skills.length > 3 && (
                          <span className="badge bg-light text-dark">+{project.skills.length - 3} more</span>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}

      <ProjectModal
        show={showModal}
        project={selectedProject}
        onHide={() => setShowModal(false)}
      />
    </Container>
  );
}
