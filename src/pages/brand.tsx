import Header from "@/components/Header";

export default function brand() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "100px",
      }}
    >
      <Header background="" color="#000" hoverColor="#00c1d4" />
      <img
        src="/images/Google Form.png"
        alt="business"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />

      <div
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          maxWidth: "1200px",
        }}
      >
        <img
          src="/images/brand.png"
          alt="business"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}
