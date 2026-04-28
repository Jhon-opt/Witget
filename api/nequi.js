export default async function handler(req, res) {
  try {
    const response = await fetch("https://status.nequi.com.co/api/v2/status.json");
    const data = await response.json();

    const indicator = data.status.indicator;
    const descripcion = data.status.description;

    let estado = "🔴 Desconocido";

    switch (indicator) {
      case "none":
        estado = "🟢 Todo OK";
        break;
      case "minor":
        estado = "🟡 Fallas menores";
        break;
      case "major":
        estado = "🔴 Fallas importantes";
        break;
      case "critical":
        estado = "🚨 Caída crítica";
        break;
      default:
        estado = "⚪ Estado desconocido";
    }

    // 🔥 FORMATEO DE FECHA (a hora Colombia)
    const fecha = new Date(data.page.updated_at);

    const actualizado = fecha.toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    res.setHeader("Cache-Control", "s-maxage=300");

    res.status(200).json({
      estado,
      indicador: indicator,
      descripcion,
      actualizado
    });

  } catch (error) {
    res.status(200).json({
      estado: "🔴 Error conexión"
    });
  }
}