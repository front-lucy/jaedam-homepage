/** @jsxImportSource @emotion/react */
import Header from "@/components/Header";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const data = [
  {
    id: 1,
    title: "아기님의 장래희망은 흑막",
    description:
      "여행 가이드인 연슬은 어느 날 까칠하고 미스터리한 고객 장태주를 만나게 된다. 이들의 여행은 단순한 관광이 아닌, 과거와 비밀이 얽힌 감정의 여정으로 이어진다. 예상치 못한 사건과 감정의 파도 속에서 두 사람은 점점 서로에게 빠져들게 되고, 여행의 끝에서 진짜 자신과 마주하게 된다.",
    image: "https://www.studiolico.com/img/work/work_2048_death.jpg",
    author: "홍길동",
    illustrator: "이몽룡",
    link: "#",
  },
  {
    id: 2,
    title: "눈떠보니 공녀님",
    description:
      "누구에게나 비밀은 있다. 평범한 일상을 살아가던 소녀는 친구의 사고를 계기로 감춰졌던 기억과 마주하게 된다. 회복과 성장, 그리고 용서의 과정을 섬세하게 담아낸 감성 힐링 드라마.",
    image: "https://www.studiolico.com/img/work/work_2048_ghosttheater.jpg",
    author: "성춘향",
    illustrator: "변학도",
    link: "#",
  },
  {
    id: 3,
    title: "파라렐 코드",
    description:
      "인류의 마지막 희망을 품은 소년, 고장 난 인공지능, 그리고 평행 세계의 비밀. 서로 다른 시간대에 존재하는 인물들이 코드로 연결되어 운명을 바꾸기 위해 싸운다. 하드 SF에 감성 서사를 더한 스펙터클 SF 판타지.",
    image: "https://www.studiolico.com/img/work/work_2048_baby.jpg",
    author: "임꺽정",
    illustrator: "장보고",
    link: "#",
  },
  {
    id: 4,
    title: "철의 황후",
    description:
      "몰락한 왕국의 마지막 후계자가 되살아난다. 전쟁과 배신, 음모의 정점에서 철의 심장을 가진 황후가 되어 돌아온 그녀. 복수와 정의 사이에서 그녀는 과연 무엇을 선택할까?",
    image: "https://www.studiolico.com/img/work/work_2048_empress.jpg",
    author: "임꺽정",
    illustrator: "장보고",
    link: "#",
  },
  {
    id: 5,
    title: "도시의 연금술사",
    description:
      "현대 서울 한복판에서 벌어지는 비밀 연금술 전쟁. 오래된 서점, 감춰진 마법진, 그리고 금서(禁書). 주인공은 일상 속에서 서서히 밝혀지는 진실과 맞서 싸운다. 마법과 도시 전설이 어우러진 미스터리 판타지.",
    image: "https://www.studiolico.com/img/work/work_2048_imback.jpg",
    author: "임꺽정",
    illustrator: "장보고",
    link: "#",
  },
  {
    id: 6,
    title: "프로포즈 게임",
    description:
      "사랑이 계약이 되어버린 시대. 이상적인 결혼을 위한 가상 시뮬레이션 ‘프로포즈 게임’에 참가한 청춘들. 게임처럼 보이지만, 그 안에서 피어나는 진심과 오해의 연속. 과연 진짜 사랑은 존재할까?",
    image: "https://www.studiolico.com/img/work/work_2048_propose.jpg",
    author: "임꺽정",
    illustrator: "장보고",
    link: "#",
  },
  {
    id: 7,
    title: "그림자 노예",
    description:
      "태어날 때부터 계급이 정해지는 사회. 그림자로 태어난 주인공은 ‘주인’을 위한 삶만이 전부였다. 그러나 어느 날 기억을 되찾고 세상을 뒤흔들기 시작한다. 차별과 저항, 그리고 자아를 찾는 이야기.",
    image: "https://www.studiolico.com/img/work/work_2048_slave.jpg",
    author: "임꺽정",
    illustrator: "장보고",
    link: "#",
  },
  {
    id: 8,
    title: "서과장의 이중생활",
    description:
      "낮에는 완벽한 직장인, 밤에는 연쇄 미스터리를 추적하는 아마추어 탐정. 그의 이중생활에 점점 많은 사람들이 휘말리게 되고, 진실은 생각보다 가까운 곳에 있었다. 코믹과 서스펜스가 절묘하게 섞인 현대 스릴러.",
    image: "https://www.studiolico.com/img/work/work_2048_seogwajang.jpg",
    author: "임꺽정",
    illustrator: "장보고",
    link: "#",
  },
  {
    id: 9,
    title: "위키드 하트",
    description:
      "마법 금지 구역에서 태어난 마녀 소녀, 그녀는 ‘사랑’을 배우면 안 되는 운명을 타고났다. 그러나 마음은 금지될 수 없고, 세상은 그녀를 가만히 두지 않는다. 로맨스와 스릴러의 경계에서 그려지는 다크 판타지.",
    image: "https://www.studiolico.com/img/work/work_2048_ghostteller.jpg",
    author: "임꺽정",
    illustrator: "장보고",
    link: "#",
  },
  {
    id: 10,
    title: "폭력의 역사",
    description:
      "폭력은 어디서부터 시작되었을까? 청춘들의 내면에 도사린 상처와 분노가 폭력으로 분출되는 도시. 그 안에서 치유와 변화의 실마리를 찾는 사람들의 이야기. 강렬하지만 섬세한, 성장 심리 서사.",
    image: "https://www.studiolico.com/img/work/work_2048_violence.jpg",
    author: "임꺽정",
    illustrator: "장보고",
    link: "#",
  },
];

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Slide = styled(motion.div)`
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const InfoBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 50%;
  left: 10%;
  color: white;
  padding: 24px 32px;
  border-radius: 16px;
  max-width: 700px;
`;

