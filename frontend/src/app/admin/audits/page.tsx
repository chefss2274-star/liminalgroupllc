"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CheckResult {
  label: string;
  passed: boolean;
  detail: string;
  category: string;
}

interface Audit {
  audit_id: string;
  name: string;
  business: string;
  email: string;
  website: string;
  url: string;
  score: number;
  checks: CheckResult[];
  ai_summary: string;
  created_at: string;
  success: boolean;
}

export default function AdminAuditsPage() {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);
  const [total, setTotal] = useState(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    try {
      const response = await fetch(`${API_URL}/api/audit/list?limit=100`);
      if (!response.ok) throw new Error("Failed to fetch audits");
      const data = await response.json();
      setAudits(data.audits);
      setTotal(data.total);
    } catch (err) {
      setError("Failed to load audits. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "#27ae60";
    if (score >= 40) return "#d4850a";
    return "#c0392b";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Header */}
      <header className="admin-header" data-testid="admin-header">
        <Link href="/" className="admin-brand">Liminal Group</Link>
        <span className="admin-title">Audit Dashboard</span>
      </header>

      <main className="admin-main" data-testid="admin-main">
        <div className="admin-container">
          {/* Stats Bar */}
          <div className="admin-stats">
            <div className="admin-stat">
              <span className="admin-stat-num">{total}</span>
              <span className="admin-stat-label">Total Audits</span>
            </div>
            <div className="admin-stat">
              <span className="admin-stat-num">
                {audits.filter((a) => a.score >= 70).length}
              </span>
              <span className="admin-stat-label">High Score (70+)</span>
            </div>
            <div className="admin-stat">
              <span className="admin-stat-num">
                {audits.filter((a) => a.score < 40).length}
              </span>
              <span className="admin-stat-label">Low Score (&lt;40)</span>
            </div>
          </div>

          {loading ? (
            <div className="admin-loading">
              <div className="audit-spinner"></div>
              <p>Loading audits...</p>
            </div>
          ) : error ? (
            <div className="admin-error">
              <p>{error}</p>
              <button onClick={fetchAudits} className="audit-btn">
                Retry
              </button>
            </div>
          ) : audits.length === 0 ? (
            <div className="admin-empty">
              <h2>No audits yet</h2>
              <p>When someone completes a website audit, it will appear here.</p>
              <Link href="/audit" className="audit-btn">
                Test the Audit Tool
              </Link>
            </div>
          ) : (
            <div className="admin-content">
              {/* Audit List */}
              <div className="admin-list" data-testid="admin-audit-list">
                <h2>Recent Leads</h2>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Business</th>
                        <th>Contact</th>
                        <th>Website</th>
                        <th>Score</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {audits.map((audit) => (
                        <tr
                          key={audit.audit_id}
                          className={selectedAudit?.audit_id === audit.audit_id ? "selected" : ""}
                          onClick={() => setSelectedAudit(audit)}
                          data-testid={`audit-row-${audit.audit_id}`}
                        >
                          <td>
                            <strong>{audit.business}</strong>
                          </td>
                          <td>
                            <div>{audit.name}</div>
                            <a href={`mailto:${audit.email}`} className="admin-email">
                              {audit.email}
                            </a>
                          </td>
                          <td>
                            <a
                              href={audit.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="admin-link"
                            >
                              {audit.url.replace(/^https?:\/\//, "").slice(0, 30)}
                              {audit.url.length > 40 ? "..." : ""}
                            </a>
                          </td>
                          <td>
                            <span
                              className="admin-score"
                              style={{ color: getScoreColor(audit.score) }}
                            >
                              {audit.score}
                            </span>
                          </td>
                          <td className="admin-date">{formatDate(audit.created_at)}</td>
                          <td>
                            <button
                              className="admin-view-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAudit(audit);
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Audit Detail Panel */}
              {selectedAudit && (
                <div className="admin-detail" data-testid="admin-audit-detail">
                  <div className="admin-detail-header">
                    <div>
                      <h2>{selectedAudit.business}</h2>
                      <p>
                        {selectedAudit.name} · {selectedAudit.email}
                      </p>
                    </div>
                    <button
                      className="admin-close-btn"
                      onClick={() => setSelectedAudit(null)}
                    >
                      ×
                    </button>
                  </div>

                  <div className="admin-detail-body">
                    <div className="admin-detail-meta">
                      <div>
                        <label>Website</label>
                        <a href={selectedAudit.url} target="_blank" rel="noopener noreferrer">
                          {selectedAudit.url}
                        </a>
                      </div>
                      <div>
                        <label>Score</label>
                        <span
                          className="admin-detail-score"
                          style={{
                            background: `${getScoreColor(selectedAudit.score)}15`,
                            color: getScoreColor(selectedAudit.score),
                          }}
                        >
                          {selectedAudit.score}/100
                        </span>
                      </div>
                      <div>
                        <label>Submitted</label>
                        <span>{formatDate(selectedAudit.created_at)}</span>
                      </div>
                    </div>

                    <div className="admin-detail-section">
                      <h3>Audit Checklist</h3>
                      <div className="admin-checks">
                        {selectedAudit.checks.map((check, idx) => (
                          <div
                            key={idx}
                            className={`admin-check ${check.passed ? "pass" : "fail"}`}
                          >
                            <span className="admin-check-icon">
                              {check.passed ? "✓" : "✗"}
                            </span>
                            <div>
                              <strong>{check.label}</strong>
                              <p>{check.detail}</p>
                              <span className="admin-check-cat">{check.category}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="admin-detail-section">
                      <h3>AI Analysis</h3>
                      <div className="admin-ai-summary">{selectedAudit.ai_summary}</div>
                    </div>

                    <div className="admin-detail-actions">
                      <a
                        href={`mailto:${selectedAudit.email}?subject=Your Website Audit Results&body=Hi ${selectedAudit.name},%0D%0A%0D%0AThank you for using our website audit tool. I reviewed your results for ${selectedAudit.business} and would love to discuss how we can help improve your website.%0D%0A%0D%0ABest regards`}
                        className="audit-btn"
                      >
                        Email Lead
                      </a>
                      <a
                        href={selectedAudit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-secondary-btn"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="admin-footer">
        <p>Liminal Group LLC · Admin Dashboard</p>
      </footer>
    </>
  );
}
