import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminPending } from "@/components/admin/admin-gate";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  AdminEmpty,
  CheckRow,
  Field,
  SelectInput,
  StatusMark,
  TextArea,
  TextInput,
} from "@/components/admin/fields";
import { Button } from "@/components/ui/button-link";
import {
  ECOSYSTEM_STATUSES,
  ecosystemService,
  ecosystemToInput,
  emptyEcosystemInput,
  useContentHydrated,
  useEcosystem,
  type EcosystemInput,
  type EcosystemProduct,
  type ProductStatus,
} from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/admin/ecosystem")({
  head: () =>
    pageHead({
      title: "Ecosystem — IGRIS Admin",
      description: "Manage IGRIS ecosystem products.",
      path: "/admin/ecosystem",
      noIndex: true,
    }),
  component: EcosystemAdmin,
});

function EcosystemAdmin() {
  const hydrated = useContentHydrated();
  const items = useEcosystem();
  const [editing, setEditing] = useState<EcosystemProduct | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<EcosystemProduct | null>(
    null,
  );

  if (!hydrated) return <AdminPending>Loading ecosystem</AdminPending>;

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label-tech">Products</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em]">
            Ecosystem
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-quiet">
            Name, details, link, status. Keep it small — this is not a CMS for
            marketing pages.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setEditing("new")}
          arrow
        >
          Add product
        </Button>
      </div>

      {editing ? (
        <div className="mt-10 border-t border-hairline pt-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
            {editing === "new" ? "New product" : `Edit ${editing.name}`}
          </h2>
          <div className="mt-8">
            <EcosystemForm
              initial={
                editing === "new"
                  ? { ...emptyEcosystemInput(), order: items.length + 1 }
                  : ecosystemToInput(editing)
              }
              submitLabel={editing === "new" ? "Create product" : "Save product"}
              onCancel={() => setEditing(null)}
              onSubmit={(input) => {
                if (editing === "new") {
                  ecosystemService.create(input);
                  toast("Ecosystem product created.");
                } else {
                  ecosystemService.update(editing.id, input);
                  toast("Ecosystem product saved.");
                }
                setEditing(null);
              }}
            />
          </div>
        </div>
      ) : null}

      {items.length === 0 ? (
        <AdminEmpty
          title="No ecosystem products yet."
          body="Add IGRIS Hosting, IGRIS Studio, or whatever comes next."
        />
      ) : (
        <ul className="mt-10">
          {items.map((item, i) => (
            <li
              key={item.id}
              className="grid gap-4 border-t border-hairline py-6 last:border-b md:grid-cols-12 md:items-center"
            >
              <p className="font-mono text-[10px] tracking-widest text-faint md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div className="md:col-span-5">
                <p className="font-display text-xl font-semibold tracking-[-0.03em]">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-quiet">{item.description}</p>
                <p className="mt-2 font-mono text-[10px] tracking-wider text-faint">
                  {item.url ?? item.subdomain}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:col-span-3">
                <StatusMark tone={item.published ? "ink" : "quiet"}>
                  {item.published ? "PUBLISHED" : "HIDDEN"}
                </StatusMark>
                <StatusMark>{item.status.toUpperCase()}</StatusMark>
              </div>
              <div className="flex flex-wrap gap-2 md:col-span-3 md:justify-end">
                <Button
                  variant="ghost"
                  className="h-10 min-h-10 px-3 text-xs"
                  onClick={() => setEditing(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="h-10 min-h-10 px-3 text-xs text-danger"
                  onClick={() => setPendingDelete(item)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this product?"
        body={
          pendingDelete
            ? `“${pendingDelete.name}” will be removed from the ecosystem list in this browser.`
            : ""
        }
        confirmLabel="Delete product"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            ecosystemService.delete(pendingDelete.id);
            toast("Ecosystem product deleted.");
            if (editing !== "new" && editing?.id === pendingDelete.id) {
              setEditing(null);
            }
          }
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

function EcosystemForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: EcosystemInput;
  submitLabel: string;
  onSubmit: (input: EcosystemInput) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<EcosystemInput>(initial);
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    setError("");
    onSubmit(form);
  }

  return (
    <form onSubmit={submit} className="grid max-w-xl gap-6" noValidate>
      <Field label="Name" htmlFor="eco-name">
        <TextInput
          id="eco-name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </Field>
      <Field label="Details" htmlFor="eco-details">
        <TextArea
          id="eco-details"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </Field>
      <Field label="Link" htmlFor="eco-url" hint="(optional until live)">
        <TextInput
          id="eco-url"
          type="url"
          placeholder="https://"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />
      </Field>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Status" htmlFor="eco-status">
          <SelectInput
            id="eco-status"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as ProductStatus })
            }
          >
            {ECOSYSTEM_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Display order" htmlFor="eco-order">
          <TextInput
            id="eco-order"
            type="number"
            value={form.order}
            onChange={(e) =>
              setForm({ ...form, order: Number(e.target.value) || 0 })
            }
          />
        </Field>
      </div>
      <CheckRow
        checked={form.published}
        onChange={(published) => setForm({ ...form, published })}
      >
        Published on the public site
      </CheckRow>
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="primary" arrow>
          {submitLabel}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
