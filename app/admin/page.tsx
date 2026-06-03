import AdminLogin from '../../components/AdminLogin';

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-brand-900 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16 sm:px-10 lg:px-16">
        <AdminLogin />
      </div>
    </main>
  );
}
