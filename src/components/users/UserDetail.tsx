"use client";
import { FC } from "react";
import { User } from "@/types/user";

interface Props {
  user: User;
}

const UserDetail: FC<Props> = ({ user }) => (
  <div className="card card-body">
    <h3>{user.full_name}</h3>
    <p><b>Username:</b> {user.username}</p>
    <p><b>Email:</b> {user.email}</p>
  </div>
);

export default UserDetail;
