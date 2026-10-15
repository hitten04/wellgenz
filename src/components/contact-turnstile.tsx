"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

interface TurnstileOptions {
  sitekey: string;
  action: string;
  theme: "light";
  size: "flexible";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
  "timeout-callback": () => void;
}
interface TurnstileAPI {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  remove: (widgetId: string) => void;
}
declare global {
  interface Window { turnstile?: TurnstileAPI }
}

export function ContactTurnstile({ siteKey, onToken }: { siteKey: string; onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("Complete the check before preparing your email draft.");

  useEffect(() => {
    const api = window.turnstile;
    if (!ready || !container.current || !api) return;
    let mounted = true;
    const clearToken = (message: string) => {
      if (!mounted) return;
      onToken("");
      setStatus(message);
    };
    let widgetId: string;
    try {
      widgetId = api.render(container.current, {
        sitekey: siteKey,
        action: "contact_draft",
        theme: "light",
        size: "flexible",
        callback: token => {
          if (!mounted) return;
          onToken(token);
          setStatus("Check complete. You can prepare your email draft.");
        },
        "expired-callback": () => clearToken("Your check expired. Please complete the refreshed check."),
        "error-callback": () => clearToken("The check could not load. Please retry the check or reload this page."),
        "timeout-callback": () => clearToken("The check timed out. Please complete the check again."),
      });
    } catch {
      // Report asynchronously so a synchronous render failure never updates during effect setup.
      queueMicrotask(() => clearToken("The check is unavailable. Please reload this page to try again."));
    }
    return () => {
      mounted = false;
      if (widgetId !== undefined) api.remove(widgetId);
    };
  }, [ready, siteKey, onToken]);

  return <div className="contact-captcha">
    <Script id="wellgenz-contact-turnstile" src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setReady(true)} onError={() => {
      onToken("");
      setStatus("The check could not load. Please check your connection and reload this page.");
    }}/>
    <div ref={container}/>
    <p className="contact-form-note" role="status" aria-live="polite">{status}</p>
    <noscript>Please enable JavaScript to complete the check and prepare an email draft.</noscript>
  </div>;
}
