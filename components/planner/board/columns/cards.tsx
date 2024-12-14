import React, { FC } from "react";
import Card from "./card";
import { TCard } from "@/lib/ts/types/planner";

type Props = {
  cards: any[];
  showCardDetail: (cardId: string) => void;
  setCards: (cards: TCard[]) => void;
};

const Cards: FC<Props> = ({ cards, showCardDetail, setCards }) => {
  return (
    <>
      {cards?.map((card, index) => (
        <Card
          key={index}
          card={card}
          cardIndex={index}
          showCardDetail={showCardDetail}
          setCards={setCards}
        />
      ))}
    </>
  );
};

export default Cards;
