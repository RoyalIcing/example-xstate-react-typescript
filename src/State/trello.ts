import { createMachine, assign, EventObject } from "@xstate/fsm";
import { PivotsType } from "pivots";
import { PivotsOnlyTypes } from "pivots/dist/types";

interface TrelloBoard {
  id: string;
  name: string;
}

interface TrelloBoardContext {
  boardID: string;
  data?: TrelloBoard;
}
type TrelloBoardEvent = PivotsType<{
  START: {};
  SUCCESS: { data: TrelloBoard };
}>;

export const trelloBoardMachine = createMachine<
  TrelloBoardContext,
  TrelloBoardEvent
>({
  id: "trelloBoard",
  initial: "Idle",
  states: {
    Idle: { on: { START: "Loading" } },
    Loading: {
      entry: ["LOAD"],
      on: {
        SUCCESS: {
          target: "Loaded",
          actions: assign({
            data: (
              context,
              event: PivotsOnlyTypes<TrelloBoardEvent, "SUCCESS">
            ) => event.data
          })
        }
      }
    }
  }
});
