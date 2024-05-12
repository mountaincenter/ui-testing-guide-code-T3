import { useReducer } from "react";

interface User {
  id: string;
  username: string;
}

interface AuthenticateOptions {
  username: string;
  password: string;
}

interface AuthenticateResponse {
  user: User;
}

function authenticate(
  options: AuthenticateOptions,
): Promise<AuthenticateResponse> {
  return fetch("/authenticate", {
    method: "POST",
    ...options,
  }).then((res) => res.json() as Promise<AuthenticateResponse>);
}

type Action = { type: "LOG_IN"; user: User } | { type: "LOG_OUT" };

const reducer = (user: User | null, action: Action): User | null => {
  switch (action.type) {
    case "LOG_IN":
      return action.user;
    case "LOG_OUT":
      return null;
    default:
      return user;
  }
};

export function useAuth() {
  const [user, dispatch] = useReducer(reducer, null);

  const logIn = (options: AuthenticateOptions) => {
    authenticate(options)
      .then(({ user }) => {
        dispatch({ type: "LOG_IN", user });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return [user, logIn] as [User | null, typeof logIn];
}
