import { useParams } from "react-router-dom";
import { useState } from "react";

export default function FeaturePage() {
  const { module, feature } = useParams();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = () => {
    setResult(`AI Result for ${module} → ${feature}\n\nPrompt: ${input}`);
  };

  return (
    <div style={{ color: "#e5e7eb" }}>
      <h2>{module?.toUpperCase()} / {feature}</h2>

      <textarea
        rows="5"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type like ChatGPT..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          marginTop: "10px",
          background: "#020617",
          color: "#fff",
          border: "1px solid #334155"
        }}
      />

      <button
        onClick={handleGenerate}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          borderRadius: "8px",
          background: "#38bdf8",
          border: "none",
          cursor: "pointer"
        }}
      >
        Generate
      </button>

      {result && (
        <pre
          style={{
            marginTop: "15px",
            background: "#020617",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #334155"
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}
