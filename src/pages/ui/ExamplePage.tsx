import { Header } from '@/components/layout/Header';

export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <Header
        onNavSelect={(id) => {
          console.log('navigate to', id);
        }}
      />
    </div>
  );
}
