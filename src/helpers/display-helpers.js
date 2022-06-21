const stack_offset_factor = 5;

const pixelUnits = ['top', 'left', 'bottom', 'right', 'width', 'height'];

export function getCardOffset(stackLevel) {
  return stackLevel * stack_offset_factor;
}

export function getCardHeight() {
  return 112;
}

export function getCardWidth() {
  return 200;
}

export function getHeight(cards) {
  if (cards.length === 0) {
    return 0;
  }
  // TODO(KNR): should we move card size to the display-store?!
  const cardHeight = getCardHeight();
  return cardHeight + getCardOffset(cards.length);
}

export function getWidth(cards) {
  if (cards.length === 0) {
    return 0;
  }
  // TODO(KNR): should we move card size to the display-store?!
  const cardHeight = getCardWidth();
  return cardHeight + getCardOffset(cards.length);
}

export function getUnit(variable) {
  if (pixelUnits.includes(variable)) {
    return 'px';
  }
  return '';
}