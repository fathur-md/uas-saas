import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Users, UserCheck, UserX } from "lucide-react";
import UserActions from "./UserActions";
import Link from "next/link";

export const metadata = {
  title: "Kelola Pengguna | Admin",
};

export default async function AdminUsersPage(props: {
  searchParams: Promise<{ role?: string; showDeleted?: string }>;
}) {
  const session = await auth();
  const params = await props.searchParams;
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
    CUSTOMER: "bg-blue-50 text-blue-600",
    MERCHANT: "bg-emerald-50 text-emerald-600",
    ADMIN: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Kelola Pengguna</h1>
        <p className="text-neutral-500 mt-2 font-medium">
          Kelola semua pengguna yang terdaftar di platform SiapSedia.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl bg-blue-50/50">
            <Users className="h-6 w-6 text-blue-600" strokeWidth={2} />
          </div>
          <div>
            <p className="text-3xl font-bold text-neutral-900 tracking-tight">{totalActive}</p>
            <p className="text-xs font-medium text-neutral-400 mt-1 uppercase tracking-wider truncate">Pengguna Aktif</p>
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl bg-emerald-50/50">
            <UserCheck className="h-6 w-6 text-emerald-600" strokeWidth={2} />
          </div>
          <div>
            <p className="text-3xl font-bold text-neutral-900 tracking-tight">{users.length}</p>
            <p className="text-xs font-medium text-neutral-400 mt-1 uppercase tracking-wider truncate">Hasil Filter</p>
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl bg-red-50/50">
            <UserX className="h-6 w-6 text-red-600" strokeWidth={2} />
          </div>
          <div>
            <p className="text-3xl font-bold text-neutral-900 tracking-tight">{totalDeleted}</p>
            <p className="text-xs font-medium text-neutral-400 mt-1 uppercase tracking-wider truncate">Nonaktif</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2.5 items-center bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm w-fit">
        {roles.map((r) => {
          const isActive = (roleFilter ?? "") === r.value;
          const baseHref = r.value
            ? `?role=${r.value}${showDeleted ? "&showDeleted=true" : ""}`
            : `?${showDeleted ? "showDeleted=true" : ""}`;
          return (
            <Link
              key={r.value}
              href={baseHref}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-transparent text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              {r.label}
            </Link>
          );
        })}
        <div className="w-px h-6 bg-neutral-200 mx-1"></div>
        <Link
          href={`?${roleFilter ? `role=${roleFilter}&` : ""}showDeleted=${showDeleted ? "false" : "true"}`}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
            showDeleted
              ? "bg-red-50 text-red-600"
              : "bg-transparent text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
          }`}
        >
          {showDeleted ? "✕ Sembunyikan Nonaktif" : "Tampilkan Nonaktif"}
        </Link>
      </div>

      {/* Users List */}
      <div className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden">
        {users.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-neutral-300" strokeWidth={1.5} />
            </div>
            <p className="text-neutral-900 font-medium">Tidak ada pengguna yang cocok dengan filter.</p>
          </div>
        ) : (
          <>
            {/* Desktop View: Standard Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm text-left text-neutral-600">
                <thead className="bg-neutral-50/30 text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100">
                  <tr>
                    <th className="px-6 py-4">Pengguna & Aksi</th>
                    <th className="px-6 py-4">Kontak</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Terdaftar</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className={`hover:bg-neutral-50/50 transition-colors ${
                        user.deletedAt ? "opacity-50 grayscale-[0.5]" : ""
                      }`}
                    >
                      <td className="px-6 py-4 w-1/3">
                        <div className="font-semibold text-neutral-900">{user.name}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5 font-medium mb-3">{user.email}</div>
                        <UserActions
                          userId={user.id}
                          isDeleted={!!user.deletedAt}
                          isSelf={user.id === session?.user?.id}
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-neutral-800 align-top pt-5">{user.phoneNumber}</td>
                      <td className="px-6 py-4 align-top pt-5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md ${
                            roleColors[user.role] ?? "bg-neutral-50 text-neutral-600"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-500 font-medium text-xs align-top pt-5">
                        {user.createdAt.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 align-top pt-5">
                        {user.deletedAt ? (
                          <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-red-50 text-red-600">
                            Nonaktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-600">
                            Aktif
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View: Cards */}
            <div className="block lg:hidden divide-y divide-neutral-100">
              {users.map((user) => (
                <div key={user.id} className={`p-5 space-y-4 ${user.deletedAt ? "opacity-50 grayscale-[0.5]" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-neutral-900">{user.name}</div>
                      <div className="text-xs text-neutral-500">{user.email}</div>
                    </div>
                    {user.deletedAt ? (
                      <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-red-50 text-red-600">
                        Nonaktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-600">
                        Aktif
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Kontak</div>
                      <div className="font-medium text-neutral-800">{user.phoneNumber}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Role</div>
                      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${roleColors[user.role] ?? "bg-neutral-50 text-neutral-600"}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-50 flex items-center justify-between">
                    <div className="text-xs text-neutral-400 font-medium">
                      {user.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <UserActions
                      userId={user.id}
                      isDeleted={!!user.deletedAt}
                      isSelf={user.id === session?.user?.id}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
