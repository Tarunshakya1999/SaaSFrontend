import { useState } from "react";
import api from "./api";

export default function CampaignCreate() {
  const [title, setTitle] = useState("");
  const [channel, setChannel] = useState("email");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [schedule, setSchedule] = useState("");
  const [contacts, setContacts] = useState("");

  const submit = async () => {
    if (!title || !message || !schedule || !contacts) {
      alert("Fill all fields");
      return;
    }

    const list = contacts.split(",").map(c => c.trim());

    await api.post("campaign/", {
      title,
      channel,
      subject,
      message,
      schedule_time: schedule,
      contacts: list,
    });

    alert("Campaign Scheduled 🚀");
    setTitle(""); setMessage(""); setSubject("");
    setSchedule(""); setContacts("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Email / SMS Automation</h1>

      <input className="input" placeholder="Campaign Title"
        value={title} onChange={e=>setTitle(e.target.value)} />

      <select className="input" onChange={e=>setChannel(e.target.value)}>
        <option value="email">EMAIL</option>
        <option value="sms">SMS</option>
      </select>

      {channel === "email" && (
        <input className="input" placeholder="Email Subject"
          value={subject} onChange={e=>setSubject(e.target.value)} />
      )}

      <textarea className="input h-32"
        placeholder="Message"
        value={message} onChange={e=>setMessage(e.target.value)} />

      <textarea className="input"
        placeholder={channel === "email"
          ? "Emails comma separated"
          : "Phone numbers comma separated"}
        value={contacts}
        onChange={e=>setContacts(e.target.value)}
      />

      <input type="datetime-local" className="input"
        value={schedule} onChange={e=>setSchedule(e.target.value)} />

      <button onClick={submit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg">
        Schedule Campaign 🚀
      </button>
    </div>
  );
}
