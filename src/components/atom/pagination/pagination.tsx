// src/components/atom/Pagination/Pagination.tsx

import IconArrowLeft from "@/assets/icons/Icon-nav-arrow-left.svg";
import IconArrowRight from "@/assets/icons/Icon-nav-arrow-right.svg";
import { FC } from "react";
import {
  ArrowButton,
  Container,
  IconWrapper,
  PageButton,
} from "./pagination.styles";
import { PaginationProps } from "./pagination.types";

export const Pagination: FC<PaginationProps> = ({
  current,
  total,
  onChange,
  maxVisible = 5,
}) => {
  const totalPages = Math.max(total, 1);

  const start = Math.max(
    1,
    Math.min(current - Math.floor(maxVisible / 2), totalPages - maxVisible + 1)
  );
  const end = Math.min(start + maxVisible - 1, totalPages);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const handlePageChange = (page: number) => {
    if (page !== current && page >= 1 && page <= totalPages) {
      onChange(page);
    }
  };

  return (
    <Container>
      <ArrowButton
        disabled={current === 1}
        onClick={() => handlePageChange(current - 1)}
      >
        <IconWrapper>
          <IconArrowLeft />
        </IconWrapper>
      </ArrowButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          isActive={page === current}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PageButton>
      ))}

      <ArrowButton
        disabled={current === totalPages}
        onClick={() => handlePageChange(current + 1)}
      >
        <IconWrapper>
          <IconArrowRight />
        </IconWrapper>
      </ArrowButton>
    </Container>
  );
};
