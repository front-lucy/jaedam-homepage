import { useWorkStore } from "@/store/useWorkStore";
import { useRouter } from "next/navigation";
import { FC } from "react";
import {
  BubbleWrapper,
  Container,
  Item,
  Overlay,
  Thumbnail,
  Title,
} from "./WorkGrid.styles";
import { WorkGridProps } from "./WorkGrid.types";

export const WorkGrid: FC<WorkGridProps> = ({ items }) => {
  const router = useRouter();
  const setScrollY = useWorkStore((s) => s.setScrollY);

  function handleItemClick(id: number) {
    setScrollY(window.scrollY);
    router.push(`/work/${id}`);
  }

  return (
    <Container>
      {Array.isArray(items) &&
        items.map((item) => (
          <Item key={item.id} onClick={() => handleItemClick(item.id)}>
            <Thumbnail src={item.thumbnailUrl} alt={item.title} />
            <Overlay className="overlay">
              <BubbleWrapper />
              <Title>{item.title}</Title>
            </Overlay>
          </Item>
        ))}
    </Container>
  );
};
