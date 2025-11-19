"use client";

import { useConnect, useEthereum, useAuthCore } from "@particle-network/authkit";
import { useState } from "react";
import styles from './LoginComponent.module.css';

export default function LoginComponent() {
  const { connect, disconnect, connected, connectionStatus } = useConnect();
  const { address, chainId } = useEthereum();
  const { userInfo } = useAuthCore();
  const [loading, setLoading] = useState<string | null>(null);

  // Google 登入
  const handleGoogleLogin = async () => {
    try {
      setLoading('google');
      if (!connected) {
        await connect({
          socialType: 'google'
        });
      }
    } catch (error) {
      console.error("Google 登入失敗：", error);
    } finally {
      setLoading(null);
    }
  };

  // Facebook 登入
  const handleFacebookLogin = async () => {
    try {
      setLoading('facebook');
      if (!connected) {
        await connect({
          socialType: 'facebook'
        });
      }
    } catch (error) {
      console.error("Facebook 登入失敗：", error);
    } finally {
      setLoading(null);
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
          <h1 className={styles.title}>
            Particle Auth
          </h1>
          <p className={styles.subtitle}>
            第三方社交登入服務
          </p>
        </div>
        
        {/* 主內容卡片 */}
        <div className={styles.card}>
          {!connected ? (
            <div className={styles.loginSection}>
              <div className={styles.statusBadge}>
                <div className={`${styles.statusDot} ${
                  connectionStatus === 'connecting' ? styles.statusDotConnecting : ''
                }`}></div>
                <span className={styles.statusText}>{connectionStatus}</span>
              </div>
              
              {/* 社交登入按鈕 */}
              <div className={styles.socialButtons}>
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading !== null}
                  className={`${styles.socialButton} ${styles.googleButton}`}
                >
                  <svg className={styles.socialIcon} viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>
                    {loading === 'google' ? "連接中..." : "使用 Google 登入"}
                  </span>
                  {loading === 'google' && (
                    <div className={styles.spinner}>
                      <div className={styles.spinnerIcon}></div>
                    </div>
                  )}
                </button>

                <button
                  onClick={handleFacebookLogin}
                  disabled={loading !== null}
                  className={`${styles.socialButton} ${styles.facebookButton}`}
                >
                  <svg className={styles.socialIcon} viewBox="0 0 24 24">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>
                    {loading === 'facebook' ? "連接中..." : "使用 Facebook 登入"}
                  </span>
                  {loading === 'facebook' && (
                    <div className={styles.spinner}>
                      <div className={styles.spinnerIcon}></div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* 成功狀態標題 */}
              <div className={styles.successHeader}>
                <div className={styles.successStatus}>
                  <div className={styles.successDot}></div>
                  <h2 className={styles.successTitle}>
                    登入成功
                  </h2>
                </div>
                <button
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  登出
                </button>
              </div>
              
              {/* JSON 資料顯示區域 */}
              <div className={styles.dataSection}>
                <h3 className={styles.dataHeader}>
                  使用者資料
                </h3>
                
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