import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'M. Karthik',
    farmerId: 'FRM-1001',
    aadhaar: 'XXXX-XXXX-8912',
    mobile: '+91 98765 43210',
    stateDistrict: 'Tamil Nadu / Salem',
    acreage: '12.5 Acres',
    ifsc: 'TNSB0001234',
    landRecord: 'Verified',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Farmer Profile & Land Holding"
        subtitle="Registered farmer credentials & land record verification status"
        action={
          <button
            type="button"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="inline-flex items-center rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        }
      />

      <Card title="Personal & Bank Profile">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="space-y-1">
            <span className="font-semibold block">Full Name:</span>
            {isEditing ? (
              <input
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-slate-700 focus:border-emerald-500 focus:outline-none"
              />
            ) : (
              <span>{profile.fullName}</span>
            )}
          </div>

          <div className="space-y-1">
            <span className="font-semibold block">Farmer ID:</span>
            {isEditing ? (
              <input
                name="farmerId"
                value={profile.farmerId}
                onChange={handleChange}
                className="w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-slate-700 focus:border-emerald-500 focus:outline-none"
              />
            ) : (
              <span>{profile.farmerId}</span>
            )}
          </div>

          <div className="space-y-1">
            <span className="font-semibold block">Aadhaar Number:</span>
            {isEditing ? (
              <input
                name="aadhaar"
                value={profile.aadhaar}
                onChange={handleChange}
                className="w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-slate-700 focus:border-emerald-500 focus:outline-none"
              />
            ) : (
              <span>{profile.aadhaar}</span>
            )}
          </div>

          <div className="space-y-1">
            <span className="font-semibold block">Mobile:</span>
            {isEditing ? (
              <input
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
                className="w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-slate-700 focus:border-emerald-500 focus:outline-none"
              />
            ) : (
              <span>{profile.mobile}</span>
            )}
          </div>

          <div className="space-y-1">
            <span className="font-semibold block">State / District:</span>
            {isEditing ? (
              <input
                name="stateDistrict"
                value={profile.stateDistrict}
                onChange={handleChange}
                className="w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-slate-700 focus:border-emerald-500 focus:outline-none"
              />
            ) : (
              <span>{profile.stateDistrict}</span>
            )}
          </div>

          <div className="space-y-1">
            <span className="font-semibold block">Registered Acreage:</span>
            {isEditing ? (
              <input
                name="acreage"
                value={profile.acreage}
                onChange={handleChange}
                className="w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-slate-700 focus:border-emerald-500 focus:outline-none"
              />
            ) : (
              <span>{profile.acreage}</span>
            )}
          </div>

          <div className="space-y-1">
            <span className="font-semibold block">Bank IFSC:</span>
            {isEditing ? (
              <input
                name="ifsc"
                value={profile.ifsc}
                onChange={handleChange}
                className="w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-slate-700 focus:border-emerald-500 focus:outline-none"
              />
            ) : (
              <span>{profile.ifsc}</span>
            )}
          </div>

          <div className="space-y-1">
            <span className="font-semibold block">Land Record (Bhulekh):</span>
            {isEditing ? (
              <input
                name="landRecord"
                value={profile.landRecord}
                onChange={handleChange}
                className="w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-slate-700 focus:border-emerald-500 focus:outline-none"
              />
            ) : (
              <span className="text-emerald-700 font-bold">✓ {profile.landRecord}</span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
