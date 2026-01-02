export default function MessageEditor({
    subject, setSubject,
    message, setMessage,
    channel
  }) {
    return (
      <div className="space-y-3">
        {channel === "email" && (
          <input
            className="w-full p-3 border rounded-lg"
            placeholder="Email Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
        )}
  
        <textarea
          className="w-full p-3 border rounded-lg h-32"
          placeholder={
            channel === "sms"
              ? "DLT approved message"
              : "Write email content"
          }
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
  
        <p className="text-sm text-gray-500">
          Variables allowed: {"{name}"} {"{date}"}
        </p>
      </div>
    );
  }
  