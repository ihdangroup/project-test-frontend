"use client";
import { FC, useState } from "react";
import { Employee } from "@/types/employee";

interface Props {
  initialData?: Partial<Employee>;
  onSubmit: (formData: FormData) => void;
}

const EmployeeForm: FC<Props> = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState<Partial<Employee>>(initialData);
  const [photo, setPhoto] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v !== undefined) data.append(k, v as string);
    });
    if (photo) data.append("photo", photo);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <input
        type="number"
        name="nik"
        placeholder="NIK"
        className="form-control mb-2"
        value={form.nik || ""}
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="form-control mb-2"
        value={form.name || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="position"
        required
        placeholder="Position"
        className="form-control mb-2"
        value={form.position || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="phone"
        placeholder="Phone"
        required
        className="form-control mb-2"
        value={form.phone || ""}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        className="form-control mb-2"
        value={form.email || ""}
        onChange={handleChange}
      />
      <input
        type="file"
        className="form-control mb-3"
        accept="image/jpeg"
        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
      />
      <button className="btn btn-success">Save</button>
    </form>
  );
};

export default EmployeeForm;
