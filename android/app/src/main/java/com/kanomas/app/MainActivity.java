package com.kanomas.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.JavascriptInterface;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 1. Tangkap tombol hardware Back & gesture navigasi Android via OnBackPressedDispatcher
        // Ini memastikan Android OS TIDAK meminimize atau menutup aplikasi saat Back ditekan.
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                triggerAppBack();
            }
        });

        // 2. Hubungkan Native Interface & Download Listener
        setupCustomBridge();
    }

    @Override
    public void onResume() {
        super.onResume();
        setupCustomBridge();
    }

    private void setupCustomBridge() {
        try {
            if (getBridge() != null && getBridge().getWebView() != null) {
                // Bridge untuk exitApp & downloadApk dari JavaScript
                getBridge().getWebView().addJavascriptInterface(new KanomasNativeBridge(), "KanomasNative");

                // Download Listener: saat user mengklik tautan .apk, langsung buka lewat browser/download manager sistem Android
                getBridge().getWebView().setDownloadListener((url, userAgent, contentDisposition, mimetype, contentLength) -> {
                    try {
                        Intent intent = new Intent(Intent.ACTION_VIEW);
                        intent.setData(Uri.parse(url));
                        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        startActivity(intent);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            triggerAppBack();
            return true; // CONSUMED: Mencegah Android OS meminimize atau menutup Activity
        }
        return super.onKeyDown(keyCode, event);
    }

    public void triggerAppBack() {
        runOnUiThread(() -> {
            try {
                if (getBridge() != null && getBridge().getWebView() != null) {
                    getBridge().getWebView().evaluateJavascript(
                        "if (typeof window.kanomasHandleBack === 'function') { window.kanomasHandleBack(); } else if (window.history.length > 1) { window.history.back(); }",
                        null
                    );
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public class KanomasNativeBridge {
        @JavascriptInterface
        public void exitApp() {
            runOnUiThread(() -> {
                finishAffinity();
            });
        }

        @JavascriptInterface
        public void downloadApk(String url) {
            runOnUiThread(() -> {
                try {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(intent);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        }
    }
}
