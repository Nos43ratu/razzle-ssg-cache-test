import React, { useContext } from "react";
import { useData } from "entities/DataProvider";

const ApplicationAPage = () => {
  const data = useData();

  return (
    <div>
      <h1>Application A</h1>
      <div>
        {data?.cards?.map((e) => (
          <div key={e?.title}>{e?.title}</div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationAPage;
