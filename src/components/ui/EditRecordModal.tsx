import type { FormEvent } from "react";
import Button from "./Button";
import { Field, Select, TextInput } from "./Field";
import Modal from "./Modal";

export type EditField = { key: string; label: string; options?: readonly string[]; type?: string };

export default function EditRecordModal({
  open,
  onClose,
  title,
  values,
  fields,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  values: Record<string, string>;
  fields: EditField[];
  onSave: (values: Record<string, string>) => void;
}) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSave(Object.fromEntries(fields.map((field) => [field.key, String(form.get(field.key) ?? "")] )));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      width={560}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form="edit-record-form">Save changes</Button>
        </>
      }
    >
      <form id="edit-record-form" onSubmit={submit} className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2">
        {fields.map((field) => (
          <Field key={field.key} label={field.label}>
            {field.options ? (
              <Select name={field.key} defaultValue={values[field.key]}>
                {field.options.map((option) => <option key={option}>{option}</option>)}
              </Select>
            ) : (
              <TextInput name={field.key} type={field.type ?? "text"} defaultValue={values[field.key]} required />
            )}
          </Field>
        ))}
      </form>
    </Modal>
  );
}
