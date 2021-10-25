import { LogEntry } from "@/domain/framework/log/LogEntry";

export interface NodeMemoryState {
  term: number;
  votedFor?: string;
  nodesWhichVotedForMe: Set<string>;
  leader?: string;
  sentLength: { [nodeId: string]: number };
  ackedLength: { [nodeId: string]: number };
  commitLength: number;
  log: LogEntry[];
}

interface MemoryStateChangeEvent {
  nodeId: string;
  newNodeMemoryState: NodeMemoryState;
}

export const INITIAL_NODE_MEMORY_STATE: () => NodeMemoryState = () => ({
  term: 0,
  nodesWhichVotedForMe: new Set(),
  sentLength: {},
  ackedLength: {},
  log: [],
  commitLength: 0,
});

type MemoryStateChangeCallBack = (e: MemoryStateChangeEvent) => void;

export class NodeMemoryStateManager {
  private readonly callBacks: MemoryStateChangeCallBack[] = [];

  onNodeMemoryStateChange(callBack: MemoryStateChangeCallBack): void {
    this.callBacks.push(callBack);
  }

  getNodeInitialMemoryState(forNodeId: string): NodeMemoryState {
    return new Proxy<NodeMemoryState>(INITIAL_NODE_MEMORY_STATE(), {
      set: (nodeMemoryState, prop, value): boolean => {
        (nodeMemoryState as any)[prop] = value;
        this.callBacks.forEach((cb) =>
          cb({
            nodeId: forNodeId,
            newNodeMemoryState: nodeMemoryState,
          })
        );
        return true;
      },
    });
  }
}
