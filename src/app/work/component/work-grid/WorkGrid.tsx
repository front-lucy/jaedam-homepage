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
  return (
    <Container>
      {Array.isArray(items) &&
        items.map((item) => (
          <Item key={item.id}>
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
