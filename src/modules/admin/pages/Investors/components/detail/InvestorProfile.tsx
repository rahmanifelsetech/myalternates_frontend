import React from 'react';
import Badge from '@shared/components/ui/badge/Badge';
import Button from '@shared/components/ui/button/Button';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { Investor } from '../../types/investor';
import { formatDate } from '@shared/utils/dateUtils';
import { useNavigate } from 'react-router';

interface InvestorProfileProps {
  investor: Investor;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const InvestorProfile: React.FC<InvestorProfileProps> = ({
  investor,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { primaryPerson } = investor;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header with status and actions */}
      <div className="flex flex-col gap-4 border-b border-gray-100 px-4 py-5 dark:border-gray-800 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div>
              <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
                {primaryPerson?.fullName || 'Investor'}
              </h2>
              <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mt-1`}>
                MyAlt Code: {investor.myaltCode || 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Badge
              color={investor.isActive ? 'success' : 'error'}
              variant="light"
              size="sm"
            >
              {investor.isActive ? 'Active' : 'Inactive'}
            </Badge>
            <Badge color="info" variant="light" size="sm">
              {investor.residentialStatus}
            </Badge>
          </div>
        </div>
        {/* <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={onEdit}
            startIcon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 18 18">
                <path d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206Z" />
              </svg>
            }
          >
            Edit
          </Button>
          <Button 
            variant="outline"
            onClick={onDelete}
            className="text-error-600 hover:bg-error-50 hover:text-error-700 dark:text-error-400 dark:hover:bg-error-900/20"
          >
            Delete
          </Button>
          <Button variant="outline" onClick={() => navigate('/admin/investors')}>
            Back
          </Button>
        </div> */}
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 gap-4 border-b border-gray-100 px-4 py-5 dark:border-gray-800 sm:grid-cols-2 md:grid-cols-4 sm:px-6">
        <InfoItem label="Email" value={primaryPerson?.email} />
        <InfoItem label="Mobile" value={primaryPerson?.mobile} />
        <InfoItem label="PAN" value={primaryPerson?.pan} />
        <InfoItem label="Inception Date" value={investor.inceptionDate ? formatDate(investor.inceptionDate) : '-'} />
      </div>

      {/* Personal Details */}
      <div className="px-4 py-5 sm:px-6">
        <h3 className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary} mb-4`}>
          Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <DetailField label="Full Name" value={primaryPerson?.fullName} />
          <DetailField label="Date of Birth" value={primaryPerson?.dob ? formatDate(primaryPerson.dob) : '-'} />
          <DetailField label="Gender" value={primaryPerson?.gender} />
          <DetailField label="Address Line 1" value={primaryPerson?.addresses?.[0]?.address1} />
          <DetailField label="Address Line 2" value={primaryPerson?.addresses?.[0]?.address2} />
          <DetailField label="City" value={primaryPerson?.addresses?.[0]?.city} />
          <DetailField label="State" value={primaryPerson?.addresses?.[0]?.state} />
          <DetailField label="Country" value={primaryPerson?.addresses?.[0]?.country} />
          <DetailField label="Pincode" value={primaryPerson?.addresses?.[0]?.pincode} />
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value?: string | null;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div>
    <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mb-1`}>
      {label}
    </p>
    <p className={`${typographyClasses.body.small} font-medium ${typographyClasses.colors.text.primary}`}>
      {value || '-'}
    </p>
  </div>
);

interface DetailFieldProps {
  label: string;
  value?: string | null;
}

const DetailField: React.FC<DetailFieldProps> = ({ label, value }) => (
  <div>
    <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mb-1`}>
      {label}
    </p>
    <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.primary}`}>
      {value || '-'}
    </p>
  </div>
);

export default InvestorProfile;
