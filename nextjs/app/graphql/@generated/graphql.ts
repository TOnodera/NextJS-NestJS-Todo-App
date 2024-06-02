/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type CreateTodoInput = {
  /** 詳細 */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** タイトル */
  title: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createTodo: Todo;
  removeTodo: Todo;
  updateTodo: Todo;
};

export type MutationCreateTodoArgs = {
  createTodoInput: CreateTodoInput;
};

export type MutationRemoveTodoArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationUpdateTodoArgs = {
  updateTodoInput: UpdateTodoInput;
};

export type Query = {
  __typename?: "Query";
  todo: Todo;
  todos: Array<Todo>;
};

export type QueryTodoArgs = {
  id: Scalars["Int"]["input"];
};

export type Todo = {
  __typename?: "Todo";
  /** 登録日時 */
  createdAt: Scalars["DateTime"]["output"];
  /** 詳細 */
  description?: Maybe<Scalars["String"]["output"]>;
  /** ID */
  id: Scalars["Int"]["output"];
  /** タイトル */
  title: Scalars["String"]["output"];
  /** 更新日時 */
  updatedAt: Scalars["DateTime"]["output"];
};

export type UpdateTodoInput = {
  /** 詳細 */
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
  /** タイトル */
  title: Scalars["String"]["input"];
};

export type TodoFragmentFragment = {
  __typename?: "Todo";
  id: number;
  title: string;
  description?: string | null;
  createdAt: any;
  updatedAt: any;
} & { " $fragmentName"?: "TodoFragmentFragment" };

export type CreateTodoMutationVariables = Exact<{
  createTodoInput: CreateTodoInput;
}>;

export type CreateTodoMutation = {
  __typename?: "Mutation";
  createTodo: { __typename?: "Todo" } & {
    " $fragmentRefs"?: { TodoFragmentFragment: TodoFragmentFragment };
  };
};

export type GetTodosQueryVariables = Exact<{ [key: string]: never }>;

export type GetTodosQuery = {
  __typename?: "Query";
  todos: Array<
    { __typename?: "Todo" } & {
      " $fragmentRefs"?: { TodoFragmentFragment: TodoFragmentFragment };
    }
  >;
};

export const TodoFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TodoFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Todo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TodoFragmentFragment, unknown>;
export const CreateTodoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateTodo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "createTodoInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateTodoInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTodo" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "createTodoInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "createTodoInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "TodoFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TodoFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Todo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTodoMutation, CreateTodoMutationVariables>;
export const GetTodosDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTodos" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "todos" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "TodoFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TodoFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Todo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTodosQuery, GetTodosQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type CreateTodoInput = {
  /** 詳細 */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** タイトル */
  title: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createTodo: Todo;
  removeTodo: Todo;
  updateTodo: Todo;
};

export type MutationCreateTodoArgs = {
  createTodoInput: CreateTodoInput;
};

export type MutationRemoveTodoArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationUpdateTodoArgs = {
  updateTodoInput: UpdateTodoInput;
};

export type Query = {
  __typename?: "Query";
  todo: Todo;
  todos: Array<Todo>;
};

export type QueryTodoArgs = {
  id: Scalars["Int"]["input"];
};

export type Todo = {
  __typename?: "Todo";
  /** 登録日時 */
  createdAt: Scalars["DateTime"]["output"];
  /** 詳細 */
  description?: Maybe<Scalars["String"]["output"]>;
  /** ID */
  id: Scalars["Int"]["output"];
  /** タイトル */
  title: Scalars["String"]["output"];
  /** 更新日時 */
  updatedAt: Scalars["DateTime"]["output"];
};

export type UpdateTodoInput = {
  /** 詳細 */
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
  /** タイトル */
  title: Scalars["String"]["input"];
};

export const TodoFragment = gql`
  fragment TodoFragment on Todo {
    id
    title
    description
    createdAt
    updatedAt
  }
`;
export const CreateTodo = gql`
  mutation CreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      ...TodoFragment
    }
  }
  ${TodoFragment}
`;
export const GetTodos = gql`
  query GetTodos {
    todos {
      ...TodoFragment
    }
  }
  ${TodoFragment}
`;
