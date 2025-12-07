import { Routes, Route, Navigate } from 'react-router-dom';
import { MainDashboardPage } from '@/pages/ui/MainDashboardPage';
import { LawCollectionPage } from '@/pages/ui/LawCollectionPage';
import { Header } from '@/components/layout/Header';
import {LawComparisonPage} from '@/pages/ui/LawComparisonPage';

const HeaderOnlyPage = () => (
  <div className="min-h-screen bg-surface font-sans">
    <Header />
  </div>
);

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainDashboardPage preferredCountries={[]} />} />
      <Route path="/law-collection" element={<LawCollectionPage />} />
      <Route path= "/law-compare" element={<LawComparisonPage /> }/>
      <Route path="/ai-consulting" element={<HeaderOnlyPage />} />
      <Route path="/law-compare" element={<HeaderOnlyPage />} />
      <Route path="/mypage" element={<HeaderOnlyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
