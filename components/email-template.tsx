export const EmailTemplate = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
    <div
      style={{
        backgroundColor: "#0ea5e9",
        color: "#fff",
        padding: "20px",
        borderRadius: "8px 8px 0 0",
      }}
    >
      <h2>{title}</h2>
    </div>

    <div style={{ padding: "16px" }}>
      <p dangerouslySetInnerHTML={{ __html: content }} />
      <p>Trân trọng,<br/>LMS Support Team</p>
    </div>

    <div
      style={{
        fontSize: "12px",
        background: "#f1f1f1",
        textAlign: "center",
        padding: "10px",
        borderRadius: "0 0 8px 8px",
      }}
    >
      © {new Date().getFullYear()} LMS. All rights reserved.
    </div>
  </div>
);
