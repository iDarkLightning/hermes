import Link from "next/link";
import { useRouter } from "next/router";

const Tab: React.FC<{ path: string; name: string }> = ({ path, name }) => {
  const router = useRouter();
  return (
    <Link href={path}>
      <p
        className={`text-slate-200 ${
          router.pathname === path ? " underline" : "text-white/30"
        }`}
      >
        {name}
      </p>
    </Link>
  );
};

export default Tab;
