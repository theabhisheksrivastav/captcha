import { useState, useEffect, useRef } from "react";
import ReCaptcha from "react-google-recaptcha"

const App = () => {
  const [captchaToken, setCaptchaToken] = useState("");
  const [message, setMessage] = useState("");
  // const captchaRef = useRef(null);

  // useEffect(() => {
  //   if (captchaRef.current) {
  //     window.turnstile.render(captchaRef.current, {
  //       sitekey: "6LfurKAqAAAAALYxbqlJPcm4sN50Kc8UythSEz-I",
  //       callback: (token) => setCaptchaToken(token),
  //     });
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setMessage("Please complete the CAPTCHA.");
      return;
    }

    try {
      console.log(captchaToken)
      const response = await fetch("http://localhost:3000/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("CAPTCHA verified successfully!");
      } else {
        setMessage("CAPTCHA verification failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during verification.");
    }
  };

  const onChange = async (token) => {
    if (token) {
      setCaptchaToken(token);
    }
  }

  return (
    <div className="App" style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>ReCAPTCHA Verification</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <ReCaptcha
        sitekey="6LehtKAqAAAAALcXV5l2JJ3LyMKODfF1fB2WbHEu"
        onChange={onChange}
        />
        </div>
        <button type="submit" style={{ marginTop: "20px" }}>
          Verify
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
