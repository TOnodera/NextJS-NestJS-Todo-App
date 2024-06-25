/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment TodoFragment on Todo {\n  id\n  title\n  status\n  description\n  createdAt\n  updatedAt\n}\n\nmutation CreateTodo($createTodoInput: CreateTodoInput!) {\n  createTodo(createTodoInput: $createTodoInput) {\n    ...TodoFragment\n  }\n}\n\nmutation UpdateTodo($updateTodoInput: UpdateTodoInput!) {\n  updateTodo(updateTodoInput: $updateTodoInput) {\n    ...TodoFragment\n  }\n}\n\nmutation RemoveTodo($id: Int!) {\n  removeTodo(id: $id) {\n    id\n  }\n}\n\nquery GetTodos {\n  todos {\n    ...TodoFragment\n  }\n}\n\nfragment User on User {\n  id\n  name\n  email\n  roleId\n  createdAt\n  updatedAt\n}\n\nquery GetUsers {\n  users {\n    ...User\n  }\n}\n\nmutation CreateUser($createUserInput: CreateUserInput!) {\n  createUser(createUserInput: $createUserInput) {\n    ...User\n  }\n}": types.TodoFragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment TodoFragment on Todo {\n  id\n  title\n  status\n  description\n  createdAt\n  updatedAt\n}\n\nmutation CreateTodo($createTodoInput: CreateTodoInput!) {\n  createTodo(createTodoInput: $createTodoInput) {\n    ...TodoFragment\n  }\n}\n\nmutation UpdateTodo($updateTodoInput: UpdateTodoInput!) {\n  updateTodo(updateTodoInput: $updateTodoInput) {\n    ...TodoFragment\n  }\n}\n\nmutation RemoveTodo($id: Int!) {\n  removeTodo(id: $id) {\n    id\n  }\n}\n\nquery GetTodos {\n  todos {\n    ...TodoFragment\n  }\n}\n\nfragment User on User {\n  id\n  name\n  email\n  roleId\n  createdAt\n  updatedAt\n}\n\nquery GetUsers {\n  users {\n    ...User\n  }\n}\n\nmutation CreateUser($createUserInput: CreateUserInput!) {\n  createUser(createUserInput: $createUserInput) {\n    ...User\n  }\n}"): (typeof documents)["fragment TodoFragment on Todo {\n  id\n  title\n  status\n  description\n  createdAt\n  updatedAt\n}\n\nmutation CreateTodo($createTodoInput: CreateTodoInput!) {\n  createTodo(createTodoInput: $createTodoInput) {\n    ...TodoFragment\n  }\n}\n\nmutation UpdateTodo($updateTodoInput: UpdateTodoInput!) {\n  updateTodo(updateTodoInput: $updateTodoInput) {\n    ...TodoFragment\n  }\n}\n\nmutation RemoveTodo($id: Int!) {\n  removeTodo(id: $id) {\n    id\n  }\n}\n\nquery GetTodos {\n  todos {\n    ...TodoFragment\n  }\n}\n\nfragment User on User {\n  id\n  name\n  email\n  roleId\n  createdAt\n  updatedAt\n}\n\nquery GetUsers {\n  users {\n    ...User\n  }\n}\n\nmutation CreateUser($createUserInput: CreateUserInput!) {\n  createUser(createUserInput: $createUserInput) {\n    ...User\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;