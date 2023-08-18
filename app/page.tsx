import { Categories, LoadMore, Posts } from "@/components";

export default function Home() {
  return (
    <section className="flexStart paddings mb-16 flex-col">
      <Categories />
      <Posts />
      <LoadMore />
    </section>
  );
}
