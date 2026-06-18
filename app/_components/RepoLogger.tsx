import ClientLogger from "./ClientLogger";
import { isDev } from "../utils/isDev";

const RepoLogger = async () => {
  const message = `👋 Hey! Check out https://github.com/adrianAlday/country-club`;

  return isDev ? null : <ClientLogger message={message} />;
};

export default RepoLogger;
