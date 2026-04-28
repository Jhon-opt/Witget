export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.nequi.com.co/personas/ayuda/status", {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await response.text();

    let estado = "🔴 Caído";

    if (html.includes("Todos los servicios están operativos")) {
      estado = "🟢 Todo OK";
    } else if (html.includes("Operacional")) {
      estado = "🟡 Parcial";
    }

    // 👇 CACHE AQUÍ
    res.setHeader("Cache-Control", "s-maxage=300"); // 5 minutos

    res.status(200).json({ estado });

  } catch (error) {
    res.status(200).json({ estado: "🔴 Error conexión" });
  }
}