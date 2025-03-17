import { Get } from "../islands/Get.tsx";
import { Set } from "../islands/Set.tsx";

export default function Home() {
  return (
    <div class="flex flex-col lg:flex-row items-center bg-gray-900 text-gray-100 min-h-screen justify-center gap-20">
      <Get />
      <Set />
    </div>
  );
}
