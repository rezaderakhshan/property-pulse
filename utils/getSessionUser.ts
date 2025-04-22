import { auth } from "./authOptions";
type Tuser = {
  user: { name: string; email: string; image: string; id: string };
  userId: string;
};
type TsessionUser = Tuser | undefined;
export const getSessionUser: () => Promise<TsessionUser> = async () => {
  const session = await auth();

  if (!session?.user) {
    return undefined;
  }

  const name = session.user.name ?? "Unknown Name";
  const email = session.user.email ?? "No Email";
  const image = session.user.image ?? "No Image";

  return {
    user: {
      name,
      email,
      image,
      id: session.user.id as string,
    },
    userId: session.user.id as string,
  };
};
