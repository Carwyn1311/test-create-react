import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

export const searchGithubUsers = async (req, res) => {
  try {
    const { q, page = 1, per_page = 10 } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Thiếu tham số q (search term)." });
    }
    const headers = { "User-Agent": "Node.js" };
    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }
    const githubRes = await axios.get("https://api.github.com/search/users", {
      params: { q, page, per_page },
      headers,
    });
    const items = githubRes.data.items.map((u) => ({
      login: u.login,
      id: u.id,
      avatar_url: u.avatar_url,
      html_url: u.html_url,
    }));
    return res.json({
      total_count: githubRes.data.total_count,
      items,
    });
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return res.status(429).json({ error: "Hết hạn mức GitHub Search API. Vui lòng thử lại sau." });
    }
    return res.status(500).json({ error: "Lỗi khi gọi GitHub Search API." });
  }
};

export const findGithubUser = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Thiếu tham số id." });
    }
    const headers = { "User-Agent": "Node.js" };
    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }
    const githubRes = await axios.get(`https://api.github.com/user/${id}`, {
      headers,
    });
    const { login, avatar_url, html_url, public_repos, followers } = githubRes.data;
    return res.json({ login, id: Number(id), avatar_url, html_url, public_repos, followers });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: "GitHub user không tồn tại." });
    }
    if (error.response && error.response.status === 403) {
      return res.status(429).json({ error: "Hết hạn mức GitHub API. Vui lòng thử sau hoặc cấu hình GITHUB_TOKEN." });
    }
    return res.status(500).json({ error: "Lỗi khi gọi GitHub User API." });
  }
};
