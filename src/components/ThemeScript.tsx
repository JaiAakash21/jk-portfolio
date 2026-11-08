/**
 * Sets data-theme before first paint so there is no flash of the wrong theme.
 * Runs as a blocking inline script; the string is a build-time constant.
 */
const script = `(function(){try{
var s=localStorage.getItem("theme");
var t=s==="light"||s==="dark"?s:(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");
document.documentElement.setAttribute("data-theme",t);
}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
