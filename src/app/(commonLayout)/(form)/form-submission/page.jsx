import React, { Suspense } from "react";
import FormClient from "./FormClient";

export default function Page() {
  // Server component page — render the client-only form selector inside
  // a Suspense boundary to satisfy next's CSR bailout requirements.
  return (
    <Suspense fallback={null}>
      <FormClient />
    </Suspense>
  );
}
