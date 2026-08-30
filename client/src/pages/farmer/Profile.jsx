import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';

export const Profile = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Farmer Profile & Land Holding" subtitle="Registered farmer credentials & land record verification status" />

      <Card title="Personal & Bank Profile">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div><span className="font-semibold">Full Name:</span> Ramesh Singh</div>
          <div><span className="font-semibold">Farmer ID:</span> FRM-1001</div>
          <div><span className="font-semibold">Aadhaar Number:</span> XXXX-XXXX-8912</div>
          <div><span className="font-semibold">Mobile:</span> +91 98765 43210</div>
          <div><span className="font-semibold">State / District:</span> Punjab / Ludhiana</div>
          <div><span className="font-semibold">Registered Acreage:</span> 12.5 Acres</div>
          <div><span className="font-semibold">Bank IFSC:</span> SBIN0001234</div>
          <div><span className="font-semibold">Land Record (Bhulekh):</span> <span className="text-emerald-700 font-bold">✓ Verified</span></div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
