import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import Input from '../../components/inputs/Input';
import Dropdown from '../../components/inputs/Dropdown';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { ShieldCheck } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState(ROLES.FARMER);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(selectedRole);

    // Navigate to role-specific dashboard
    switch (selectedRole) {
      case ROLES.FARMER:
        navigate('/farmer/dashboard');
        break;
      case ROLES.OFFICER:
        navigate('/officer/dashboard');
        break;
      case ROLES.MANAGER:
        navigate('/manager/dashboard');
        break;
      case ROLES.ADMIN:
        navigate('/admin/dashboard');
        break;
      default:
        navigate('/farmer/dashboard');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <ShieldCheck className="w-12 h-12 text-emerald-700 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 mt-2">Portal Login</h2>
        <p className="text-xs text-slate-500 mt-1">Select your official role to enter the MSP system</p>
      </div>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <Dropdown
          label="Select Portal Module / Role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          options={[
            { label: ROLE_LABELS[ROLES.FARMER], value: ROLES.FARMER },
            { label: ROLE_LABELS[ROLES.OFFICER], value: ROLES.OFFICER },
            { label: ROLE_LABELS[ROLES.MANAGER], value: ROLES.MANAGER },
            { label: ROLE_LABELS[ROLES.ADMIN], value: ROLES.ADMIN },
          ]}
          required
        />

        <Input
          label="Aadhaar No. / Mobile / Employee ID"
          placeholder="Enter registered credentials"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />

        <Input
          label="Password / OTP"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between text-xs">
          <Link to="/forgot-password" className="text-emerald-700 font-medium hover:underline">
            Forgot Password / Reset OTP?
          </Link>
          <Link to="/register" className="text-emerald-700 font-medium hover:underline">
            New Farmer Registration
          </Link>
        </div>

        <PrimaryButton type="submit" className="w-full">
          Access Portal ({ROLE_LABELS[selectedRole]})
        </PrimaryButton>
      </form>
    </div>
  );
};

export default Login;
