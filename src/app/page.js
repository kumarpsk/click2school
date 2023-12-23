import { getCourse } from "@/utils/courseAPI";

import { PageContainer } from "./container";

export default async function Home() {
 
  const data = await getCourse("4accb83f-0867-4ac1-a6de-bb5fb470dcd1");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PageContainer course={data} />
    </main>
  );
}