const Title = styled.h2`
  font-size: 64px;

  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-top: 22px;
  font-size: 20px;
  line-height: 1.6;
  letter-spacing: -1px;
`;

const Meta = styled.div`
  font-size: 14px;
  color: #ccc;
  margin-top: 22px;
`;

const LinkButton = styled.a`
  display: inline-block;
  margin-top: 16px;
  color: #fffff000;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
`;

const ThumbnailList = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const Thumbnail = styled(motion.img)`
  width: 130px;
  height: auto;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0.6;
  border: 2px solid transparent;

  &.active {
    opacity: 1;
    border: 2px solid #00c1d4;
    transform: scale(1.2);
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  font-size: 32px;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const PrevButton = styled(NavButton)`
  left: 20px;
`;

const NextButton = styled(NavButton)`
  right: 20px;
`;

export default function Work() {
  const [current, setCurrent] = useState(0);
  const selected = data[current];

  const goPrev = () => {
    setCurrent((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrent((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <Wrapper>
      <Header background="#00000000" color="#fff" />
      <AnimatePresence mode="wait">
        <Slide
          key={selected.id}
          style={{ backgroundImage: `url(${selected.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <InfoBox>
            <Title>{selected.title}</Title>
            <Description>{selected.description}</Description>
            <Meta>
              글: {selected.author} | 그림: {selected.illustrator}
            </Meta>
            <LinkButton href={selected.link}>작품 보러가기</LinkButton>
          </InfoBox>
        </Slide>
      </AnimatePresence>

      <PrevButton onClick={goPrev}>&lt;</PrevButton>
      <NextButton onClick={goNext}>&gt;</NextButton>

      <ThumbnailList>
        {data.map((item, index) => (
          <Thumbnail
            key={item.id}
            src={item.image}
            onClick={() => setCurrent(index)}
            className={index === current ? "active" : ""}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        ))}
      </ThumbnailList>
    </Wrapper>
  );
}
