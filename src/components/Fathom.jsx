'use client';

import { load, trackPageview } from 'fathom-client';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const env = process.env.NODE_ENV;
    if (env !== "production") return;

    load('HZFXSYVD', {
      auto: false,
      includedDomains: ["www.21e14.com", "21e14.com"],
    });
  }, []);

  useEffect(() => {
    if (!pathname) return;

    const search = searchParams.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    trackPageview({
      url: url,
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}
