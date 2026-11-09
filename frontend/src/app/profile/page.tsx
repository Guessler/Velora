import { requireSession } from "@/lib/dal";

export default async function ProfilePage() {
  const user = await requireSession("/profile");

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          {user.name ?? user.email}
        </h1>
        <p className="mt-2 text-white/50">{user.email}</p>
        <p className="mt-1 text-sm text-white/40">Роль: {user.role}</p>
      </div>
    </main>
  );
}
