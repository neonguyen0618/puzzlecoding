export const htmlBasicsPuzzles = [
  {
    id: "html-1",
    title: "Basic HTML Skeleton",
    instructions: "Arrange the blocks to form a valid basic HTML page.",
    blocks: [
      { id: "b1", code: "<!DOCTYPE html>" },
      { id: "b2", code: "<html>" },
      { id: "b3", code: "<head>" },
      { id: "b4", code: "  <title>My Page</title>" },
      { id: "b5", code: "</head>" },
      { id: "b6", code: "<body>" },
      { id: "b7", code: "  <h1>Hello, world!</h1>" },
      { id: "b8", code: "</body>" },
      { id: "b9", code: "</html>" }
    ],
    solution: ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9"],
    rewardXP: 20
  }
];
