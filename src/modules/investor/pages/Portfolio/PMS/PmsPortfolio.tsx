import PageBreadcrumb from '@shared/components/common/PageBreadCrumb';
import { PmsSummaryCards } from './components/PmsSummaryCards';
import { PmsAccountsTable } from './components/PmsAccountsTable';
import { PmsHoldingsTable } from './components/PmsHoldingsTable';
import { PmsTransactionsTable } from './components/PmsTransactionsTable';

const PmsPortfolio: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="PMS Portfolio" />
      
      <PmsSummaryCards />
      
      <div className="space-y-6">
        <PmsAccountsTable />
        <PmsHoldingsTable />
        <PmsTransactionsTable />
      </div>
    </div>
  );
};

export default PmsPortfolio;