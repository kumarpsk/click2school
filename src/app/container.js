"use client";
import * as React from "react";
import RichText from "@/components/richText";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf0x0R3xbf1x0ZFRMZFhbQXNPMyBoS35RdURhW3xecXBQRmlfV0xx"
);

export const PageContainer = ({ course }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <RichText
        content={course?.description}
        title={course?.title}
        courseId={course?.uid}
        id={course?.id}
      />
    </div>
  );
};
