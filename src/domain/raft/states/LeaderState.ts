import { NodeAlgorithmState } from "@/domain/raft/states/NodeAlgorithmState";

export class LeaderState extends NodeAlgorithmState {
  name = "leader" as const;

  onEnterInState(): void {
    super.onEnterInState();
  }
}
