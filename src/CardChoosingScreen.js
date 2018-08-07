import React from 'react';
import getElementOfTrump from './gameLogic/getElementOfTrump';
import { getWinnerIndex } from './gameLogic/cardUtils';

import PlayerLabel from './PlayerLabel';
import WinningPlayerIndicator from './WinningPlayerIndicator';
import Card from './Card';
import ConfirmationCard from './ConfirmationCard';

const CardChoosingScreen = ({
  ownName,
  gameState,
  tentativeCard,

  selectTentativeCard,
  confirmTentativeCard,
}) => {
  const trumpElement = getElementOfTrump(gameState.trump);
  const ownHand = gameState.players.find(p => p.name === ownName).hand;
  const tentativeCardIndex = tentativeCard === null
    ? -1
    : ownHand.findIndex(c => c.rank === tentativeCard.rank && c.element === tentativeCard.element);
  const currentWinnerName = gameState.players[
    getWinnerIndex(gameState.players.filter(p => p.playedCard !== null).map(p => p.playedCard), trumpElement)
  ].name;

  return (
    <div>
      <div className="CardTable">
        <div className="CardTable__NameList">
          {gameState.players.map((player) => {
            const { name } = player;
            if (name === currentWinnerName) {
              return (
                <PlayerLabel><WinningPlayerIndicator />{name}</PlayerLabel>
              );
            }
            return (
              <PlayerLabel>{name}</PlayerLabel>
            );
          })}
        </div>

        <div className="CardTable__CardList">
          {gameState.players.map((player) => {
            const card = player.name === ownName
              ? tentativeCard
              : player.playedCard;
            if (card === null) {
              return null;
            }
            return (
              <Card element={card.element} rank={card.rank} isTrump={card.element === trumpElement} />
            );
          })}
        </div>

        <div className="CardTable__TrickList">
          {gameState.players.map((player) => {
            const { tricksWon, bid } = player;
            return (
              <PlayerLabel>{tricksWon}/{bid}</PlayerLabel>
            );
          })}
        </div>
      </div>

      <div className="Hand">
        <div className="Hand__CardList">
          {ownHand.map((card, i) => {
            if (i === tentativeCardIndex) {
              return (
                <ConfirmationCard onClick={confirmTentativeCard} />
              );
            }
            return (
              <Card element={card.element} rank={card.rank} isTrump={card.element === trumpElement} onClick={() => selectTentativeCard(card)} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardChoosingScreen;
