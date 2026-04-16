import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: 30,
    slug: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/event-types', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => navigate('/'));
  };

  return (
    // <div className="container">
    //   <h1>Create Event Type</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       placeholder="Title"
    //       value={form.title}
    //       onChange={(e) => setForm({ ...form, title: e.target.value })}
    //       required
    //     />
    //     <textarea
    //       placeholder="Description"
    //       value={form.description}
    //       onChange={(e) => setForm({ ...form, description: e.target.value })}
    //     />
    //     <input
    //       type="number"
    //       placeholder="Duration (min)"
    //       value={form.duration}
    //       onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) })}
    //       required
    //     />
    //     <input
    //       placeholder="Slug"
    //       value={form.slug}
    //       onChange={(e) => setForm({ ...form, slug: e.target.value })}
    //       required
    //     />
    //     <button type="submit">Create</button>
    //   </form>
    // </div>

    <div className="create-event-page">
        <div className="create-event-card">
            
            <div className="create-event-header">
            <h1>Create Event Type</h1>
            <p className="create-event-subtitle">
                Define your event details and share your booking link.
            </p>
            </div>

            <form onSubmit={handleSubmit} className="create-form">

            <div className="form-group">
                <label>Title</label>
                <input
                placeholder="e.g. 30 min meeting"
                value={form.title}
                onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                }
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                placeholder="Optional description"
                value={form.description}
                onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                }
                />
            </div>

            <div className="form-group">
                <label>Duration (minutes)</label>
                <input
                type="number"
                value={form.duration}
                onChange={(e) =>
                    setForm({ ...form, duration: parseInt(e.target.value) })
                }
                />
            </div>

            <div className="form-group">
                <label>Slug</label>
                <input
                placeholder="your-event-url"
                value={form.slug}
                onChange={(e) =>
                    setForm({ ...form, slug: e.target.value })
                }
                />
                <span className="slug-hint">
                This will be your public booking link
                </span>
            </div>

            <button type="submit" className="create-submit">
                Create Event
            </button>

            </form>
        </div>
    </div>
  );
}