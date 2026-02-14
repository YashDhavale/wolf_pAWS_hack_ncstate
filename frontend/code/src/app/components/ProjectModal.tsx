import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { Clock, Award, CheckCircle } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: string;
  duration: string;
}

interface ProjectModalProps {
  show: boolean;
  project: Project | null;
  onHide: () => void;
}

export function ProjectModal({ show, project, onHide }: ProjectModalProps) {
  if (!project) return null;

  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{project.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <div className="d-flex gap-3 mb-3">
            <div className="d-flex align-items-center">
              <Award size={18} className="me-2 text-primary" />
              <span>
                Difficulty: <Badge bg={getDifficultyVariant(project.difficulty)}>{project.difficulty}</Badge>
              </span>
            </div>
            <div className="d-flex align-items-center">
              <Clock size={18} className="me-2 text-primary" />
              <span>{project.duration}</span>
            </div>
          </div>

          <h6>Description</h6>
          <p className="text-muted">{project.description}</p>
        </div>

        <div className="mb-4">
          <h6 className="mb-3">Skills You'll Learn</h6>
          <div className="d-flex flex-wrap gap-2">
            {project.skills.map((skill, idx) => (
              <div key={idx} className="d-flex align-items-center bg-light rounded px-3 py-2">
                <CheckCircle size={16} className="text-success me-2" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-light rounded p-3">
          <h6 className="mb-2">Getting Started</h6>
          <ol className="mb-0 ps-3">
            <li>Set up your development environment</li>
            <li>Break down the project into smaller tasks</li>
            <li>Research and learn the required technologies</li>
            <li>Start with a basic prototype</li>
            <li>Iterate and add features incrementally</li>
            <li>Test thoroughly and deploy</li>
          </ol>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onHide}>
          Start This Project
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
