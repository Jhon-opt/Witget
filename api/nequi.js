export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.nequi.com.co/personas/ayuda/status", {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const html = await response.text();

    const limpio = html.toLowerCase();

    let estado = "🔴 Caído";

    // 🔥 detección más robusta
    if (limpio.includes("operativos")) {
      estado = "🟢 Todo OK";
    } else if (limpio.includes("operacional")) {
      estado = "🟡 Parcial";
    }

    res.setHeader("Cache-Control", "s-maxage=300");
    res.status(200).json({ estado });

  } catch (error) {
    res.status(200).json({ estado: "🔴 Error conexión" });
  }
}