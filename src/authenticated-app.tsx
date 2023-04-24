import React from "react";
import { useAuth } from 'context/auth-context';
import { UnauthenticatedApp } from './unauthenticated-app/index';
import { ProjectListScreen } from 'screens/project-list/index';

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
}