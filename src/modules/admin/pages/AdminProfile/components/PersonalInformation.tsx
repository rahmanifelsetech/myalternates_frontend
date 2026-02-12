import Button from '@shared/components/ui/button/Button';

import typographyClasses from '@shared/utils/typographyUtils';
import { User } from '@shared/types/user';

interface Props {
  user: User;
}

const PersonalInformation = ({ user }: Props) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-[16px] font-semibold text-gray-800">
          Personal Information
        </h3>
      </div>

      {/* Form Grid */}
      <div className="px-6 py-6 grid grid-cols-2 gap-x-8 gap-y-5">

        <Field label="Full Name" value={user.name} />
        <Field label="Email Address" value={user.email} />
        <Field label="Phone Number" value={user.phone || ''} />
        <Field
  label="Username"
  value={user.name}
  disabled
/>

<Field
  label="Role"
  value={user.role}
  disabled
/>
        <Field label="Office Location" value="Mumbai, India" />
        <SelectField label="Time Zone" value="IST (UTC+5:30)" />
        <SelectField label="Preferred Language" value="English" />

      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
        <Button
          variant="primary"
            
          className="text-[14px] font-medium"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default PersonalInformation;

/* ----------------------------- */
const Field = ({
  label,
  value,
  disabled = false,
}: {
  label: string;
  value?: string;
  disabled?: boolean;
}) => (
  <div>
    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
      {label}
    </label>

    <input
      type="text"
      value={value || ''}
      disabled={disabled}
      className={`w-full h-10 px-3 rounded-lg border border-gray-200 
                  bg-gray-50 text-[14px] text-gray-800
                  focus:outline-none focus:ring-1 focus:ring-gray-300
                  ${disabled ? 'cursor-not-allowed opacity-80' : ''}`}
    />
  </div>
);




const SelectField = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div>
    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
       
        className="w-full h-10 px-3 pr-8 rounded-lg border border-gray-200 bg-gray-50 text-[14px] text-gray-800 appearance-none focus:outline-none"
      >
        <option>{value}</option>
      </select>

      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
        ▼
      </div>
    </div>
  </div>
);

