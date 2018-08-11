import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import TrumpSection from '../components/TrumpSection';
import Container from '../components/Container';
import CardTable from '../components/CardTable';
import Hand from '../components/Hand';

export default ({
  hand,
  players,
  trumpCard,
}) => [
  <ConfirmSection
    isEnabled={false}
    label="Continue"
  />,
  <TrumpSection
    card={trumpCard}
  />,
  <Container topLeft lightGrey>
    <CardTable
      players={players}
      trumpElement={trumpCard.element}
    />
  </Container>,
  <Container bottomLeft darkGrey>
    <Hand
      cards={hand}
      trumpElement={trumpCard.element}
    />
  </Container>
];
