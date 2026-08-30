import React, { createContext, useContext, useState } from 'react';
import { ROLES } from '../constants/roles';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [activeRole, setActiveRole] = useState(ROLES.FARMER);

  return (
    <RoleContext.Provider value={{ activeRole, setActiveRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
