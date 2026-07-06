module.exports = async function handler(req, res) {
  try {
    await fetch("https://gifftybabe-adanne-api.hf.space/", {
      method: "GET",
    });
    return res.status(200).json({ status: "Space pinged successfully" });
  } catch (err) {
    return res.status(200).json({ status: "Ping attempted" });
  }
};
