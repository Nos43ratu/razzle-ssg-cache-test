const DATA = {
  "/application-a": {
    name: "A",
    version: "1.0.0",
    description: "my application",
    type: "application",
    cards: [
      {
        title: "Card A",
        description: "This is card A from A",
      },
      {
        title: "Card B",
        description: "This is card B from A",
      },
    ],
  },
  "/application-b": {
    name: "B",
    version: "1.0.0",
    description: "my application",
    type: "application",
    cards: [
      {
        title: "Card A",
        description: "This is card A from B",
      },
      {
        title: "Card B",
        description: "This is card B from B",
      },
    ],
  },
};

export const getFakeData = (path: string): any => {
  return DATA[path];
};
