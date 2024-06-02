import { useState, useEffect, useCallback, useMemo } from "react";

export default function ColorsUse() {
  // Cores
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryColorHover, setPrimaryColorHover] = useState("");
  const [primaryColorTransparent, setPrimaryColorTransparent] = useState("");

  const colors = useMemo(
    () => [
      "hsl(213, 48%, 75%)",
      "hsl(265, 37%, 77%)",
      "hsl(33, 67%, 83%)",
      "hsl(14, 78%, 83%)",
      "hsl(168, 49%, 78%)",
      "hsl(326, 45%, 81%)",
    ],
    []
  );

  const darkenColor = useCallback((color, percent) => {
    const hsv = colorToHSV(color);
    hsv.v = Math.max(0, hsv.v - percent / 100);
    return HSVToColor(hsv);
  }, []);

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setPrimaryColor(randomColor);

    const hoverColor = darkenColor(randomColor, 25);
    setPrimaryColorHover(hoverColor);

    const transparentColor = setOpacity(randomColor, 0.3);
    setPrimaryColorTransparent(transparentColor);
  }, [colors, darkenColor]);

  // Cor com menos opacidade
  const setOpacity = (color, opacity) => {
    const hslaColor = color
      .replace("hsl", "hsla")
      .replace(")", `, ${opacity})`);
    return hslaColor;
  };

  const colorToHSV = (color) => {
    const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return null;
    const [, h, s, v] = match.map(parseFloat);
    return { h, s: s / 100, v: v / 100 };
  };

  const HSVToColor = (hsv) => {
    const { h, s, v } = hsv;
    const hsl = `hsl(${h}, ${s * 100}%, ${v * 100}%)`;
    return hsl;
  };

  return { primaryColor, primaryColorHover, primaryColorTransparent };
}
