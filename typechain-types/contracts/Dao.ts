/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface DaoInterface extends utils.Interface {
  functions: {
    "addProposal(bytes,address,string)": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "endVote(uint256)": FunctionFragment;
    "vote(uint256,bool)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addProposal"
      | "deposit"
      | "endVote"
      | "vote"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addProposal",
    values: [BytesLike, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "endVote",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "endVote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "ReferendumCreated(uint256,string)": EventFragment;
    "ReferendumEnded(uint256,bool,bool)": EventFragment;
    "VoteMade(uint256,address,uint256,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ReferendumCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ReferendumEnded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VoteMade"): EventFragment;
}

export interface ReferendumCreatedEventObject {
  id: BigNumber;
  description: string;
}
export type ReferendumCreatedEvent = TypedEvent<
  [BigNumber, string],
  ReferendumCreatedEventObject
>;

export type ReferendumCreatedEventFilter =
  TypedEventFilter<ReferendumCreatedEvent>;

export interface ReferendumEndedEventObject {
  id: BigNumber;
  decision: boolean;
  successCall: boolean;
}
export type ReferendumEndedEvent = TypedEvent<
  [BigNumber, boolean, boolean],
  ReferendumEndedEventObject
>;

export type ReferendumEndedEventFilter = TypedEventFilter<ReferendumEndedEvent>;

export interface VoteMadeEventObject {
  id: BigNumber;
  voter: string;
  amount: BigNumber;
  accept: boolean;
}
export type VoteMadeEvent = TypedEvent<
  [BigNumber, string, BigNumber, boolean],
  VoteMadeEventObject
>;

export type VoteMadeEventFilter = TypedEventFilter<VoteMadeEvent>;

export interface Dao extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DaoInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addProposal(
      _callData: BytesLike,
      _recipient: string,
      _description: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    endVote(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vote(
      _id: BigNumberish,
      _accept: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addProposal(
    _callData: BytesLike,
    _recipient: string,
    _description: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  endVote(
    _id: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vote(
    _id: BigNumberish,
    _accept: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addProposal(
      _callData: BytesLike,
      _recipient: string,
      _description: string,
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    endVote(_id: BigNumberish, overrides?: CallOverrides): Promise<void>;

    vote(
      _id: BigNumberish,
      _accept: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "ReferendumCreated(uint256,string)"(
      id?: BigNumberish | null,
      description?: null
    ): ReferendumCreatedEventFilter;
    ReferendumCreated(
      id?: BigNumberish | null,
      description?: null
    ): ReferendumCreatedEventFilter;

    "ReferendumEnded(uint256,bool,bool)"(
      id?: BigNumberish | null,
      decision?: null,
      successCall?: null
    ): ReferendumEndedEventFilter;
    ReferendumEnded(
      id?: BigNumberish | null,
      decision?: null,
      successCall?: null
    ): ReferendumEndedEventFilter;

    "VoteMade(uint256,address,uint256,bool)"(
      id?: BigNumberish | null,
      voter?: null,
      amount?: null,
      accept?: null
    ): VoteMadeEventFilter;
    VoteMade(
      id?: BigNumberish | null,
      voter?: null,
      amount?: null,
      accept?: null
    ): VoteMadeEventFilter;
  };

  estimateGas: {
    addProposal(
      _callData: BytesLike,
      _recipient: string,
      _description: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    endVote(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vote(
      _id: BigNumberish,
      _accept: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addProposal(
      _callData: BytesLike,
      _recipient: string,
      _description: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    endVote(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vote(
      _id: BigNumberish,
      _accept: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
