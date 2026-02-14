import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, Button } from 'react-bootstrap';
import { HomePage } from './HomePage';
import { CareerPathPage } from './CareerPathPage';
import { TrendingSkillsPage } from './TrendingSkillsPage';
import { LogOut } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

type PageType = 'home' | 'career' | 'trending';

export function Dashboard({ onLogout }: DashboardProps) {
  const [activePage, setActivePage] = useState<PageType>('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'career':
        return <CareerPathPage />;
      case 'trending':
        return <TrendingSkillsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="d-flex vh-100" style={{ overflow: 'hidden' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white d-flex flex-column" style={{ width: '250px', minWidth: '250px' }}>
        <div className="p-3 border-bottom border-secondary">
          <h4 className="mb-0">Career Platform</h4>
        </div>
        
        <Nav className="flex-column flex-grow-1 p-2">
          <Nav.Link
            className={`text-white mb-1 rounded ${activePage === 'home' ? 'bg-primary' : ''}`}
            onClick={() => setActivePage('home')}
            style={{ cursor: 'pointer' }}
          >
            HomePage
          </Nav.Link>
          <Nav.Link
            className={`text-white mb-1 rounded ${activePage === 'career' ? 'bg-primary' : ''}`}
            onClick={() => setActivePage('career')}
            style={{ cursor: 'pointer' }}
          >
            CareerPath
          </Nav.Link>
          <Nav.Link
            className={`text-white mb-1 rounded ${activePage === 'trending' ? 'bg-primary' : ''}`}
            onClick={() => setActivePage('trending')}
            style={{ cursor: 'pointer' }}
          >
            Trending Skills
          </Nav.Link>
        </Nav>

        <div className="p-3 border-top border-secondary">
          <Button variant="outline-light" className="w-100" onClick={onLogout}>
            <LogOut size={16} className="me-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ overflow: 'auto' }}>
        <Navbar bg="white" className="border-bottom px-4">
          <Container fluid>
            <Navbar.Brand>
              {activePage === 'home' && 'Job & Resume Analysis'}
              {activePage === 'career' && 'Career Paths'}
              {activePage === 'trending' && 'Trending Skills & Recommendations'}
            </Navbar.Brand>
          </Container>
        </Navbar>

        <div className="p-4">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
