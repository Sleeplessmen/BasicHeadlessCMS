import { useState } from "react";
import { Form, Label, Input, Button, ErrorMsg } from "./LoginForm.styled";

export default function LoginForm({ onSubmit, error, loading }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Email
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="username"
          placeholder="you@example.com"
        />
      </Label>

      <Label>
        Mật khẩu
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          placeholder="••••••••"
        />
      </Label>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <Button type="submit" disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
    </Form>
  );
}
