import { useEffect, useMemo, useRef } from "react";

type Props = {
  name: string; // "Workbook/Sheet"
  height?: number; // base height before scaling
  toolbar?: boolean;
  tabs?: boolean;
  scale?: number; // 1 = normal, 0.6 = 60% size, etc.
};

export default function TableauViz({
  name,
  height = 800,
  toolbar = true,
  tabs = false,
  scale = 1,
}: Props) {
  const host = "https://public.tableau.com/";
  const url = useMemo(() => {
    const params = new URLSearchParams();
    params.set(":showVizHome", "no");
    params.set(":embed", "y");
    params.set(":tabs", tabs ? "y" : "n");
    params.set(":toolbar", toolbar ? "y" : "n");
    return `${host}views/${name}?${params.toString()}`;
  }, [name, tabs, toolbar]);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // re-render on url change
  useEffect(() => {
    if (!iframeRef.current) return;
    iframeRef.current.src = url;
  }, [url]);

  // scaled height to keep tile small
  const scaledHeight = Math.round(height * scale);

  return (
    <div className="w-full">
      {/* This wrapper enforces the tile height */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: scaledHeight }}
      >
        {/* We render the iframe at original size, then scale it down */}
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            transform: `scale(${scale})`,
            width: `${Math.round(100 / scale)}%`,
          }}
        >
          <iframe
            ref={iframeRef}
            title={name}
            src={url}
            style={{ width: "100%", height }}
            className="border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}