export default function ChannelSelect({ channel, setChannel }) {
    return (
      <div className="flex gap-4">
        {["email", "sms"].map(c => (
          <button
            key={c}
            onClick={() => setChannel(c)}
            className={`px-4 py-2 rounded-lg border 
            ${channel === c ? "bg-blue-600 text-white" : "bg-white"}`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }
  