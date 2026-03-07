import { Show, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="m-10">
      {/* <Show when="signed-out">
        <SignInButton />
      </Show>

      <Show when="signed-in">
        <UserButton />
      </Show> */}
    </div>
  );
}
