// Example: Using Typography Classes in Components

/**
 * ========================================
 * EXAMPLE 1: Form Component
 * ========================================
 */

import React from 'react';
import { typographyClasses } from '@shared/utils/typographyUtils';

interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  hint,
  error,
  children,
}) => {
  return (
    <div className="mb-6">
      {/* Label with optional required indicator */}
      <label className={required ? typographyClasses.form.labelRequired : typographyClasses.form.label}>
        {label}
      </label>

      {/* Input field */}
      <div className="mt-2">{children}</div>

      {/* Helper text or error */}
      {error ? (
        <p className={typographyClasses.form.error}>{error}</p>
      ) : hint ? (
        <p className={typographyClasses.form.hint}>{hint}</p>
      ) : null}
    </div>
  );
};

/**
 * ========================================
 * EXAMPLE 2: Card Component
 * ========================================
 */

interface CardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="p-6 bg-white dark:bg-boxdark rounded-lg shadow-default dark:shadow-lg">
      {/* Card title */}
      <h3 className={`${typographyClasses.special.cardTitle} mb-2`}>{title}</h3>

      {/* Optional description */}
      {description && (
        <p className={`${typographyClasses.body.small} text-gray-600 dark:text-gray-400 mb-4`}>
          {description}
        </p>
      )}

      {/* Card content */}
      {children}
    </div>
  );
};

/**
 * ========================================
 * EXAMPLE 3: Table Component Usage
 * ========================================
 */

import { Table, TableHeader, TableBody, TableRow, TableCell } from '@shared/components/ui/table';
import Badge from '@shared/components/ui/badge/Badge';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <Table>
      <TableHeader className="border-b border-gray-200 dark:border-strokedark">
        <TableRow>
          {/* Table headers automatically get header typography */}
          <TableCell isHeader>Name</TableCell>
          <TableCell isHeader>Email</TableCell>
          <TableCell isHeader>Status</TableCell>
          <TableCell isHeader>Last Active</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="border-b border-gray-100 dark:border-strokedark">
            {/* Table cells automatically get cell typography */}
            <TableCell className="px-4 py-4">{user.name}</TableCell>
            <TableCell className="px-4 py-4">{user.email}</TableCell>
            <TableCell className="px-4 py-4">
              <Badge variant={user.status === 'active' ? 'solid' : 'light'} color={user.status === 'active' ? 'success' : 'warning'}>
                {user.status}
              </Badge>
            </TableCell>
            {/* Small secondary text */}
            <TableCell className={`px-4 py-4 ${typographyClasses.table.cellSmall}`}>
              2 hours ago
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

/**
 * ========================================
 * EXAMPLE 4: Modal Component
 * ========================================
 */

import { Modal } from '@/shared/components/ui/modal/Modal';
import Button from '@shared/components/ui/button/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="p-6">
        {/* Modal title */}
        <h2 className={`${typographyClasses.special.sectionTitle} mb-4`}>{title}</h2>

        {/* Modal message */}
        <p className={`${typographyClasses.body.default} text-gray-600 dark:text-gray-400 mb-6`}>
          {message}
        </p>

        {/* Action buttons */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

/**
 * ========================================
 * EXAMPLE 5: Page Layout
 * ========================================
 */

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <header>
        <h1 className={typographyClasses.special.pageTitle}>{title}</h1>
        {subtitle && (
          <p className={`${typographyClasses.body.default} text-gray-600 dark:text-gray-400 mt-2`}>
            {subtitle}
          </p>
        )}
      </header>

      {/* Page content */}
      <main>{children}</main>
    </div>
  );
};

/**
 * ========================================
 * EXAMPLE 6: Status Indicators
 * ========================================
 */

interface StatusIndicatorProps {
  status: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, message }) => {
  const statusClasses = {
    success: typographyClasses.special.success,
    error: typographyClasses.special.error,
    warning: typographyClasses.special.warning,
    info: typographyClasses.special.info,
  };

  return <p className={statusClasses[status]}>{message}</p>;
};

/**
 * ========================================
 * EXAMPLE 7: Section Component
 * ========================================
 */

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, description, children }) => {
  return (
    <section className="mb-8">
      {/* Section title */}
      <h2 className={`${typographyClasses.special.sectionTitle} mb-2`}>{title}</h2>

      {/* Optional description */}
      {description && (
        <p className={`${typographyClasses.body.small} text-gray-600 dark:text-gray-400 mb-6`}>
          {description}
        </p>
      )}

      {/* Section content */}
      <div className="space-y-4">{children}</div>
    </section>
  );
};

/**
 * ========================================
 * EXAMPLE 8: Complete Page Component
 * ========================================
 */

import { useCallback, useState } from 'react';

export const SettingsPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(() => {
    // Handle form submission
  }, []);

  return (
    <PageLayout
      title="Account Settings"
      subtitle="Manage your account preferences and security"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information Section */}
        <Section title="Personal Information" description="Update your basic information">
          <FormField label="Email Address" required hint="We'll use this for notifications">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 ${typographyClasses.component.input} border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800`}
            />
          </FormField>
        </Section>

        {/* Security Section */}
        <Section title="Security" description="Keep your account secure">
          <FormField label="Password" required error={password.length < 8 ? 'Min 8 characters' : undefined}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 ${typographyClasses.component.input} border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800`}
            />
          </FormField>
        </Section>
      </div>

      {/* Recent Activity Section */}
      <Section title="Recent Activity">
        <UserTable
          users={[
            { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
            { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
          ]}
        />
      </Section>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-8">
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </PageLayout>
  );
};

/**
 * ========================================
 * KEY TAKEAWAYS
 * ========================================
 *
 * 1. ALWAYS import from typographyUtils
 * 2. Use pre-built classes like typographyClasses.heading.h1
 * 3. Never hardcode sizes like text-[15px]
 * 4. Combine typography classes with other styling
 * 5. Test in both light and dark modes
 * 6. Follow the semantic hierarchy (h1 > h2 > h3, etc.)
 * 7. Use component-specific classes (button, input, badge)
 * 8. Reference the guide when unsure
 *
 * ========================================
 */

export default {
  FormField,
  Card,
  UserTable,
  ConfirmModal,
  PageLayout,
  StatusIndicator,
  Section,
  SettingsPage,
};
