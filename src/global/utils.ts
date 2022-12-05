const _cardTyps = ["horizontal-list", "vertical-list", "carousel"] as const;
type cardType = typeof _cardTyps[number];

interface ICardTypeOption {
  label: string;
  value: cardType
}

interface IConfig {
  title?: string;
  description?: string;
  type?: cardType;
  itemsToShow?: number;
  contractEntrypoint?: string;
  viewAllUrl?: string;
}

const getCardTypeOption = (): ICardTypeOption[] => {
  return _cardTyps.map(type => {
    const label = type.replace(/(-|^)([^-]?)/g, function(_, prep, letter) {
      return (prep && ' ') + letter.toUpperCase();
    });
    return {
      label,
      value: type
    }
  })
}

export {
  cardType,
  ICardTypeOption,
  IConfig,
  getCardTypeOption,
}