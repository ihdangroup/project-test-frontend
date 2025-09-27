import { FC } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

const Home: FC = () => {
  return (
    <ProtectedRoute>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Welcome to Management Dashboard</h1>
          <p className="card-text">Select Users or Employees from the navigation to manage data.</p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
