"use client";

import {
  useConnect,
  useEthereum,
  useAuthCore,
} from "@particle-network/authkit";
import { useState } from "react";
import styles from "./LoginComponent.module.css";

export default function LoginComponent() {
  const { connect, disconnect, connected, connectionStatus } = useConnect();
  const { address, chainId } = useEthereum();
  const { userInfo } = useAuthCore();
  const [loading, setLoading] = useState(false);

  // 處理登入
  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!connected) {
        await connect({});
      }
    } catch (error) {
      console.error("登入失敗：", error);
    } finally {
      setLoading(false);
    }
  };

  // 處理登出
  const handleLogout = async () => {
    try {
      if (connected) {
        await disconnect();
      }
    } catch (error) {
      console.error("登出失敗：", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* 標題區域 */}
        <div className={styles.header}>
          <h1 className={styles.title}>Particle Auth</h1>
          <p className={styles.subtitle}>第三方社交登入服務</p>
        </div>

        {/* 主內容卡片 */}
        <div className={styles.card}>
          {!connected ? (
            <div className={styles.loginSection}>
              <div className={styles.statusBadge}>
                <div
                  className={`${styles.statusDot} ${
                    connectionStatus === "connecting"
                      ? styles.statusDotConnecting
                      : ""
                  }`}
                ></div>
                <span className={styles.statusText}>{connectionStatus}</span>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className={styles.loginButton}
              >
                <span style={{ position: "relative", zIndex: 10 }}>
                  {loading ? "連接中" : "開始登入"}
                </span>
                {loading && (
                  <div className={styles.spinner}>
                    <div className={styles.spinnerIcon}></div>
                  </div>
                )}
              </button>
            </div>
          ) : (
            <div>
              {/* 成功狀態標題 */}
              <div className={styles.successHeader}>
                <div className={styles.successStatus}>
                  <div className={styles.successDot}></div>
                  <h2 className={styles.successTitle}>登入成功</h2>
                </div>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  登出
                </button>
              </div>

              {/* JSON 資料顯示區域 */}
              <div className={styles.dataSection}>
                <h3 className={styles.dataHeader}>使用者資料</h3>

                <div className={styles.dataContainer}>
                  <div className={styles.dataContent}>
                    {userInfo ? (
                      <pre className={styles.jsonData}>
                        {JSON.stringify(userInfo, null, 2)}
                      </pre>
                    ) : (
                      <div className={styles.loadingContainer}>
                        <div className={styles.loadingContent}>
                          <div className={styles.loadingSpinner}></div>
                          <p className={styles.loadingText}>載入資料中</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
