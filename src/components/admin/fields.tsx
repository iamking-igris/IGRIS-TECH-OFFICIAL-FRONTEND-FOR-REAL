import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const fieldControl =
  "h-11 w-full border border-hairline bg-canvas px-3 text-sm text-ink placeholder:text-faint transition-colors duration-150 focus:border-ink";

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="text-sm text-ink">
        {label}
        {hint ? <span className="text-faint"> {hint}</span> : null}
      </label>
      {children}
    </div>
  );
}

export function TextInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldControl, className)} {...props} />;
}

export function TextArea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(fieldControl, "h-32 py-3 leading-relaxed", className)}
      {...props}
    />
  );
}

export function SelectInput({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldControl, className)} {...props}>
      {children}
    </select>
  );
}

export function CheckRow({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 shrink-0 accent-ink"
      />
      <span>{children}</span>
    </label>
  );
}

export function AdminEmpty({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="border-t border-hairline py-12">
      <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
        {title}
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-quiet">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function StatusMark({
  tone = "quiet",
  children,
}: {
  tone?: "quiet" | "ink" | "danger";
  children: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border px-2 py-1 font-mono text-[10px] tracking-widest",
        tone === "ink" && "border-ink/40 text-ink",
        tone === "danger" && "border-danger/40 text-danger",
        tone === "quiet" && "border-hairline text-quiet",
      )}
    >
      {children}
    </span>
  );
}
