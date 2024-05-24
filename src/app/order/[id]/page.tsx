import Order from "@/components/order";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return <Order id={params.id} />;
};

export default Page;
