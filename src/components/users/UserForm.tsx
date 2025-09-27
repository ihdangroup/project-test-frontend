"use client";

import { FC, useState } from "react";
import { User } from "@/types/user";

interface Props {
  initialData?: Partial<User>;
  onSubmit: (data: any) => Promise<void>; // pakai object biasa, bukan FormData
}

const UserForm: FC<Props> = ({ initialData = {}, onSubmit }) => {
  const [username, setUsername] = useState(initialData.username || "");
  const [fullName, setFullName] = useState(initialData.full_name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [password, setPassword] = useState(""); // hanya dipakai saat create

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      username,
      full_name: fullName,
      email,
    };

    if (!initialData.id) {
      payload.password = password; // password wajib saat create
    }

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="text"
        className="form-control"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {!initialData.id && (
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      )}
      <button type="submit" className="btn btn-primary">
        {initialData.id ? "Update User" : "Create User"}
      </button>
    </form>
  );
};

export default UserForm;
