import React from "react";

function App() {
  const [password, setPassword] = React.useState("");
  const [passwordLength, setPasswordLength] = React.useState(8);

  const [includeUppercase, setIncludeUppercase] = React.useState(true);
  const [includeLowercase, setIncludeLowercase] = React.useState(true);
  const [includeNumbers, setIncludeNumbers] = React.useState(true);
  const [includeSymbols, setIncludeSymbols] = React.useState(true);

  const handlePasswordGenerate = React.useCallback(() => {
    let chars = "";
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*";

    if (!chars) {
      setPassword("⚠️ Select at least one option!");
      return;
    }

    let pass = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      pass += chars[randomIndex];
    }
    setPassword(pass);
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  React.useEffect(() => {
    handlePasswordGenerate();
  }, [passwordLength]);

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center gap-y-6 
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
      bg-size-[200%_200%] animate-[gradient_6s_ease_infinite]"
      style={{
        animation: "gradient 6s ease infinite",
        backgroundSize: "200% 200%",
      }}
    >
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div
        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl 
        p-10 flex flex-col items-center gap-y-5 border border-white/20 
        transform transition-all duration-500 hover:scale-105"
      >
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
          Random Password Generator
        </h1>

        {/* Password Display */}
        <input
          type="text"
          value={password}
          readOnly
          className="h-10 w-96 text-center rounded-lg px-5 
          bg-white/20 text-white border border-white/30 outline-none 
          placeholder:text-gray-300"
        />

        {/* Length Controls */}
        <div className="flex items-center justify-center gap-x-3">
          <button
            className="h-10 px-4 text-xl font-bold bg-white/30 text-white 
            rounded-lg hover:bg-white/50 transition"
            onClick={() => setPasswordLength(passwordLength + 1)}
          >
            +
          </button>
          <input
            type="text"
            value={passwordLength}
            readOnly
            className="h-10 w-16 text-center bg-white/20 text-white 
            rounded-lg border border-white/30 outline-none"
          />
          <button
            className="h-10 px-4 text-xl font-bold bg-white/30 text-white 
            rounded-lg hover:bg-white/50 transition"
            onClick={() =>
              setPasswordLength((len) => (len > 8 ? len - 1 : len))
            }
          >
            -
          </button>
        </div>

        {/* Character Options */}
        <div className="flex flex-col gap-y-2 text-white">
          <label className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="accent-pink-500 w-5 h-5"
            />
            <span>A–Z</span>
          </label>
          <label className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
              className="accent-pink-500 w-5 h-5"
            />
            <span>a–z</span>
          </label>
          <label className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="accent-pink-500 w-5 h-5"
            />
            <span>0–9</span>
          </label>
          <label className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="accent-pink-500 w-5 h-5"
            />
            <span>!@#$%^&*</span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={handlePasswordGenerate}
          className="mt-3 h-12 px-6 text-lg font-semibold 
          bg-gradient-to-r from-cyan-400 to-blue-500 
          rounded-full text-white shadow-lg 
          hover:scale-105 transform transition duration-300"
        >
          Generate New Password
        </button>
      </div>
    </div>
  );
}

export default App;
