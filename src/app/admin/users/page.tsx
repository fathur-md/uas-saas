import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Users, UserCheck, UserX } from "lucide-react";
import UserActions from "./UserActions";

export const metadata = {
  title: "Kelola Pengguna | Admin",
};

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; showDeleted?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const roleFilter = params.role;
  const showDeleted = params.showDeleted === "true";

  const whereClause: any = {};
  if (roleFilter && ["CUSTOMER", "MERCHANT", "ADMIN"].includes(roleFilter)) {
    whereClause.role = roleFilter;
  }
  if (!showDeleted) {
    whereClause.deletedAt = null;
  }

  const users = await prisma.user.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phoneNumber: true,
      createdAt: true,
      deletedAt: true,
    },
  });

  const [totalActive, totalDeleted] = await Promise.all([
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.user.count({ where: { deletedAt: { not: null } } }),
  ]);

  const roles = [
    { value: "", label: "Semua Role" },
    { value: "CUSTOMER", label: "Customer" },
    { value: "MERCHANT", label: "Merchant" },
    { value: "ADMIN", label: "Admin" },
  ];

  const roleColors: Record<string, string> = {
    CUSTOMER: "bg-blue-100 text-blue-700",
    MERCHANT: "bg-emerald-100 text-emerald-700",
    ADMIN: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Kelola Pengguna</h1>
        <p className="text-sm text-neutral-dark mt-1">
          Kelola semua pengguna yang terdaftar di platform.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-neutral-light/30 bg-white p-4 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{totalActive}</p>
            <p className="text-xs text-neutral-dark">Pengguna Aktif</p>
          </div>
        </div>
        <div className="rounded-xl border border-neutral-light/30 bg-white p-4 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <UserCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{users.length}</p>
            <p className="text-xs text-neutral-dark">Hasil Filter</p>
          </div>
        </div>
        <div className="rounded-xl border border-neutral-light/30 bg-white p-4 shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/10">
            <UserX className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{totalDeleted}</p>
            <p className="text-xs text-neutral-dark">Dinonaktifkan</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        {roles.map((r) => {
          const isActive = (roleFilter ?? "") === r.value;
          const baseHref = r.value
            ? `?role=${r.value}${showDeleted ? "&showDeleted=true" : ""}`
            : `?${showDeleted ? "showDeleted=true" : ""}`;
          return (
            <a
              key={r.value}
              href={baseHref}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : "bg-neutral-light/20 text-neutral-dark hover:bg-neutral-light/40"
              }`}
            >
              {r.label}
            </a>
          );
        })}
        <span className="mx-2 text-neutral-light">|</span>
        <a
          href={`?${roleFilter ? `role=${roleFilter}&` : ""}showDeleted=${showDeleted ? "false" : "true"}`}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            showDeleted
              ? "bg-red-500/10 text-red-600"
              : "bg-neutral-light/20 text-neutral-dark hover:bg-neutral-light/40"
          }`}
        >
          {showDeleted ? "✕ Sembunyikan Nonaktif" : "Tampilkan Nonaktif"}
        </a>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-neutral-light/30 bg-white shadow-xs">
        {users.length === 0 ? (
          <div className="p-8 text-center text-neutral-dark text-sm">
            Tidak ada pengguna yang cocok dengan filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-light/30 text-left">
                  <th className="px-5 py-3 font-medium text-neutral-dark">Nama</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">Email</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">No. Telepon</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">Role</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">Terdaftar</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">Status</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b border-neutral-light/10 last:border-0 ${
                      user.deletedAt ? "opacity-60" : ""
                    }`}
                  >
                    <td className="px-5 py-3 text-primary font-medium">{user.name}</td>
                    <td className="px-5 py-3 text-neutral-dark">{user.email}</td>
                    <td className="px-5 py-3 text-neutral-dark">{user.phoneNumber}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          roleColors[user.role] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-neutral-dark">
                      {user.createdAt.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3">
                      {user.deletedAt ? (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
                          Nonaktif
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                          Aktif
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <UserActions
                        userId={user.id}
                        isDeleted={!!user.deletedAt}
                        isSelf={user.id === session?.user?.id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
