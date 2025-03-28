import Header from "@/components/Header";
import LineTabMenu from "@/components/LineTabMenu";

export default function news() {
  const handleTabChange = () => {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        paddingBottom: "100px",
      }}
    >
      <Header background="" color="#000" hoverColor="#00c1d4" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          padding: "90px 80px 20px 80px",
        }}
      >
        <img
          src="/images/newsroom.png"
          alt="news"
          style={{ width: "500px", height: "auto", objectFit: "cover" }}
        />
        <LineTabMenu
          tabs={["뉴스", "SNS"]}
          onChange={handleTabChange}
          fontSize="18px"
        />
        <img
          src="/images/news1.png"
          alt="news"
          style={{
            width: "100%",
            maxWidth: "1100px",
            marginTop: "50px",
          }}
        />
      </div>
    </div>
  );
}
