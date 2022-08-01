const stack_offset_factor = 5;

const pixelUnits = ['top', 'left', 'bottom', 'right', 'width', 'height', 'thickness', 'boardDepth', 'boardDistance'];

export function getCardOffset(stackLevel) {
  return stackLevel * stack_offset_factor;
}

// TODO(KNR): move size into a store
function getCardHeight() {
  return 112;
}

function getCardWidth() {
  return 200;
}

export function getHeight(cards) {
  if (cards === 0 || cards.length === 0) {
    return 0;
  }
  // TODO(KNR): should we move card size to the display-store?!
  const cardHeight = getCardHeight();
  const stackSize = getStackSize(cards);
  return cardHeight + getCardOffset(stackSize);
}

export function getWidth(cards) {
  if (cards === 0 || cards.length === 0) {
    return 0;
  }
  // TODO(KNR): should we move card size to the display-store?!
  const cardWidth = getCardWidth();
  const stackSize = getStackSize(cards);
  return cardWidth + getCardOffset(stackSize);
}

export function getUnit(variable) {
  if (pixelUnits.includes(variable)) {
    return 'px';
  }
  return '';
}

function getStackSize(cards) {
  if (Number.isInteger(cards)) {
    return cards;
  }
  // TODO(KNR): assert cards is an array of integers
  return cards.length;
}