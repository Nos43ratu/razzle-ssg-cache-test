import React from "react";
import { useData } from "entities/DataProvider";

const ApplicationBPage = () => {
  const data = useData();

  return (
    <div>
      <h1>Application B</h1>
      <div>
        {data?.cards?.map((e) => (
          <div key={e?.title}>{e?.title}</div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationBPage;
