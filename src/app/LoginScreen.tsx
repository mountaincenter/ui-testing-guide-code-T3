import "./Loginscreen.css";

interface FormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

interface LoginScreenProps {
  onLogIn: (formData: FormData) => void;
}

const LoginForm: React.FC<
  LoginFormProps & React.HTMLAttributes<HTMLFormElement>
> = ({ onSubmit, ...props }) => (
  <form className="login-form-container" onSubmit={onSubmit} {...props}>
    <div className="login-form-wrapper">
      <div role="group" className="login-form-group">
        <label htmlFor="email" id="email-label" className="login-form-label">
          Email address
        </label>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          className="login-form-input"
        />
      </div>
    </div>
    <div role="group" className="login-form-group">
      <label
        id="password-label"
        htmlFor="password"
        className="login-form-label"
      >
        Password
      </label>
      <input
        name="password"
        type="password"
        id="password"
        required
        aria-required="true"
        className="login-form-input"
      />
    </div>
    <button type="submit" className="submit-button">
      Sign in
    </button>
  </form>
);

export default function LoginScreen({ onLogIn }: LoginScreenProps) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    onLogIn({ email, password });
  };

  return (
    <div className="page lists-show">
      <div className="loginscreen">
        <div className="login-screen-container">
          <header className="loginscreen-header">
            <h1 className="loginscreen-heading">Taskbox</h1>
            <p className="loginscreen-text">Sign in to your account</p>
          </header>
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
