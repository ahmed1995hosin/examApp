import AuthStaticSide from "@/app/(auth)/_components/auth-static-side";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="grid grid-cols-2 h-screen">
      <AuthStaticSide />
      {children}
    </div>
  );
}
