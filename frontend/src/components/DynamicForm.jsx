import { useState } from "react";

export default function DynamicForm({ config, onSubmit }) {
    const [form, setForm] = useState({});

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            onSubmit(form)
        }}>
            {config.map(field => (
                <div key={field.name} className="mb-4">
                    <label className="block mb-1">{field.label}</label>
                    <input
                        type={field.type}
                        className="w-full border p-2 rounded"
                        value={form[field.name] || ''}
                        onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    />
                </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Gửi</button>
        </form>
    )
}
