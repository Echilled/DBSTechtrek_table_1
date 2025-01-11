import React from "react";
import styled, { css } from "styled-components";

const baseText = css`
  color: ${(props) => props.color || "#d0d0d0"};
  font-size: ${(props) => props.fontSize || "14px"};
  font-weight: ${(props) => props.fontWeight || "400"};
`;

export const Text = styled.span`
  ${baseText};
`;

export const LinkText = styled.span`
  ${baseText};
  cursor:pointer;
  text-decoration: ${(props) => props.textDecoration || "underline"};
`;


const LineContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;


const Line = styled.div`
  border-bottom: 1px solid rgba(208, 208, 208, 0.5);
`;

const LineText = styled(Text)`
  margin: 0 10px;
`;

export const TextBetweenLine = (props) => {
  return (
    <LineContainer>
      <Line />
      <LineText fontSize="10px">{props.children}</LineText>
      <Line />
    </LineContainer>
  );
};
