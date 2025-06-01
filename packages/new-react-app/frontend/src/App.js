import React, { useState, useCallback, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import PhoneNumberForm from "./components/PhoneNumberForm";
import CodeVerificationForm from "./components/CodeVerificationForm";
import NavBar from "./components/NavBar";
import UserGrid from "./components/UserGrid";
import ProfileModal from "./components/ProfileModal";
import { FavoritesProvider } from "./context/FavoritesContext";
import PaginationBar from "./components/PaginationBar";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#388e3c" },
  },
});

function App() {
  const storedPhone = localStorage.getItem("phone") || "";
  const [phone, setPhone] = useState(storedPhone);
  const [step, setStep] = useState(() => (storedPhone ? "main" : "phone"));

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const handlePhoneSent = (phoneNum) => {
    setPhone(phoneNum);
    setStep("code");
  };

  const handleVerified = (phoneNum) => {
    setPhone(phoneNum);
    setStep("main");
  };

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  const fetchGitHubUsers = useCallback(async () => {
    if (!query) {
      setUsers([]);
      setTotalPages(1);
      return;
    }
    setLoadingSearch(true);
    try {
      const res = await fetch(
        `/api/searchGithubUsers?q=${encodeURIComponent(query)}&page=${currentPage}&per_page=${perPage}`
      );
      if (!res.ok) throw new Error();
      const json = await res.json();
      const totalCount = json.total_count;
      const maxResults = Math.min(totalCount, 1000);
      const newTotal = Math.ceil(maxResults / perPage);
      setTotalPages(newTotal);

      const detailed = await Promise.all(
        json.items.map(async (u) => {
          try {
            const detailRes = await fetch(`/api/findGithubUser?id=${u.id}`);
            if (!detailRes.ok) {
              return {
                login: u.login,
                id: u.id,
                avatar_url: u.avatar_url,
                html_url: u.html_url,
                public_repos: 0,
                followers: 0,
              };
            }
            return await detailRes.json();
          } catch {
            return {
              login: u.login,
              id: u.id,
              avatar_url: u.avatar_url,
              html_url: u.html_url,
              public_repos: 0,
              followers: 0,
            };
          }
        })
      );
      setUsers(detailed);
    } catch {
      setUsers([]);
      setTotalPages(1);
    } finally {
      setLoadingSearch(false);
    }
  }, [query, currentPage, perPage]);

  useEffect(() => {
    fetchGitHubUsers();
  }, [fetchGitHubUsers]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const openProfileModal = () => setShowProfileModal(true);
  const closeProfileModal = () => setShowProfileModal(false);

  const handleLogout = () => {
    localStorage.removeItem("phone");
    setPhone("");
    setStep("phone");
    setQuery("");
    setUsers([]);
    setCurrentPage(1);
    setPerPage(10);
    setTotalPages(1);
    setShowProfileModal(false);
  };

  if (step === "phone") {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PhoneNumberForm onSent={handlePhoneSent} />
      </ThemeProvider>
    );
  }
  if (step === "code") {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CodeVerificationForm phone={phone} onVerified={handleVerified} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FavoritesProvider phone={phone}>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <NavBar
            onSearchSubmit={handleSearchSubmit}
            onViewProfile={openProfileModal}
            onLogout={handleLogout}
            initialQuery={query}
          />
          <Box flex="1" p={2} overflow="auto">
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Box>
                Số kết quả/trang:{" "}
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: 4,
                    padding: "4px 8px",
                    fontSize: 14,
                  }}
                >
                  {[5, 10, 20].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </Box>
            </Box>
            <UserGrid users={users} loading={loadingSearch} />
            <PaginationBar
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </Box>
          {showProfileModal && <ProfileModal phone={phone} onClose={closeProfileModal} />}
        </Box>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
