import { arrayQL } from "../src";
import { unorganizedData } from "./mocks";

describe("arrayql queries (map, filter)", () => {
  it("should map same age user and their friends", () => {
    const result = arrayQL(unorganizedData, ({ age }) => {
      return {
        keys: {
          age: true,
          friends: {
            where: (friend) => age === friend.age,
            keys: {
              age: true,
            },
          },
        },
      };
    });

    const expectedResult = [
      {
        age: 18,
        friends: [],
      },
      {
        age: 30,
        friends: [{ age: 30 }],
      },
    ];

    expect(result).toEqual(expectedResult);
  });
});
