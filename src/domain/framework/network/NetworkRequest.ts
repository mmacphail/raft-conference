import { LogEntry } from "@/domain/framework/log/LogEntry";

export interface AbstractNetworkRequest {
  receiverNodeId: string;
}

export interface AbstractNodeToNodeNetworkRequest
  extends AbstractNetworkRequest {
  senderNodeId: string;
  term: number;
}

export interface VoteRequest extends AbstractNodeToNodeNetworkRequest {
  type: "vote-request";
  term: number;
  logLength: number;
  logTerm: number;
}

export interface VoteResponse extends AbstractNodeToNodeNetworkRequest {
  type: "vote-response";
  term: number;
  voterId: string;
  granted: boolean;
}

export interface LogRequest extends AbstractNodeToNodeNetworkRequest {
  type: "log-request";
  leaderId: string;
  logLength: number;
  logTerm: number;
  leaderCommit: number;
  entries: LogEntry[];
}

export interface LogResponse extends AbstractNodeToNodeNetworkRequest {
  type: "log-response";
  term: number;
  ack: number;
  success: boolean;
}

export interface BroadcastRequest extends AbstractNetworkRequest {
  type: "broadcast-request";
  log: number;
}

export interface RelayBroadcastRequest
  extends AbstractNodeToNodeNetworkRequest {
  type: "broadcast-request";
  term: number;
  log: number;
}

export type NodeToNodeRequest =
  | VoteRequest
  | VoteResponse
  | LogRequest
  | LogResponse
  | RelayBroadcastRequest;

export type NetworkRequest = NodeToNodeRequest | BroadcastRequest;

export function isRequestIsNodeToNodeRequest(
  networkRequest: NetworkRequest
): networkRequest is NodeToNodeRequest {
  return networkRequest.type !== "broadcast-request";
}
