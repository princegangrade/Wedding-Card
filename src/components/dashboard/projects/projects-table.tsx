"use client";

import Link from "next/link";
import { useState } from "react";
import type { ProjectListRow } from "@/types/project";
import { Button } from "@/components/ui/button";
import { formatDisplayDate } from "@/lib/utils/date-format";

export function ProjectsTable({ initialProjects }: { initialProjects: ProjectListRow[] }) {
  const [projects, setProjects] = useState<ProjectListRow[]>(initialProjects);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleDelete = async (projectId: string) => {
    const ok = window.confirm("Delete this project? This will remove all related content, gallery, and assets.");
    if (!ok) return;

    setBusyId(projectId);
    setError("");

    try {
      const response = await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to delete project.");

      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-3">
      {error ? (
        <p className="rounded-lg border border-red-400/30 bg-red-500/10 p-2 text-sm text-red-200">{error}</p>
      ) : null}

      <div className="glass overflow-x-auto rounded-xl p-2">
        <table className="min-w-full text-left text-sm text-slate-200">
          <thead className="text-xs uppercase tracking-[0.15em] text-slate-300">
            <tr>
              <th className="px-3 py-2">Project</th>
              <th className="px-3 py-2">Client</th>
              <th className="px-3 py-2">Vendor</th>
              <th className="px-3 py-2">Template</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Updated</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td className="px-3 py-4 text-slate-300" colSpan={7}>
                  No projects found.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="border-t border-white/10">
                  <td className="px-3 py-2">{project.project_name}</td>
                  <td className="px-3 py-2">{project.clients?.[0]?.client_name ?? "-"}</td>
                  <td className="px-3 py-2">{project.vendors?.[0]?.business_name ?? "-"}</td>
                  <td className="px-3 py-2">{project.templates?.[0]?.template_name ?? "-"}</td>
                  <td className="px-3 py-2">
                    <span className="rounded bg-white/10 px-2 py-1 text-xs">{project.status}</span>
                  </td>
                  <td className="px-3 py-2">{formatDisplayDate(project.updated_at)}</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Link
                        href={`/dashboard/projects/edit/${project.id}`}
                        className="rounded border border-white/20 px-2 py-1 hover:bg-white/10"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/dashboard/projects/preview/${project.id}`}
                        className="rounded border border-white/20 px-2 py-1 hover:bg-white/10"
                      >
                        Preview
                      </Link>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={busyId === project.id}
                        onClick={() => handleDelete(project.id)}
                        className="h-auto rounded border-red-300/40 px-2 py-1 text-xs text-red-200 hover:bg-red-500/10"
                      >
                        {busyId === project.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
