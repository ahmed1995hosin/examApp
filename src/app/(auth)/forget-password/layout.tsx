import { ForgetProvider } from "@/app/(auth)/forget-password/_components/providers/forget-provider";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return <ForgetProvider>{children}</ForgetProvider>;
}
